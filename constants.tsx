import type { ReactNode } from 'react';
import { BookOpen, Code, GraduationCap, Home, Microscope, Newspaper, PenLine, Users } from 'lucide-react';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export function computeDuration(period: string): string | null {
  const parts = period.split('–').map((s) => s.trim());
  if (parts.length !== 2) return null;
  const parseMonthYear = (s: string): { year: number; month: number } | null => {
    if (s === 'Present') return { year: 2026, month: 7 };
    const m = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (!m) return null;
    const month = MONTH_NAMES.indexOf(m[1]) + 1;
    if (!month) return null;
    return { year: parseInt(m[2], 10), month };
  };
  const start = parseMonthYear(parts[0]);
  const end = parseMonthYear(parts[1]);
  if (!start || !end) return null;
  const totalMonths = (end.year - start.year) * 12 + (end.month - start.month);
  if (totalMonths <= 0) return null;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const segments: string[] = [];
  if (years > 0) segments.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) segments.push(`${months} month${months > 1 ? 's' : ''}`);
  return segments.join(' ') || null;
}
import type {
  NewsItem,
  CompetitionEntry,
  CurrentlyItem,
  Education,
  Experience,
  Project,
  Publication,
  ResearchPlacement,
  SitePage,
  SkillCategory,
} from './types';
import { NEWS_ITEMS } from './newsItems';
import { PENG_CREDLY_MLIP_UMA, PENG_CREDLY_PEROVSKITE_GNN } from './pengCredly';

/** PDF downloads in public/data/. Resume is the one-page shortened version of the full CV. */
export const DOCUMENT_URLS = {
  cv: '/data/CV%20-%20Kritarth%20Dandapat.pdf',
  resume: '/data/Resume%20-%20Kritarth%20Dandapat.pdf',
} as const;

export const CONTACT_INFO = {
  name: 'Kritarth Dandapat',
  title: 'PhD Student, Michigan State University',
  email: 'contact@dkritarth.com',
  workEmails: ['dandapat@msu.edu'],
  phone: '+1 (716) 612-0016',
  location: 'East Lansing, MI',
  github: 'https://github.com/dkritarth',
  linkedin: 'https://www.linkedin.com/in/kritarth-dandapat/',
  instagram: 'https://www.instagram.com/kritarth_dandapat/',
  twitter: 'https://x.com/Kritarth25',
  website: 'https://dkritarth.com',
  bio: 'Computer science researcher studying adversarial attacks on ensemble deep learning weather-forecasting models in the MSU CSE Data Mining Laboratory under Dr. Pang-Ning Tan.',
  /** Mirrors cv.tex Professional Summary (paragraphs) */
  professionalSummary: [
    'I am a computer science researcher studying reliable machine learning for structured, real-world data. My current work focuses on adversarial attacks against ensemble models, with an emphasis on deep learning-based weather forecasting.',
    'I am a Computer Science PhD student and Graduate Research Assistant at Michigan State University in the Data Mining Laboratory under Dr. Pang-Ning Tan. I previously researched digital health and computational materials science at the University at Buffalo.',
    'My work connects adversarial robustness, uncertainty-aware prediction, spatiotemporal machine learning, and practical ML systems. I care about evaluation that exposes failures hidden by aggregate metrics and about tools that make research reproducible.',
    'I have been recognized with the PEARL undergraduate research award ($2,500) and placed second at the UB Health Futures Challenge ($1,000).',
  ],
  /** Short intro for the home page */
  landingLead:
    'Computer Science PhD student and Graduate Research Assistant at Michigan State University. I study adversarial attacks and robustness in ensemble models, focusing on deep learning-based weather forecasting and spatiotemporal machine learning.',
  sopSnippet:
    'My academic journey has been driven by a fascination with the power of artificial intelligence (AI) to solve tangible, human-centric problems. I am driven to move beyond applying known techniques to creating original, high-impact research.',
  /** Open research software initiative — surfaced on home & About */
  inferenceFoundry: {
    url: 'https://inference-foundry.rweb.site/',
    startLabel: 'Starting May 2026',
    description:
      'Collaborative open-source initiative building reproducible ML inference tooling, standardized research software scaffolding, and shared contributor infrastructure for the scientific ML community.',
  },
};

