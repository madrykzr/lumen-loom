/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ProcessStep, PressItem } from './types';

export const projectsData: Project[] = [
  {
    slug: 'bangsar-townhouse',
    title: 'Bangsar Townhouse',
    year: '2024',
    type: 'Heritage Shophouse restoration & interior curation',
    location: 'Bangsar, Kuala Lumpur',
    size: '2,400 sqft',
    duration: '9 Months',
    leadDesigner: 'Iman Suria',
    overview: 'A meticulous restoration of a circa-1950s heritage shophouse in the heart of Bangsar. The project sought to respect the original architectural envelope—bare concrete columns, brick masonry, and generous lightwells—while introducing a series of serene, warm-minimalist spatial insertions.',
    approach: 'Our approach focused on radical subtraction. By clearing previous modern divisions, we welcomed natural light and air circulation back into the deep floorplan. Material surfaces remain raw yet quiet: bone-white lime wash on original brick, dark oiled-walnut built-ins, and a custom monolith travertine kitchen island.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600', // high resolution fallback
    details: [
      { label: 'Architectural Envelope', value: 'Double-frontage high ceilings with central open airwell' },
      { label: 'Core Textural Element', value: 'Monolithic raw travertine and hand-plastered lime wash' },
      { label: 'Flooring', value: 'Reclaimed teak planks salvaged from old regional bungalows' },
      { label: 'Lighting Layout', value: 'Concealed low-level museum gallery wash and localized task spots' }
    ],
    paragraphs: [
      'The Bangsar Townhouse was in a state of neglected state before our intervention. The space had been choked by partitions and drop-ceilings which blocked the vertical lightwell. Our first act was structural demolition to uncover the raw concrete framework and the beautiful, uneven red clay brick beneath.',
      'To build back with quiet grace, we worked with regional woodworkers and plastering artisans. Soft bone-white lime washes regulate moisture and diffuse incoming Malaysian sunlight. Structural interventions were rendered in dark oiled walnut, creating a direct visual contrast with the pale walls and floors.',
      'Every piece of furniture was either custom-designed by Loom & Loom or carefully sourced to reinforce the wabi-sabi philosophy. A singular raw travertine table commands the dining parlor, anchored by custom low-slung linen seating. Light, shadows, and wind move continuously through the house.'
    ],
    specs: {
      scope: 'Structural design, custom cabinetry, spatial planning, FF&E curation, and lighting design.',
      materials: 'Travertine stone, lime plaster, oiled walnut wood, brass castings, organic raw linens, and lime stucco.',
      curation: 'Custom sofas by Lumen & Loom, vintage Hans Wegner dining seats, and original ceramics by local Selangor potters.'
    }
  },
  {
    slug: 'mont-kiara-penthouse',
    title: 'Mont Kiara Penthouse',
    year: '2024',
    type: 'Modern Luxury Apartment',
    location: 'Mont Kiara, Kuala Lumpur',
    size: '4,200 sqft',
    duration: '6 Months',
    leadDesigner: 'Iman Suria',
    overview: 'A double-story luxury penthouse with panoramic sky views. The design uses quiet stone slabs, dark sand-blasted ash, and deep luxury texturing to create a private sky sanctuary.',
    approach: 'Creating shelter in the sky. Massive sliding oak panels partition the open plan into private sleeping, reading, and bathing cells, emphasizing acoustic dampening and tactile softness.',
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600',
    details: [
      { label: 'Wall Finishes', value: 'Clay stucco with integrated natural plant base fibers' },
      { label: 'Built-in Woodworks', value: 'Black sand-blasted sustainable solid ash wood panels' }
    ],
    paragraphs: [
      'The Mont Kiara project was envisioned as a quiet acoustic bubble situated directly above the fast rhythms of KL city.',
      'We combined heavy sliding partition walls, customized deep double-frontage sound-insulating glass layers, and hand-woven regional wool rugs.'
    ],
    specs: {
      scope: 'Complete architectural layout rewrite, styling, acoustics orchestration, furniture sourcing.',
      materials: 'Smoked oak, raw unhoned slate, soft felt wool panels, hand-carved solid travertine slabs.',
      curation: 'Cura sofas, custom low-slung dark oiled-ash step tables, and local organic linen blinds.'
    }
  },
  {
    slug: 'damansara-heights-bungalow',
    title: 'Damansara Heights Bungalow',
    year: '2023',
    type: 'Family Home Renovation',
    location: 'Damansara Heights, Kuala Lumpur',
    size: '5,800 sqft',
    duration: '14 Months',
    leadDesigner: 'Iman Suria',
    overview: 'A comprehensive multi-generational house redevelopment. Merging mid-century tropical architecture with minimalist Scandinavian elements.',
    approach: 'Bringing the garden indoors. We extended sliding glass boundaries and introduced a textured volcanic basalt stone wall that guides the transition from the lush courtyard to the indoor living chamber.',
    heroImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1600',
    details: [
      { label: 'Outdoor transition', value: 'Volcanic basalt masonry with raw unbleached joints' },
      { label: 'Tropical Ventilation', value: 'Perforated teak breeze-soles letting air streams pass freely' }
    ],
    paragraphs: [
      'This suburban villa was built originally in the late 1980s with heavy concrete facades that locked warmth inside.',
      'Our primary action was tearing back partition modules and laying deep native teak timber tracks to allow organic cooling.'
    ],
    specs: {
      scope: 'Structural renovation, elevation preservation, landscape transition, custom build-ins.',
      materials: 'Rough basalt granite stone, regional wild teak wood, raw microcement, copper details.',
      curation: 'Custom outdoor loungers, vintage Danish armchairs, regional clay planters.'
    }
  },
  {
    slug: 'singapore-east-coast-maisonette',
    title: 'Singapore East Coast Maisonette',
    year: '2023',
    type: 'Minimal Modern Duplex',
    location: 'East Coast, Singapore',
    size: '1,800 sqft',
    duration: '5 Months',
    leadDesigner: 'Iman Suria',
    overview: 'An urban seaside sanctuary with high-exposure glass facades. Every layout gesture maximizes cross-ventilation and references the surrounding marine colors through soft dunes and grays.',
    approach: 'Low-profile floor assemblies and seamless microcement flooring throughout to create a unified volume. Wall-recessed storage hides all elements of modern domestic distraction.',
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600',
    details: [
      { label: 'Microcement flooring', value: 'Durable custom dune coloration hand-applied in Singapore' },
      { label: 'Concealed cabinetry', value: 'Magnetic push-latch walnut doors flush with raw limestone paint' }
    ],
    paragraphs: [
      'A dense city duplex layout that layout felt narrow and restricted.',
      'We introduced highly aligned linear partitions, a single continuous color theme, and low-slung, floating credenzas.'
    ],
    specs: {
      scope: 'Cabinetry modeling, interior skin application, spatial layouts, light planning.',
      materials: 'Soft microcement, raw unpolished limestone panels, raw hemp screens, copper accents.',
      curation: 'Cura minimalist sofas, native grass blinds, custom-fired table lamps.'
    }
  },
  {
    slug: 'ttdi-family-home',
    title: 'TTDI Family Home',
    year: '2022',
    type: 'Warm Modern Residence',
    location: 'Taman Tun Dr Ismail, Kuala Lumpur',
    size: '3,200 sqft',
    duration: '8 Months',
    leadDesigner: 'Iman Suria',
    overview: 'A suburban terraced home redesigned for dual creative professionals and their growing children. Balanced between robust play surfaces and quiet contemplative nooks.',
    approach: 'Sieving family activity with central floating oak step structures. Using rich Malaysian teak wood finishes combined with child-safe vegetable-oiled surfaces and textured hemp wallcloth.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600',
    details: [
      { label: 'Central stairs', value: 'Floating sustainable solid white oak timber step threads' },
      { label: 'Wall coverings', value: 'Organic hand-loomed raw hemp wallcloth safe for active children' }
    ],
    paragraphs: [
      'Finding balance between the high kinetic energy of childhood and structural, physical peace.',
      'This terraced home features a wide acoustic partition layout separating the children’s creative zone from the parents’ reading study.'
    ],
    specs: {
      scope: 'Spatial layout planning, raw materials sourcing, complete furniture layering.',
      materials: 'Natural white oak, unbleached heavy density linens, local organic clay bricks, wool.',
      curation: 'Loom-spun rugs, modular child-safe linen block seating, raw oak block step indicators.'
    }
  },
  {
    slug: 'bukit-tunku-garden-house',
    title: 'Bukit Tunku Garden House',
    year: '2022',
    type: 'Tropical Modernism Villa',
    location: 'Bukit Tunku, Kuala Lumpur',
    size: '6,500 sqft',
    duration: '18 Months',
    leadDesigner: 'Iman Suria',
    overview: 'An immersive estate surrounded by dense tropical foliage. The architecture and interior blend seamlessly, utilizing timber sun-shading screens that filter warm light into rhythmic stripes.',
    approach: 'Employing deep earth tones, textured rough-cut granite, and massive solid-teak lintels. Sliding systems allow complete integration with the jungle canopy and surrounding water sounds.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
    beforeImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600',
    details: [
      { label: 'Facade Sun-screens', value: 'Sustainably-sourced Malaysian teak horizontal louvers' },
      { label: 'Living stone floor', value: 'Honed dark forest granite slabs running outdoors continuously' }
    ],
    paragraphs: [
      'Nestled inside the mature trees of Bukit Tunku, this property embraces absolute integration with the tropical context.',
      'Every sliding glass panel disappears entirely into pocket walls, eliminating any boundary between architectural shelter and the Malaysian secondary rainforest.'
    ],
    specs: {
      scope: 'Full-architectural concept, landscape curation, interior build-outs, and curated spatial objects.',
      materials: 'Textured unrefined granite, dark-oiled native timber, structural copper sheets, clear glass.',
      curation: 'Japanese minimalist custom cabinetry, low lounge wool daybed, antique temple stone vessels.'
    }
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Consult',
    duration: '1 - 2 Weeks',
    outcome: 'Architectural Appraisal & Spatial Intent',
    description: 'Every project begins with a careful listening session. We visit your site to understand its orientation, light characteristics, and original architectural details. We converse in detail about your lifestyle, sensory preferences, and how you wish to experience quiet spaces.',
    details: [
      'In-person site light study and orientation appraisal',
      'Discussion of functional requirements and room volumes',
      'Initial spatial budget and timeline feasibility setting',
      'Sourcing architectural archive blueprints if heritage structure'
    ]
  },
  {
    step: '02',
    title: 'Concept',
    duration: '4 - 6 Weeks',
    outcome: 'Mood, Material Palette & Spatial Flow',
    description: 'We construct your spatial story. Rather than standard digital 3D renders, we draft atmospheric spatial sketches and assemble a physical board of authentic, tactile raw material samples: stones, plasters, wood treatments, and woven linen fabrics for your feedback.',
    details: [
      'Asymmetric spatial flow layout planning alternatives',
      'Tactile material tray presentation (travertine, clay, lime plaster)',
      'Atmospheric color story mapping and lighting concept',
      'Custom bespoke furniture drafts and structural joinery layouts'
    ]
  },
  {
    step: '03',
    title: 'Construct',
    duration: '12 - 24 Weeks',
    outcome: 'Bespoke Craftsmanship & Site Integrity',
    description: 'Our designs are realized by seasoned regional woodworkers, stone artisans, and master plasterers. We oversee site execution with obsessive precision, ensuring that raw brick borders, recessed lighting junctions, and stone miters are perfectly hand-aligned.',
    details: [
      'Provision of absolute detail packs and construction blueprints',
      'Weekly architectural site supervision and detail inspections',
      'Coordination with custom blacksmiths and timber workshops',
      'Supervising high-accuracy electrical, acoustic and mechanical placements'
    ]
  },
  {
    step: '04',
    title: 'Curate',
    duration: '2 - 3 Weeks',
    outcome: 'Furniture Placement, Art & Soul',
    description: 'The final, quiet layer. We hand-select and place each tactile item—from slow-produced organic linens and hand-spun wool rugs to minimalist ceramics, custom-woven blinds, and regional artwork—bringing a cohesive quiet soul into the home.',
    details: [
      'Soft styling layering (curtain draping, acoustic cushions, bedding)',
      'Artwork placement, framing consultation, and accent ceramics Sourcing',
      'Bespoke solid-timber table positioning and localized tuning',
      'A meticulous post-construction styling handover'
    ]
  }
];

