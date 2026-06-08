import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Buffer } from "node:buffer";

const root = process.cwd();

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i += 1) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function adler32(data) {
  let a = 1;
  let b = 0;
  for (const value of data) {
    a = (a + value) % 65521;
    b = (b + a) % 65521;
  }
  return ((b << 16) | a) >>> 0;
}

function zlibStore(data) {
  const blocks = [];
  let offset = 0;
  while (offset < data.length) {
    const size = Math.min(65535, data.length - offset);
    const final = offset + size >= data.length;
    const head = Buffer.alloc(5);
    head[0] = final ? 1 : 0;
    head.writeUInt16LE(size, 1);
    head.writeUInt16LE(~size & 0xffff, 3);
    blocks.push(head, data.subarray(offset, offset + size));
    offset += size;
  }
  const zhead = Buffer.from([0x78, 0x01]);
  const adler = Buffer.alloc(4);
  adler.writeUInt32BE(adler32(data));
  return Buffer.concat([zhead, ...blocks, adler]);
}

function png(width, height, paint) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a = 255] = paint(x, y, width, height);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlibStore(raw)),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

function mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function noise(x, y, seed) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

const palettes = {
  woodland: [
    [28, 39, 25],
    [74, 91, 48],
    [122, 118, 70],
    [45, 47, 36]
  ],
  desert: [
    [199, 169, 116],
    [138, 111, 72],
    [230, 211, 166],
    [89, 77, 58]
  ],
  digital: [
    [34, 45, 41],
    [92, 112, 90],
    [167, 171, 142],
    [63, 69, 61]
  ],
  snow: [
    [225, 226, 218],
    [176, 184, 178],
    [105, 116, 111],
    [240, 239, 232]
  ],
  jungle: [
    [18, 64, 42],
    [51, 111, 55],
    [128, 133, 70],
    [30, 43, 29]
  ]
};

function camo(palette, seed = 1) {
  return (x, y, w, h) => {
    const scale = Math.min(w, h);
    const a = Math.sin((x / scale) * 18 + noise(x, y, seed) * 2);
    const b = Math.cos((y / scale) * 16 + noise(x / 3, y / 3, seed + 2) * 4);
    const c = noise(Math.floor(x / 24), Math.floor(y / 24), seed + 4);
    const index = Math.abs(Math.floor((a + b + c * 4) * 1.7)) % palette.length;
    const base = palette[index];
    const fiber = (noise(x, y, seed + 8) - 0.5) * 18;
    const weave = ((x + y) % 9 === 0 ? -12 : 0) + (x % 17 === 0 ? 10 : 0);
    return base.map((v) => Math.max(0, Math.min(255, v + fiber + weave)));
  };
}

function rollAsset(x, y, w, h) {
  const bg = camo(palettes.woodland, 3)(x, y, w, h);
  const cx = w * 0.58;
  const cy = h * 0.5;
  const dx = (x - cx) / 1.35;
  const dy = y - cy;
  const d = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const ring = Math.sin(d / 8 + angle * 3) * 0.5 + 0.5;
  const inRoll = d < h * 0.38;
  const shadow = Math.max(0, 1 - d / (h * 0.5));
  const base = inRoll ? bg.map((v) => mix(v, 28, 0.15 + ring * 0.2)) : bg.map((v) => mix(v, 20, 0.42));
  const stripe = Math.abs(Math.sin(angle * 9 + d / 18)) > 0.8 ? 18 : 0;
  return base.map((v) => Math.max(0, Math.min(255, v + stripe + shadow * 20)));
}

function factoryAsset(x, y, w, h) {
  const sky = y < h * 0.28;
  const t = y / h;
  if (sky) return [mix(210, 190, t), mix(211, 195, t), mix(200, 185, t)];
  const floorLine = h * 0.7 + Math.sin(x / 80) * 10;
  if (y > floorLine) {
    const line = x % 95 < 3 || y % 35 < 2 ? -18 : 0;
    return [126 + line, 124 + line, 114 + line];
  }
  const bay = Math.floor(x / (w / 6));
  const machine = (x % (w / 6)) > 22 && (x % (w / 6)) < w / 6 - 18 && y > h * 0.42;
  if (machine) return bay % 2 ? [72, 82, 70] : [89, 94, 82];
  const beam = y % 92 < 5 || x % 170 < 4;
  return beam ? [55, 58, 54] : [171, 171, 160];
}

function applicationAsset(palette, seed) {
  const pattern = camo(palette, seed);
  return (x, y, w, h) => {
    const base = pattern(x, y, w, h);
    const dark = x < w * 0.18 || y > h * 0.72 || Math.abs(x - y * 0.7) < 18;
    const patch = x > w * 0.48 && x < w * 0.86 && y > h * 0.24 && y < h * 0.55;
    const v = dark ? 0.45 : patch ? 1.18 : 0.82;
    return base.map((c) => Math.max(0, Math.min(255, c * v)));
  };
}

const files = [
  ["public/images/products/camo-loop-fabric-roll.jpg", 1200, 820, rollAsset],
  ["public/images/products/adhesive-backed-camo-loop-fabric.png", 900, 680, camo(palettes.desert, 6)],
  ["public/images/products/laminated-camo-hook-loop-fabric.png", 900, 680, camo(palettes.digital, 9)],
  ["public/images/products/custom-camouflage-loop-fabric.png", 900, 680, camo(palettes.jungle, 12)],
  ["public/images/patterns/woodland.png", 680, 420, camo(palettes.woodland, 4)],
  ["public/images/patterns/desert.png", 680, 420, camo(palettes.desert, 5)],
  ["public/images/patterns/digital.png", 680, 420, camo(palettes.digital, 6)],
  ["public/images/patterns/snow.png", 680, 420, camo(palettes.snow, 7)],
  ["public/images/patterns/jungle.png", 680, 420, camo(palettes.jungle, 8)],
  ["public/images/applications/tactical-gear.png", 900, 1100, applicationAsset(palettes.woodland, 11)],
  ["public/images/applications/uniform.png", 900, 720, applicationAsset(palettes.digital, 13)],
  ["public/images/applications/patch.png", 900, 720, applicationAsset(palettes.desert, 15)],
  ["public/images/applications/helmet-cover.png", 900, 720, applicationAsset(palettes.jungle, 17)],
  ["public/images/applications/hunting-equipment.png", 900, 720, applicationAsset(palettes.snow, 19)],
  ["public/images/factory/production-workshop.png", 1200, 820, factoryAsset],
  ["public/images/factory/quality-inspection.png", 900, 680, factoryAsset],
  ["public/images/factory/warehouse-shipment.png", 900, 680, factoryAsset],
  ["public/og-image.png", 1200, 630, rollAsset]
];

for (const [path, width, height, painter] of files) {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, png(width, height, painter));
}