/** "Currently" snapshot on the home page — short, live list of active work. */
export const CURRENTLY: CurrentlyItem[] = [
  {
    title: 'Adversarial attacks on ensemble forecasts',
    description:
      'Studying how constrained input perturbations can change uncertainty, event probabilities, and decision-relevant statistics while leaving ensemble means nearly unchanged.',
    link: { label: 'Research direction', href: '/research/' },
  },
  {
    title: 'Deep learning weather forecasting',
    description:
      'Building toward evaluation across deterministic and probabilistic systems, including learned weather ensembles and geospatiotemporal models.',
    link: { label: 'GeoArmor project', href: 'https://www.cse.msu.edu/~ptan/project/geoarmor/' },
  },
  {
    title: 'Research and engineering',
    description:
      'Prior work spans mobile health, computer vision, and computational materials science. Selected publications and projects remain available for context.',
    link: { label: 'Publications', href: '/publications/' },
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'PhD in Computer Science',
    institution: 'Michigan State University',
    location: 'East Lansing, MI',
    period: 'August 2026 – May 2030 (expected)',
    details: [
      'Department of Computer Science and Engineering; Data Mining Laboratory (Advisor: Dr. Pang-Ning Tan)',
      'Planned research focus: spatiotemporal machine learning, deep learning-based weather forecasting (DLWF), and AI adversarial robustness',
    ],
  },
  {
    degree: 'Bachelor of Science in Computer Science (Minor in Statistics)',
    institution: 'University at Buffalo, SUNY',
    location: 'Buffalo, NY',
    period: 'August 2023 – June 2026',
    details: [
      'Specialization in artificial intelligence; coursework spanning reinforcement learning, computer vision, machine learning, quantum computing, and distributed systems',
      "GPA 3.8+; Dean's List all semesters; accelerated three-year completion (21–22 credit semesters)",
      'Presidential Scholarship: $15,000 per year; PEARL Award: $2,500 competitive undergraduate research grant (Experiential Learning Network)',
    ],
  },
];

