/* ═══════════════════════════════════════════════
   PUBLIC PORTFOLIO COMPONENTS
   ═══════════════════════════════════════════════ */

const Navbar = ({ activeSection, sections, lang, onLang, onJump, onLogin }) => {
  const labels = {
    fr: { hero: 'Accueil', about: 'À propos', skills: 'Compétences', projects: 'Projets', experience: 'Expérience', education: 'Formation', contact: 'Contact', available: 'Disponible', cv: 'CV' },
    en: { hero: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', education: 'Education', contact: 'Contact', available: 'Open to work', cv: 'CV' },
  };
  const t = labels[lang];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#hero" onClick={(e)=>{e.preventDefault();onJump('hero');}}>
          <div className="nav-brand-mark">A</div>
          <span>Arthur Bratigny</span>
        </a>
        <div className="nav-links">
          {sections.map(s => (
            <button
              key={s}
              className={'nav-link' + (activeSection === s ? ' active' : '')}
              onClick={()=>onJump(s)}>
              {t[s]}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <span className="nav-available">
            <span className="status-dot"></span>
            {t.available}
          </span>
          <div className="lang-switch">
            <button className={lang==='fr'?'active':''} onClick={()=>onLang('fr')}>FR</button>
            <button className={lang==='en'?'active':''} onClick={()=>onLang('en')}>EN</button>
          </div>
          <button className="btn-icon" title="Admin" onClick={onLogin}>
            <Icon name="lock" size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = ({ lang }) => {
  const copy = {
    fr: {
      greet: 'Ouvert aux opportunités · CDI / freelance',
      l1: 'Ingénieur logiciel,',
      l2: <>je construis des <span className="accent">produits</span> solides.</>,
      lede: 'Je conçois et développe des applications web full-stack — du backend robuste à l’interface soignée. Je cherche un poste d’ingénieur où l’on prend le temps de bien faire les choses.',
      cta1: 'Voir mes projets', cta2: 'Télécharger le CV',
      m1: 'Disponibilité', mv1: 'Immédiate',
      m2: 'Recherche', mv2: 'CDI · freelance',
      m3: 'Stack', mv3: 'Vue, Node, TypeScript',
    },
    en: {
      greet: 'Open to opportunities · full-time / freelance',
      l1: 'Software engineer,',
      l2: <>I build <span className="accent">solid</span> products.</>,
      lede: 'I design and develop full-stack web applications — from robust backends to polished interfaces. Looking for an engineering role where craft matters.',
      cta1: 'See projects', cta2: 'Download CV',
      m1: 'Availability', mv1: 'Immediate',
      m2: 'Looking for', mv2: 'Full-time · freelance',
      m3: 'Stack', mv3: 'Vue, Node, TypeScript',
    },
  };
  const c = copy[lang];
  return (
    <section id="hero" className="hero">
      <div className="hero-grid"></div>
      <div className="hero-mesh"></div>
      <div className="container hero-content">
        <div className="hero-greeting">
          <span className="status-dot"></span>
          {c.greet}
        </div>
        <h1>
          <span>{c.l1}</span>
          <span>{c.l2}</span>
        </h1>
        <p className="hero-lede">{c.lede}</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects">
            {c.cta1} <Icon name="arrow-right" size={15} />
          </a>
          <a className="btn btn-ghost" href="#">
            <Icon name="download" size={15} /> {c.cta2}
          </a>
        </div>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">{c.m1}</span>
            <span className="hero-meta-val">{c.mv1}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">{c.m2}</span>
            <span className="hero-meta-val">{c.mv2}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">{c.m3}</span>
            <span className="hero-meta-val">{c.mv3}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ lang }) => {
  const copy = {
    fr: {
      eye: 'À propos',
      title: 'Ingénieur, curieux, méthodique.',
      p1: 'Ingénieur en informatique, je développe des applications web depuis plusieurs années. J’aime les architectures propres, le code lisible, et les outils qui rendent la vie des équipes plus simple — du backend Node aux interfaces Vue.',
      p2: 'Je cherche à rejoindre une équipe qui prend le temps de bien faire les choses. Tests, revue de code, accessibilité, documentation : ce sont pour moi des fondations, pas des options.',
      s1: 'projets livrés', s2: 'technos maîtrisées', s3: 'années de code',
    },
    en: {
      eye: 'About',
      title: 'Engineer, curious, methodical.',
      p1: 'A software engineer by training, I’ve been building web applications for several years. I value clean architecture, readable code, and tools that make teams’ lives easier — from Node backends to Vue interfaces.',
      p2: 'I’m looking for a team that takes the time to do things well. Tests, code reviews, accessibility, documentation — to me these are foundations, not options.',
      s1: 'shipped projects', s2: 'mastered stacks', s3: 'years coding',
    },
  };
  const c = copy[lang];
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-portrait"></div>
          <div className="about-body">
            <div className="eyebrow">{c.eye}</div>
            <h2 className="h-section">{c.title}</h2>
            <p>{c.p1}</p>
            <p>{c.p2}</p>
            <div className="about-stats">
              <div>
                <div className="about-stat-num">12</div>
                <div className="about-stat-label">{c.s1}</div>
              </div>
              <div>
                <div className="about-stat-num">8</div>
                <div className="about-stat-label">{c.s2}</div>
              </div>
              <div>
                <div className="about-stat-num">4</div>
                <div className="about-stat-label">{c.s3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = ({ lang }) => {
  const eye = lang === 'fr' ? 'Compétences' : 'Skills';
  const title = lang === 'fr' ? 'Outils et matières de travail.' : 'Tools and matter I work with.';
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="eyebrow">{eye}</div>
        <h2 className="h-section" style={{marginBottom:'3rem'}}>{title}</h2>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div key={i} className="card skills-cat">
              <h3>{cat.title}</h3>
              <div className="skills-cat-sub">{cat.sub}</div>
              {cat.skills.map((s, j) => (
                <div key={j} className="skill-row">
                  <div className="skill-head">
                    <span className="skill-name">{s.name}</span>
                    <span>{s.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{width: s.level + '%'}}></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = ({ lang, onOpen }) => {
  const [filter, setFilter] = React.useState('all');
  const filters = lang === 'fr'
    ? [{id:'all',l:'Tout'},{id:'web',l:'Web'},{id:'tools',l:'Outils'},{id:'mobile',l:'Mobile'}]
    : [{id:'all',l:'All'},{id:'web',l:'Web'},{id:'tools',l:'Tools'},{id:'mobile',l:'Mobile'}];
  const eye = lang === 'fr' ? 'Sélection' : 'Selected work';
  const title = lang === 'fr' ? 'Projets récents.' : 'Recent projects.';
  const subtitle = lang === 'fr' ? 'Cliquez pour ouvrir le détail et la galerie.' : 'Tap to open details and gallery.';
  const visible = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="projects-head">
          <div>
            <div className="eyebrow">{eye}</div>
            <h2 className="h-section">{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="filter-tabs">
            {filters.map(f => (
              <button
                key={f.id}
                className={'filter-tab' + (filter===f.id?' active':'')}
                onClick={()=>setFilter(f.id)}>{f.l}</button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {visible.map(p => (
            <div key={p.id} className="card card-hover project-card" onClick={()=>onOpen(p)}>
              <div className="project-thumb">
                <span className="project-thumb-tag">{p.tag}</span>
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p>{p.short}</p>
                <div className="project-techs">
                  {p.techs.slice(0,4).map(t => <span key={t} className="project-tech">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectModal = ({ project, onClose, lang }) => {
  const [slide, setSlide] = React.useState(0);
  React.useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  if (!project) return null;
  const slides = [0,1,2];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icon name="x" size={16} /></button>
        <div className="modal-gallery">
          <div className="modal-gallery-nav">
            {slides.map(i => (
              <span
                key={i}
                className={'modal-gallery-dot' + (slide===i?' active':'')}
                onClick={()=>setSlide(i)}></span>
            ))}
          </div>
        </div>
        <div className="modal-body">
          <span className="chip">{project.tag}</span>
          <h2 style={{marginTop:'1rem'}}>{project.title}</h2>
          <p>{project.short}</p>
          <div className="modal-meta">
            <div>
              <span className="modal-meta-label">{lang==='fr'?'Client':'Client'}</span>
              <span className="modal-meta-val">{project.client}</span>
            </div>
            <div>
              <span className="modal-meta-label">{lang==='fr'?'Rôle':'Role'}</span>
              <span className="modal-meta-val">{project.role}</span>
            </div>
            <div>
              <span className="modal-meta-label">{lang==='fr'?'Année':'Year'}</span>
              <span className="modal-meta-val">{project.year}</span>
            </div>
          </div>
          <p style={{marginBottom:'1.5rem'}}>
            {lang==='fr'
              ? 'Projet conçu avec une architecture claire : séparation des couches, tests unitaires et d’intégration, CI/CD automatisée. Le code est documenté et facilement reprenable par une autre équipe.'
              : 'Built with a clean architecture: clear layer separation, unit and integration tests, automated CI/CD. The code is documented and easy to pick up by another team.'}
          </p>
          <div className="project-techs" style={{marginBottom:'1.5rem'}}>
            {project.techs.map(t => <span key={t} className="project-tech">{t}</span>)}
          </div>
          <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
            {project.demo && <a className="btn btn-primary btn-sm" href="#"><Icon name="external" size={14}/> {lang==='fr'?'Voir la démo':'Live demo'}</a>}
            {project.repo && <a className="btn btn-ghost btn-sm" href="#"><Icon name="github" size={14}/> {lang==='fr'?'Code source':'Source code'}</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceEducationSection = ({ lang }) => {
  const expTitle = lang === 'fr' ? 'Expérience' : 'Experience';
  const eduTitle = lang === 'fr' ? 'Formation' : 'Education';
  return (
    <section id="experience" className="section" style={{paddingBottom:'7rem'}}>
      <div className="container exp-edu-grid">
        <div>
          <div className="eyebrow">{lang==='fr'?'Parcours':'Career'}</div>
          <h2 className="h-section" style={{marginBottom:'2.5rem'}}>{expTitle}</h2>
          <div className="timeline">
            {experiences.map((x, i) => (
              <div key={i} className={'timeline-item' + (x.current?' current':'')}>
                <div className="timeline-date">{x.date}</div>
                <div className="timeline-title">{x.role}</div>
                <div className="timeline-company">{x.company}</div>
                <p className="timeline-desc">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="education">
          <div className="eyebrow">{lang==='fr'?'Études':'Studies'}</div>
          <h2 className="h-section" style={{marginBottom:'2.5rem'}}>{eduTitle}</h2>
          <div className="timeline">
            {education.map((x, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-date">{x.date}</div>
                <div className="timeline-title">{x.role}</div>
                <div className="timeline-company">{x.company}</div>
                <p className="timeline-desc">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ lang }) => {
  const [sent, setSent] = React.useState(false);
  const copy = lang === 'fr' ? {
    eye: 'Discutons', title: 'Une opportunité ? Une question ?',
    lede: 'Recruteurs, équipes tech, porteurs de projets — n’hésitez pas à me contacter. Je réponds dans la journée.',
    name: 'Votre nom', email: 'Votre e-mail', subject: 'Sujet', message: 'Votre message',
    send: 'Envoyer le message', sent: 'Message envoyé ✓',
    cmail: 'E-mail', cgh: 'GitHub', cli: 'LinkedIn',
  } : {
    eye: 'Let’s talk', title: 'An opportunity? A question?',
    lede: 'Recruiters, tech teams, project owners — feel free to reach out. I usually reply within the day.',
    name: 'Your name', email: 'Your email', subject: 'Subject', message: 'Your message',
    send: 'Send message', sent: 'Message sent ✓',
    cmail: 'Email', cgh: 'GitHub', cli: 'LinkedIn',
  };
  return (
    <section id="contact" className="section" style={{background:'var(--color-bg-secondary)'}}>
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="eyebrow">{copy.eye}</div>
            <h2 className="h-section">{copy.title}</h2>
            <p style={{marginBottom:'2.5rem',maxWidth:420}}>{copy.lede}</p>
            <div className="contact-channels">
              <a className="contact-channel" href="mailto:arthurbratigny@gmail.com">
                <div className="contact-channel-icon"><Icon name="mail" size={18}/></div>
                <div>
                  <div className="contact-channel-label">{copy.cmail}</div>
                  <div className="contact-channel-val">arthurbratigny@gmail.com</div>
                </div>
              </a>
              <a className="contact-channel" href="#">
                <div className="contact-channel-icon"><Icon name="linkedin" size={18}/></div>
                <div>
                  <div className="contact-channel-label">{copy.cli}</div>
                  <div className="contact-channel-val">linkedin.com/in/arthur-bratigny</div>
                </div>
              </a>
              <a className="contact-channel" href="#">
                <div className="contact-channel-icon"><Icon name="github" size={18}/></div>
                <div>
                  <div className="contact-channel-label">{copy.cgh}</div>
                  <div className="contact-channel-val">github.com/arthur-bratigny</div>
                </div>
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e)=>{e.preventDefault();setSent(true);setTimeout(()=>setSent(false),3000);}}>
            <div className="form-row">
              <div>
                <label className="field-label">{copy.name}</label>
                <input type="text" placeholder="Jean Dupont"/>
              </div>
              <div>
                <label className="field-label">{copy.email}</label>
                <input type="email" placeholder="jean@exemple.fr"/>
              </div>
            </div>
            <div>
              <label className="field-label">{copy.subject}</label>
              <input type="text" placeholder={lang==='fr'?'Refonte de site, mission, etc.':'Website redesign, mission...'}/>
            </div>
            <div>
              <label className="field-label">{copy.message}</label>
              <textarea rows="5" placeholder={lang==='fr'?'Décrivez votre projet en quelques lignes...':'Tell me about your project...'}></textarea>
            </div>
            <button className="btn btn-primary" type="submit" style={{alignSelf:'flex-start',marginTop:'.5rem'}}>
              {sent ? copy.sent : copy.send} {!sent && <Icon name="arrow-right" size={15}/>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-credit">
        © 2026 Arthur Bratigny · {lang==='fr'?'Conçu et développé avec soin':'Crafted with care'}
      </div>
      <div className="footer-socials">
        <a className="btn-icon" href="#" title="GitHub"><Icon name="github" size={15}/></a>
        <a className="btn-icon" href="#" title="LinkedIn"><Icon name="linkedin" size={15}/></a>
        <a className="btn-icon" href="#" title="Twitter"><Icon name="twitter" size={15}/></a>
        <a className="btn-icon" href="#" title="Email"><Icon name="mail" size={15}/></a>
      </div>
    </div>
  </footer>
);

/* ═══════════════ Public portfolio root ═══════════════ */
const PublicPortfolio = ({ enabled, theme, lang, onLang, onLogin }) => {
  const [openProject, setOpenProject] = React.useState(null);
  const [activeSection, setActiveSection] = React.useState('hero');
  const containerRef = React.useRef(null);

  const visibleSections = sectionsList.filter(s => enabled[s.id]).map(s => s.id);

  const jump = (id) => {
    setActiveSection(id);
    const el = containerRef.current?.querySelector('#' + id);
    if (el) {
      const top = el.getBoundingClientRect().top + (containerRef.current.scrollTop || 0) - 60;
      containerRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const onScroll = () => {
      const ids = visibleSections;
      for (const id of ids) {
        const el = root.querySelector('#' + id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < 200 && rect.bottom > 200) {
          setActiveSection(id);
          return;
        }
      }
    };
    root.addEventListener('scroll', onScroll);
    return () => root.removeEventListener('scroll', onScroll);
  }, [enabled]);

  return (
    <div ref={containerRef} className="app-shell" style={{overflowY:'auto', height:'100vh'}}>
      <Navbar
        activeSection={activeSection}
        sections={visibleSections}
        lang={lang}
        onLang={onLang}
        onJump={jump}
        onLogin={onLogin}
      />
      {enabled.hero && <HeroSection lang={lang}/>}
      {enabled.about && <><div className="section-divider"></div><AboutSection lang={lang}/></>}
      {enabled.skills && <><div className="section-divider"></div><SkillsSection lang={lang}/></>}
      {enabled.projects && <><div className="section-divider"></div><ProjectsSection lang={lang} onOpen={setOpenProject}/></>}
      {(enabled.experience || enabled.education) && <><div className="section-divider"></div><ExperienceEducationSection lang={lang}/></>}
      {enabled.contact && <ContactSection lang={lang}/>}
      <Footer lang={lang}/>
      {openProject && <ProjectModal project={openProject} onClose={()=>setOpenProject(null)} lang={lang}/>}
    </div>
  );
};

Object.assign(window, {
  Navbar, HeroSection, AboutSection, SkillsSection,
  ProjectsSection, ProjectModal, ExperienceEducationSection,
  ContactSection, Footer, PublicPortfolio,
});
