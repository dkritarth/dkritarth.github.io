import type { ReactNode } from 'react';
import { BookMarked, Code, GraduationCap, Microscope, Users } from 'lucide-react';
import type {
  BlogPost,
  CompetitionEntry,
  Education,
  Experience,
  Project,
  Publication,
  ResearchPlacement,
  SitePage,
  SkillCategory,
} from './types';

export const CONTACT_INFO = {
  name: 'Kritarth Dandapat',
  title: 'Research Assistant · University at Buffalo',
  email: 'contact@dkritarth.com',
  phone: '+1 (716) 612-0016',
  location: 'Buffalo, NY',
  github: 'https://github.com/Kritarth-Dandapat',
  linkedin: 'https://www.linkedin.com/in/kritarth-dandapat/',
  website: 'https://dkritarth.com',
  bio: 'Research Assistant at the University at Buffalo (ESC and Peng labs), completing a BS in Computer Science. Starting a PhD in Computer Science at Michigan State University (Fall 2026), focusing on Artificial Intelligence. Work spans computer vision, healthcare AI (OralScan), and symmetry-aware GNNs for materials. Accelerated program with 3.8+ GPA; PEARL Award; Teaching Assistant for Computer Architecture.',
  /** Short intro for the home page only; full narrative lives on About. */
  landingLead:
    "I'm 19, finishing my BS in Computer Science at the University at Buffalo while working as a research assistant in two labs. With Prof. Wenyao Xu at the Embedded Sensing and Computing (ESC) Group, I build mobile health tools—computer vision for OralScan and OrthoScan, and engineering for mRehab (telerehabilitation). With Prof. Jiayu Peng, I work on computational materials: symmetry-aware graph neural networks and machine learning interatomic potentials, including alchemical extensions tied to universal atom models (UMA). In Fall 2026 I join Michigan State University as a PhD student in Computer Science, advised by Dr. Pang-Ning Tan.",
  sopSnippet:
    'My academic journey has been driven by a fascination with the power of artificial intelligence (AI) to solve tangible, human-centric problems. I am driven to move beyond applying known techniques to creating original, high-impact research.',
  /** Open GitHub org — surfaced on home & About */
  inferenceFoundry: {
    url: 'https://github.com/Inference-Foundry',
    startLabel: 'Starting May 2026',
    description:
      'Open GitHub organization I founded for collaborative machine learning inference tooling, research software, and reproducible workflows—public repos and shared infrastructure for contributors.',
  },
};

export const EDUCATION: Education[] = [
  {
    degree: 'PhD in Computer Science',
    institution: 'Michigan State University',
    location: 'East Lansing, MI',
    period: 'Starting Fall 2026',
    details: [
      'Focus: Artificial Intelligence and Machine Learning',
      'Advisor: Dr. Pang-Ning Tan',
    ],
  },
  {
    degree: 'Bachelor of Science in Computer Science (Minor in Statistics)',
    institution: 'University at Buffalo, SUNY',
    location: 'Buffalo, NY',
    period: 'August 2023 – June 2026',
    details: [
      'Specialization in Artificial Intelligence',
      'Relevant coursework: Reinforcement Learning, Computer Vision, Machine Learning, Quantum Computing, and Distributed Systems',
      "GPA: 3.8+ (Dean's List: all semesters)",
      'Presidential Scholarship: $15,000 per annum',
      'PEARL Award: $2,500 research grant (ELN)',
      'Accelerated 3-year program (21–22 credit semesters)',
    ],
  },
];