export const RESEARCH_PLACEMENTS: ResearchPlacement[] = [
  {
    role: 'Graduate Research Assistant',
    organization: 'Data Mining Laboratory, Michigan State University',
    location: 'East Lansing, MI',
    overview: 'Adversarial attacks and robustness in ensemble deep learning weather-forecasting models with Dr. Pang-Ning Tan.',
    subprojects: [
      {
        id: 'gst-adversarial-robustness',
        name: 'Adversarial robustness of geospatio-temporal models',
        period: 'August 2026 – Present',
        context: 'NSF-funded research · Advisor: Dr. Pang-Ning Tan',
        narrative: [
          'NSF-funded research on adversarial vulnerabilities in deep learning-based weather forecasting, with emphasis on ensemble predictions, uncertainty, and geospatio-temporal structure.',
          'The project asks whether an attack can leave average forecast error nearly unchanged while corrupting spread, tail-event probabilities, or a downstream decision based on the predictive distribution.',
          'My current focus is to connect adversarial robustness with the practical reliability questions that arise when weather models produce many plausible futures rather than one point forecast.',
        ],
        technicalHighlights: [
          'Planned work studies constrained input perturbations, attack transfer across ensemble members and models, and defenses that preserve calibration and event-probability reliability.',
          'Robustness is evaluated at multiple levels: individual members, ensemble statistics, the full predictive distribution, threshold events, and downstream decisions.',
          'The threat model compares white-box, transfer, and query-based attacks while constraining perturbations by observation error, spatial and temporal localization, and meteorological plausibility.',
          'The benchmark will stage from compact stochastic forecasting models to learned weather ensembles, including GenCast, stochastic NeuralGCM, AIFS ENS, and WeatherNext 3, using WeatherBench 2 data and metrics where applicable.',
          'Candidate defenses include ensemble-aware adversarial training, randomized smoothing, inconsistency detectors, and structurally diverse members. Defenses must retain calibrated uncertainty under adaptive attacks, not only recover pointwise accuracy.',
        ],
        technologies: ['Ensemble models', 'Deep learning weather forecasting', 'Adversarial robustness', 'Geospatio-temporal ML'],
        links: [
          { label: 'GeoArmor NSF project', href: 'https://www.cse.msu.edu/~ptan/project/geoarmor/' },
          { label: 'Data Mining Laboratory', href: 'https://www.cse.msu.edu/~ptan/' },
        ],
      },
    ],
  },
  {
    role: 'Research Assistant',
    organization: 'Embedded Sensing and Computing (ESC) Group, University at Buffalo',
    location: 'Buffalo, NY',
    overview: 'Mobile sensing for healthcare and rehabilitation with Prof. Wenyao Xu.',
    subprojects: [
      {
        id: 'oralscan',
        name: 'OralScan: AI-Assisted Geriatric Oral Screening',
        period: 'June 2024 – February 2025',
        context: 'PI: Prof. Wenyao Xu',
        narrative: [
          'OralScan is an AI-assisted mobile health platform for guided intraoral imaging and rapid feedback—designed to complement in-office geriatric oral care.',
        ],
        technicalHighlights: [
          'Architected a full-stack mobile health platform (React Native, React web) integrating end-to-end YOLOv8 vision pipelines for guided intraoral image acquisition, multi-class dental disease screening, and automated tooth numbering across temporal scan sessions.',
          'Formulated a spatio-temporal scan-guidance system that aggregates sequential intraoral frames to produce consistent disease-detection signals robust to user-induced motion variability.',
          'Co-authored formative usability and acceptability study submitted to Smart Health (under review); delivered oral presentations to clinical stakeholders at CTSI and SURC (January 2025).',
          'Awarded second place ($1,000), University at Buffalo Health Futures Challenge (Spring 2026).',
        ],
        links: [
          { label: 'OralScan website', href: 'https://oralscan.auspexmedix.com/' },
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
          'OrthoScan enables at-home orthodontic progress tracking with intelligent imaging and measurement algorithms that translate visual change into calibrated, actionable feedback.',
        ],
        technicalHighlights: [
          'Engineered mobile and backend systems for at-home orthodontic progress tracking, deploying YOLO-based hardware detection paired with depth-assisted spatial measurement pipelines to quantify structural change across longitudinal patient visits.',
          'Reconstructed and analyzed 3D dental structures from intraoral scans using pre-trained GNNs for 3D mesh processing; computed quantitative tooth position changes in both 2D image space and 3D world coordinates to track orthodontic progress with geometric precision.',
          'Translated sequential intraoral imagery into calibrated geometric progress signals, enabling quantitative remote monitoring between in-office appointments and reducing reliance on subjective clinician assessment.',
        ],
        technologies: ['YOLO', 'GNNs', 'React Native', '3D mesh processing', 'Depth sensing', 'Computer vision'],
        collaboratorsNote:
          'Collaborators included Dr. Wei Bo, Prof. Wenyao Xu, Alexander Gherardi, and Puru Soni (see https://purusoni.com).',
      },
      {
        id: 'mrehab',
        name: 'mRehab',
        period: 'November 2025 – August 2026',
        context: 'ESC Lab · telerehabilitation',
        narrative: [
          'mRehab is a telerehabilitation platform supporting structured exercise programs, sensor-informed feedback, and therapist-facing analytics in live outpatient workflows.',
        ],
        technicalHighlights: [
          'Provisioned and configured AWS backend infrastructure to host testing and staging environments, enabling AI agent capabilities to operate within the live application stack.',
          'Deployed a real-time live sensor logging site for continuous ingest and monitoring of wearable sensor streams during active therapy sessions.',
          'Implemented Kalman filters for sensor fusion and activity detection, improving signal smoothness and robustness of exercise recognition under noisy real-world IMU conditions.',
          'Contributed to session logging, multi-modal sensor ingest pipelines, and exercise scoring algorithms deployed in live outpatient therapy workflows.',
        ],
        links: [{ label: 'mrehab.agency', href: 'https://mrehab.agency/' }],
        technologies: ['AWS', 'Kalman filters', 'Signal processing', 'Backend', 'Mobile', 'Algorithms'],
      },
    ],
  },
  {
    role: 'Undergraduate Researcher',
    organization: 'Peng Research Lab, University at Buffalo',
    location: 'Buffalo, NY',
    overview: 'Computational materials science and clean-energy applications with Prof. Jiayu Peng.',
    placementLinks: [
      {
        label: 'UB ELN — AI design of disordered materials for clean energy (project profile)',
        href: 'https://www.buffalo.edu/eln/students/project-portal/host-page.host.html/content/shared/www/eln/project-portal/project-profiles/active-projects/ai-design-of-disordered-materials-for-clean-energy-and-sustainable-applications.detail.html',
      },
    ],
    subprojects: [
      {
        id: 'perovskite-gnn',
        name: 'Perovskite ordering and symmetry-aware GNNs',
        period: 'June 2025 – November 2025',
        context: 'Prof. Jiayu Peng · repository open-sourced with ordering paper',
        narrative: [
          'Benchmarking symmetry-aware graph neural networks for ordering-dependent energetics in crystalline perovskites, with reproducible training on atomistic datasets.',
        ],
        technicalHighlights: [
          'Benchmarked symmetry-aware GNN architectures (including ALIGNN) on ordering-dependent energetics in crystalline perovskites; contributed benchmarking results and revised analysis to arXiv:2409.13851 and the open-source PerovskiteOrderingGCNNs repository.',
          'Migrated experiment tracking infrastructure from SigOpt to Weights & Biases; automated training loops, hyperparameter sweeps, and multi-architecture evaluation pipelines, reducing manual overhead and improving reproducibility.',
          'Co-authored commentary on agentic AI for multimetallic catalyst discovery, published on ChemRxiv (2025).',
        ],
        links: [
          {
            label: 'GitHub: PerovskiteOrderingGCNNs',
            href: 'https://github.com/jiayu-peng-lab/PerovskiteOrderingGCNNs',
          },
          { label: 'arXiv:2409.13851', href: 'https://arxiv.org/abs/2409.13851' },
        ],
        credlyBadge: PENG_CREDLY_PEROVSKITE_GNN,
        technologies: ['PyTorch', 'GNNs', 'ALIGNN', 'Weights & Biases', 'Materials ML'],
      },
      {
        id: 'mlip-uma-alchemical',
        name: 'Equivariant MLIPs, alchemical extensions, and universal atom models',
        period: 'December 2025 – July 2026',
        context: 'Prof. Jiayu Peng · E(3) message-passing potentials, MACE-style alchemical graphs, universal atom models',
        narrative: [
          'Implementing E(3)-equivariant machine learning interatomic potentials with alchemical graph extensions and integrating them with universal atom model (UMA) stacks for materials discovery pipelines.',
        ],
        technicalHighlights: [
          'Extended a dual-topology alchemical graph construction — originally built for MACE — to two additional equivariant MLIP architectures (fairchem eSEN, Meta UMA), enabling differentiable composition interpolation over disordered structures without retraining.',
          'Designed a λ-weighted message-passing and expert-routing scheme for UMA\'s Mixture-of-Linear-Experts backbone, correcting double-counting in composition-dependent expert gating and adding an endpoint-collapse mechanism for exact pure-composition limits.',
          'Discovered and fixed a reference-energy bug causing non-physical ~15 eV energy discontinuities near pure compositions — invisible to force-based relaxation but critical for free-energy calculations — and added regression tests to prevent recurrence.',
          'Built a 12+ test automated verification suite (energy/force/stress/gradient agreement to ~10⁻⁷ eV) plus benchmark figures and formula-level documentation cross-validating MACE, eSEN, and UMA.',
        ],
        links: [
          { label: 'arXiv:2404.10746 (MLIP alchemical framework)', href: 'https://arxiv.org/abs/2404.10746' },
          { label: 'arXiv:2506.23971 (UMA)', href: 'https://arxiv.org/abs/2506.23971' },
        ],
        credlyBadge: PENG_CREDLY_MLIP_UMA,
        technologies: ['MACE', 'UMA', 'E(3)-equivariant MLIPs', 'PyTorch', 'MLIPs', 'Materials simulation'],
      },
    ],
  },
  {
    role: 'Founder, Inference Foundry',
    organization: 'Open Research Software Initiative',
    location: 'Remote',
    overview: 'Collaborative open-source initiative for reproducible scientific ML tooling.',
    subprojects: [
      {
        id: 'inference-foundry',
        name: 'Inference Foundry',
        period: 'Starting May 2026',
        narrative: [
          'Building shared infrastructure for reproducible ML inference, standardized research software scaffolding, and contributor-friendly open-source workflows.',
        ],
        technicalHighlights: [
          'Launched a collaborative open-source initiative building reproducible ML inference tooling, standardized research software scaffolding, and shared contributor infrastructure for the scientific ML community.',
        ],
        links: [{ label: 'inference-foundry.rweb.site', href: 'https://inference-foundry.rweb.site/' }],
        technologies: ['Open source', 'ML inference', 'Research software', 'Reproducible workflows'],
      },
    ],
  },
];

