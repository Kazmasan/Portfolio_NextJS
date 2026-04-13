// lib/data.ts

export const personalInfo = {
  name: "Kyllian Cavalca", // [cite: 2]
  title: "Étudiant Ingénieur système et réseaux", // [cite: 1]
  subtitle: "Recherche d'un contrat pro ou stage pour 2026-2027", // [cite: 1]
  email: "contact@cavalca.fr", // [cite: 6],
  emailecole: "kyllian.cavalca@viacesi.fr", // [cite: 7]
  linkedin: "https://www.linkedin.com/in/kyllian-cavalca-88b68b276",
  github: "https://github.com/Kazmasan",
  location: "Caen", // [cite: 28]
  bio: "Actuellement étudiant en deuxième année d’école d’ingénieur, spécialité système et réseaux, je me distingue par ma sociabilité et par mon aisance à l’oral, que ce soit en face-à-face ou devant un public. Passionné par la culture populaire, celle-ci constitue pour moi une véritable source d’inspiration, à travers les bandes dessinées, le cinéma, la musique et la littérature.", // 
  cvLink: "/CV_Kyllian_Cavalca.pdf", // Chemin vers ton fichier PDF
  photo: "/photo.jpg" // Chemin vers ta photo
};

export const skills = {
  technicalCategories: [
    {
      title: "IA & LLM",
      items: [
        "Ollama",
        "RASA",
        "Python",
        "huggingface",
        "Transformers",
        "LangChain",

      ],
    },
    {
      title: "Cybersécurité / SOC",
      items: [
        "Analyse de logs",
        "Triage et qualification d'alertes",
        "MISP",
        "OpenCTI",
        "Wazuh",
        "Sekoia",
        "SentinelOne",
      ],
    },
    {
      title: "Développement Web & API",
      items: [
        "Applications web",
        "API REST",
        "Google APIs",
        "Web scraping",
        "JavaScript",
        "Node.js",
        "Next.js",
        "PHP",
        "HTML",
      ],
    },
    {
      title: "Systèmes embarqués & IoT",
      items: [
        "Arduino",
        "Raspberry Pi",
        "Intégration capteurs (température, pression, GPS)",
        "Monitoring temps réel",
        "Affichage sur écran embarqué",
      ],
    },
    {
      title: "Langages & Paradigmes",
      items: [
        "Programmation orientée objet",
        "C",
        "C++",
        ".NET Framework",
        "UML",
      ],
    },
    {
      title: "Données",
      items: [
        "Mysql",
        "SQLlite",        
        "MariaDB",
        "MongoDB",
        "PostgreSQL",
      ],
    },
    {
      title: "Infra, Réseau & Outils",
      items: [
        "Linux",
        "Docker",
        "Cisco Networking",
        "Architecture réseau",
        "Proxmox",
        "Gns3",
        

      ],
    },
  ],
  technicalHighlights: [
    "Expérience en environnement SOC (monitoring, investigation, amélioration de la détection)",
    "Conception et intégration d'outils cyber (Wazuh, MISP, OpenCTI)",
    "Développement d'applications web et d'API",
    "Conception de projets embarqués (Arduino/Raspberry Pi) avec capteurs et affichage temps réel",
    "Polyvalence code tout niveau / web / data (C, C++, .NET, JavaScript, Python)",
    "Mise en place d'environnements Linux, réseau et conteneurisés",
  ],
  softCategories: [
    {
      title: "Collaboration & Communication",
      items: [
        "Travail d'équipe",
        "Communication claire",
        "Transmission et vulgarisation de sujets complexes",
      ],
    },
    {
      title: "Méthode & Projet",
      items: [
        "Gestion de projet agile",
        "Organisation, priorisation et suivi des tâches",
        "Jira",
      ],
    },
    {
      title: "Posture professionnelle",
      items: [
        "Autonomie",
        "Rigueur analytique",
        "Résolution de problèmes",
        "Adaptabilité rapide",
        "Anglais professionnel",
      ],
    },
  ],
  softHighlights: [
    "Capacité à rester structuré et efficace dans des contextes techniques exigeants",
    "Aisance relationnelle pour collaborer entre équipes techniques et métiers",
    "Approche proactive orientée amélioration continue",
  ],
};