export const RESEARCH_PLACEMENTS: ResearchPlacement[] = [
  {
    role: 'Research Assistant',
    organization: 'Embedded Sensing and Computing (ESC) Group, University at Buffalo',
    location: 'Buffalo, NY',
    overview:
      'Mobile sensing for healthcare and rehabilitation with Prof. Wenyao Xu: sequential work on geriatric oral screening (OralScan), orthodontic remote monitoring (OrthoScan), and telerehabilitation (mRehab).',
    subprojects: [
      {
        id: 'oralscan',
        name: 'OralScan',
        period: 'June 2024 – February 2025',
        context: 'PI: Prof. Wenyao Xu',
        narrative: [
          'By mid-century, older adults are projected to bear an unprecedented share of preventable oral disease—including gum disease, decay, and infections that are far easier to manage when caught early.',
          'Cost, gaps in insurance for routine care, and transportation barriers keep many older adults from seeing a dentist regularly. At ESC Lab we focused on how lightweight, home-based tools could narrow that gap.',
          'OralScan is an AI-assisted smartphone app for guided intraoral imaging and rapid feedback—designed to complement (not replace) in-office care by helping families notice when a visit is warranted. Community-facing work stressed accessibility, clarity, trust, and practical usefulness.',
          'The project earned second place ($1,000) in UB’s Health Futures Challenge (Spring 2025), run through Entrepreneurship and Student Life.',
        ],
        technicalHighlights: [
          'Full-stack software (React Native and React web) for capture workflows and clinician-facing views.',
          'YOLOv8-based vision pipelines for dental disease screening and tooth numbering on intraoral images.',
          'Co-authored formative usability and acceptability study for OralScan, submitted to Smart Health (under review).',
          'Second place ($1,000), Health Futures Challenge (Spring 2025), University at Buffalo Entrepreneurship / Student Life.',
        ],
        links: [
          { label: 'oralscan.health', href: 'https://oralscan.health/' },
          {
            label: 'Health Futures — UB announcement',
            href: 'https://www.buffalo.edu/entrepreneurship/connect/news.host.html/content/shared/www/studentlife/gateway-wide-content/announcements/current/health-futures-25.detail.html',
          },
          {
            label: 'Health Futures Challenge (StartupTree)',
            href: 'https://ubuffalo.startuptree.co/event/s/4rCVkj4dBLVMbA6SWkwitZ/Health-Futures-Challenge---SP2025?utm_source=sfmc&utm_medium=email&utm_campaign=&utm_content=',
          },
        ],
        technologies: ['YOLOv8', 'React Native', 'React', 'Computer vision', 'Mobile health'],
      },
      {
        id: 'orthoscan',
        name: 'OrthoScan',
        period: 'February 2025 – October 2025',
        context: 'PI: Prof. Wenyao Xu',
        narrative: [
          'Orthodontic treatment often requires ten to twenty in-office checkups; many visits could be avoided with trustworthy at-home monitoring that preserves clinical-level consistency.',
          'OrthoScan is a mobile system for tracking orthodontic progress from home: intelligent imaging and custom measurement algorithms translate subtle visual changes into millimeter-scale, actionable feedback.',
          'The goal is to make monitoring accessible and patient-centered—reducing unnecessary trips while keeping attention on cases that truly need an in-person adjustment.',
        ],
        technicalHighlights: [
          'Backend services and mobile engineering for capture, sync, and measurement workflows.',
          'YOLO-based detection for brackets and hardware; depth-assisted scoring where sensors are available.',
          'Object-detection and geometry pipelines to turn images into quantitative progress signals.',
        ],
        collaboratorsNote:
          'Collaborators included Dr. Wei Bo, Prof. Wenyao Xu, Alexander Gherardi, and Puru Soni (see https://purusoni.com).',
        technologies: ['YOLO', 'React Native', 'Depth sensing', 'Backend APIs', 'Computer vision'],
      },
      {
        id: 'mrehab',
        name: 'mRehab',
        period: 'November 2025 – Present',
        context: 'ESC Lab · telerehabilitation',
        narrative: [
          'mRehab supports remote rehabilitation through structured exercise programs, sensor-informed feedback, and therapist-facing analytics—bringing consistency to home-based therapy.',
        ],
        technicalHighlights: [
          'Engineering for session logging, sensor ingest, and signal analysis tied to exercise performance.',
          'Algorithm design and refinement for exercise scoring and progression; backend architecture for reliable telemetry.',
        ],
        links: [{ label: 'mrehab.agency', href: 'https://mrehab.agency/' }],
        technologies: ['Signal processing', 'Backend', 'Mobile', 'Algorithms'],
      },
    ],
  },
  {
    role: 'Undergraduate Researcher',
    organization: 'Peng Research Lab, University at Buffalo',
    location: 'Buffalo, NY',
    overview:
      'With Prof. Jiayu Peng: symmetry-aware GNNs for crystal ordering (June–November 2025), then a focused stream on equivariant MLIPs—alchemical extensions in the spirit of published MACE formalism—and integrating those ideas with universal atom models (UMA), from December 2025 onward.',
    placementLinks: [
      {
        label: 'UB ELN — AI design of disordered materials for clean energy (project profile)',
        href: 'https://www.buffalo.edu/eln/students/project-portal/host-page.host.html/content/shared/www/eln/project-portal/project-profiles/active-projects/ai-design-of-disordered-materials-for-clean-energy-and-sustainable-applications.detail.html',
      },
    ],
    subprojects: [
      {
        id: 'perovskite-gnn',
        name: 'Perovskite ordering & symmetry-aware GNNs',
        period: 'June 2025 – November 2025',
        context: 'Prof. Jiayu Peng · repository open-sourced with ordering paper',
        narrative: [
          'This line of work models compositional and occupational ordering in crystalline materials (including perovskites) using symmetry-aware graph neural networks, with reproducible training on atomistic datasets.',
          'I contributed to benchmarking, experiment tracking, and model revisions alongside graduate students on high-throughput simulation and data pipelines.',
        ],
        technicalHighlights: [
          'Contributions to https://github.com/jiayu-peng-lab/PerovskiteOrderingGCNNs and revisions around arXiv:2409.13851.',
          'Migrated hyperparameter and experiment tracking from SigOpt to Weights & Biases for publication revisions.',
          'Trained and compared architectures including ALIGNN for resubmission experiments.',
          'Co-authored commentary on agentic AI for catalyst discovery (ChemRxiv: https://doi.org/10.26434/chemrxiv-2025-13n3f).',
        ],
        links: [
          {
            label: 'GitHub: PerovskiteOrderingGCNNs',
            href: 'https://github.com/jiayu-peng-lab/PerovskiteOrderingGCNNs',
          },
          { label: 'arXiv:2409.13851', href: 'https://arxiv.org/abs/2409.13851' },
          {
            label: 'Credly (lab micro-credential)',
            href: 'https://www.credly.com/badges/5e583598-70ca-43f8-9f3f-ee642a96312f/linked_in_profile',
          },
        ],
        technologies: ['PyTorch', 'GNNs', 'ALIGNN', 'Weights & Biases', 'Materials ML'],
      },
      {
        id: 'mlip-uma-alchemical',
        name: 'Equivariant MLIPs, alchemical extensions & UMA',
        period: 'December 2025 – Present',
        context: 'Prof. Jiayu Peng · E(3) message-passing potentials, MACE-style alchemical graphs, universal atom models',
        narrative: [
          'Machine learning interatomic potentials (MLIPs) such as MACE treat atoms on graphs with continuous embeddings; differentiable alchemical weights let compositions interpolate smoothly and energies differentiate with respect to composition—supporting solid solutions, disorder, and alchemical free-energy analyses (Nam, Peng, Gómez-Bombarelli, arXiv:2404.10746). In parallel with that framework, I implement E(3)-equivariant message-passing potentials with alchemical graph augmentations for our simulations.',
          'UMA (Universal Models for Atoms) is a family of large-scale universal MLIPs (Meta FAIR; arXiv:2506.23971). The combined thread is to carry alchemical treatment from equivariant foundations into UMA-style stacks—so universal models support compositional interpolation and derivatives aligned with our lab’s relaxation and disorder workflows.',
        ],
        technicalHighlights: [
          'Alchemical atom expansion, weighted message passing, and weighted readouts consistent with frozen pretrained MLIPs.',
          'Validation on composition sweeps and relaxations for disordered and alloy-like structures.',
          'Adapting graph construction and readouts so alchemical weights compose with UMA inference; tying outputs to existing pipelines and benchmarks.',
        ],
        links: [
          { label: 'arXiv:2404.10746 (MLIP alchemical framework)', href: 'https://arxiv.org/abs/2404.10746' },
          { label: 'arXiv:2506.23971 (UMA)', href: 'https://arxiv.org/abs/2506.23971' },
        ],
        technologies: ['MACE', 'UMA', 'E(3)-equivariant MLIPs', 'PyTorch', 'MLIPs', 'Materials simulation'],
      },
    ],
  },
];