export const PROFESSIONAL_EXPERIENCE: Experience[] = [
  {
    role: 'Teaching Assistant, CSE 341: Computer Architecture',
    organization: 'Department of Computer Science and Engineering, University at Buffalo',
    location: 'Buffalo, NY',
    period: 'January 2026 – May 2026',
    description: [
      'Conducted weekly tutorial sessions on Assembly and VHDL for 30+ students, live-coding solutions to architecture problems including cache design, memory hierarchies, and instruction pipelining.',
      'Led recitations walking through processor pipeline stages, hazard detection, and cache replacement policies; developed worked examples and problem sets to reinforce lecture material.',
      'Held weekly office hours; graded exams and assignments; supported 100+ students asynchronously on Piazza throughout the semester.',
    ],
  },
  {
    role: 'Tutor and Peer-Assisted Leader (PAL)',
    organization: 'Tutoring and Academic Support Services (TASS), University at Buffalo',
    location: 'Buffalo, NY',
    period: 'August 2024 – December 2025',
    description: [
      'Served as PAL for STA 119 (Introduction to Statistics): designed weekly worksheets aligned to recent lectures, then led two 50-minute collaborative sessions per week; course feedback indicated approximately 30% improvement in quiz performance.',
      'Provided one-to-one 1-hour tutoring appointments across seven courses: STA 119, CSE 115, CSE 116, CSE 220, MTH 141, MTH 142—covering introductory programming, data structures, and calculus.',
    ],
  },
  {
    role: 'Founder and Vice President',
    organization: 'UB National Student Data Corps',
    location: 'Buffalo, NY',
    period: 'October 2023 – May 2024',
    description: [
      'Co-founded the UB chapter; launched the chapter website, organized data science workshops, and built networking programs connecting undergraduates to research and industry opportunities.',
    ],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    title: 'Separating Safety from Preference in Clinical LLM Evaluation',
    authors:
      'Dandapat, K., Master, T. A., Das, A., Bo, W., Lei, M., Liu, E., Cavuoto, L. A., Bhattacharjya, S., Subryan, H., and Xu, W.',
    venue: 'MobiCom 2026',
    year: '2026',
    status: 'Published',
    abstract:
      'Conversational AI increasingly answers patients’ rehabilitation questions, but a fluent, well-liked answer can still be clinically unsafe, and preference-only evaluation hides this by collapsing many judgments into one winner. We ran a human-centered evaluation of the mRehab Advisory Agent with two cohorts in distinct roles: six domain experts rate clinical safety and correctness, and three end users rate helpfulness, affect, and clarity, alongside blinded best-to-worst rankings exported as provenance-rich records. In a 200-question pilot (435 ranked triples), users ranked the agent first most often (53.3%; p < 0.001), yet it led on affect and clarity, not helpfulness, and drew the lowest expert safety rate (88.8% vs. 93.7% for two GPT-4.1 mini comparators). That gap traced to a single expert with near-zero agreement, so it points to rater calibration rather than an unsafe agent, and catching it depended on recording safety separately from preference.',
    citation:
      'Dandapat, K., Master, T. A., Das, A., Bo, W., Lei, M., Liu, E., Cavuoto, L. A., Bhattacharjya, S., Subryan, H., & Xu, W. (2026). Separating safety from preference in clinical LLM evaluation. In Proceedings of MobiCom 2026.',
    link: 'https://doi.org/10.1145/3842436.3843811',
  },
  {
    title:
      'From Community Feedback to Measurement Redesign: Iterating mRehab for Accessible Home-Based Stroke Rehabilitation',
    authors:
      'Liu, E.*, Dandapat, K.*, Master, T. A., Das, A., Gherardi, A., Bo, W., Cavuoto, L. A., Bhattacharjya, S., Subryan, H., Ji, W., and Xu, W.',
    venue: 'MobiCom 2026',
    year: '2026',
    status: 'Published',
    equalContribution: ['Liu, E.', 'Dandapat, K.'],
    abstract:
      'Home-based stroke rehabilitation often suffers from low adherence due to usability barriers and a lack of engaging, trustworthy tools. mRehab addresses these challenges by pairing a smartphone application with 3D-printed functional objects, enabling post-stroke survivors to practice task-oriented, upper-limb activities in their daily environments. To ensure the system meets real-world needs, we conducted a Community Engagement Studio with 22 expert consultants, gathering critical feedback on system accessibility, stroke-specific interaction, clinical integration, and overall trust. These stakeholder insights drove a substantial redesign of mRehab’s interaction design and sensing pipeline: a transition from legacy fixed moving-average smoothing to a per-axis Kalman filtering approach with baseline-subtracted stillness detection, an RMS-jerk smoothness metric, and revised physical prop designs and audio instructions. Preliminary trace-level evaluations across four functional activities show the new Kalman pipeline effectively eliminates system lag (0 to 17 ms) compared to the previous 25-sample moving average (204 to 221 ms).',
    citation:
      'Liu, E.*, Dandapat, K.*, Master, T. A., Das, A., Gherardi, A., Bo, W., Cavuoto, L. A., Bhattacharjya, S., Subryan, H., Ji, W., & Xu, W. (2026). From community feedback to measurement redesign: Iterating mRehab for accessible home-based stroke rehabilitation. In Proceedings of MobiCom 2026. (*Co-first authors)',
    link: 'https://doi.org/10.1145/3842436.3843796',
  },
  {
    title:
      'Towards AI Agents for Intelligent Voice-Driven Interaction in a Home-Based Stroke Rehabilitation System',
    authors:
      'Lei, M., Das, A., Master, T. A., Dandapat, K., Reddipogu, P., Xian, J., Rowe, V., Craft, L., Tabb, K., Cavuoto, L., Bhattacharjya, S., Jo, H. J., Subryan, H., Bo, W., and Xu, W.',
    venue: 'JMIR',
    year: '2026',
    status: 'Submitted to JMIR',
    abstract:
      'Physical rehabilitation programs increasingly rely on mobile applications, but users undergoing rehabilitation often face significant interaction barriers that reduce engagement and adherence. Intelligent AI agents offer a promising solution by enabling more natural and accessible interaction, and recent advances make this practical at two complementary levels: cloud-based large language models (LLMs) excel at complex reasoning and broad domain knowledge, while small language models (SLMs) can now run directly on-device, enabling low-latency, privacy-preserving, and fully offline interactions. We present a hybrid local-and-cloud agent architecture for mobile rehabilitation apps that pairs a Mobile Action Agent (an on-device SLM that interprets voice commands and executes app functions offline) with an Advisory Agent (a cloud-based question-answering agent augmented with data analysis and domain knowledge). Experiments and a human evaluation study with domain experts and end-users show the on-device Mobile Action Agent achieves high command-execution accuracy with lightweight backbones, while the cloud-based Advisory Agent is consistently preferred over baseline approaches across correctness, clarity, and helpfulness.',
    citation:
      'Lei, M., Das, A., Master, T. A., Dandapat, K., Reddipogu, P., Xian, J., Rowe, V., Craft, L., Tabb, K., Cavuoto, L., Bhattacharjya, S., Jo, H. J., Subryan, H., Bo, W., & Xu, W. (2026). Towards AI agents for intelligent voice-driven interaction in a home-based stroke rehabilitation system. Submitted to JMIR.',
  },
  {
    title:
      'AI-Powered Oral Health Screening for Older Adults: A Community Engagement Studio Study',
    authors: 'Soni, P., Dandapat, K., Gherardi, A., Bo, W., Das, A., Li, R., and Xu, W.',
    venue: 'JMIR (in preparation)',
    year: '2026',
    status: 'In revision',
    abstract:
      'Background: Among U.S. adults aged 65+, 79% own a smartphone, and the projected geriatric dental disease burden will nearly double by 2050. Mobile health (mHealth) tools for older adults are typically designed around the assumption that the patient is the operator. Whether that assumption fits the reality of the geriatric population is unsettled. Objective: To examine the patient-as-operator assumption through formative human-factors investigation of an AI-powered oral health screening application. Methods: A Community Engagement Studio (N=13, ages 60–76) evaluated OralScan, an AI-powered smartphone application for intraoral disease screening built with the University at Buffalo School of Dental Medicine. Results: Interest in the tool was unanimous (13/13, 100%); half the cohort found the tool easy to use and half did not. During attempted use, participants could not open their mouths wide enough for adequate intraoral exposure, and hand stability was insufficient for steady capture. The discussion converged on the caregiver as the primary operator rather than the patient. Conclusions: AI-powered geriatric health screening tools should be designed primarily as caregiver instruments, with the patient-facing pathway as residual for the subset of older adults who can execute the capture themselves and prefer to.',
    citation:
      'Soni, P., Dandapat, K., Gherardi, A., Bo, W., Das, A., Li, R., & Xu, W. (2026). AI-powered oral health screening for older adults: A community engagement studio study. Manuscript in preparation for submission to JMIR.',
  },
  {
    title:
      'Demo: mRehab: A Clinically Grounded Smartphone System for Home Rehabilitation',
    authors: 'Dandapat, K., Das, A., Master, T. A., Patel, H., Gherardi, A., Szigeti, M., Reddipogu, P., Bo, W., Lei, M., Cavuoto, L. A., Bhattacharjya, S., Subryan, H., and Xu, W.',
    venue: 'MobiCom 2026 (Demo Track)',
    year: '2026',
    status: 'Published',
    link: 'https://doi.org/10.1145/3795866.3848473',
  },
  {
    title: 'Accelerating Multimetallic Catalyst Discovery with Robotics and Agentic AI',
    authors: 'Peng, J., Liu, C., Luo, Y., and Dandapat, K.',
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
    status: 'Contributed benchmarking and revisions',
  },
];

