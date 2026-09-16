// =============================================================================
// PERSONA 5 PORTFOLIO - PERSONAL CONFIGURATION
// Configured with verified resume details for P Manjunatha Kumar Tejas
// =============================================================================

export const portfolioData = {
  personal: {
    codeName: "JOKER",
    fullName: "P Manjunatha Kumar Tejas",
    firstName: "TEJAS",
    lastName: "P M K.",
    title: "FULL STACK & AI DEVELOPER",
    location: "Vellore / Bangalore, India",
    phone: "+91 8073213339",
    email: "tejasputtu666@gmail.com",
    github: "https://github.com/Github-del-dot",
    linkedin: "https://www.linkedin.com/in/tejas-polineni-a370021b6/", // Update with your exact LinkedIn handle
    typewriterText: "STEAL YOUR HEART",
    roleTags: [
      "FULL STACK DEV",
      "AI & FASTAPI",
      "VIT VELLORE '27",
      "PHANTOM THIEF"
    ],
    personaTitle: "PERSONA: THE ARCHITECT",
    aboutBio: [
      "Full-stack developer and B.Tech CSE student at Vellore Institute of Technology (CGPA: 8.76) with hands-on internship experience building production-ready web applications using React, Next.js, FastAPI, TypeScript, and PostgreSQL.",
      "Experienced in architecting multi-tenant systems, building AI-powered platforms (RAG with FAISS, OCR, predictive ML with XGBoost), designing scalable REST APIs, and crafting fluid, responsive user interfaces."
    ],
  },

  education: [
    {
      institution: "Vellore Institute of Technology",
      location: "Vellore, India",
      degree: "B.Tech in Computer Science and Engineering",
      score: "CGPA: 8.76",
      period: "July 2023 – Present",
      status: "CURRENT",
      icon: "◆",
    },
    {
      institution: "Narayana eTechno School",
      location: "India",
      degree: "Senior Secondary (Class XII) & Secondary (Class X)",
      score: "Class X: 94.8% — Class XII: 87.8%",
      period: "2019 – 2023",
      status: "COMPLETED",
      icon: "▲",
    }
  ],

  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "Capsai Infotech Pvt Ltd",
      period: "May 2026 – July 2026",
      mode: "Remote",
      project: "WeCare v2 Healthcare Management Platform",
      points: [
        "Developed full-stack features for a multi-tenant healthcare platform using FastAPI, PostgreSQL, SQLAlchemy, Next.js, React, and TypeScript migrating from legacy Django.",
        "Built reusable UI components and implemented caregiver, task, scheduling, billing, and home modification modules with REST API integration and workflow automation.",
        "Engineered secure multi-tenant architecture with role-based access control (RBAC) and sensitive patient data protection.",
        "Collaborated in an Agile team using Git workflows, pull requests, code reviews, and integration testing for production releases."
      ]
    }
  ],

  achievements: [
    { title: "Oracle Cloud Infrastructure Generative AI Certified", year: "2025", badge: "OCI CERTIFIED" },
    { title: "Finalist — Binary Battles Coding 2.0", year: "2025", badge: "FINALIST" },
    { title: "VIT Vellore CSE — 8.76 CGPA", year: "2023-Present", badge: "ACADEMIC EXCELLENCE" }
  ],

  stats: [
    { label: 'CGPA (VIT VELLORE)', value: '8.76', icon: '★' },
    { label: 'INTERNSHIP',        value: 'CAPSAI', icon: '▲' },
    { label: 'PROJECTS BUILT',    value: '10+',    icon: '◆' },
    { label: 'LANGUAGES & TECH',  value: '18+',    icon: '●' },
  ],

  traits: [
    { name: 'PROFICIENCY (CODING)', val: 94 },
    { name: 'INTELLIGENCE (DSA & CS)', val: 90 },
    { name: 'KNOWLEDGE (AI & ML)',  val: 88 },
    { name: 'GUTS (DEBUGGING)',     val: 95 },
    { name: 'CHARM (COLLABORATION)', val: 86 },
  ],

  skills: [
    {
      category: 'LANGUAGES & CORE',
      icon: '◆',
      skills: [
        { name: 'Python', level: 92 },
        { name: 'JavaScript / TypeScript', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'C / C++', level: 82 },
        { name: 'SQL (PostgreSQL / MySQL)', level: 88 },
      ]
    },
    {
      category: 'FULL STACK & AI',
      icon: '▲',
      skills: [
        { name: 'React & Next.js', level: 92 },
        { name: 'FastAPI & Express.js', level: 90 },
        { name: 'Node.js & REST APIs', level: 88 },
        { name: 'Tailwind CSS & Modern UI', level: 92 },
        { name: 'LangChain, FAISS & ML (XGBoost)', level: 84 },
      ]
    },
    {
      category: 'DATABASE & TOOLS',
      icon: '●',
      skills: [
        { name: 'PostgreSQL & MySQL', level: 88 },
        { name: 'MongoDB', level: 80 },
        { name: 'Git & GitHub', level: 94 },
        { name: 'Docker & Postman', level: 82 },
        { name: 'AWS & Oracle Cloud (OCI)', level: 80 },
      ]
    },
  ],

  familiarTech: [
    'PYTHON', 'TYPESCRIPT', 'JAVASCRIPT', 'JAVA', 'C++',
    'FASTAPI', 'REACT', 'NEXT.JS', 'NODE.JS', 'EXPRESS',
    'POSTGRESQL', 'MYSQL', 'MONGODB', 'DOCKER', 'GIT',
    'TAILWIND', 'FAISS', 'LANGCHAIN', 'XGBOOST', 'AWS', 'OCI'
  ],

  projects: [
    {
      id: 1,
      codename: 'OPERATION DECISION SPHERE',
      title: 'DecisionSphere',
      subtitle: 'AI-Powered Decision Intelligence Platform',
      description: 'Enterprise AI platform for demand forecasting, delivery-risk prediction, and workforce attrition analysis. Developed XGBoost-based ML pipelines with probability calibration and connected them to a financial impact engine and interactive scenario dashboard.',
      tech: ['Python', 'XGBoost', 'scikit-learn', 'FastAPI', 'Next.js'],
      status: 'FEATURED',
      year: '2026',
      icon: '◆',
      links: {
        github: 'https://github.com/Github-del-dot/DecisionSphere',
        live: null,
      },
    },
    {
      id: 2,
      codename: 'OPERATION WECARE',
      title: 'WeCare v2 Healthcare Platform',
      subtitle: 'Production Healthcare Management System',
      description: 'Multi-tenant healthcare platform built during internship at Capsai Infotech. Engineered caregiver workflows, task scheduling, automated billing, and home modification modules with robust RBAC and data protection.',
      tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Next.js', 'React', 'TypeScript'],
      status: 'INTERNSHIP',
      year: '2026',
      icon: '★',
      links: {
        github: 'https://github.com/Github-del-dot',
        live: null,
      },
    },
    {
      id: 3,
      codename: 'OPERATION WHISPERER',
      title: 'AI Class Whisperer',
      subtitle: 'Hybrid OCR & Context-Aware RAG Engine',
      description: 'AI note processing platform using hybrid OCR (Google Vision OCR & Tesseract) for handwritten and typed extraction. Features LLM pipelines for automatic summarization and flashcards, plus a FAISS-based RAG engine for instant Q&A.',
      tech: ['FastAPI', 'React', 'Google Vision', 'Tesseract', 'FAISS', 'LLaMA / OpenAI'],
      status: 'COMPLETED',
      year: '2025',
      icon: '▲',
      links: {
        github: 'https://github.com/Github-del-dot',
        live: null,
      },
    },
    {
      id: 4,
      codename: 'OPERATION BANK VAULT',
      title: 'Bank Management System',
      subtitle: 'Secure Full-Stack Banking Application',
      description: 'Comprehensive banking application supporting secure financial transactions, customer management, and branch operations. Built with JWT-based role authentication, MVC architecture, and an optimized MySQL database with indexed queries.',
      tech: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'REST API'],
      status: 'COMPLETED',
      year: '2025',
      icon: '●',
      links: {
        github: 'https://github.com/Github-del-dot',
        live: null,
      },
    },
  ],

  contact: {
    headingLine1: "CALLING CARD:",
    headingLine2: "LET'S COLLABORATE",
    subtext: "Interested in full-stack engineering, AI/ML platforms, software development internships, or building impactful products together? Send a transmission or connect directly!",
    channels: [
      { label: 'EMAIL', value: 'tejasputtu666@gmail.com', href: 'mailto:tejasputtu666@gmail.com', icon: '◆' },
      { label: 'PHONE', value: '+91 8073213339', href: 'tel:+918073213339', icon: '★' },
      { label: 'GITHUB', value: 'github.com/Github-del-dot', href: 'https://github.com/Github-del-dot', icon: '▲' },
      { label: 'LINKEDIN', value: 'linkedin.com/in/tejas', href: 'https://www.linkedin.com', icon: '●' },
      { label: 'LOCATION', value: 'VIT Vellore / India', href: null, icon: '◇' },
    ],
    footerCopyright: "P MANJUNATHA KUMAR TEJAS // PHANTOM THIEVES ARCHIVE",
  }
}
