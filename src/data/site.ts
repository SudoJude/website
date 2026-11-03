// Content for the whole site. Images are still hotlinked from the old
// Squarespace CDN; download them into public/images and swap the URLs
// before cancelling Squarespace.
const cdn = 'https://images.squarespace-cdn.com/content/v1/6977e92fc2a43f6e90f0c94f';

export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;

export const site = {
  name: 'Jude Myers',
  brand: 'Jude Myers Design',
  title: 'Jude Myers | Product Design & Technology',
  description:
    'Product designer and BSc Product Design & Technology student at the University of Limerick.',
};

export const nav = [
  { label: 'Portfolio', path: 'portfolio' },
  { label: 'Blog', path: 'blog' },
  { label: 'Photography', path: 'photography' },
  { label: 'Art', path: 'art' },
  { label: 'GitHub', href: 'https://github.com/SudoJude' },
  { label: 'About Me', path: 'aboutme' },
];

export const socials = [
  { label: 'LinkedIn', href: 'http://www.linkedin.com/in/judemyers' },
  { label: 'GitHub', href: 'https://github.com/SudoJude' },
  { label: 'Instagram', href: 'https://www.instagram.com/judemyersdesign' },
  { label: 'YouTube', href: 'https://www.youtube.com/@judejmyers' },
];

export const hero = {
  heading: 'Hello!, I’m Jude.',
  text: 'I\'m a Product Designer, currently completing my BSc in Product Design & Technology at the University of Limerick with a strong interest in innovative design, engineering, and emerging technologies. Enthusiastic, adaptable, and driven, I’m eager to contribute to projects that combine technical precision with thoughtful design.',
};

export interface Project {
  slug: string;
  title: string;
  featured?: string;
  image?: string;
  alt?: string;
}

export const projects: Project[] = [
  { slug: 'sonyhousestyle', title: 'Sony Design Language: Camera Shutter', featured: 'Sony Design Language: Camera Shutter', image: `${cdn}/dd9bb51a-2119-4ce5-86b3-2037bd5be971/sonycover.png` },
  { slug: 'outgrown', title: 'OutGrown: Kids\' Clothing Circular Economy Platform', featured: 'OutGrown', image: `${cdn}/4554a905-64a6-4dc3-bfa9-ae2ee6d11854/outgrowncover.png`, alt: 'OutGrown: A Circular Economy Platform for Kids Clothing' },
  { slug: 'gaft', title: 'Accommodation Website UI/UX Project', featured: 'Accommodation Website UI/UX Project', image: `${cdn}/ae9c4e83-e64f-40a3-b2a4-8541405e8e77/Screenshot+From+2026-05-17+16-32-11.png`, alt: 'Student accommodation website design for gaft.ie' },
  { slug: 'stirlingengine', title: 'Stirling Engine' },
  { slug: 'logispace', title: 'Logitech: The Future of Video', featured: 'LogiSpace Table', image: `${cdn}/49c4dd7e-785a-47eb-a119-dea8dd23a04e/Untitled+design+%281%29.png`, alt: 'Two men observe a large black-and-white model of a cityscape on a table' },
  { slug: 'expandingbag', title: 'Expanding Bag: Soft Goods Project', featured: 'Soft Goods: Expanding Bag', image: `${cdn}/23205930-796e-48e0-98b6-f5b4fbe3a212/Gemini_Generated_Image_c6gib5c6gib5c6gi.png`, alt: 'Person carrying a blue backpack with yellow trim' },
  { slug: 'mercedesheadphones', title: 'Brand Aesthetic Analysis Project', featured: 'Brand Aesthetic Analysis Project', image: `${cdn}/26a34bdf-6efe-4e8e-ba43-6caecf1cb428/1766074040403.jpeg`, alt: 'Black over-ear headphones with silver accents' },
  { slug: 'airpurifier', title: 'Air Purifier Form Development Project', featured: 'Air Purifier', image: `${cdn}/1769976129225-5PTRTCJ7DJLKEKZZ4X6N/IMG_4081.png`, alt: 'Cardboard architectural model on a three-legged stand' },
  { slug: 'tudorblackbay', title: 'Tudor Black Bay Photography Project' },
  { slug: 'sonydsch300', title: 'Design Visualisation: Sony DSC-H300' },
];

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export const posts: Post[] = [
  {
    slug: 'nintendo',
    title: 'Nintendo: Legally Right, Morally Wrong',
    date: '2026-08-29',
    excerpt: 'I genuinely love Nintendo\'s games, and that\'s what makes writing this so annoying. There isn\'t another company I can think of that\'s simultaneously the most pro-consumer and the most anti-consumer name in gaming (often within the same sentence), and last week gave us a pretty clean example of both halves of that at once.',
    image: `${cdn}/669cacdf-8dad-4f65-a9ca-e0ea0c29639b/nintendolawsuit.png`,
  },
  {
    slug: 'nothing',
    title: 'Nothing: Hope For The Future Of Tech',
    date: '2026-07-26',
    excerpt: 'My old phone died, a Pixel 8 Pro, and I\'d been watching Nothing for a while before that happened. So when it finally gave up I didn\'t really think twice. I went and got a Nothing Phone 3a Lite and a pair of Ear (a) buds. On a spec sheet that\'s a downgrade from what I had. I don\'t care. It\'s the best phone I\'ve owned.',
    image: `${cdn}/325d401c-917b-442c-b6b0-4b7878de9c45/nothing-tech-9.jpg`,
  },
  {
    slug: 'eiffeltower',
    title: 'The Eiffel Tower: Beautiful Things Last',
    date: '2026-06-11',
    excerpt: 'I\'ve been to Paris a few times now and every time I go back I make a point of seeing the Eiffel Tower. Something about it keeps pulling me in. I was lucky enough to go see it again about a week ago, and the thing that amazed me the most this time were the rivets weirdly enough.',
    image: `${cdn}/14fa13da-bc07-48a0-99a4-9d9806009e87/IMG_20260603_130651173%7E2.jpg`,
  },
];