export const PROFESSIONAL_EXPERIENCE: Experience[] = [
  {
    role: 'Teaching Assistant (CSE 341: Computer Architecture)',
    organization: 'Department of Computer Science & Engineering, University at Buffalo',
    location: 'Buffalo, NY',
    period: 'Jan 2026 – May 2026',
    description: [
      'Conduct independent weekly recitation sessions and office hours for VHDL, course material, and projects.',
      'Grade midterms, finals, quizzes, and assignments; assist in preparing assessments.',
      'Support students via Piazza and collaborate with the teaching team in weekly meetings.',
    ],
  },
  {
    role: 'Tutor & Peer-Assisted Leader',
    organization: 'Tutoring & Academic Support Services, University at Buffalo',
    location: 'Buffalo, NY',
    period: 'August 2024 – December 2025',
    description: [
      'Two interactive 1-hour sessions per week; improved students’ understanding of Statistics by ~30% based on quiz performance and feedback.',
      'In-depth explanations, PAL sessions, and reinforcement of statistical concepts.',
    ],
  },
  {
    role: 'Founder & Vice President (NSDC)',
    organization: 'UB National Student Data Corps',
    location: 'Buffalo, NY',
    period: 'October 2023 – May 2024',
    description: [
      'Led development and launch of the NSDC website for events and communication.',
      'Co-founded the UB chapter; ran workshops and networking for data science students.',
    ],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    title:
      'OralScan, an AI-Powered Mobile Tool for Geriatric Oral Healthcare: A Formative Usability and Acceptability Study',
    authors: 'Soni, P., Dandapat, K., Gherardi, A., Bo, W., Li, R., & Xu, W.',
    venue: 'Submitted to Smart Health',
    year: '2025',
    status: 'Under review',
  },
  {
    title: 'Accelerating Multimetallic Catalyst Discovery with Robotics and Agentic AI',
    authors: 'Peng, J., Liu, C., Luo, Y., & Dandapat, K.',
    venue: 'ChemRxiv, ver. 1. DOI: 10.26434/chemrxiv-2025-13n3f',
    year: '2025',
    link: 'https://doi.org/10.26434/chemrxiv-2025-13n3f',
  },
  {
    title: 'Learning Ordering in Crystalline Materials with Symmetry-Aware Graph Neural Networks',
    authors: 'Peng, J., et al.',
    venue: 'arXiv Preprint, arXiv:2409.13851',
    year: '2024',
    link: 'https://arxiv.org/abs/2409.13851',
    status: 'Contributed to revisions and benchmarking',
  },
];

