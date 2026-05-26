/* ═══════════════════════════════════════════════
   TWEAKS — Style variations
   ═══════════════════════════════════════════════ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "sable",
  "typeStyle": "fraunces",
  "density": "regular",
  "cardStyle": "soft",
  "heroStyle": "split",
  "radius": 20,
  "showAvailable": true,
  "showGrid": true,
  "accent": "warm"
}/*EDITMODE-END*/;

/* Apply tweaks to the DOM via data-attributes + CSS variables */
const applyTweaks = (t) => {
  const root = document.documentElement;
  root.dataset.theme = t.theme;
  root.dataset.density = t.density;
  root.dataset.card = t.cardStyle;
  root.dataset.hero = t.heroStyle;
  root.dataset.type = t.typeStyle;
  root.dataset.accent = t.accent;
  root.dataset.available = t.showAvailable ? '1' : '0';
  root.dataset.grid = t.showGrid ? '1' : '0';
  root.style.setProperty('--radius-lg', t.radius + 'px');
  root.style.setProperty('--radius-xl', (t.radius + 8) + 'px');

  // Type families
  const typeMap = {
    fraunces: { display: "'Fraunces', serif", sans: "'Inter', system-ui, sans-serif" },
    inter:    { display: "'Inter', system-ui, sans-serif", sans: "'Inter', system-ui, sans-serif" },
    playfair: { display: "'Playfair Display', serif", sans: "'Inter', system-ui, sans-serif" },
    mono:     { display: "'Space Grotesk', sans-serif", sans: "'JetBrains Mono', ui-monospace, monospace" },
  };
  const tt = typeMap[t.typeStyle] || typeMap.fraunces;
  root.style.setProperty('--font-display', tt.display);
  root.style.setProperty('--font-sans', tt.sans);

  // Accent intensity
  const accentMap = {
    warm:  { sable: 'oklch(0.58 0.12 35)', foret: 'oklch(0.45 0.12 160)', crepuscule: 'oklch(0.55 0.14 350)', papier: 'oklch(0.32 0.10 255)' },
    vivid: { sable: 'oklch(0.58 0.20 35)', foret: 'oklch(0.50 0.18 160)', crepuscule: 'oklch(0.58 0.22 350)', papier: 'oklch(0.45 0.20 260)' },
    muted: { sable: 'oklch(0.55 0.06 35)', foret: 'oklch(0.45 0.06 160)', crepuscule: 'oklch(0.52 0.06 350)', papier: 'oklch(0.40 0.05 255)' },
  };
  const acc = (accentMap[t.accent] || accentMap.warm)[t.theme];
  if (acc) root.style.setProperty('--color-accent', acc);
};

const TweaksLayer = ({ value, setTweak }) => {
  React.useEffect(() => { applyTweaks(value); }, [value]);

  const set = (k, v) => setTweak(k, v);

  return (
    <TweaksPanel>
      <TweakSection label="Apparence" />
      <TweakRadio
        label="Thème"
        value={value.theme}
        options={['sable', 'foret', 'crepuscule', 'papier']}
        onChange={v => set('theme', v)}
      />
      <TweakRadio
        label="Intensité accent"
        value={value.accent}
        options={['muted', 'warm', 'vivid']}
        onChange={v => set('accent', v)}
      />

      <TweakSection label="Typographie" />
      <TweakRadio
        label="Pairing"
        value={value.typeStyle}
        options={['fraunces', 'inter', 'playfair', 'mono']}
        onChange={v => set('typeStyle', v)}
      />

      <TweakSection label="Mise en page" />
      <TweakRadio
        label="Hero"
        value={value.heroStyle}
        options={['split', 'centered', 'minimal']}
        onChange={v => set('heroStyle', v)}
      />
      <TweakRadio
        label="Densité"
        value={value.density}
        options={['compact', 'regular', 'comfy']}
        onChange={v => set('density', v)}
      />
      <TweakRadio
        label="Cartes"
        value={value.cardStyle}
        options={['soft', 'flat', 'glass']}
        onChange={v => set('cardStyle', v)}
      />
      <TweakSlider
        label="Arrondis"
        value={value.radius}
        min={0} max={32} step={2} unit="px"
        onChange={v => set('radius', v)}
      />

      <TweakSection label="Détails" />
      <TweakToggle
        label="Badge « Disponible »"
        value={value.showAvailable}
        onChange={v => set('showAvailable', v)}
      />
      <TweakToggle
        label="Grille du hero"
        value={value.showGrid}
        onChange={v => set('showGrid', v)}
      />
    </TweaksPanel>
  );
};

Object.assign(window, { TWEAK_DEFAULTS, TweaksLayer, applyTweaks });