export const pressItems: PressItem[] = [
  {
    publication: 'Architectural Digest (AD100)',
    award: 'Studio to Watch – Southeast Asia Interior Curation',
    year: '2025'
  },
  {
    publication: 'Indesign Magazine',
    award: 'Best Residential Modern Restoration (Bangsar Townhouse)',
    year: '2024'
  },
  {
    publication: 'Habitus Living',
    award: 'Outstanding Mindful Spatial Design Laurels',
    year: '2023'
  },
  {
    publication: 'Malaysia Institute of Architects Awards',
    award: 'Heritage Adaptive Re-use Interior Medal',
    year: '2024'
  },
  {
    publication: 'Asia Pacific Property Awards',
    award: 'Highest Commendation: Single Residence Residential Interior',
    year: '2023'
  }
];

export const studioPhilosophy = {
  intro: 'Lumen & Loom is an architectural interior design studio based in Kuala Lumpur. We design homes that feel both quiet and lived-in.',
  paragraphs: [
    'Founded in 2020 by Iman Suria, our practice operates with the core belief that architecture is a backdrop for life, and materials have voices. We work between Kuala Lumpur and Singapore, seeking clients who value high-containment quietness, wabi-sabi textures, and architectural integrity over transient decorative trends.',
    'We reject standard, fast-paced interiors. A room succeeds not through excess decoration, but through deliberate subtraction, tactile material choices and the manipulation of tropical light. We study how light moves across a wall throughout the afternoon, selecting plaster textures and linen sheers that bloom in response.',
    'Our collaborations are built upon absolute trust. We compose spaces tailored to the exact daily habits of their inhabitants—where morning tea is sipped, how acoustic boundaries damp traffic noise, and where light rests in the quiet dusk.'
  ]
};