/** Technical projects section aligned with docs/CV.tex (OralScan omitted here; covered under research). */
export const PROJECTS: Project[] = [
  {
    slug: 'marine-guardian',
    title: 'Marine Guardian: Ship Detection in Satellite Imagery',
    category: 'Computer Vision & Deep Learning',
    description: [
      'Computer vision system for ship detection using first principles of computer vision.',
      'Roundness-based classification achieving 98.72% accuracy with MobileNetV2.',
      'Fast detection using geometric properties for real-time maritime monitoring.',
      'Transfer learning with EfficientNet encoder and custom decoder.',
    ],
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'EfficientNet', 'MobileNetV2', 'ResNet50', 'KMeans'],
    stats: '98.72% accuracy',
  },
  {
    slug: 'people-counting-csrnet',
    title: 'People Counting using CSRNet',
    category: 'Deep Learning & Computer Vision',
    description: [
      'Deep learning system for people counting in dense crowds.',
      'CSRNet for occlusions and robust detection.',
    ],
    technologies: ['PyTorch', 'CSRNet', 'Computer Vision', 'CUDA', 'OpenCV'],
  },
  {
    slug: 'human-emotion-detection',
    title: 'Human Emotion Detection',
    category: 'Computer Vision & AI',
    description: [
      'CNN, ResNet-34, and Vision Transformer (ViT) for emotion classification.',
      '87.5% accuracy on image-based emotion recognition.',
    ],
    technologies: ['PyTorch', 'TensorFlow', 'CNN', 'ResNet-34', 'Vision Transformer', 'OpenCV'],
    stats: '87.5% accuracy',
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'Java', 'C++', 'Rust'],
  },
  {
    category: 'AI/ML Frameworks',
    skills: ['PyTorch', 'TensorFlow', 'Computer Vision', 'Deep Learning', 'CNN', 'ResNet', 'Vision Transformer'],
  },
  {
    category: 'Web Development',
    skills: ['React', 'React Native', 'Node.js', 'Django', 'Express.js'],
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'SQL', 'Firebase', 'SQLite'],
  },
  {
    category: 'Tools & Libraries',
    skills: ['Git', 'CUDA', 'OpenCV', 'NumPy', 'Matplotlib', 'Pygame'],
  },
  {
    category: 'Cloud & Deployment',
    skills: ['Firebase Hosting', 'Google Colab'],
  },
];

export const CERTIFICATIONS = [
  'Machine Learning Specialization — Stanford University & DeepLearning.AI (Coursera)',
  'Deep Learning Specialization — Stanford University & DeepLearning.AI (Coursera)',
  'PyTorch for Deep Learning — Udemy',
  'Deep Learning Masterclass — TensorFlow 2, Neural.ai',
  'Django Masterclass — Tim Buchalka (Udemy)',
  'Node.js, Express, MongoDB — Jonas Schmedtmann (Udemy)',
  'The Ultimate React Course 2023 — Jonas Schmedtmann (Udemy)',
  'Python Programming Masterclass — Tim Buchalka (Udemy)',
];

