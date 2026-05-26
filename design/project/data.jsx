/* ═══════════════════════════════════════════════
   Icons & mock data
   ═══════════════════════════════════════════════ */

const Icon = ({ name, size = 16, strokeWidth = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  switch (name) {
    case 'arrow-right': return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-down': return <svg {...props}><path d="M12 5v14M5 12l7 7 7-7"/></svg>;
    case 'mail': return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'phone': return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>;
    case 'map-pin': return <svg {...props}><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'download': return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
    case 'external': return <svg {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>;
    case 'github': return <svg {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
    case 'linkedin': return <svg {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
    case 'twitter': return <svg {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
    case 'bell': return <svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
    case 'home': return <svg {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10"/></svg>;
    case 'user': return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case 'briefcase': return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
    case 'grid': return <svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
    case 'graduation': return <svg {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
    case 'sparkles': return <svg {...props}><path d="M9.94 14.34 12 22l2.06-7.66L22 12l-7.94-2.34L12 2l-2.06 7.66L2 12zM20 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1zM4 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>;
    case 'message': return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case 'settings': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case 'globe': return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'logout': return <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case 'plus': return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'edit': return <svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>;
    case 'trash': return <svg {...props}><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>;
    case 'eye': return <svg {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'check': return <svg {...props}><path d="M20 6 9 17l-5-5"/></svg>;
    case 'check-circle': return <svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3"/></svg>;
    case 'x': return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'chevron-right': return <svg {...props}><path d="m9 18 6-6-6-6"/></svg>;
    case 'chevron-left': return <svg {...props}><path d="m15 18-6-6 6-6"/></svg>;
    case 'lock': return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    case 'menu': return <svg {...props}><path d="M3 12h18M3 6h18M3 18h18"/></svg>;
    case 'image': return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>;
    case 'languages': return <svg {...props}><path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/></svg>;
    case 'arrow-up-right': return <svg {...props}><path d="M7 17 17 7M7 7h10v10"/></svg>;
    case 'eye-off': return <svg {...props}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>;
    case 'palette': return <svg {...props}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
    default: return null;
  }
};

/* ═══════════════ Mock data ═══════════════ */
const projects = [
  {
    id: 1, title: 'Atlas — Plateforme de cartographie',
    short: 'Application web temps réel pour visualiser les flux de mobilité urbaine. Architecture micro-services et WebSockets.',
    tag: 'Full-stack', category: 'web',
    techs: ['Vue 3', 'Pinia', 'Node', 'PostgreSQL', 'Redis'],
    demo: 'atlas.demo', repo: 'github.com/arthur-bratigny/atlas',
    year: '2025', role: 'Lead développeur', client: 'Projet personnel',
  },
  {
    id: 2, title: 'Veille — Agrégateur RSS auto-hébergé',
    short: 'Lecteur RSS minimaliste avec synchronisation multi-appareils, classification automatique et mode hors-ligne.',
    tag: 'Web App', category: 'web',
    techs: ['React', 'TypeScript', 'Rust', 'SQLite'],
    demo: 'veille.app', repo: 'github.com/arthur-bratigny/veille',
    year: '2024', role: 'Solo', client: 'Open source',
  },
  {
    id: 3, title: 'Forge — CLI de scaffolding',
    short: 'Outil en ligne de commande pour générer des projets Node avec architecture héxagonale, tests et CI pré-configurés.',
    tag: 'CLI / DX', category: 'tools',
    techs: ['TypeScript', 'Node', 'Vitest'],
    repo: 'github.com/arthur-bratigny/forge',
    year: '2024', role: 'Auteur', client: 'Open source',
  },
  {
    id: 4, title: 'Echo — API GraphQL temps réel',
    short: 'API d’événementiel collaboratif avec subscriptions GraphQL, authentification JWT et tests d’intégration.',
    tag: 'Backend', category: 'web',
    techs: ['Node', 'GraphQL', 'Apollo', 'PostgreSQL', 'Docker'],
    year: '2024', role: 'Backend lead', client: 'Stage de fin d’études',
  },
  {
    id: 5, title: 'Trace — Bibliothèque de tracing',
    short: 'Mini-bibliothèque de tracing distribué compatible OpenTelemetry, pédagogique et 0 dépendance.',
    tag: 'Librairie', category: 'tools',
    techs: ['TypeScript', 'OpenTelemetry'],
    repo: 'github.com/arthur-bratigny/trace',
    year: '2023', role: 'Auteur', client: 'Open source',
  },
  {
    id: 6, title: 'Pomme — Visualiseur de bundle',
    short: 'Visualisation interactive d’un bundle JavaScript avec analyse de tree-shaking et suggestions d’optimisation.',
    tag: 'Outil dev', category: 'tools',
    techs: ['Vite', 'D3.js', 'Web Workers'],
    year: '2023', role: 'Designer & dev', client: 'Projet école',
  },
];

const experiences = [
  { current: true, date: 'Juill. 2024 — aujourd’hui', role: 'Ingénieur logiciel Full-Stack', company: 'Apside Lyon', desc: 'Conception et développement d’applications web pour des clients grands comptes : Node, Vue 3, PostgreSQL. Mise en place de pipelines CI/CD et de tests d’intégration.' },
  { date: 'Mars — Sept. 2023', role: 'Stage Ingénieur — Développement backend', company: 'OVHcloud', desc: 'Développement d’une API GraphQL pour la gestion des ressources cloud. Écriture de tests, documentation OpenAPI, optimisation des requêtes Postgres.' },
  { date: 'Été 2022', role: 'Stage — Développeur web junior', company: 'Capgemini Engineering', desc: 'Intégration de modules sur une application métier React. Découverte des méthodologies agiles et des revues de code.' },
];

const education = [
  { date: '2021 — 2024', role: 'Diplôme d’Ingénieur — Informatique', company: 'INSA Lyon', desc: 'Spécialité systèmes logiciels et réseaux. Projet de fin d’études sur le tracing distribué et l’observabilité.' },
  { date: '2019 — 2021', role: 'Classes préparatoires — MPSI / MP', company: 'Lycée du Parc, Lyon', desc: 'Mathématiques, physique et informatique. Concours d’entrée aux écoles d’ingénieurs.' },
];

const skillCategories = [
  { title: 'Backend', sub: 'API, données, systèmes', skills: [
    { name: 'Node.js / Express', level: 92 },
    { name: 'TypeScript', level: 90 },
    { name: 'PostgreSQL / SQLite', level: 85 },
    { name: 'Tests (Vitest, Jest)', level: 88 },
  ]},
  { title: 'Front-end', sub: 'Interfaces et UX', skills: [
    { name: 'Vue 3 / Nuxt', level: 88 },
    { name: 'React / Next.js', level: 82 },
    { name: 'CSS moderne', level: 86 },
    { name: 'Accessibilité (WCAG)', level: 78 },
  ]},
  { title: 'DevOps & outils', sub: 'Mise en production', skills: [
    { name: 'Docker', level: 80 },
    { name: 'GitHub Actions / CI', level: 85 },
    { name: 'Linux / Bash', level: 82 },
    { name: 'Git (rebase, workflow)', level: 90 },
  ]},
];

const messages = [
  { id: 1, name: 'Camille Vasseur', email: 'camille.vasseur@payfit.com', subject: 'Opportunité — Ingénieur Full-Stack chez PayFit', preview: 'Bonjour Arthur, je suis Tech Recruiter chez PayFit. Votre profil m’intéresse beaucoup, seriez-vous ouvert à un échange ?', time: 'il y a 2 h', unread: true, avatar: 'CV' },
  { id: 2, name: 'Julien Moreau', email: 'j.moreau@doctolib.com', subject: 'Poste Back-End Senior — équipe Praticiens', preview: 'Bonjour, nous recrutons un ingénieur back-end sur la plateforme praticiens. Stack Node + PostgreSQL.', time: 'il y a 5 h', unread: true, avatar: 'JM' },
  { id: 3, name: 'Sarah Leblanc', email: 'sarah@alan.com', subject: 'Discussion — équipe Plateforme chez Alan', preview: 'Hello Arthur, on a vu votre projet Atlas, super travail ! Notre équipe Plateforme cherche un profil comme le vôtre.', time: 'il y a 1 j', unread: true, avatar: 'SL' },
  { id: 4, name: 'Hadrien Lévy', email: 'hadrien@coopnumerique.fr', subject: 'Mission freelance — 6 mois', preview: 'Salut, on cherche un ingé full-stack pour une mission de 6 mois sur un projet coopératif. Intéressé ?', time: 'il y a 2 j', unread: false, avatar: 'HL' },
  { id: 5, name: 'Pierre Martin', email: 'pierre.m@gmail.com', subject: 'Félicitations pour le portfolio', preview: 'Bravo, ton portfolio est très propre. C’est rare de voir autant de soin chez un ingé.', time: 'il y a 4 j', unread: false, avatar: 'PM' },
];

const visitsData = [
  { day: 'Lun', value: 124 },
  { day: 'Mar', value: 168 },
  { day: 'Mer', value: 195 },
  { day: 'Jeu', value: 142 },
  { day: 'Ven', value: 218 },
  { day: 'Sam', value: 287 },
  { day: 'Dim', value: 246 },
];

const themes = [
  { id: 'sable', name: 'Sable', desc: 'Crème et terracotta', c1: 'oklch(0.93 0.05 35)', c2: 'oklch(0.85 0.07 55)', c3: 'oklch(0.97 0.012 80)' },
  { id: 'foret', name: 'Forêt', desc: 'Mousse et menthe', c1: 'oklch(0.80 0.07 150)', c2: 'oklch(0.85 0.05 165)', c3: 'oklch(0.96 0.014 140)' },
  { id: 'crepuscule', name: 'Crépuscule', desc: 'Rose poudré et mauve', c1: 'oklch(0.82 0.08 350)', c2: 'oklch(0.78 0.08 330)', c3: 'oklch(0.96 0.014 340)' },
  { id: 'papier', name: 'Papier', desc: 'Blanc cassé et encre marine', c1: 'oklch(0.32 0.10 255)', c2: 'oklch(0.86 0.05 250)', c3: 'oklch(0.985 0.003 240)' },
];

const sectionsList = [
  { id: 'hero', label: 'Accueil', desc: 'Section d’introduction plein écran avec votre titre et CTA.' },
  { id: 'about', label: 'À propos', desc: 'Présentation, photo et statistiques personnelles.' },
  { id: 'skills', label: 'Compétences', desc: 'Catégories de compétences avec barres de progression.' },
  { id: 'projects', label: 'Projets', desc: 'Grille de projets filtrables avec modale de détail.' },
  { id: 'experience', label: 'Expérience', desc: 'Timeline verticale de votre parcours professionnel.' },
  { id: 'education', label: 'Formation', desc: 'Timeline compacte de votre formation et diplômes.' },
  { id: 'contact', label: 'Contact', desc: 'Formulaire de contact et liens directs.' },
];

Object.assign(window, {
  Icon, projects, experiences, education, skillCategories,
  messages, visitsData, themes, sectionsList,
});
