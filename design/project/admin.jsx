/* ═══════════════════════════════════════════════
   ADMIN BACKOFFICE COMPONENTS
   ═══════════════════════════════════════════════ */

const Sidebar = ({ page, onNav, unreadCount, onLogout }) => {
  const items = [
    { id: 'dashboard', icon: 'home', label: 'Tableau de bord' },
    { id: 'profile', icon: 'user', label: 'Profil' },
    { id: 'projects', icon: 'grid', label: 'Projets' },
    { id: 'experience', icon: 'briefcase', label: 'Expérience' },
    { id: 'education', icon: 'graduation', label: 'Formation' },
    { id: 'skills', icon: 'sparkles', label: 'Compétences' },
    { id: 'messages', icon: 'message', label: 'Messages', badge: unreadCount },
    { id: 'translations', icon: 'languages', label: 'Traductions' },
    { id: 'settings', icon: 'settings', label: 'Réglages' },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">A</div>
        <div>
          <div className="sidebar-brand-name">Arthur</div>
          <div className="sidebar-brand-tag">Backoffice</div>
        </div>
      </div>
      <div className="sidebar-section">Pilotage</div>
      <div className="sidebar-nav">
        {items.slice(0, 1).map(it => (
          <button key={it.id} className={'sidebar-item' + (page===it.id?' active':'')} onClick={()=>onNav(it.id)}>
            <Icon name={it.icon} size={16}/> {it.label}
          </button>
        ))}
      </div>
      <div className="sidebar-section">Contenu</div>
      <div className="sidebar-nav">
        {items.slice(1, 7).map(it => (
          <button key={it.id} className={'sidebar-item' + (page===it.id?' active':'')} onClick={()=>onNav(it.id)}>
            <Icon name={it.icon} size={16}/> {it.label}
            {it.badge ? <span className="badge">{it.badge}</span> : null}
          </button>
        ))}
      </div>
      <div className="sidebar-section">Configuration</div>
      <div className="sidebar-nav">
        {items.slice(7).map(it => (
          <button key={it.id} className={'sidebar-item' + (page===it.id?' active':'')} onClick={()=>onNav(it.id)}>
            <Icon name={it.icon} size={16}/> {it.label}
          </button>
        ))}
      </div>
      <div className="sidebar-foot">
        <div className="sidebar-foot-avatar">AB</div>
        <div className="sidebar-foot-info">
          <div className="sidebar-foot-name">Arthur Bratigny</div>
          <div className="sidebar-foot-role">Administrateur</div>
        </div>
        <button className="btn-icon" title="Déconnexion" onClick={onLogout}>
          <Icon name="logout" size={14}/>
        </button>
      </div>
    </aside>
  );
};

const Topbar = ({ crumb, onPreview }) => (
  <header className="admin-topbar">
    <div className="admin-crumbs">
      <span>Backoffice</span>
      <span className="sep">/</span>
      <span className="current">{crumb}</span>
    </div>
    <div style={{display:'flex', alignItems:'center', gap:'.75rem'}}>
      <div className="admin-search">
        <Icon name="search" size={14}/>
        <input placeholder="Rechercher dans l’admin..."/>
        <kbd>⌘K</kbd>
      </div>
      <button className="btn-icon" title="Notifications"><Icon name="bell" size={15}/></button>
      <button className="btn btn-ghost btn-sm" onClick={onPreview}>
        <Icon name="eye" size={14}/> Aperçu du site
      </button>
    </div>
  </header>
);