export const photoCategories = [
  'Objects & Details',
  'Automotive',
  'Urban & Architecture',
  'Street & People',
  'Landscape, Nature, & Travel',
];

export const photos = [
  ['5e00c59d-e071-4995-aed5-376e85846bc0/DSC00926.jpeg', 'Man in a blue bucket hat and Hawaiian shirt against a plain background'],
  ['e92358dc-2808-44c2-895b-8e058fef4558/DSC04598.JPG', 'Spirit of Gaiety in the V&A Museum, London'],
  ['e4bf937c-877a-4aab-a9c7-36022d6c4e97/DSC04695.JPG', 'Clock tower with a spire and golden weather vane'],
  ['68b00934-f670-4116-976c-30b7eb822308/IMG_0139.jpg', 'Black and white street in New York with American flags'],
  ['81bcf799-79df-449e-8a9c-913ddbce35cc/DSC04891.JPG', 'Yellow and black rally car on a dirt road'],
  ['eca80d2d-37ad-4d79-8e42-12dee95cb3cf/DSCF4086.JPG', 'Small white building with a blue door and a boat on a stand'],
  ['81f328c0-c7ed-4bc5-a213-27f1b86408fc/DSC04766.JPG', 'Brick tower with arched windows and dragon sculptures'],
  ['00fa88b9-3815-47d2-8722-5cfaf42f5abc/IMG_3947.jpg', 'Coastal cliffs with a grassy foreground'],
  ['09922294-8bd2-4e13-b7d5-77d597c32aed/DSC01323.jpg', 'Green mountain with a trail to the peak'],
  ['1e3cdd2f-ed66-40da-9328-660ea0574221/DSC04747.JPG', 'Pagoda in Kew Gardens, London'],
  ['6f1de66d-8962-4f80-ba5c-a3f9b83530f7/DSC04723.JPG', 'Porsche 930 in Kew, London'],
  ['14fa13da-bc07-48a0-99a4-9d9806009e87/IMG_20260603_130651173%7E2.jpg', 'The Eiffel Tower viewed from a park'],
  ['96528ba9-afc2-4d30-aa44-9c876c43b13c/DSCF4226.JPG', 'Sailboat anchored in calm water'],
  ['12f363bf-f4cc-420f-9a5e-336cd25fb17e/DSC04534.JPG', 'Black and white domed tower on a historic building'],
  ['5ef254a4-45f2-4149-a629-4e57a21eb171/DSC01075%7E2.jpeg', 'Black and white old church with a round tower'],
].map(([path, alt]) => ({ src: `${cdn}/${path}`, alt }));