/** Selected projects (OralScan and lab work live under Research). Aligned with cv.tex. */
export const PROJECTS: Project[] = [
  {
    slug: 'context-kernel',
    title: 'context-kernel: Self-Hostable Context Memory for LLMs',
    category: 'Developer Infrastructure and Remote MCP Servers',
    description: [
      'Built a self-hostable context-memory layer that serves hand-curated Markdown (profile, preferences, project status) to Claude Code, Desktop, and chat over a remote MCP connector, replacing repeated re-explanation of personal context at the start of every session.',
      'Implemented a two-token security model on Cloudflare Workers and KV — a read token that serves curated context and a write token restricted to append-only journal entries — with constant-time token comparison and a manual human-review promotion gate so agents can never silently overwrite curated memory.',
      'Shipped both Bearer-token (Claude Code CLI) and OAuth (claude.ai connector, Dynamic Client Registration/RFC 7591) auth flows end-to-end against a deployed Worker, with 100/100 tests passing.',
    ],
    technologies: ['Cloudflare Workers', 'Cloudflare KV', 'TypeScript', 'Model Context Protocol (MCP)', 'OAuth 2.0', 'Wrangler'],
    stats: '100/100 tests passing · live Bearer + OAuth auth',
    links: [
      { label: 'Project site', href: 'https://dkritarth.github.io/context-kernel/' },
      { label: 'GitHub', href: 'https://github.com/dkritarth/context-kernel' },
    ],
  },
  {
    slug: 'paddock-psych-rl',
    title: 'PaddockPsychRL: F1-Informed Multi-Agent Reinforcement Learning',
    category: 'Spatiotemporal Modeling and Multi-Agent Systems',
    description: [
      'Formulated a multi-agent RL framework integrating Formula 1 temporal performance signals into agent psychology models within PettingZoo cooperative environments, mapping real-world behavioral dynamics to learned policy structure.',
      'Constructed driver-specific agent profiles from FastF1 2025 lap-time consistency metrics, encoding temporal performance variability as per-agent action-noise scales to reflect authentic decision-making under pressure.',
      'Benchmarked tabular Q-learning and MAPPO baselines against psych-conditioned policies; psych-aware agents improved Strategy Resilience Score from 0.54 to 0.63 (+16.7%) under noisy multi-agent coordination.',
    ],
    technologies: ['Python', 'FastF1', 'PettingZoo', 'Ray RLlib', 'MAPPO', 'Q-learning'],
    stats: 'Strategy Resilience Score 0.63 vs 0.54 (+16.7%)',
    links: [
      { label: 'Project write-up', href: 'https://dkritarth.com/PaddockPsychRL/' },
      { label: 'GitHub', href: 'https://github.com/dkritarth/PaddockPsychRL' },
    ],
  },
  {
    slug: 'marine-guardian',
    title: 'Marine Guardian: Ship Detection in Satellite Imagery',
    category: 'Geospatial Computer Vision and Deep Learning',
    description: [
      'Designed a maritime monitoring pipeline grounded in geometric computer vision principles before applying deep models, achieving low-latency inference on high-resolution satellite imagery for spatial object detection.',
      'Engineered a roundness-based geometric classifier paired with MobileNetV2, attaining 98.72% ship-vs-non-ship classification accuracy while eliminating heavy encoder overhead unsuitable for edge deployment.',
      'Benchmarked EfficientNet transfer learning with a custom decoder against ResNet-50 feature extraction and K-means clustering, systematically validating architecture decisions across spatial generalization scenarios.',
    ],
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'EfficientNet', 'MobileNetV2', 'ResNet-50', 'K-means'],
    stats: '98.72% accuracy',
  },
  {
    slug: 'people-counting-csrnet',
    title: 'People Counting via CSRNet Density Estimation',
    category: 'Deep Learning and Spatial Regression',
    description: [
      'Developed a density-estimation pipeline for crowd counting in highly occluded surveillance scenes where bounding-box detectors fail due to extreme pedestrian overlap, framing the task as spatial regression over density maps.',
      'Trained CSRNet end-to-end in PyTorch to predict per-pixel crowd density fields, enabling robust aggregate counts from integrated spatial density rather than fragile per-instance localization.',
      'Accelerated training and inference with CUDA; preprocessed surveillance-style frames with OpenCV for repeatable benchmarking across public crowd-counting datasets.',
    ],
    technologies: ['PyTorch', 'CSRNet', 'CUDA', 'OpenCV'],
  },
  {
    slug: 'human-emotion-detection',
    title: 'Human Emotion Detection: Multi-Architecture Benchmark',
    category: 'Computer Vision and Model Robustness',
    description: [
      'Constructed a controlled multi-architecture benchmark comparing shallow CNN, ResNet-34, and Vision Transformer (ViT) backbones on facial expression recognition under a unified preprocessing and evaluation protocol, isolating architectural contribution from data effects.',
      'Optimized training schedules and augmentation strategies per architecture; ViT and ResNet-34 variants demonstrated superior generalization over the CNN baseline on held-out facial expression data.',
      'Achieved 87.5% top-1 classification accuracy on the best-performing configuration after systematic cross-architecture ablation.',
    ],
    technologies: ['PyTorch', 'TensorFlow', 'CNN', 'ResNet-34', 'Vision Transformer', 'OpenCV'],
    stats: '87.5% top-1 accuracy',
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'Java', 'C++', 'Rust'],
  },
  {
    category: 'Machine learning and AI',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Computer vision',
      'Deep learning',
      'Graph neural networks (GNNs)',
      'YOLOv8',
      'Vision Transformer (ViT)',
      'Reinforcement learning (MAPPO, Q-learning)',
      'Ray RLlib',
    ],
  },
  {
    category: 'Scientific ML and materials',
    skills: [
      'ALIGNN',
      'Machine learning interatomic potentials (MLIPs)',
      'MACE',
      'E(3)-equivariant MPNNs',
      'Weights and Biases',
      'PyTorch Geometric',
    ],
  },
  {
    category: 'Software engineering',
    skills: ['React', 'React Native', 'Node.js', 'Django', 'Git', 'CUDA', 'OpenCV', 'NumPy', 'Matplotlib'],
  },
  {
    category: 'Databases and cloud',
    skills: ['MongoDB', 'SQL', 'Firebase', 'SQLite', 'AWS', 'Google Colab', 'Firebase Hosting'],
  },
];

