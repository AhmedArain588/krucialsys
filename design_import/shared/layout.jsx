// Krucial Systems — Shared Layout Components
// Load AFTER themes.js: <script type="text/babel" src="../shared/layout.jsx"></script>

const { useState, useEffect } = React;

function useInView(threshold = 0.15) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── NAV LINKS (all pages) ────────────────────────────────────────────────────
const NAV_ITEMS_INNER = [
  { label: 'Services', href: 'services.html', children: [
    { label: 'AI Solutions',           href: 'ai-solutions.html' },
    { label: 'CCTV AI Systems',        href: 'cctv-ai.html' },
    { label: 'Automation',             href: 'automation.html' },
    { label: 'Data Digitisation',      href: 'data-digitisation.html' },
    { label: 'IoT & Smart Systems',    href: 'iot-smart-systems.html' },
    { label: 'Cloud & Infrastructure', href: 'cloud-infrastructure.html' },
  ]},
  { label: 'Industries',   href: 'industries.html' },
  { label: 'Case Studies', href: 'case-studies.html' },
  { label: 'About',        href: 'about.html' },
  { label: 'Contact',      href: 'contact.html' },
];

// ── NAVBAR ───────────────────────────────────────────────────────────────────
function SharedNavbar({ theme: t, onDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDD, setOpenDD] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background: scrolled ? `${t.bg}ee` : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${t.accent}22` : 'none', transition:'all 0.4s', padding:'0 5%' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>
        <a href="../Krucial Systems.html" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
          <img src="../uploads/logo-1777108586958.png" style={{ height:36, filter: t.logoFilter || 'invert(1)' }} alt="Krucial Systems" />
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:18, color:t.text, letterSpacing:'-0.02em' }}>Krucial <span style={{ color:t.accent }}>Systems</span></span>
        </a>

        {/* Desktop */}
        <div style={{ display:'flex', gap:4, alignItems:'center' }} className="nav-links">
          {NAV_ITEMS_INNER.map(item => (
            <div key={item.label} style={{ position:'relative' }}
              onMouseEnter={() => setOpenDD(item.label)}
              onMouseLeave={() => setOpenDD(null)}>
              <a href={item.href}
                style={{ display:'flex', alignItems:'center', gap:4, color: openDD === item.label ? t.accent : t.textMuted, fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:500, textDecoration:'none', padding:'8px 12px', borderRadius:6, transition:'color 0.2s' }}>
                {item.label}
                {item.children && <span style={{ fontSize:10, opacity:0.7, display:'inline-block', transition:'transform 0.2s', transform: openDD === item.label ? 'rotate(180deg)' : 'none' }}>▾</span>}
              </a>
              {item.children && openDD === item.label && (
                <div style={{ position:'absolute', top:'100%', left:0, background:t.bgCard||t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:12, padding:'8px', minWidth:220, boxShadow:'0 20px 60px #00000055', zIndex:200 }}>
                  {item.children.map(child => (
                    <a key={child.label} href={child.href}
                      style={{ display:'block', padding:'10px 14px', color:t.textMuted, fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:500, textDecoration:'none', borderRadius:8, transition:'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background=`${t.accent}18`; e.currentTarget.style.color=t.accent; }}
                      onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=t.textMuted; }}>
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={onDemo} style={{ marginLeft:8, background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:6, padding:'10px 22px', fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:14, cursor:'pointer', boxShadow:`0 0 20px ${t.accent}44`, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow=`0 6px 30px ${t.accent}77`;}}
            onMouseLeave={e=>{e.target.style.transform='';e.target.style.boxShadow=`0 0 20px ${t.accent}44`;}}>Book a Demo</button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display:'none', background:'none', border:`1px solid ${t.accent}55`, borderRadius:6, padding:'8px 10px', cursor:'pointer', flexDirection:'column', gap:4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width:20, height:2, background:t.accent }} />)}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background:t.bg, borderTop:`1px solid ${t.accent}22`, padding:'16px 5% 24px', maxHeight:'80vh', overflowY:'auto' }}>
          {NAV_ITEMS_INNER.map(item => (
            <div key={item.label}>
              <a href={item.href} style={{ display:'block', color:t.text, fontFamily:"'Space Grotesk',sans-serif", padding:'12px 0', borderBottom:`1px solid ${t.accent}11`, fontSize:15, fontWeight:600, textDecoration:'none' }}>{item.label}</a>
              {item.children && item.children.map(child => (
                <a key={child.label} href={child.href} style={{ display:'block', color:t.textMuted, fontFamily:"'Space Grotesk',sans-serif", padding:'9px 0 9px 16px', borderBottom:`1px solid ${t.accent}08`, fontSize:13, textDecoration:'none' }}>→ {child.label}</a>
              ))}
            </div>
          ))}
          <button onClick={onDemo} style={{ marginTop:16, width:'100%', background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:6, padding:12, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:15, cursor:'pointer' }}>Book a Demo</button>
        </div>
      )}
    </nav>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function SharedFooter({ theme: t }) {
  const cols = [
    { title:'Company',  links:[['About Us','about.html'],['Careers','#'],['Blog','#'],['Press','#']] },
    { title:'Services', links:[['AI Solutions','ai-solutions.html'],['CCTV AI Systems','cctv-ai.html'],['Automation','automation.html'],['Data Digitisation','data-digitisation.html'],['IoT & Smart Systems','iot-smart-systems.html'],['Cloud & Infrastructure','cloud-infrastructure.html']] },
    { title:'Company',  links:[['Industries','industries.html'],['Case Studies','case-studies.html'],['Contact','contact.html'],['Privacy Policy','#'],['Terms','#']] },
  ];
  return (
    <footer style={{ background:t.bgAlt, borderTop:`1px solid ${t.accent}22`, padding:'60px 5% 32px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:48, marginBottom:48 }} className="footer-grid">
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <img src="../uploads/logo-1777108586958.png" style={{ height:32, filter:t.logoFilter||'invert(1)' }} alt="Krucial" />
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:16, color:t.text }}>Krucial <span style={{ color:t.accent }}>Systems</span></span>
            </div>
            <p style={{ color:t.textMuted, fontSize:14, lineHeight:1.7, maxWidth:280 }}>Intelligent AI solutions built for real-world impact — designed, deployed, and scaled for your business.</p>
            <div style={{ marginTop:20 }}>
              {[['Mail','info@krucialsystems.com'],['Phone','+92 (21) 000-0000'],['MapPin','Karachi, Pakistan']].map(([iconName,val])=>(
                <div key={val} style={{ color:t.textMuted, fontSize:13, marginBottom:6, display:'flex', alignItems:'center', gap:8 }}>
                  <Icon name={iconName} size={14} color={t.accent} />{val}
                </div>
              ))}
            </div>
          </div>
          {cols.map(col=>(
            <div key={col.title+col.links[0]}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:12, color:t.text, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:20 }}>{col.title}</div>
              {col.links.map(([label,href])=>(
                <a key={label} href={href} style={{ display:'block', color:t.textMuted, fontSize:14, marginBottom:10, textDecoration:'none', transition:'color 0.2s', fontFamily:"'Inter',sans-serif" }}
                  onMouseEnter={e=>e.target.style.color=t.accent} onMouseLeave={e=>e.target.style.color=t.textMuted}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${t.accent}15`, paddingTop:28, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <span style={{ color:t.textMuted, fontSize:13, fontFamily:"'Space Grotesk',sans-serif" }}>© 2026 Krucial Systems — All Rights Reserved</span>
          <span style={{ color:t.textMuted, fontSize:13 }}>Karachi · Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

// ── THEME SWITCHER ────────────────────────────────────────────────────────────
function SharedThemeSwitcher({ current, onChange }) {
  const [open, setOpen] = useState(false);
  const swatches = [
    { key:'darkBlue',      color:'#0A84FF', label:'Dark Blue' },
    { key:'midnightGreen', color:'#00C896', label:'Midnight Green' },
    { key:'navyGold',      color:'#1A3A8F', label:'Corporate Navy' },
    { key:'darkViolet',    color:'#9B6DFF', label:'Dark Violet' },
    { key:'darkGold',      color:'#E8A020', label:'Dark Gold' },
  ];
  const t = THEMES[current];
  return (
    <div style={{ position:'fixed', bottom:28, left:28, zIndex:1500, display:'flex', flexDirection:'column', alignItems:'flex-start', gap:8 }}>
      {open && (
        <div style={{ background:t.bgCard||t.bgAlt, border:`1px solid ${t.accent}44`, borderRadius:14, padding:'16px 14px', display:'flex', flexDirection:'column', gap:8, boxShadow:'0 20px 60px #00000066' }}>
          <div style={{ color:t.textMuted, fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 }}>Color Theme</div>
          {swatches.map(s=>(
            <button key={s.key} onClick={()=>{ onChange(s.key); setOpen(false); }}
              style={{ display:'flex', alignItems:'center', gap:10, background: current===s.key ? `${s.color}22`:'transparent', border:`1px solid ${current===s.key?s.color:'transparent'}`, borderRadius:8, padding:'8px 12px', cursor:'pointer', transition:'all 0.2s' }}>
              <div style={{ width:14, height:14, borderRadius:'50%', background:s.color, boxShadow:`0 0 8px ${s.color}88`, flexShrink:0 }} />
              <span style={{ color:t.text, fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight: current===s.key?700:500 }}>{s.label}</span>
              {current===s.key && <span style={{ color:s.color, fontSize:12, marginLeft:'auto' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} title="Change Color Theme"
        style={{ width:44, height:44, borderRadius:'50%', background:t.accent, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 20px ${t.accent}66`, transition:'all 0.3s', fontSize:18 }}>🎨</button>
    </div>
  );
}

// ── DEMO MODAL ────────────────────────────────────────────────────────────────
function SharedDemoModal({ theme: t, onClose }) {
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' });
  const [sent, setSent] = useState(false);
  return (
    <div style={{ position:'fixed', inset:0, background:'#00000088', backdropFilter:'blur(8px)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:t.bg, border:`1px solid ${t.accent}44`, borderRadius:20, padding:'48px 40px', width:'100%', maxWidth:480, position:'relative', boxShadow:`0 40px 100px ${t.accent}22` }}>
        <button onClick={onClose} style={{ position:'absolute', top:20, right:20, background:'none', border:'none', color:t.textMuted, cursor:'pointer', fontSize:20 }}>✕</button>
        {sent ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:48, marginBottom:20, color:t.accent }}>✓</div>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", color:t.text, fontSize:24, fontWeight:700, marginBottom:12 }}>Request Received!</h3>
            <p style={{ color:t.textMuted, fontSize:15 }}>Our team will reach out within 24 hours.</p>
          </div>
        ) : (
          <>
            <div style={{ color:t.accent, fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:10 }}>Book a Demo</div>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", color:t.text, fontSize:26, fontWeight:800, letterSpacing:'-0.02em', marginBottom:28 }}>Let's Talk AI</h3>
            <form onSubmit={e=>{ e.preventDefault(); setSent(true); }}>
              {[['name','Full Name'],['email','Work Email'],['company','Company']].map(([f,l])=>(
                <div key={f} style={{ marginBottom:14 }}>
                  <label style={{ display:'block', color:t.textMuted, fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:600, marginBottom:5, letterSpacing:'0.06em', textTransform:'uppercase' }}>{l}</label>
                  <input type={f==='email'?'email':'text'} required value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})}
                    style={{ width:'100%', background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:8, padding:'11px 13px', color:t.text, fontFamily:"'Inter',sans-serif", fontSize:14, outline:'none', boxSizing:'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', color:t.textMuted, fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:600, marginBottom:5, letterSpacing:'0.06em', textTransform:'uppercase' }}>Your Needs</label>
                <textarea rows={3} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  style={{ width:'100%', background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:8, padding:'11px 13px', color:t.text, fontFamily:"'Inter',sans-serif", fontSize:14, outline:'none', resize:'vertical', boxSizing:'border-box' }} />
              </div>
              <button type="submit" style={{ width:'100%', background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:8, padding:14, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }}>
                Send Request →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── PAGE HERO (reusable) ──────────────────────────────────────────────────────
function PageHero({ theme: t, badge, title, highlight, subtitle, cta, onCta }) {
  return (
    <section style={{ position:'relative', background:t.bg, paddingTop:130, paddingBottom:80, paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
      <div style={{ position:'absolute', top:'30%', right:'10%', width:400, height:400, borderRadius:'50%', background:`${t.accent}0A`, filter:'blur(60px)' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:100, padding:'6px 16px', marginBottom:28 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }} />
          <span style={{ color:t.accent, fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }}>{badge}</span>
        </div>
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'clamp(36px,5vw,68px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:24, maxWidth:800 }}>
          {title} <span style={{ color:t.accent }}>{highlight}</span>
        </h1>
        <p style={{ color:t.textMuted, fontSize:'clamp(15px,1.5vw,18px)', lineHeight:1.7, maxWidth:560, marginBottom:40 }}>{subtitle}</p>
        {cta && (
          <button onClick={onCta} style={{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:8, padding:'15px 32px', fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44`, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.target.style.transform='translateY(-3px)';e.target.style.boxShadow=`0 8px 40px ${t.accent}66`;}}
            onMouseLeave={e=>{e.target.style.transform='';e.target.style.boxShadow=`0 0 40px ${t.accent}44`;}}>{cta}</button>
        )}
      </div>
    </section>
  );
}

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
function SectionLabel({ theme: t, label }) {
  return <div style={{ color:t.accent, fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:16 }}>{label}</div>;
}

// ── SECTION HEADING ───────────────────────────────────────────────────────────
function SectionHeading({ theme: t, children, sub }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom: sub?16:0 }}>{children}</h2>
      {sub && <p style={{ color:t.textMuted, fontSize:17, lineHeight:1.7, maxWidth:560 }}>{sub}</p>}
    </div>
  );
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ theme: t, value, label }) {
  return (
    <div style={{ textAlign:'center', padding:'28px 20px', background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:12 }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:36, fontWeight:800, color:t.accent, marginBottom:8 }}>{value}</div>
      <div style={{ color:t.textMuted, fontSize:13, fontWeight:500, letterSpacing:'0.04em', fontFamily:"'Space Grotesk',sans-serif" }}>{label}</div>
    </div>
  );
}

// ── FEATURE CARD ──────────────────────────────────────────────────────────────
function FeatureCard({ theme: t, icon, title, desc, delay=0, visible=true }) {
  return (
    <div style={{ background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:14, padding:'28px 24px', opacity:visible?1:0, transform:visible?'none':'translateY(20px)', transition:`all 0.6s ease ${delay}s`, cursor:'default' }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=`${t.accent}55`;e.currentTarget.style.transform='translateY(-4px)';}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=`${t.accent}22`;e.currentTarget.style.transform='none';}}>
      <div style={{ width:44, height:44, borderRadius:10, background:`${t.accent}18`, border:`1px solid ${t.accent}33`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, color:t.accent }}>
        <Icon name={icon} size={20} color={t.accent} />
      </div>
      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:700, color:t.text, marginBottom:8 }}>{title}</h3>
      <p style={{ color:t.textMuted, fontSize:14, lineHeight:1.65 }}>{desc}</p>
    </div>
  );
}

