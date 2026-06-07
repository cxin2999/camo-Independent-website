export type Product = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  applications: string[];
  customOptions: string[];
};

const commonSpecs = [
  { label: "Material", value: "Camouflage felt loop fabric" },
  { label: "Pattern", value: "Woodland, desert, digital, snow, jungle, custom" },
  { label: "Width", value: "Customizable" },
  { label: "Thickness", value: "Depends on requirement" },
  { label: "Supply Form", value: "Roll or sheet" },
  { label: "MOQ", value: "Contact us for project details" }
];

export const products: Product[] = [
  {
    slug: "camo-loop-fabric-rolls",
    name: "Camo Loop Fabric Rolls",
    category: "Roll Material",
    shortDescription:
      "Main camouflage loop fabric roll material for tactical gear factories, patch zones, uniform panels, bags, and outdoor equipment.",
    image: "/images/products/camo-loop-fabric-roll.png",
    gallery: [
      "/images/products/camo-loop-fabric-roll.png",
      "/images/patterns/woodland.png",
      "/images/patterns/digital.png"
    ],
    features: [
      "Bulk roll supply",
      "Soft felt loop surface",
      "Cutting and sewing ready",
      "Pattern matching support"
    ],
    specifications: [
      ...commonSpecs,
      { label: "Backing", value: "Plain backing or custom backing" },
      { label: "Application", value: "Tactical gear, patches, uniforms, bags" }
    ],
    applications: ["Tactical Gear", "Military Uniform", "Tactical Patch"],
    customOptions: ["Pattern", "Color", "Width", "Roll length", "Packing"]
  },
  {
    slug: "adhesive-backed-camo-loop-fabric",
    name: "Adhesive Backed Camo Loop Fabric",
    category: "Adhesive Backing",
    shortDescription:
      "Camouflage loop fabric with adhesive backing for bonding, patch backing, processing, and sample development.",
    image: "/images/products/adhesive-backed-camo-loop-fabric.png",
    gallery: [
      "/images/products/adhesive-backed-camo-loop-fabric.png",
      "/images/patterns/desert.png",
      "/images/patterns/woodland.png"
    ],
    features: [
      "Pressure-sensitive backing",
      "Suitable for conversion work",
      "Roll or sheet supply",
      "Custom release liner options"
    ],
    specifications: [
      ...commonSpecs,
      { label: "Backing", value: "Adhesive backed" },
      { label: "Application", value: "Patch backing, bonding, processing" }
    ],
    applications: ["Tactical Patch", "Outdoor Equipment"],
    customOptions: ["Adhesive type", "Liner", "Sheet size", "Pattern", "Packing"]
  },
  {
    slug: "laminated-camo-hook-loop-fabric",
    name: "Laminated Camo Hook and Loop Fabric",
    category: "Laminated Material",
    shortDescription:
      "Custom laminated camouflage hook and loop material combined with fabric, foam, non-woven, or other backing structures.",
    image: "/images/products/laminated-camo-hook-loop-fabric.png",
    gallery: [
      "/images/products/laminated-camo-hook-loop-fabric.png",
      "/images/patterns/digital.png",
      "/images/factory/quality-inspection.png"
    ],
    features: [
      "Custom lamination stack",
      "Material structure support",
      "For OEM production",
      "Backing and thickness options"
    ],
    specifications: [
      ...commonSpecs,
      { label: "Backing", value: "Fabric, foam, non-woven, or custom layer" },
      { label: "Application", value: "Helmet covers, bags, uniforms, gear panels" }
    ],
    applications: ["Helmet Cover", "Tactical Gear", "Hunting Equipment"],
    customOptions: ["Layer structure", "Thickness", "Backing", "Width", "Pattern"]
  },
  {
    slug: "custom-camouflage-loop-fabric",
    name: "Custom Camouflage Loop Fabric",
    category: "Custom Material",
    shortDescription:
      "Custom pattern, color, width, thickness, backing, lamination, cutting, and packaging for OEM material buyers.",
    image: "/images/products/custom-camouflage-loop-fabric.png",
    gallery: [
      "/images/products/custom-camouflage-loop-fabric.png",
      "/images/patterns/jungle.png",
      "/images/patterns/snow.png"
    ],
    features: [
      "Custom camouflage artwork",
      "Color matching support",
      "Sample confirmation",
      "Bulk material production"
    ],
    specifications: [
      ...commonSpecs,
      { label: "Backing", value: "Plain, adhesive, laminated, or custom" },
      { label: "Application", value: "OEM tactical and outdoor material projects" }
    ],
    applications: ["Tactical Gear", "Military Uniform", "Hunting Equipment"],
    customOptions: ["Pattern", "Color", "Width", "Thickness", "Backing", "Packaging"]
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