export const CERTIFICATIONS = [
  'Machine Learning Specialization — Stanford University and DeepLearning.AI (Coursera)',
  'Deep Learning Specialization — Stanford University and DeepLearning.AI (Coursera)',
  'PyTorch for Deep Learning — Udemy',
  'Additional professional coursework: deep learning (TensorFlow), Django, React, Node.js, Python (Udemy)',
];

export const AWARDS = [
  'PEARL Award — $2,500 competitive undergraduate research grant, University at Buffalo Experiential Learning Network (November 2025)',
  'Health Futures Challenge — Second place ($1,000) for OralScan, University at Buffalo (Spring 2026)',
  'Cybersecurity Excellence — Top 100 globally, Northeastern Cybersecurity C2C Finals; 10th in world finals (2025)',
  'Collegiate Lockdown — Top two teams representing UB; 4th in finals (2025)',
  "Dean's List — University at Buffalo (Fall 2023, Spring 2024, Fall 2024)",
  'Presidential Scholarship — $15,000 per year',
];

export const COMPETITIONS: CompetitionEntry[] = [
  {
    name: 'IAA AppXcelerate Application',
    host: 'University at Buffalo',
    date: 'January–March 2025',
    role: 'OralScan',
  },
  {
    name: 'Russell L. Agrusa CSE Student Innovation Competition',
    host: 'University at Buffalo',
    date: 'November 2024',
    role: 'Team member, OralScan',
  },
  {
    name: 'Aging Innovations Challenge',
    host: 'University at Buffalo',
    date: 'November 2024',
    role: 'Team member, OralScan',
  },
  {
    name: 'Community Champions for Disability Health Challenge',
    host: 'University at Buffalo',
    date: 'October 2024',
    role: 'OralScan',
  },
];