export const project = [
  {
    id: 1,
    title: "Outils de gestion internes",
    organization: "EFF'INNOV Technologies", // [cite: 48]
    date: "Avril 2024 - Juil 2024", // [cite: 47]
    type: "company",
    description: "Développement de plusieurs outils internes à l’entreprise pour la gestion des ressources humaines et des composants.", // [cite: 50]
    tools: ["NextJS", "MariaDB", "MongoDB"] // [cite: 49]
  },
  {
    id: 2,
    title: "Intégration & Configuration Cyber",
    organization: "N-CyP (Normandie Cyber Protection)", // [cite: 44]
    date: "Jan 2025 - Avril 2025", // [cite: 43]
    type: "company",
    description: "Intégration MISP/OpenCTI/Wazuh, analyse de logs en environnement SOC, corrélation d'événements, qualification d'alertes et traitement d'IoCs pour améliorer la détection de menaces.",
    tools: ["Linux", "Docker", "Proxmox", "Wazuh", "MISP", "OpenCTI"]
  },

    {
    id: 3,
    title: "ChatBot IA - Projet Européen RES-Q+",
    organization: "Université de Aalborg (Danemark)", // [cite: 39]
    date: "Sept 2025 - Jan 2026", // [cite: 39]
    type: "company", // Pour l'icône "Valise"
    description: "Mise en place d’un ChatBot utilisant des modèles d’IA développés en interne dans le cadre du projet européen RES-Q+", // [cite: 41]
    tools: ["RASA", "Ollama", "Hugging Face", "Python", "NextJS"] // [cite: 40]
  },
];

export const school_project = [
  {
    id: 1,
    title: "Projet Réseau d'Entreprise",
    organization: "CESI (Projet École)", // [cite: 51]
    date: "2024", // [cite: 52]
    type: "school", // Pour l'icône "Chapeau"
    description: "Mise en place du réseau de plusieurs entreprises et connexion au FAI.", // [cite: 54]
    tools: ["Cisco Packet Tracer"] // [cite: 53]
  },
  {
    id: 2,
    title: "Projet STAGE",
    organization: "CESI (Projet École)",
    date: "2025",
    type: "school",
    description: "Mise en place d'un site web de recherche de stage multi-compte permettant de faciliter la recherche et la candidature.", // [cite: 55]
    tools: ["HTML5/CSS3", "JS", "MySQL", "PHP"] // [cite: 55]
  },
  {
    id: 3,
    title: "Application Gestion d'Entreprise",
    organization: "CESI (Projet École)",
    date: "2025",
    type: "school",
    description: "Outils de gestion pour les différents aspects d’une entreprise, gestion clients, commandes, employés", // [cite: 58, 59]
    tools: [".NET", "C++", "SQL Server"] // [cite: 57]
  },
  {
    id: 4,
    title: "Station météo embarquée",
    organization: "CESI (Projet École)",
    date: "2025",
    type: "school",
    description: "Conception d'une station C++ avec monitoring temps réel de température, pression et position GPS.",
    tools: ["C-Arduino", "Arduino", "Capteurs", "GPS", "Temps réel"]
  },
  {
    id: 5,
    title: "Affichage déporté QR code Edusign ",
    organization: "CESI (Projet École)",
    date: "2026",
    type: "school",
    description: "Pipeline automatique de récupération du QR Edusign et affichage en salle via Arduino, extension Google et serveur Raspberry Pi.",
    tools: ["Arduino", "Raspberry Pi", "Extension Google", "QR code", "Python"]
  }
];