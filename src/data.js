// ============================================================
//  EDIT YOUR BIODATA HERE — no need to touch any design code.
//  Fields shown as "______" are placeholders still to fill.
// ============================================================

export const profile = {
  name: 'Nitish Kumar',
  dob: '1999-04-16', // YYYY-MM-DD — age is calculated automatically
  dobDisplay: '16 April 1999',
  designation: 'Assistant Manager (Engineer)',
  city: 'VPO- Saharsa, Dist. Saharsa',
  state: 'Bihar',
  height: '5\' 11"',
  experience: '5+ yrs experience',
  tagline:
    'An engineer by profession and a family man at heart. Rooted in values, driven by dreams, and looking for a life partner to share a beautiful journey.',
};

// Small highlights shown in the top (hero) section
export const heroHighlights = {
  education: 'B.Tech, VIT Jaipur',
  company: 'Desire Energy Solutions Pvt. Ltd.',
};

// Photos & song live in the /public folder
export const media = {
  mainPhoto: '/photo.jpg', // used for the WhatsApp link preview
  heroCutout: '/photo-hero.webp', // hero photo with background removed (transparent)
  gallery: ['/photo-full.jpg', '/photo2.jpg', '/photo3.jpg', '/photo4.jpg'],
  song: '/song.mp3',
};

export const about =
  'I am a hardworking, punctual and optimistic person who believes in honesty, dedication and strong family values. ' +
  'With 5+ years of engineering experience on government water supply and solar projects, I have learnt to stay ' +
  'self-confident under pressure while being a good listener, a keen learner and a cooperative team player. ' +
  'I am looking for a caring and understanding life partner with whom I can build a happy, respectful and loving home.';

// group: which panel the item appears in — 'basic' (left), 'heritage' (centre, under the Rashi wheel), 'lifestyle' (right)
export const personal = [
  { icon: 'user', label: 'Full Name', value: 'Nitish Kumar', group: 'basic' },
  { icon: 'calendar', label: 'Date of Birth', value: '16 April 1999', group: 'basic', showAge: true },
  { icon: 'map', label: 'Place of Birth', value: 'Saharsa, Bihar', group: 'basic' },
  { icon: 'ring', label: 'Marital Status', value: 'Unmarried', group: 'basic' },
  { icon: 'flag', label: 'Nationality', value: 'Indian', group: 'basic' },
  // hindi: must be one of the 12 rashi names below so the wheel can highlight it
  { icon: 'star', label: 'Rashi', value: 'Vrishchika', hindi: 'वृश्चिक', group: 'rashi' },
  { icon: 'crown', label: 'Caste', value: 'Tomar Rajput', group: 'heritage' },
  { icon: 'tree', label: 'Gotra', value: 'Dirth (दीर्थ)', group: 'heritage' },
  { icon: 'sun', label: 'Manglik', value: 'No', group: 'heritage' },
  { icon: 'om', label: 'Religion', value: 'Hindu', group: 'lifestyle' },
  { icon: 'height', label: 'Height', value: '5\' 11"', group: 'lifestyle' },
  { icon: 'leaf', label: 'Diet', value: 'Non-Vegetarian', group: 'lifestyle' },
  { icon: 'language', label: 'Languages', value: 'Hindi, English, Maithili, etc.', group: 'lifestyle', chips: true },
];

export const rashiNames = ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'];

// Shown as a rising staircase, in this order (first = lowest step).
// score: 0-100 fills the gold ring; scoreText/scoreUnit are printed inside it.
// lines: optional extra lines (used by the training card instead of a score).
export const education = [
  {
    icon: 'book', label: '10th (CBSE)', value: 'Secondary', note: '2014 • 9.2 CGPA',
    year: '2014', score: 92, scoreText: '9.2', scoreUnit: 'CGPA',
  },
  {
    icon: 'school', label: '12th (CBSE)', value: 'Senior Secondary', note: '2016 • 68.6%',
    year: '2016', score: 68.6, scoreText: '68.6', scoreUnit: '%',
  },
  {
    icon: 'grad', label: 'B.Tech (Mechanical Engineering)', value: 'VIT Jaipur, Rajasthan', note: '2021 • 72.6%',
    year: '2021', score: 72.6, scoreText: '72.6', scoreUnit: '%', highlight: 'Graduate',
  },
  {
    icon: 'tools', label: 'Industry Training', value: 'Production Engineer at Micromax, Bhiwadi (6 months)',
    note: '30-day vocational training at SKIT Jaipur',
    year: 'During B.Tech',
    lines: ['Production Engineer — Micromax, Bhiwadi · 6 months', 'Vocational Training — SKIT Jaipur · 30 days'],
  },
];