export const PRESENTATIONS = [
  {
    event: 'CTSI Research Group of Doctors, Nurses, and Medical Students',
    type: 'Oral presentation and live demo',
    date: 'January 2025',
  },
  {
    event: 'SUNY Undergraduate Research Conference (SURC)',
    type: 'Oral presentation',
    date: 'January 2025',
  },
];

export const RESEARCH_INTERESTS: string[] = [
  'Spatiotemporal machine learning and deep learning-based weather forecasting (DLWF)',
  'AI adversarial robustness and out-of-distribution generalization',
  'Geometric and equivariant deep learning; graph neural networks for structured data',
  'Computer vision and sequence modeling for healthcare and scientific applications',
  'Machine learning for materials science and scientific discovery',
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export function formatNewsMonth(month: number): string {
  return MONTH_LABELS[Math.max(1, Math.min(12, month)) - 1] ?? '—';
}

/** News items grouped by year, descending; months descending within each year. */
export function getNewsByYear(): { year: number; items: NewsItem[] }[] {
  const byYear = new Map<number, NewsItem[]>();
  for (const item of NEWS_ITEMS) {
    const list = byYear.get(item.year) ?? [];
    list.push(item);
    byYear.set(item.year, list);
  }
  return [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => b.month - a.month || a.id.localeCompare(b.id)),
    }));
}

export type NavLinkItem = {
  label: string;
  href: string;
  page: SitePage;
  icon: ReactNode;
};

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '/', page: 'home', icon: <Home size={18} /> },
  { label: 'About', href: '/about/', page: 'about', icon: <Users size={18} /> },
  { label: 'Research', href: '/research/', page: 'research', icon: <Microscope size={18} /> },
  { label: 'Publications', href: '/publications/', page: 'publications', icon: <BookOpen size={18} /> },
  { label: 'Projects', href: '/projects/', page: 'projects', icon: <Code size={18} /> },
  { label: 'Education', href: '/education/', page: 'education', icon: <GraduationCap size={18} /> },
  { label: 'News', href: '/news/', page: 'news', icon: <Newspaper size={18} /> },
  { label: 'Blog', href: '/blog/', page: 'blog', icon: <PenLine size={18} /> },
];
