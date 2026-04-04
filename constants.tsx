import { BookOpen, Code, FileText, GraduationCap, Microscope, Users } from 'lucide-react';
import { BlogPost, Education, Experience, Project, Publication, SkillCategory } from './types';

export const CONTACT_INFO = {
  name: 'Kritarth Dandapat',
  title: 'Incoming PhD Student · AI & Computer Vision',
  email: 'contact@dkritarth.com',
  phone: '+1 (716) 612-0016',
  location: 'Buffalo, NY',
  github: 'https://github.com/Kritarth-Dandapat',
  linkedin: 'https://www.linkedin.com/in/kritarth-dandapat/',
  website: 'https://dkritarth.com',
  bio: 'Incoming PhD student in Computer Science at Michigan State University focusing on Artificial Intelligence. Research in computer vision, deep learning, and healthcare AI (OralScan), and symmetry-aware GNNs for materials. Accelerated 3-year BS with 3.8+ GPA; PEARL Award; Teaching Assistant for Computer Architecture.',
  sopSnippet:
    'My academic journey has been driven by a fascination with the power of artificial intelligence (AI) to solve tangible, human-centric problems. I am driven to move beyond applying known techniques to creating original, high-impact research.',
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
      "GPA: 3.8+ (Dean's List: all semesters)",
      'Presidential Scholarship: $15,000 per annum',
      'PEARL Award: $2,500 research grant (ELN)',
      'Accelerated 3-year program (21–22 credit semesters)',
    ],
  },
];

export const RESEARCH_EXPERIENCE: Experience[] = [
  {
    role: 'Research Assistant',
    organization: 'Embedded Sensing and Computing (ESC) Group, University at Buffalo',
    location: 'Buffalo, NY',
    period: 'June 2024 – Present',
    description: [
      'Developing OralScan (https://oralscan.health/), a mobile application using a YOLOv8 model for real-time dental disease classification and tooth numbering from intraoral images.',
      'Building mobile and web applications using React Native and React for healthcare diagnostics.',
      'Co-authored a paper on the system’s formative usability and acceptability study, submitted to the Smart Health journal.',
      'Developing an orthodontics extension to track patient braces movements and classify braces types using YOLO-based models.',
      'Creating deep learning models for accurate orthodontic scoring using depth sensors.',
      'Contributed to mRehab (https://mrehab.agency/), assisting with mobile application architecture and refining exercise algorithms for rehabilitation therapy.',
    ],
    technologies: ['YOLOv8', 'React Native', 'React', 'Computer Vision', 'Healthcare AI'],
  },
  {
    role: 'Undergraduate Researcher',
    organization: 'Peng Research Lab, University at Buffalo',
    location: 'Buffalo, NY',
    period: 'June 2025 – Present',
    description: [
      'Conducting research on symmetry-aware graph neural networks (GNNs) for crystalline materials, contributing to work detailed in arXiv:2409.13851.',
      'Migrated the lab’s model tracking and hyperparameter optimization workflows from SigOpt to Weights & Biases (wandb) for final paper revisions.',
      'Benchmarked and trained models on new GNN architectures, including ALIGNN, to evaluate performance for resubmission.',
      'Contributed to a recent commentary paper on agentic AI for catalyst discovery (Peng et al., 2025, ChemRxiv).',
      'Collaborating with graduate students on high-throughput atomistic simulations and data pipelines.',
    ],
    technologies: ['GNNs', 'PyTorch', 'WandB', 'ALIGNN', 'Material Science'],
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
    title: 'People Counting using CSRNet',
    category: 'Deep Learning & Computer Vision',
    description: [
      'Deep learning system for people counting in dense crowds.',
      'CSRNet for occlusions and robust detection.',
    ],
    technologies: ['PyTorch', 'CSRNet', 'Computer Vision', 'CUDA', 'OpenCV'],
  },
  {
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

export const COMPETITIONS = [
  {
    name: 'Russell L. Agrusa CSE Student Innovation Competition',
    role: 'Team member, OralScan',
    date: 'November 2024',
  },
  {
    name: 'Aging Innovations Challenge',
    role: 'Team member, OralScan',
    date: 'November 2024',
  },
  {
    name: 'Community Champions for Disability Health Challenge',
    role: 'PI, OralScan',
    date: 'October 2024',
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

export const NAV_LINKS = [
  { label: 'About', href: '#about', icon: <Users size={18} /> },
  { label: 'Research', href: '#research', icon: <Microscope size={18} /> },
  { label: 'Insights', href: '#insights', icon: <BookOpen size={18} /> },
  { label: 'Projects', href: '#projects', icon: <Code size={18} /> },
  { label: 'Timeline', href: '#education', icon: <GraduationCap size={18} /> },
  { label: 'Personal statement', href: '#/personal-statement', icon: <FileText size={18} /> },
  { label: 'Statement of purpose', href: '#/statement-of-purpose', icon: <FileText size={18} /> },
];