// Latest role first. current: true gets the animated "spotlight" card.
// projectIcon: 'water' | 'solar' | anything else = briefcase.
export const career = [
  {
    current: true,
    period: 'Oct 2021 – Present',
    role: 'Assistant Manager',
    company: 'Desire Energy Solutions Pvt. Ltd., Jaipur',
    projectValue: '₹443.6 Cr',
    projectName: 'Jal Jeevan Mission — Water Supply Project',
    projectDetail: '345 villages & 107 dhanis · Banswara and Pratapgarh districts, Rajasthan',
    projectIcon: 'water',
    duties: ['Project Planning & Coordination', 'Quality Control', 'Billing & Reports', 'Team & Contractor Management'],
    description:
      'Handling a ₹443.6 Crore Jal Jeevan Mission water supply project for 345 villages and 107 dhanis in Banswara and ' +
      'Pratapgarh districts, Rajasthan. Responsible for project planning and coordination, quality control, billing, ' +
      'reports, and team and contractor management.',
  },
  {
    period: 'Oct 2021 – Sep 2023',
    role: 'Senior Executive',
    company: 'Desire Energy Solutions Pvt. Ltd., Jaipur',
    projectValue: '₹60 Cr',
    projectName: 'Solar Project — Panghat Yojana',
    projectDetail: 'PHED Rajasthan',
    projectIcon: 'solar',
    duties: ['Layout', 'Execution', 'Billing', 'Material Management'],
    description:
      'Worked on a ₹60 Crore solar project (Panghat Yojana, PHED Rajasthan) handling layout, execution, billing and ' +
      'material management.',
  },
];

// Big animated numbers above the career cards.
// experienceSince: years are counted automatically from this date (YYYY-MM).
export const careerStats = [
  { value: 500, prefix: '₹', suffix: '+ Cr', label: 'Worth of projects handled' },
  { value: 452, label: 'Villages & dhanis covered' },
  { experienceSince: '2021-10', suffix: '+', label: 'Years of experience' },
  { value: 2, label: 'Major government projects' },
];

export const income = { icon: 'money', label: 'Annual Income', value: '8-10 LPA' };

// Family tree — grandparents on top, one branch per son's family.
// main: true marks my parents' branch (highlighted); me: true marks me.
// note is optional (shown under the name).
export const familyTree = {
  grandparents: [
    { name: 'Mr. Virendra Narayan Singh', role: 'Grandfather' },
    { name: 'Mrs. Meena Devi', role: 'Grandmother' },
  ],
  branches: [
    {
      title: 'Uncle & Aunty',
      parents: [
        { name: 'Mr. Ajay Kumar Singh', role: 'Uncle' },
        { name: 'Mrs. Kavita Singh', role: 'Aunty' },
      ],
      children: [
        { name: 'Amit', note: 'Business Analyst' },
        { name: 'Sumit Kumar', note: 'Computer Science Engineer' },
      ],
    },
    {
      title: 'My Parents',
      main: true,
      parents: [
        { name: 'Mr. Sanjay Kumar Singh', role: 'Father' },
        { name: 'Mrs. Sabita Singh', role: 'Mother' },
      ],
      children: [
        { name: 'Nitish Kumar', note: 'Assistant Manager (Engineer)', me: true },
        { name: 'Manish Kumar', note: 'Electrical Engineer', role: 'Brother' },
      ],
    },
    {
      title: 'Uncle & Aunty',
      parents: [
        { name: 'Mr. Ajit Kumar Singh', role: 'Uncle' },
        { name: 'Mrs. Babli Singh', role: 'Aunty' },
      ],
      children: [
        { name: 'Prince Singh', note: 'Electronics & Communication Engineer' },
        { name: 'Shivanshu Singh', note: 'Pursuing 10th Standard' },
      ],
    },
  ],
  nativePlace: 'Village – Bardaha, Dist. Madhepura, Bihar ',
};

export const partnerExpectations =
  'Looking for an educated, well-cultured and caring girl from a good family who believes in mutual respect, ' +
  'understanding and togetherness. Working or non-working both are welcome.';

export const contact = {
  person: 'Nitish Kumar', // change to e.g. 'Mr. Sanjay Kumar Singh (Father)'
  phone: '+91 77288 41590',
  whatsapp: '917728841590', // country code + number, no + or spaces
  whatsappMessage: "Namaste, we saw Nitish's biodata and would like to talk.",
};

export const footer = 'With the blessings of mentors and elders • Tomar Family, Saharsa';

// Website credit shown at the very bottom
export const credit = { text: 'Website crafted by', name: 'Sumit Kumar', url: 'https://sumitkumar-website.vercel.app/' };