export const AWARDS = [
  'PEARL Award: $2,500 grant from UB ELN for advanced undergraduate research (November 2025)',
  'Cybersecurity Excellence: Top 100 worldwide, Northeastern C2C Finals; 10th in final (2025)',
  'Collegiate Lockdown: Top two UB teams; 4th in finals (2025)',
  "Dean's List: University at Buffalo (Fall 2023, Spring 2024, Fall 2024)",
  'Presidential Scholarship: $15,000 per annum',
];

export const COMPETITIONS: CompetitionEntry[] = [
  {
    name: 'IAA AppXcelerate Application',
    host: 'University at Buffalo',
    date: 'January–March 2025',
    role: 'PI (Rounds 1 & 2), OralScan',
    team: 'Wei Bo, Alexander Gherardi, Kritarth Dandapat, Puru Soni, Rui Li, Wenyao Xu',
  },
  {
    name: 'Russell L. Agrusa CSE Student Innovation Competition',
    host: 'University at Buffalo',
    date: 'November 2024',
    role: 'Team member, OralScan',
    team: 'Puru Soni, Kritarth Dandapat, Alexander Gherardi, Wei Bo, Rui Li, Wenyao Xu',
  },
  {
    name: 'Aging Innovations Challenge',
    host: 'University at Buffalo',
    date: 'November 2024',
    role: 'Team member, OralScan',
    team: 'Puru Soni, Kritarth Dandapat, Alexander Gherardi, Wei Bo, Rui Li, Wenyao Xu',
  },
  {
    name: 'Community Champions for Disability Health Challenge',
    host: 'University at Buffalo',
    date: 'October 2024',
    role: 'PI, OralScan',
    team: 'Wei Bo, Alexander Gherardi, Kritarth Dandapat, Puru Soni, Rui Li, Wenyao Xu',
  },
];

export const PRESENTATIONS = [
  {
    event: 'CTSI Research Group of Doctors, Nurses, and Medical Students',
    type: 'Oral presentation and demo',
    date: 'April 2024',
  },
  {
    event: 'SUNY Undergraduate Research Conference (SURC)',
    type: 'Oral presentation',
    date: 'April 2024',
  },
];

export const RESEARCH_INTERESTS: string[] = [
  'Artificial Intelligence and Machine Learning',
  'Computer Vision and Deep Learning',
  'Healthcare Technology and Digital Health',
  'Quantum Computing Applications',
  'Energy Systems Optimization',
  'Mobile and Web Development',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'The accelerated path: credits, TAship, and two labs',
    subtitle: 'Finishing a BS in three years while TAing and doing dual-lab research.',
    date: '2025',
    content: [
      'I have taken 21–22 credits per semester on an honors track while keeping a 3.8+ GPA. That pace is not about rushing—it is about reaching research depth early.',
      'Adding a teaching role (CSE 341) and research across ESC and Peng labs has reinforced time management and sustained effort—skills I am bringing to doctoral work at MSU.',
    ],
    tags: ['Academics', 'Teaching', 'Research'],
  },
  {
    title: 'Bridging AI and healthcare: OralScan',
    subtitle: 'YOLOv8, usability, and geriatric oral health.',
    date: '2024–2025',
    content: [
      'At the ESC lab, OralScan brought together real-time vision models with product decisions shaped by clinicians and patients.',
      'Formative usability work for Smart Health and the current orthodontics extension keep the focus on human-centered deployment—not only benchmark accuracy.',
    ],
    tags: ['Healthcare AI', 'Computer Vision', 'YOLOv8'],
  },
  {
    title: 'Discovery with symmetry-aware GNNs',
    subtitle: 'wandb, ALIGNN, and materials workflows.',
    date: '2025',
    content: [
      'Migrating optimization to Weights & Biases and benchmarking ALIGNN taught me how tooling and reproducibility matter for publication-quality materials ML.',
      'The ChemRxiv commentary on agentic AI for catalyst discovery highlighted how learning algorithms meet physical science questions.',
    ],
    tags: ['GNNs', 'Materials', 'MLOps'],
  },
];

export type NavLinkItem = {
  label: string;
  href: string;
  page: Exclude<SitePage, 'home'>;
  icon: ReactNode;
};

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'About', href: '#/about', page: 'about', icon: <Users size={18} /> },
  { label: 'Research', href: '#/research', page: 'research', icon: <Microscope size={18} /> },
  { label: 'Projects', href: '#/projects', page: 'projects', icon: <Code size={18} /> },
  { label: 'Education', href: '#/education', page: 'education', icon: <GraduationCap size={18} /> },
  { label: 'Notes', href: '#/notes', page: 'notes', icon: <BookMarked size={18} /> },
];
