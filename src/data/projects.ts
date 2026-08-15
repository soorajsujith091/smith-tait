import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "the-address-downtown",
    name: "The Address Downtown",
    location: "Dubai, UAE",
    category: "Hospitality",
    client: "Emaar Hospitality Group",
    scope: "Full interior & exterior lighting design",
    year: 2023,
    heroImage: "/images/projects/hotel-lobby-01.jpg",
    gallery: [
      "/images/projects/hotel-lobby-01.jpg",
      "/images/projects/hotel-exterior-01.jpg",
      "/images/projects/hotel-lobby-02.jpg",
    ],
    overview:
      "A comprehensive lighting design for one of Dubai's most prestigious hotel addresses, blending dramatic architectural illumination with intimate interior atmospheres that respond to the building's iconic silhouette against the Downtown skyline.",
    designConcept:
      "The lighting concept draws on the interplay between the vast desert horizon and the vertical ambition of the city. Warm washes of golden light define public areas, while carefully layered accent lighting brings texture and depth to private suites. The facade lighting programme transitions through carefully calibrated scenes from dusk to late evening, creating a living canvas visible across the emirate.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Architecture", name: "Atkins" },
      { role: "Interior Design", name: "HBA" },
      { role: "Client", name: "Emaar Hospitality Group" },
    ],
  },
  {
    slug: "al-maryah-island-residence",
    name: "Al Maryah Island Residence",
    location: "Abu Dhabi, UAE",
    category: "Residential",
    client: "Mubadala Real Estate",
    scope: "Penthouse & common area lighting design",
    year: 2024,
    heroImage: "/images/projects/residential-01.jpg",
    gallery: [
      "/images/projects/residential-01.jpg",
      "/images/projects/residential-02.jpg",
      "/images/projects/landscape-01.jpg",
    ],
    overview:
      "An ultra-luxury residential tower on Abu Dhabi's financial island, where lighting design creates distinct identities across penthouse collections, lobbies, and landscaped podium levels while maintaining a cohesive visual language of restrained elegance.",
    designConcept:
      "Inspired by the soft luminosity of mother-of-pearl — a material threaded through the interior palette — the lighting layers indirect cove illumination with precisely focused art lighting. Circadian rhythm programming in private residences adjusts colour temperature throughout the day, supporting wellness-oriented luxury living.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Architecture", name: "Foster + Partners" },
      { role: "Client", name: "Mubadala Real Estate" },
    ],
  },
  {
    slug: "lusail-boulevard-facade",
    name: "Lusail Boulevard",
    location: "Lusail, Qatar",
    category: "Facade",
    client: "Lusail Real Estate Development Company",
    scope: "Facade & streetscape lighting master plan",
    year: 2022,
    heroImage: "/images/projects/facade-01.jpg",
    gallery: [
      "/images/projects/facade-01.jpg",
      "/images/projects/facade-02.jpg",
      "/images/projects/public-realm-01.jpg",
    ],
    overview:
      "A 1.3 km mixed-use boulevard in Qatar's new city, requiring a unified facade lighting identity across 12 distinct building typologies while accommodating retail, hospitality, and residential programming at street level.",
    designConcept:
      "The masterplan establishes a gradient language — cooler, more restrained tones at the boulevard's civic northern gateway, warming progressively towards the entertainment-focused south. Each building receives a bespoke facade treatment within this framework, ensuring individuality without visual competition.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Masterplan", name: "HOK" },
      { role: "Client", name: "Lusail Real Estate Development Company" },
    ],
  },
  {
    slug: "jebel-akhdar-resort",
    name: "Jebel Akhdar Mountain Resort",
    location: "Oman",
    category: "Hospitality",
    client: "Tourism Development Oman",
    scope: "Resort & landscape lighting design",
    year: 2023,
    heroImage: "/images/projects/hotel-exterior-01.jpg",
    gallery: [
      "/images/projects/hotel-exterior-01.jpg",
      "/images/projects/landscape-01.jpg",
      "/images/projects/hotel-lobby-02.jpg",
    ],
    overview:
      "Perched 2,000 metres above sea level on Oman's Green Mountain, this resort demanded a lighting approach that honours the extraordinary natural darkness of the site while creating warm, welcoming arrival and gathering spaces carved into the cliff face.",
    designConcept:
      "Dark-sky compliant throughout, the scheme uses warm, low-mounted path lighting and reveals carved into stone walls. Public spaces glow from within, visible as soft lanterns across the mountainside. The signature canyon-pool experience uses submerged fibre optics that echo starlight reflected in still water.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Architecture", name: "Oppenheim Architecture" },
      { role: "Client", name: "Tourism Development Oman" },
    ],
  },
  {
    slug: "riyadh-central-park",
    name: "Riyadh Central Park",
    location: "Riyadh, Saudi Arabia",
    category: "Landscape",
    client: "Royal Commission for Riyadh City",
    scope: "Public park & trail lighting design",
    year: 2024,
    heroImage: "/images/projects/landscape-01.jpg",
    gallery: [
      "/images/projects/landscape-01.jpg",
      "/images/projects/public-realm-01.jpg",
      "/images/projects/landscape-02.jpg",
    ],
    overview:
      "A 45-hectare urban park at the heart of Saudi Arabia's capital, where lighting design transforms the landscape into a 24-hour destination with distinct nocturnal character zones — from active sports fields to meditative garden rooms.",
    designConcept:
      "The scheme follows a 'dark to light' philosophy, preserving pools of natural darkness for ecological corridors while concentrating illumination along primary circulation routes and activity nodes. Custom-designed luminaire columns integrate wayfinding, environmental monitoring, and decorative lighting in a single slender profile inspired by date palm fronds.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Landscape Architecture", name: "SWA Group" },
      { role: "Client", name: "Royal Commission for Riyadh City" },
    ],
  },
  {
    slug: "dubai-creek-tower-plaza",
    name: "Dubai Creek Tower Plaza",
    location: "Dubai, UAE",
    category: "Public Realm",
    client: "Emaar Properties",
    scope: "Public realm & plaza lighting design",
    year: 2023,
    heroImage: "/images/projects/public-realm-01.jpg",
    gallery: [
      "/images/projects/public-realm-01.jpg",
      "/images/projects/facade-01.jpg",
      "/images/projects/landscape-02.jpg",
    ],
    overview:
      "The arrival plaza and public realm surrounding one of the world's most ambitious tower projects, demanding a lighting scheme that creates a sense of occasion and ceremony while managing the vast scale of the ground plane.",
    designConcept:
      "Light is used to compress and expand the perceived scale of the plaza. Linear in-ground luminaires create 'rivers of light' that draw visitors from transit nodes towards the tower base. Vertical light masts define edges and create a ceiling plane at 12m height. The scheme is fully programmable for events, national celebrations, and seasonal festivals.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Architecture", name: "Santiago Calatrava" },
      { role: "Client", name: "Emaar Properties" },
    ],
  },
  {
    slug: "bahrain-bay-mixed-use",
    name: "Bahrain Bay",
    location: "Manama, Bahrain",
    category: "Mixed-Use",
    client: "Bahrain Bay Development",
    scope: "Mixed-use master plan lighting design",
    year: 2022,
    heroImage: "/images/projects/facade-02.jpg",
    gallery: [
      "/images/projects/facade-02.jpg",
      "/images/projects/hotel-lobby-01.jpg",
      "/images/projects/residential-02.jpg",
    ],
    overview:
      "A waterfront mixed-use development encompassing luxury residences, a five-star hotel, grade-A offices, and a retail promenade — requiring a lighting strategy that unifies disparate programmes under a single nocturnal identity.",
    designConcept:
      "The unifying concept is 'liquid light' — a material and chromatic palette inspired by the reflections of the Gulf. Facade treatments use programmable linear LED systems that create slow-moving, water-like patterns. The waterfront promenade uses recessed ground lighting and sculptural bollards that reference traditional Bahraini fishing lanterns.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Architecture", name: "Arcadis" },
      { role: "Client", name: "Bahrain Bay Development" },
    ],
  },
  {
    slug: "palm-jumeirah-villa",
    name: "Palm Jumeirah Private Villa",
    location: "Dubai, UAE",
    category: "Residential",
    client: "Private Client",
    scope: "Complete residential lighting & home automation",
    year: 2024,
    heroImage: "/images/projects/residential-02.jpg",
    gallery: [
      "/images/projects/residential-02.jpg",
      "/images/projects/residential-01.jpg",
      "/images/projects/landscape-02.jpg",
    ],
    overview:
      "An 1,800 sqm beachfront villa on Dubai's Palm Jumeirah, where lighting design integrates seamlessly with smart home automation to create a residence that transforms from sun-drenched Mediterranean daytime living to a cinematic nighttime experience.",
    designConcept:
      "The lighting follows an 'inside-out' logic: interior scenes are designed first, with landscape and pool lighting composed to extend interior sightlines into the garden and sea beyond. A proprietary control system offers 14 pre-programmed scenes that transition from 'morning', through 'entertaining' and 'cinema', to 'sleep' — adjustable by voice, app, or astronomical clock.",
    credits: [
      { role: "Lighting Design", name: "Smith Tait" },
      { role: "Architecture", name: "SAOTA" },
      { role: "Client", name: "Private Client" },
    ],
  },
];