// ── ICON WRAPPER ─────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.8, style }) {
  const KSIcon = window.KSIcon;
  if (!KSIcon) return <span style={{ display:'inline-block', width:size, height:size }} />;
  return <KSIcon name={name} size={size} color={color} strokeWidth={strokeWidth} style={style} />;
}

// ── PAGE SHELL (wraps a full page) ────────────────────────────────────────────
function PageShell({ children }) {
  const [themeKey, setThemeKey] = React.useState(getSavedTheme);
  const [demoOpen, setDemoOpen] = React.useState(false);
  const theme = THEMES[themeKey];

  const handleTheme = (k) => { setThemeKey(k); saveTheme(k); };

  React.useEffect(() => {
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
  }, [theme.bg]);

  return (
    <div style={{ background:theme.bg, minHeight:'100vh' }}>
      <SharedNavbar theme={theme} onDemo={()=>setDemoOpen(true)} />
      {typeof children === 'function' ? children(theme, ()=>setDemoOpen(true)) : children}
      <SharedFooter theme={theme} />
      {demoOpen && <SharedDemoModal theme={theme} onClose={()=>setDemoOpen(false)} />}
      <SharedThemeSwitcher current={themeKey} onChange={handleTheme} />
    </div>
  );
}

Object.assign(window, { useInView, Icon, SharedNavbar, SharedFooter, SharedThemeSwitcher, SharedDemoModal, PageHero, SectionLabel, SectionHeading, StatCard, FeatureCard, PageShell });
