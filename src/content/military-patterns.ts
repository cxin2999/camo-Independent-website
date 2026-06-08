export type MilitaryPattern = {
  slug: string;
  name: string;
  origin: string;
  primaryUsers: string;
  environment: string;
  image: string;
  overview: string;
  features: string[];
  materialNote: string;
};

export const militaryPatterns: MilitaryPattern[] = [
  {
    slug: "cadpat",
    name: "CADPAT",
    origin: "Canada",
    primaryUsers: "Canada",
    environment: "All-terrain / digital",
    image: "/images/patterns/military/cadpat.png",
    overview:
      "A computer-designed digital camouflage direction known for pixel-based visual disruption.",
    features: [
      "Digital pixel structure",
      "Useful as a reference for technical pattern discussions",
      "Suitable when buyers need a sharper digital repeat direction"
    ],
    materialNote: "Good reference for digital camo loop fabric and uniform patch-zone material."
  },
  {
    slug: "cp-multicam",
    name: "CP Multicam",
    origin: "USA",
    primaryUsers: "NATO special forces and multiple countries",
    environment: "Multi-environment",
    image: "/images/patterns/military/cp-multicam.png",
    overview:
      "A multi-environment camouflage direction built from earth, khaki, green, desert, and light tones.",
    features: [
      "Balanced six-color direction",
      "Adapts visually across cities, mountains, snow, and jungle references",
      "Common reference for tactical gear material matching"
    ],
    materialNote: "Useful for OEM buyers matching tactical fabric, gear panels, and patch areas."
  },
  {
    slug: "marpat",
    name: "MARPAT",
    origin: "USA",
    primaryUsers: "U.S. Marine Corps and derivative users",
    environment: "Jungle / desert digital",
    image: "/images/patterns/military/marpat.png",
    overview:
      "A digital camouflage family with woodland and desert directions for different operating environments.",
    features: [
      "Woodland direction with green, khaki, yellow, and brown tones",
      "Desert direction with sandy, pale yellow, khaki, and light tones",
      "Pixelated repeat suitable for digital material references"
    ],
    materialNote: "Helpful when discussing digital woodland or desert loop fabric samples."
  },
  {
    slug: "flecktarn",
    name: "Flecktarn",
    origin: "Germany",
    primaryUsers: "Germany and several European or partner users",
    environment: "Forest / temperate",
    image: "/images/patterns/military/flecktarn.png",
    overview:
      "A dense spotted camouflage direction using green, khaki, brown, and dark brown tones.",
    features: [
      "Dense spotted pattern language",
      "Strong forest and temperate visual reference",
      "Distinct from pixel-based digital camouflage"
    ],
    materialNote: "Good reference for buyers wanting spotted camo loop fabric rather than block or pixel styles."
  },
  {
    slug: "ucp",
    name: "UCP",
    origin: "USA",
    primaryUsers: "U.S. military and derivative users",
    environment: "Universal / urban-grey digital",
    image: "/images/patterns/military/ucp.png",
    overview:
      "A universal digital direction built around subdued green, grey-white, and light yellow tones.",
    features: [
      "Muted digital appearance",
      "Works as a reference for urban or light technical camo",
      "Different tone family from woodland and desert options"
    ],
    materialNote: "Useful for light-grey digital pattern discussion on patches, bags, and uniform zones."
  },
  {
    slug: "m81-woodland",
    name: "M81 Woodland",
    origin: "USA",
    primaryUsers: "Global military and derivative users",
    environment: "Forest / woodland",
    image: "/images/patterns/military/m81-woodland.png",
    overview:
      "A widely copied woodland camouflage direction derived from earlier ERDL-style color blocking.",
    features: [
      "Large woodland color blocks",
      "Recognizable green, brown, khaki, and dark tone family",
      "Useful as a broad woodland material reference"
    ],
    materialNote: "Strong reference for classic woodland loop fabric roll supply discussions."
  },
  {
    slug: "f2-cce",
    name: "F2 CCE",
    origin: "France",
    primaryUsers: "French Army and derivative users",
    environment: "Woodland",
    image: "/images/patterns/military/f2-cce.png",
    overview:
      "A traditional color-blocked woodland direction with olive green, beige, khaki, and dark contrast.",
    features: [
      "Large pattern size",
      "Less dense distribution than spotted or digital patterns",
      "Clear color-block style for fabric matching"
    ],
    materialNote: "Useful for buyers asking for broader woodland color-block material."
  },
  {
    slug: "dpm",
    name: "DPM",
    origin: "United Kingdom",
    primaryUsers: "British Army and derivative users",
    environment: "Woodland / desert",
    image: "/images/patterns/military/dpm.png",
    overview:
      "A British disruptive pattern direction with woodland and desert variants for different terrains.",
    features: [
      "Disruptive brush-like shapes",
      "Desert direction can use simple natural yellow and khaki tones",
      "Useful reference for outdoor and tactical material projects"
    ],
    materialNote: "Good reference when a buyer wants a brush-stroke woodland or desert loop fabric style."
  },
  {
    slug: "m14-nigeria",
    name: "M14 Nigeria",
    origin: "Nigeria",
    primaryUsers: "Nigeria",
    environment: "Forest / desert",
    image: "/images/patterns/military/m14-nigeria.png",
    overview:
      "A shared pattern structure adapted into woodland and desert color schemes for local terrain needs.",
    features: [
      "Same pattern logic across variants",
      "Color adaptation for forest or desert environments",
      "Useful reference for regional terrain matching"
    ],
    materialNote: "Helpful when discussing one artwork structure with multiple colorways."
  },
  {
    slug: "dbdu",
    name: "DBDU",
    origin: "USA",
    primaryUsers: "Multiple desert-region users",
    environment: "Rocky desert",
    image: "/images/patterns/military/dbdu.png",
    overview:
      "A six-color desert direction associated with rocky desert terrain and Gulf War-era visual references.",
    features: [
      "Six-color desert tone family",
      "Rocky terrain reference",
      "Distinct spotted desert appearance"
    ],
    materialNote: "Useful for desert loop fabric projects that need a rocky terrain color story."
  }
];

export const militaryPatternNotice =
  "Patterns are shown as reference directions for material development. Protected or proprietary artwork requires buyer-provided artwork, authorization, or an approved custom redesign.";
