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
        "LLM locaux",
        "RASA",
        "Python",
        "Next.js (intégration front IA)",
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
        "Bases de données SQL",
        "Bases de données NoSQL",
        "MariaDB",
        "MongoDB",
        "PhpMyAdmin",
      ],
    },
    {
      title: "Infra, Réseau & Outils",
      items: [
        "Serveur Linux",
        "Docker",
        "Cisco Networking",
        "Architecture réseau",
        "Jira",
      ],
    },
  ],
  technicalHighlights: [
    "Expérience en environnement SOC (monitoring, investigation, amélioration de la détection)",
    "Conception et intégration d'outils cyber (Wazuh, MISP, OpenCTI)",
    "Développement d'applications web et d'API orientées usage métier",
    "Conception de projets embarqués (Arduino/Raspberry Pi) avec capteurs et affichage temps réel",
    "Polyvalence code bas niveau / web / data (C, C++, .NET, JavaScript, Python)",
    "Mise en place d'environnements Linux, réseau et conteneurisés",
  ],
  softCategories: [
    {
      title: "Collaboration & Communication",
      items: [
        "Travail d'équipe",
        "Communication claire avec profils techniques et non techniques",
        "Transmission et vulgarisation de sujets complexes",
      ],
    },
    {
      title: "Méthode & Projet",
      items: [
        "Gestion de projet",
        "Gestion de projet agile",
        "Organisation, priorisation et suivi des tâches",
      ],
    },
    {
      title: "Posture professionnelle",
      items: [
        "Autonomie",
        "Rigueur analytique",
        "Résolution de problèmes",
        "Adaptabilité rapide à de nouveaux outils",
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

export const projects = [
  {
    id: 1,
    title: "ChatBot IA - Projet Européen RES-Q+",
    organization: "Université de Aalborg (Danemark)", // [cite: 39]
    date: "Sept 2025 - Jan 2026", // [cite: 39]
    type: "company", // Pour l'icône "Valise"
    description: "Mise en place d'un ChatBot utilisant des modèles d'IA développés en interne.", // [cite: 41]
    tools: ["RASA", "Ollama", "Python", "NextJS"] // [cite: 40]
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
    title: "Outils de gestion internes",
    organization: "EFF'INNOV Technologies", // [cite: 48]
    date: "Avril 2024 - Juil 2024", // [cite: 47]
    type: "company",
    description: "Développement d'outils pour la gestion et le suivi de bases de données.", // [cite: 50]
    tools: ["NextJS", "MariaDB", "MongoDB"] // [cite: 49]
  },
  {
    id: 4,
    title: "Projet Réseau d'Entreprise",
    organization: "CESI (Projet École)", // [cite: 51]
    date: "2024", // [cite: 52]
    type: "school", // Pour l'icône "Chapeau"
    description: "Mise en place de l'inter-réseau de plusieurs entreprises et connexion au FAI.", // [cite: 54]
    tools: ["Cisco Packet Tracer"] // [cite: 53]
  },
  {
    id: 5,
    title: "Site Web & Base de données",
    organization: "CESI (Projet École)",
    date: "2025",
    type: "school",
    description: "Création d'un site web avec base de données et interface de gestion.", // [cite: 55]
    tools: ["HTML5/CSS3", "JS", "MySQL", "PHP"] // [cite: 55]
  },
  {
    id: 6,
    title: "Application Gestion d'Entreprise",
    organization: "CESI (Projet École)",
    date: "2025",
    type: "school",
    description: "Application de gestion clients, commandes et employés.", // [cite: 58, 59]
    tools: [".NET", "C++", "C", "SQL Server"] // [cite: 57]
  },
  {
    id: 7,
    title: "Station météo embarquée",
    organization: "CESI (Projet École)",
    date: "2025",
    type: "school",
    description: "Conception d'une station C++ avec monitoring temps réel de température, pression et position GPS.",
    tools: ["C++", "Arduino", "Capteurs", "GPS", "Temps réel"]
  },
  {
    id: 8,
    title: "Affichage QR Edusign sur écran Arduino",
    organization: "CESI (Projet École)",
    date: "2026",
    type: "school",
    description: "Pipeline automatique de récupération du QR Edusign et affichage en salle via Arduino, Google API et serveur Raspberry Pi.",
    tools: ["Arduino", "Raspberry Pi", "Google API", "QR code", "Python"]
  }
];