export const personalInfo = {
  name: 'Prakhar',
  title: 'Software Engineer',
  subtitle: 'Java · Spring Boot · Backend Systems',
  bio: `Software developer with 2+ years of experience in Java, Spring Boot, and backend systems.
I build scalable applications — from Kafka-based event pipelines to Elasticsearch-powered
search systems. Currently at Morgan Stanley, shipping solutions that handle 10M+ products.`,
  location: 'Mumbai, India',
  email: 'prakhar.px@gmail.com',
  github: 'https://github.com/prakhar-radhakrishnan',
  linkedin: 'https://www.linkedin.com/in/prakhar-px/',
  leetcode: 'https://leetcode.com/u/Prakhar_rk/',
  phone: '+91 9473566185',
  naukri: 'https://resume.naukri.com/prakharpx',
}

export const stats = [
  { value: '2+', label: 'YEARS_EXPERIENCE' },
  { value: '10+', label: 'PROJECTS_SHIPPED' },
  { value: '10M+', label: 'PRODUCTS_INDEXED' },
  { value: '90%', label: 'LATENCY_REDUCTION' },
]

export const skills = [
  {
    category: 'LANGUAGES',
    icon: '⬡',
    items: [
      { name: 'Java', level: 88 },
      { name: 'C++', level: 80 },
      { name: 'Python', level: 82 },
      { name: 'JavaScript', level: 75 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    category: 'FRAMEWORKS',
    icon: '⬡',
    items: [
      { name: 'Spring Boot', level: 88 },
      { name: 'React.js', level: 72 },
      { name: 'Flask', level: 78 },
      { name: 'REST APIs', level: 90 },
      { name: 'SQLAlchemy', level: 75 },
    ],
  },
  {
    category: 'MESSAGING & SEARCH',
    icon: '⬡',
    items: [
      { name: 'Apache Kafka', level: 85 },
      { name: 'Elasticsearch', level: 82 },
    ],
  },
  {
    category: 'DATABASES',
    icon: '⬡',
    items: [
      { name: 'MySQL', level: 82 },
      { name: 'MongoDB', level: 75 },
    ],
  },
  {
    category: 'TOOLS',
    icon: '⬡',
    items: [
      { name: 'Git/GitHub', level: 88 },
      { name: 'Linux', level: 80 },
      { name: 'Postman', level: 82 },
      { name: 'Docker', level: 72 },
    ],
  },
  {
    category: 'FUNDAMENTALS',
    icon: '⬡',
    items: [
      { name: 'OOP', level: 90 },
      { name: 'Microservices', level: 85 },
      { name: 'DSA', level: 82 },
      { name: 'Info Security', level: 78 },
    ],
  },
]

export const projects = [
  {
    id: '001',
    name: 'GRAPHITE',
    tagline: 'AI-powered learning platform with LeetCode integration',
    description:
      'AI-powered learning platform with analytics, progress tracking, LeetCode integration, and cloud sync. Provides personalized learning experiences and tracks coding progress across platforms in real time.',
    tech: ['React.js', 'Spring Boot', 'AI/ML', 'Cloud Sync', 'LeetCode API'],
    github: 'https://github.com/prakhar-px/graphite',
    live: 'https://graphite-px.vercel.app/',
    status: 'Active',
    metric: 'Live & Active',
  },
  {
    id: '002',
    name: 'LEGALBHARAT.IN',
    tagline: 'AI-powered legal e-marketplace with dynamic bidding',
    description:
      'AI-powered legal e-marketplace connecting clients with lawyers via dynamic bidding. Features intelligent matching algorithms, retention-focused UX, and real-time bid management to streamline legal service procurement.',
    tech: ['Python', 'Flask', 'AI/ML', 'JavaScript', 'MySQL'],
    github: 'https://github.com/prakhar-radhakrishnan/LegalBharat.in',
    live: '',
    status: 'Active',
    metric: 'Dynamic Bidding',
  },
  {
    id: '003',
    name: 'GREEN-SPACE',
    tagline: 'Carbon footprint tracker for financial institutions',
    description:
      'Platform to track financial institutions\' carbon footprint and promote green investments via AI insights. Won Consolation Prize at FinXthon-Q2 hosted by Q2 Company.',
    tech: ['Python', 'AI/ML', 'JavaScript', 'Data Viz', 'REST APIs'],
    github: 'https://github.com/prakhar-radhakrishnan/GreenSpace',
    live: '',
    status: 'Archived',
    metric: 'FinXthon Winner',
  },
  {
    id: '004',
    name: 'KAVACH',
    tagline: 'Geofencing-based real-time police monitoring system',
    description:
      'Geofencing-based police monitoring system with real-time officer tracking and boundary breach alerts using Leaflet.js. Provides command centers with live location data and instant notifications on zone violations.',
    tech: ['Leaflet.js', 'JavaScript', 'WebSockets', 'MySQL', 'PHP'],
    github: 'https://github.com/prakhar-radhakrishnan/Team-i-kSHANA-',
    live: '',
    status: 'Archived',
    metric: 'Real-time Alerts',
  },
  {
    id: '005',
    name: 'BATHAN.IN',
    tagline: 'Full-stack Indian clothing e-commerce platform',
    description:
      'PHP-based Indian clothing e-commerce site with real-time cart, wishlist, and search functionalities. Includes user authentication, product catalog, and a responsive storefront built from scratch.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/prakhar-radhakrishnan/Bathan-CSW',
    live: '',
    status: 'Active',
    metric: 'Full Commerce',
  },
  {
    id: '006',
    name: 'ML RECOMMENDER',
    tagline: 'Cosine similarity recommendation engine (Microsoft Engage)',
    description:
      'Full-stack ML-based recommendation engine built during Microsoft Engage internship. Leverages cosine similarity for optimal recommendations, with Kaggle API integration for training data sourcing.',
    tech: ['Python', 'JavaScript', 'Kaggle API', 'ML', 'Flask'],
    github: 'https://github.com/prakhar-radhakrishnan/Microsoft-Engage-Project',
    live: '',
    status: 'Archived',
    metric: 'MS Mentored',
  },
]

export const experience = [
  {
    id: '01',
    role: 'Software Engineer Consultant',
    company: 'Morgan Stanley',
    period: '2025 — Present',
    type: 'FULL-TIME',
    description:
      'Developing Java and Spring Boot applications in financial services. Building Kafka-based event-driven systems and Elasticsearch-powered search for trading infrastructure at scale.',
    highlights: [
      'Reduced data update latency by 90% with Kafka event-driven architecture',
      'Built Elasticsearch search capabilities for 10M+ products',
      'Contributed to core trading systems',
      '1st Prize at Morgan Stanley AI-Thon with LinkLens',
    ],
  },
  {
    id: '02',
    role: 'Software Engineer',
    company: 'Bounteous x Accolite',
    period: '2025 — Present',
    type: 'FULL-TIME',
    description:
      'Software engineering role at Bounteous x Accolite, contributing to client engagements and internal tooling.',
    highlights: [
      'Software engineering across client delivery',
    ],
  },
  {
    id: '03',
    role: 'Consultant',
    company: 'Crowe Horwath LLP',
    period: '2024 — 2025',
    type: 'FULL-TIME',
    description:
      'Contributed to internal business applications using Python, Flask, SQLAlchemy, and Angular. Also reviewed vendor security posture through SOC2, ISO 27001, and HITRUST compliance frameworks.',
    highlights: [
      'Built internal apps with Python, Flask, SQLAlchemy, Angular',
      'Reviewed SOC2, ISO 27001, HITRUST vendor reports',
      'Evaluated SIEM, DLP, and IDS/IPS security tooling',
      'Supported cross-functional compliance advisory',
    ],
  },
  {
    id: '04',
    role: 'Web Developer Intern',
    company: 'Global Services LLP',
    period: '2023',
    type: 'INTERNSHIP',
    description:
      'Developed a full-stack e-commerce platform from scratch with search, cart, wishlist, and user authentication using PHP, MySQL, JavaScript, HTML, and CSS.',
    highlights: [
      'Built full-stack e-commerce platform using PHP and MySQL',
      'Implemented search, cart, wishlist, and user auth',
      'Responsive frontend with JavaScript, HTML5, CSS3',
    ],
  },
  {
    id: '05',
    role: 'Microsoft Engage Intern',
    company: 'Microsoft',
    period: '2022',
    type: 'INTERNSHIP',
    description:
      'Built a full-stack ML-based recommendation engine under Microsoft mentorship, leveraging cosine similarity for optimal recommendations with Kaggle API for data sourcing.',
    highlights: [
      'ML recommendation engine with cosine similarity',
      'Kaggle API integration for training data',
      'Full-stack implementation with Python and JavaScript',
    ],
  },
]

export const education = [
  {
    id: '01',
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'GL Bajaj Institute of Technology and Management',
    location: 'Greater Noida',
    period: '2020 — 2024',
    score: 'CGPA: 8.4',
  },
  {
    id: '02',
    degree: 'S.S.C. — CBSE',
    institution: 'Little Flower House',
    location: 'Varanasi',
    period: '2019 — 2020',
    score: '80.20%',
  },
  {
    id: '03',
    degree: 'H.S.C. — CBSE',
    institution: 'Fatima School',
    location: 'Gonda',
    period: '2017 — 2018',
    score: '93.30%',
  },
]

export const awards = [
  {
    id: '01',
    rank: '1st Prize',
    name: 'AI-Thon — LinkLens',
    org: 'Morgan Stanley',
    date: 'Aug 2025',
  },
  {
    id: '02',
    rank: 'Consolation Prize',
    name: 'Green-Space — FinXthon-Q2',
    org: 'Q2 Company',
    date: 'Nov 2023',
  },
  {
    id: '03',
    rank: '2nd Prize',
    name: 'Innovative Idea Competition — VFID Systems',
    org: 'GLBITM',
    date: 'May 2022',
  },
  {
    id: '04',
    rank: 'Gold Medal',
    name: 'Ideathon — Virtual Fencing',
    org: 'GLBITM',
    date: 'Sep 2021',
  },
]

export const navItems = [
  { id: 'hero',       label: 'INIT',     index: '000' },
  { id: 'about',      label: 'ABOUT',    index: '001' },
  { id: 'skills',     label: 'SKILLS',   index: '002' },
  { id: 'projects',   label: 'PROJECTS', index: '003' },
  { id: 'experience', label: 'EXP',      index: '004' },
  { id: 'education',  label: 'TRAINING', index: '005' },
  { id: 'awards',     label: 'HONOURS',  index: '006' },
  { id: 'contact',    label: 'CONTACT',  index: '007' },
]