/* ═══════════════ Dashboard ═══════════════ */
const VisitsChart = () => {
  const w = 700, h = 200, pad = 30;
  const max = Math.max(...visitsData.map(d => d.value)) * 1.15;
  const stepX = (w - pad*2) / (visitsData.length - 1);
  const pts = visitsData.map((d, i) => ({
    x: pad + i*stepX,
    y: h - pad - (d.value / max) * (h - pad*2),
    ...d,
  }));
  const path = pts.map((p, i) => (i===0?'M':'L') + p.x + ',' + p.y).join(' ');
  const area = path + ` L ${pts[pts.length-1].x},${h-pad} L ${pts[0].x},${h-pad} Z`;
  return (
    <div className="chart">
      <svg className="chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {[0,1,2,3].map(i => (
          <line key={i} className="chart-grid"
            x1={pad} x2={w-pad}
            y1={pad + i*((h-pad*2)/3)} y2={pad + i*((h-pad*2)/3)}/>
        ))}
        <path className="chart-area" d={area}/>
        <path className="chart-line" d={path}/>
        {pts.map((p, i) => (
          <g key={i}>
            <circle className="chart-dot" cx={p.x} cy={p.y} r="4"/>
            <text className="chart-label" x={p.x} y={h-8} textAnchor="middle">{p.day}</text>
            <text className="chart-label" x={p.x} y={p.y - 10} textAnchor="middle"
              style={{fontWeight:600, fill:'var(--color-text-primary)'}}>{p.value}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const Dashboard = ({ unreadCount }) => (
  <>
    <div className="admin-page-head">
      <div>
        <h1>Tableau de bord</h1>
        <p>Vue d’ensemble de votre portfolio · mis à jour il y a 2 min.</p>
      </div>
      <div style={{display:'flex',gap:'.5rem'}}>
        <button className="btn btn-ghost btn-sm"><Icon name="download" size={14}/> Exporter</button>
        <button className="btn btn-primary btn-sm"><Icon name="plus" size={14}/> Nouveau projet</button>
      </div>
    </div>

    <div className="stat-grid">
      <div className="stat-card">
        <div className="stat-card-head">
          <span>Visites · 7 j</span>
          <div className="stat-card-icon"><Icon name="eye" size={15}/></div>
        </div>
        <div className="stat-card-num">1 380</div>
        <div className="stat-card-foot">
          <span className="stat-trend-up">+18 %</span> vs semaine précédente
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-card-head">
          <span>Projets publiés</span>
          <div className="stat-card-icon"><Icon name="grid" size={15}/></div>
        </div>
        <div className="stat-card-num">12</div>
        <div className="stat-card-foot">
          <span className="stat-trend-up">+2</span> ce mois-ci
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-card-head">
          <span>Messages non lus</span>
          <div className="stat-card-icon"><Icon name="message" size={15}/></div>
        </div>
        <div className="stat-card-num">{unreadCount}</div>
        <div className="stat-card-foot">Dernier · il y a 2 h</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-head">
          <span>Sections actives</span>
          <div className="stat-card-icon"><Icon name="check-circle" size={15}/></div>
        </div>
        <div className="stat-card-num">7<span style={{fontSize:'1rem',color:'var(--color-text-muted)'}}>/7</span></div>
        <div className="stat-card-foot">Toutes les sections sont visibles</div>
      </div>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:'1rem'}}>
      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Visites des 7 derniers jours</h2>
            <p>Sessions uniques par jour · 1 380 au total</p>
          </div>
          <div style={{display:'flex',gap:'.4rem'}}>
            <button className="filter-tab active">7 j</button>
            <button className="filter-tab">30 j</button>
            <button className="filter-tab">90 j</button>
          </div>
        </div>
        <div className="panel-body">
          <VisitsChart/>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Derniers messages</h2>
          <button className="btn-icon"><Icon name="arrow-right" size={14}/></button>
        </div>
        <div className="msg-list">
          {messages.slice(0,4).map(m => (
            <div key={m.id} className={'msg-item' + (m.unread?' unread':'')}>
              <span className={'msg-unread-dot' + (m.unread?'':' read')}></span>
              <div className="msg-avatar">{m.avatar}</div>
              <div className="msg-content">
                <div className="msg-name">{m.name}</div>
                <div className="msg-subject">{m.subject}</div>
              </div>
              <span className="msg-time">{m.time}</span>
              <span></span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginTop:'1rem'}}>
      <div className="panel">
        <div className="panel-head">
          <h2>Top pages visitées</h2>
          <p>Sur les 7 derniers jours</p>
        </div>
        <div className="panel-body" style={{padding:0}}>
          {[
            { p: '/', label: 'Accueil', v: 612 },
            { p: '/#projects', label: 'Projets', v: 384 },
            { p: '/#contact', label: 'Contact', v: 198 },
            { p: '/#about', label: 'À propos', v: 156 },
          ].map((row, i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1rem 1.5rem',borderTop:i===0?'none':'1px solid var(--color-border)'}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:500,fontSize:'.92rem'}}>{row.label}</div>
                <div style={{fontFamily:'ui-monospace, monospace',fontSize:'.75rem',color:'var(--color-text-muted)'}}>{row.p}</div>
              </div>
              <div style={{width:'40%',height:6,background:'var(--color-bg-secondary)',borderRadius:'var(--radius-full)',overflow:'hidden'}}>
                <div style={{height:'100%',width:(row.v/612*100)+'%',background:'var(--color-accent)',borderRadius:'var(--radius-full)'}}></div>
              </div>
              <div style={{minWidth:50,textAlign:'right',fontVariantNumeric:'tabular-nums',fontWeight:500}}>{row.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Activité récente</h2>
        </div>
        <div className="panel-body">
          {[
            { ic:'message', t:'Léa Marchand vous a écrit', s:'il y a 2 h' },
            { ic:'edit', t:'Projet « Atlas » modifié', s:'il y a 5 h' },
            { ic:'check-circle', t:'Section « Formation » activée', s:'hier' },
            { ic:'plus', t:'Nouvelle compétence : Docker', s:'il y a 2 j' },
            { ic:'palette', t:'Thème changé pour Sable', s:'il y a 3 j' },
          ].map((a, i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'.85rem',padding:'.65rem 0',borderTop:i===0?'none':'1px dashed var(--color-border)'}}>
              <div style={{width:30,height:30,borderRadius:8,background:'var(--color-bg-secondary)',color:'var(--color-text-secondary)',display:'grid',placeItems:'center'}}>
                <Icon name={a.ic} size={14}/>
              </div>
              <div style={{flex:1,fontSize:'.88rem',color:'var(--color-text-primary)'}}>{a.t}</div>
              <div style={{fontSize:'.78rem',color:'var(--color-text-muted)'}}>{a.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

/* ═══════════════ Settings ═══════════════ */
const SettingsPage = ({ theme, onTheme, enabled, onToggle, toast }) => {
  const [title, setTitle] = React.useState('Margaux Lorin — Portfolio');
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Réglages</h1>
          <p>Configurez l’apparence, la visibilité des sections et les informations générales.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={()=>toast('Réglages sauvegardés')}>
          <Icon name="check" size={14}/> Sauvegarder
        </button>
      </div>

      <div style={{display:'grid',gap:'1rem'}}>
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Thème du site</h2>
              <p>Le changement est instantané sur le portfolio public.</p>
            </div>
          </div>
          <div className="panel-body">
            <div className="theme-grid">
              {themes.map(t => (
                <div key={t.id}
                  className={'theme-card' + (theme===t.id?' active':'')}
                  onClick={()=>{onTheme(t.id);toast('Thème « '+t.name+' » appliqué');}}>
                  <div className="theme-card-check"><Icon name="check" size={13}/></div>
                  <div className="theme-swatch" style={{background: t.c3}}>
                    <span style={{background: t.c1}}></span>
                    <span style={{background: t.c2}}></span>
                  </div>
                  <div className="theme-name">{t.name}</div>
                  <div className="theme-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Sections visibles</h2>
              <p>Activez ou désactivez les sections affichées sur le portfolio public.</p>
            </div>
            <span className="chip">
              {Object.values(enabled).filter(Boolean).length} / {sectionsList.length} actives
            </span>
          </div>
          <div className="panel-body" style={{padding:'0 1.5rem'}}>
            {sectionsList.map(s => (
              <div key={s.id} className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-label">{s.label}</div>
                  <div className="toggle-row-desc">{s.desc}</div>
                </div>
                <div
                  className={'toggle' + (enabled[s.id]?' on':'')}
                  onClick={()=>onToggle(s.id)}
                  role="switch"
                  aria-checked={enabled[s.id]}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Paramètres généraux</h2>
              <p>Informations de base du site.</p>
            </div>
          </div>
          <div className="panel-body" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem'}}>
            <div>
              <label className="field-label">Titre du site</label>
              <input value={title} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div>
              <label className="field-label">Langue par défaut</label>
              <select defaultValue="fr">
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="field-label">E-mail de notification</label>
              <input defaultValue="bonjour@margauxlorin.fr"/>
            </div>
            <div>
              <label className="field-label">URL canonique</label>
              <input defaultValue="https://margauxlorin.fr"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ═══════════════ Messages page ═══════════════ */
const MessagesPage = ({ items, onRead, onDelete, toast }) => {
  const [openId, setOpenId] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const visible = filter === 'all' ? items : items.filter(m => filter==='unread' ? m.unread : !m.unread);
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Messages reçus</h1>
          <p>{items.filter(m=>m.unread).length} non lus · {items.length} au total</p>
        </div>
        <div style={{display:'flex',gap:'.4rem'}}>
          <button className={'filter-tab'+(filter==='all'?' active':'')} onClick={()=>setFilter('all')}>Tous</button>
          <button className={'filter-tab'+(filter==='unread'?' active':'')} onClick={()=>setFilter('unread')}>Non lus</button>
          <button className={'filter-tab'+(filter==='read'?' active':'')} onClick={()=>setFilter('read')}>Lus</button>
        </div>
      </div>

      <div className="panel">
        <div className="msg-list">
          {visible.map(m => (
            <React.Fragment key={m.id}>
              <div className={'msg-item' + (m.unread?' unread':'')} onClick={()=>{setOpenId(openId===m.id?null:m.id); if(m.unread) onRead(m.id);}}>
                <span className={'msg-unread-dot' + (m.unread?'':' read')}></span>
                <div className="msg-avatar">{m.avatar}</div>
                <div className="msg-content">
                  <div className="msg-name">{m.name} <span className="email">{m.email}</span></div>
                  <div className="msg-subject">{m.subject}</div>
                </div>
                <span className="msg-time">{m.time}</span>
                <div className="msg-actions">
                  <button className="btn-icon" title="Marquer non lu" onClick={(e)=>{e.stopPropagation();toast(m.unread?'Marqué comme lu':'Marqué comme non lu');onRead(m.id);}}>
                    <Icon name={m.unread?'check':'eye-off'} size={14}/>
                  </button>
                  <button className="btn-icon" title="Supprimer" onClick={(e)=>{e.stopPropagation();onDelete(m.id);toast('Message supprimé');}}>
                    <Icon name="trash" size={14}/>
                  </button>
                </div>
              </div>
              {openId===m.id && (
                <div style={{padding:'1.25rem 1.5rem 1.5rem 4.5rem',borderBottom:'1px solid var(--color-border)',background:'var(--color-bg-secondary)'}}>
                  <p style={{marginBottom:'1rem',color:'var(--color-text-primary)'}}>{m.preview}</p>
                  <p style={{marginBottom:'1.25rem'}}>Bonjour Margaux, je vous écris suite à la recommandation d’une connaissance commune. Nous aimerions discuter d’une éventuelle collaboration sur un projet de plateforme éditoriale. Pouvons-nous convenir d’un appel cette semaine ? Cordialement,<br/>{m.name}</p>
                  <div style={{display:'flex',gap:'.5rem'}}>
                    <a className="btn btn-primary btn-sm" href={'mailto:'+m.email}><Icon name="mail" size={14}/> Répondre</a>
                    <button className="btn btn-ghost btn-sm" onClick={()=>setOpenId(null)}>Fermer</button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

/* ═══════════════ Projects admin page ═══════════════ */
const ProjectsAdmin = ({ toast }) => (
  <>
    <div className="admin-page-head">
      <div>
        <h1>Projets</h1>
        <p>Gérez les projets affichés sur le portfolio public.</p>
      </div>
      <button className="btn btn-primary btn-sm" onClick={()=>toast('Formulaire de création ouvert')}>
        <Icon name="plus" size={14}/> Nouveau projet
      </button>
    </div>
    <div className="panel">
      <table className="tbl">
        <thead>
          <tr>
            <th style={{width:30}}></th>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Année</th>
            <th>Technos</th>
            <th>Statut</th>
            <th style={{textAlign:'right'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr key={p.id}>
              <td className="tbl-row-handle">⋮⋮</td>
              <td>
                <div style={{fontWeight:500}}>{p.title}</div>
                <div style={{fontSize:'.78rem',color:'var(--color-text-muted)',marginTop:2}}>{p.short.slice(0,60)}…</div>
              </td>
              <td><span className="chip chip-neutral">{p.tag}</span></td>
              <td style={{fontFamily:'ui-monospace,monospace',fontSize:'.85rem'}}>{p.year}</td>
              <td>
                <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                  {p.techs.slice(0,3).map(t => <span key={t} className="project-tech">{t}</span>)}
                  {p.techs.length > 3 && <span className="project-tech">+{p.techs.length-3}</span>}
                </div>
              </td>
              <td>
                <span style={{display:'inline-flex',alignItems:'center',gap:'.4rem',fontSize:'.82rem'}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'var(--color-success)'}}></span>
                  Publié
                </span>
              </td>
              <td>
                <div className="tbl-actions">
                  <button className="btn-icon" title="Éditer"><Icon name="edit" size={13}/></button>
                  <button className="btn-icon" title="Voir"><Icon name="eye" size={13}/></button>
                  <button className="btn-icon" title="Supprimer"><Icon name="trash" size={13}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

/* ═══════════════ Profile admin page ═══════════════ */
const ProfileAdmin = ({ toast }) => {
  const [avail, setAvail] = React.useState(true);
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Profil</h1>
          <p>Informations personnelles affichées dans le hero et la section À propos.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={()=>toast('Profil enregistré')}>
          <Icon name="check" size={14}/> Sauvegarder
        </button>
      </div>

      <div className="panel">
        <div className="panel-body">
          <div className="form-section">
            <h3>Identité</h3>
            <p>Ces informations sont visibles publiquement.</p>
            <div style={{display:'grid',gridTemplateColumns:'140px 1fr 1fr',gap:'1.25rem',alignItems:'start'}}>
              <div>
                <label className="field-label">Photo</label>
                <div style={{width:120,height:120,borderRadius:'var(--radius-lg)',background:'linear-gradient(135deg, var(--mesh-1), var(--mesh-3))',display:'grid',placeItems:'center',color:'oklch(0.25 0.02 50 / 0.45)',fontFamily:'ui-monospace,monospace',fontSize:'.7rem',letterSpacing:'.15em'}}>PHOTO</div>
              </div>
              <div>
                <label className="field-label">Nom complet</label>
                <input defaultValue="Arthur Bratigny"/>
              </div>
              <div>
                <label className="field-label">Titre / fonction</label>
                <input defaultValue="Ingénieur logiciel Full-Stack"/>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Biographie</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div>
                <label className="field-label">Bio · FR</label>
                <textarea rows="5" defaultValue="Ingénieur en informatique, je développe des applications web depuis plusieurs années..."></textarea>
              </div>
              <div>
                <label className="field-label">Bio · EN</label>
                <textarea rows="5" defaultValue="Software engineer, I’ve been building web applications for several years..."></textarea>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Coordonnées</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div>
                <label className="field-label">E-mail</label>
                <input defaultValue="arthurbratigny@gmail.com"/>
              </div>
              <div>
                <label className="field-label">LinkedIn</label>
                <input defaultValue="linkedin.com/in/arthur-bratigny"/>
              </div>
              <div>
                <label className="field-label">GitHub</label>
                <input defaultValue="github.com/arthur-bratigny"/>
              </div>
              <div>
                <label className="field-label">Site personnel</label>
                <input defaultValue="arthurbratigny.dev"/>
              </div>
            </div>
          </div>

          <div className="form-section" style={{marginBottom:0}}>
            <h3>Disponibilité</h3>
            <div className="toggle-row" style={{border:'none',padding:0}}>
              <div className="toggle-row-info">
                <div className="toggle-row-label">Afficher le badge « Ouvert aux opportunités »</div>
                <div className="toggle-row-desc">Une pastille verte animée apparaîtra dans la navbar publique.</div>
              </div>
              <div className={'toggle' + (avail?' on':'')} onClick={()=>setAvail(!avail)}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ═══════════════ Generic page placeholder ═══════════════ */
const GenericAdminPage = ({ title, lede }) => (
  <>
    <div className="admin-page-head">
      <div>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
      <button className="btn btn-primary btn-sm"><Icon name="plus" size={14}/> Ajouter</button>
    </div>
    <div className="panel">
      <div className="panel-body" style={{padding:'4rem 2rem',textAlign:'center'}}>
        <div style={{width:48,height:48,margin:'0 auto 1rem',borderRadius:'var(--radius-md)',background:'var(--color-accent-soft)',color:'var(--color-accent)',display:'grid',placeItems:'center'}}>
          <Icon name="edit" size={20}/>
        </div>
        <p style={{maxWidth:380,margin:'0 auto'}}>Cette vue suit le même pattern : tableau triable, formulaires avec validation Zod, toast notifications et glisser-déposer pour réordonner.</p>
      </div>
    </div>
  </>
);

/* ═══════════════ Admin root ═══════════════ */
const AdminApp = ({ theme, lang, onTheme, onLogout, enabled, onToggle, onPreview }) => {
  const [page, setPage] = React.useState('dashboard');
  const [messageState, setMessageState] = React.useState(messages);
  const [toastMsg, setToastMsg] = React.useState(null);

  const toast = (m) => {
    setToastMsg(m);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const onRead = (id) => {
    setMessageState(s => s.map(m => m.id === id ? {...m, unread: !m.unread} : m));
  };
  const onDelete = (id) => {
    setMessageState(s => s.filter(m => m.id !== id));
  };

  const unreadCount = messageState.filter(m => m.unread).length;

  const crumbMap = {
    dashboard: 'Tableau de bord', profile: 'Profil', projects: 'Projets',
    experience: 'Expérience', education: 'Formation', skills: 'Compétences',
    messages: 'Messages', translations: 'Traductions', settings: 'Réglages',
  };

  let body;
  switch (page) {
    case 'dashboard': body = <Dashboard unreadCount={unreadCount}/>; break;
    case 'settings': body = <SettingsPage theme={theme} onTheme={onTheme} enabled={enabled} onToggle={onToggle} toast={toast}/>; break;
    case 'messages': body = <MessagesPage items={messageState} onRead={onRead} onDelete={onDelete} toast={toast}/>; break;
    case 'projects': body = <ProjectsAdmin toast={toast}/>; break;
    case 'profile': body = <ProfileAdmin toast={toast}/>; break;
    case 'experience': body = <GenericAdminPage title="Expérience" lede="Gérez les entrées de votre parcours professionnel."/>; break;
    case 'education': body = <GenericAdminPage title="Formation" lede="Gérez vos diplômes et formations."/>; break;
    case 'skills': body = <GenericAdminPage title="Compétences" lede="Organisez vos compétences par catégorie."/>; break;
    case 'translations': body = <GenericAdminPage title="Traductions" lede="Éditez les traductions FR / EN qui surchargent les fichiers JSON."/>; break;
    default: body = <Dashboard unreadCount={unreadCount}/>;
  }

  return (
    <div className="admin-shell">
      <Sidebar page={page} onNav={setPage} unreadCount={unreadCount} onLogout={onLogout}/>
      <div className="admin-main">
        <Topbar crumb={crumbMap[page]} onPreview={onPreview}/>
        <div className="admin-content">{body}</div>
      </div>
      {toastMsg && (
        <div className="toast"><Icon name="check-circle" size={15}/> {toastMsg}</div>
      )}
    </div>
  );
};

/* ═══════════════ Login screen ═══════════════ */
const LoginScreen = ({ onLogin, onBack }) => {
  const [user, setUser] = React.useState('admin');
  const [pw, setPw] = React.useState('••••••••');
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div className="login-shell">
      <div className="login-mesh"></div>
      <div className="login-card">
        <div style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'1.75rem'}}>
          <div className="nav-brand-mark">A</div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'.95rem',fontWeight:600,letterSpacing:'-0.01em'}}>
            Arthur<br/>
            <span style={{fontSize:'.72rem',color:'var(--color-text-muted)',fontFamily:'var(--font-sans)',letterSpacing:'.05em',fontWeight:400}}>Backoffice</span>
          </div>
        </div>
        <h1>Bienvenue.</h1>
        <p className="lede">Connectez-vous pour gérer votre portfolio.</p>
        <form onSubmit={(e)=>{e.preventDefault();onLogin();}}>
          <div style={{marginBottom:'1rem'}}>
            <label className="field-label">Identifiant</label>
            <input value={user} onChange={e=>setUser(e.target.value)}/>
          </div>
          <div style={{marginBottom:'1.5rem',position:'relative'}}>
            <label className="field-label">Mot de passe</label>
            <input type={showPw?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)}/>
            <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:10,top:30,background:'none',border:'none',color:'var(--color-text-muted)',padding:6,cursor:'pointer'}}>
              <Icon name={showPw?'eye-off':'eye'} size={15}/>
            </button>
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}}>
            Se connecter <Icon name="arrow-right" size={15}/>
          </button>
        </form>
        <button onClick={onBack} style={{marginTop:'1.25rem',display:'block',marginInline:'auto',fontSize:'.85rem',color:'var(--color-text-muted)',background:'none',border:'none',cursor:'pointer'}}>
          ← Retour au portfolio
        </button>
      </div>
    </div>
  );
};

Object.assign(window, {
  Sidebar, Topbar, Dashboard, SettingsPage, MessagesPage,
  ProjectsAdmin, ProfileAdmin, GenericAdminPage, AdminApp, LoginScreen,
});
