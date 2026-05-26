/* ═══════════════════════════════════════════════
   ROOT APP — orchestrates public + admin + theme
   ═══════════════════════════════════════════════ */

const App = () => {
  const [mode, setMode] = React.useState('public'); // 'public' | 'login' | 'admin'
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = tweaks.theme;
  const setTheme = (v) => setTweak('theme', v);
  const [lang, setLang] = React.useState('fr');
  const [enabled, setEnabled] = React.useState({
    hero: true, about: true, skills: true, projects: true,
    experience: true, education: true, contact: true,
  });

  React.useEffect(() => {
    applyTweaks(tweaks);
  }, [tweaks]);

  const toggleSection = (id) => {
    setEnabled(s => ({ ...s, [id]: !s[id] }));
  };

  return (
    <>
      {mode === 'public' && (
        <PublicPortfolio
          enabled={enabled}
          theme={theme}
          lang={lang}
          onLang={setLang}
          onLogin={() => setMode('login')}
        />
      )}
      {mode === 'login' && (
        <LoginScreen
          onLogin={() => setMode('admin')}
          onBack={() => setMode('public')}
        />
      )}
      {mode === 'admin' && (
        <AdminApp
          theme={theme}
          lang={lang}
          onTheme={setTheme}
          enabled={enabled}
          onToggle={toggleSection}
          onLogout={() => setMode('public')}
          onPreview={() => setMode('public')}
        />
      )}

      {/* Demo-only mode switcher */}
      <div className="mode-switch">
        <button className={mode==='public'?'active':''} onClick={()=>setMode('public')}>
          <Icon name="globe" size={13}/> &nbsp;Portfolio public
        </button>
        <button className={mode==='login'?'active':''} onClick={()=>setMode('login')}>
          <Icon name="lock" size={13}/> &nbsp;Login
        </button>
        <button className={mode==='admin'?'active':''} onClick={()=>setMode('admin')}>
          <Icon name="settings" size={13}/> &nbsp;Admin
        </button>
      </div>

      <TweaksLayer value={tweaks} setTweak={setTweak} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