export const about = {
  headline: 'Product Design Student & Technical Problem-Solver',
  intro: 'I am a Product Design & Technology student at the University of Limerick with a background in high-precision engineering environments. I specialise in CAD, prototyping, and creative problem-solving, with a focus on where technical precision meets thoughtful design.',
  cv: 'View Curriculum Vitae',
  skills: [
    { title: 'Design & Engineering', items: ['Product Design', 'Prototyping', 'Creative Problem Solving', 'Soft Goods', 'User Interface Design'] },
    { title: 'Tools & Technical', items: ['Autodesk AutoCAD (2D Schematics)', 'Autodesk Fusion 360 (3D Modelling)', 'Autodesk Inventor (3D Modelling)', 'FreeCAD (3D Modelling)', 'SolidWorks (3D Modelling)', 'Blender (3D Modelling & Animation)', 'Figma', 'Adobe InDesign', 'Adobe Photoshop', 'Adobe Lightroom', 'Adobe Premiere Pro (Video Editing)', 'Adobe Illustrator (Vector Graphics)', 'GIMP', 'Inkscape (Vector Graphics)', 'Affinity', 'DaVinci Resolve (Video Editing)'] },
    { title: 'Languages', items: ['🇬🇧 English (Native)', '🇫🇷 Français (Working Proficiency)', '🇮🇪 Gaeilge (Working Proficiency)', '🇩🇪 Deutsch (Elementary Proficiency)', '🇯🇵 日本語 (Elementary Proficiency)'] },
  ],
  experience: [
    {
      role: 'Computer-Aided Design Technician', org: 'Leo Lynch Engineering', dates: 'June 2022 - September 2023',
      summary: 'Responsible for supporting the engineering team by producing and modifying technical drawings for mechanical and piping systems. Leveraged software tools to ensure high-precision layouts within a complex industrial environment, facilitating the seamless installation and management of services.',
      points: ['Utilised AutoCAD to create and update 2D schematic diagrams and site layouts for mechanical services.', 'Employed Fusion 360 for 3D modelling of components and containment, assisting in the visualisation of complex engineering solutions.', 'Worked full-time in the summers of 2022 & 2023 at the Analog Devices site in Raheen, County Limerick.'],
    },
    {
      role: 'General Operative', org: 'Kirby Group Engineering', dates: 'May 2024 - Present',
      points: ['Assisted qualified electricians with the installation of industrial containment systems, including cutting and mounting galvanized cable trays.', 'Supported large-scale cable pulls and wire management across a high-tech manufacturing site.', 'Maintained strict adherence to Health & Safety protocols in a live construction environment.', 'Worked full-time in the summers of 2024, 2025, & 2026 at the Analog Devices site in Raheen, County Limerick.'],
    },
    {
      role: 'Student Designer', org: 'University of Limerick', dates: 'September 2024 - Present',
      summary: 'Focusing on product design and the user experience of physical objects. Developing skills in translating complex briefs into functional prototypes through 3D modelling, sketching, and physical builds.',
      points: ['Design Development: Executing projects from conceptual sketching to final 3D prototypes.', 'Technical Integration: Applying advanced 3D modelling and rendering techniques to visualise complex components.', 'Visual Communication: Using professional photography to capture and present design iterations for academic and industry review.'],
    },
  ],
  education: [
    { title: 'BSc, Product Design & Technology', org: 'University of Limerick', dates: 'September 2024 - May 2028', text: 'I am bridging the gap between creative design and real-world manufacturing. My studio work involves taking concepts from initial sketches into highly detailed parametric 3D CAD models, and then building physical prototypes to test their mechanics, ergonomics, and structural function.' },
  ],
  certifications: [
    { title: 'Professional Certificate, UX Design', org: 'Google', text: 'I am mastering industry-standard design tools and methodologies to bridge the gap between abstract design theory and technical, user-centered implementation.' },
    { title: 'Professional Certificate, Full Stack Software Development', org: 'IBM', text: 'I am building a foundational understanding of modern software architecture to ensure I can manage the technical side of complex product ecosystems as effectively as the physical hardware.' },
  ],
  awards: [
    { title: 'Gaisce | The President\'s Award', dates: 'May 2022', text: 'Recognised for long-term commitment to community involvement, personal skill development, and physical recreation, highlighting a disciplined approach to leadership and self-improvement.' },
  ],
};
