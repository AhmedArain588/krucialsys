// Krucial Systems — Section Components
// Exported to window for use in main file

const { useState, useEffect, useRef } = React;

function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.8, style }) {
  const KSIcon = window.KSIcon;
  if (!KSIcon) return <span style={{ display:'inline-block', width:size, height:size }} />;
  return <KSIcon name={name} size={size} color={color} strokeWidth={strokeWidth} style={style} />;
}

// ── Utility: animate on scroll ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Services', href: 'pages/services.html', children: [
    { label: 'AI Solutions',          href: 'pages/ai-solutions.html' },
    { label: 'CCTV AI Systems',       href: 'pages/cctv-ai.html' },
    { label: 'Automation',            href: 'pages/automation.html' },
    { label: 'Data Digitisation',     href: 'pages/data-digitisation.html' },
    { label: 'IoT & Smart Systems',   href: 'pages/iot-smart-systems.html' },
    { label: 'Cloud & Infrastructure',href: 'pages/cloud-infrastructure.html' },
  ]},
  { label: 'Industries',   href: 'pages/industries.html' },
  { label: 'Case Studies', href: 'pages/case-studies.html' },
  { label: 'About',        href: 'pages/about.html' },
  { label: 'Contact',      href: 'pages/contact.html' },
];

// ── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ theme: t, onDemoClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background: scrolled ? `${t.bg}ee` : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${t.accent}22` : 'none', transition:'all 0.4s ease', padding:'0 5%' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>
        {/* Logo */}
        <a href="Krucial Systems.html" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
          <img src={window.__resources && window.__resources.logo || "uploads/logo-1777108586958.png"} alt="Krucial Systems" style={{ height:38, filter: t.logoFilter || 'invert(1)', transition:'filter 0.3s' }} />
          <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:18, color:t.text, letterSpacing:'-0.02em' }}>
            Krucial <span style={{ color:t.accent }}>Systems</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display:'flex', gap:4, alignItems:'center' }} className="nav-links">
          {NAV_ITEMS.map(item => (
            <div key={item.label} style={{ position:'relative' }}
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}>
              <a href={item.href}
                style={{ display:'flex', alignItems:'center', gap:4, color: openDropdown === item.label ? t.accent : t.textMuted, fontFamily:"'Space Grotesk', sans-serif", fontSize:14, fontWeight:500, textDecoration:'none', letterSpacing:'0.02em', transition:'color 0.2s', padding:'8px 12px', borderRadius:6 }}>
                {item.label}
                {item.children && <span style={{ fontSize:10, opacity:0.7, transition:'transform 0.2s', transform: openDropdown === item.label ? 'rotate(180deg)' : 'none', display:'inline-block' }}>▾</span>}
              </a>
              {item.children && openDropdown === item.label && (
                <div style={{ position:'absolute', top:'100%', left:0, background:t.bgCard||t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:12, padding:'8px', minWidth:220, boxShadow:`0 20px 60px #00000055`, zIndex:200 }}>
                  {item.children.map(child => (
                    <a key={child.label} href={child.href}
                      style={{ display:'block', padding:'10px 14px', color:t.textMuted, fontFamily:"'Space Grotesk', sans-serif", fontSize:13, fontWeight:500, textDecoration:'none', borderRadius:8, transition:'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background=`${t.accent}18`; e.currentTarget.style.color=t.accent; }}
                      onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=t.textMuted; }}>
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={onDemoClick}
            style={{ marginLeft:8, background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:6, padding:'10px 22px', fontFamily:"'Space Grotesk', sans-serif", fontWeight:600, fontSize:14, cursor:'pointer', letterSpacing:'0.03em', transition:'all 0.2s', boxShadow:`0 0 20px ${t.accent}55` }}
            onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow=`0 4px 30px ${t.accent}88`; }}
            onMouseLeave={e => { e.target.style.transform=''; e.target.style.boxShadow=`0 0 20px ${t.accent}55`; }}>
            Get in Touch
          </button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display:'none', background:'none', border:`1px solid ${t.accent}66`, borderRadius:6, padding:'8px 10px', cursor:'pointer', color:t.text, flexDirection:'column', gap:4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width:20, height:2, background:t.accent }} />)}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background:t.bg, borderTop:`1px solid ${t.accent}33`, padding:'16px 5% 24px', maxHeight:'80vh', overflowY:'auto' }}>
          {NAV_ITEMS.map(item => (
            <div key={item.label}>
              <a href={item.href} style={{ display:'block', color:t.text, fontFamily:"'Space Grotesk', sans-serif", padding:'12px 0', borderBottom:`1px solid ${t.accent}11`, fontSize:15, fontWeight:600, textDecoration:'none' }}>{item.label}</a>
              {item.children && item.children.map(child => (
                <a key={child.label} href={child.href} style={{ display:'block', color:t.textMuted, fontFamily:"'Space Grotesk', sans-serif", padding:'9px 0 9px 16px', borderBottom:`1px solid ${t.accent}08`, fontSize:13, textDecoration:'none' }}>→ {child.label}</a>
              ))}
            </div>
          ))}
          <button onClick={onDemoClick} style={{ marginTop:16, width:'100%', background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:6, padding:12, fontFamily:"'Space Grotesk', sans-serif", fontWeight:600, fontSize:15, cursor:'pointer' }}>Get in Touch</button>
        </div>
      )}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ theme, onDemoClick }) {
  const canvasRef = useRef(null);
  const t = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    function init() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = t.accent + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw nodes
      particles.forEach(p => {
        p.pulse += 0.03;
        const pAlpha = 0.5 + 0.5 * Math.sin(p.pulse);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = t.accent + Math.floor(pAlpha * 200).toString(16).padStart(2, '0');
        ctx.fill();
        // glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = t.accent + '18';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [t.accent]);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Canvas BG */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }} />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 70% 50%, ${t.accent}12 0%, transparent 60%)` }} />

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${t.accent}08 1px, transparent 1px), linear-gradient(90deg, ${t.accent}08 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 5% 80px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${t.accent}18`, border: `1px solid ${t.accent}44`, borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.accent, boxShadow: `0 0 8px ${t.accent}` }} />
              <span style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>AI-Powered Solutions</span>
            </div>

            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 800, color: t.text, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
              Intelligent AI<br />
              <span style={{ color: t.accent }}>Solutions</span> Built<br />
              for Real-World<br />Impact
            </h1>

            <p style={{ color: t.textMuted, fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, maxWidth: 480, marginBottom: 40, fontFamily: "'Inter', sans-serif" }}>
              From CCTV analytics to data digitisation and automation — we design, deploy, and scale AI systems tailored to your business.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={onDemoClick}
                style={{ background: t.accent, color: t.accentText || '#fff', border: 'none', borderRadius: 8, padding: '15px 32px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: `0 0 40px ${t.accent}44`, transition: 'all 0.2s', letterSpacing: '0.02em' }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = `0 8px 40px ${t.accent}66`; }}
                onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = `0 0 40px ${t.accent}44`; }}>
                Get a Free Consultation
              </button>
              <button
                style={{ background: 'transparent', color: t.text, border: `1px solid ${t.accent}55`, borderRadius: 8, padding: '15px 32px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.borderColor = t.accent; e.target.style.background = `${t.accent}11`; }}
                onMouseLeave={e => { e.target.style.borderColor = `${t.accent}55`; e.target.style.background = 'transparent'; }}>
                View Our Work →
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 40, borderTop: `1px solid ${t.accent}22` }}>
              {[['50+', 'Projects Delivered'], ['12+', 'Industries Served'], ['99.9%', 'Uptime SLA']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: t.accent }}>{num}</div>
                  <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Dashboard Visual */}
          <div style={{ position: 'relative' }} className="hero-visual">
            <AIDashboardVisual theme={t} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}>
        <span style={{ color: t.textMuted, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${t.accent}, transparent)` }} />
      </div>
    </section>
  );
}

function AIDashboardVisual({ theme: t }) {
  const [tick, setTick] = React.useState(0);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTick(x => x + 1), 900);
    return () => clearInterval(id);
  }, []);

  // Mini neural network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const nodes = [
      // input layer
      ...[0.2,0.35,0.5,0.65,0.8].map((y,i) => ({ x:0.12, y, layer:0, id:i })),
      // hidden 1
      ...[0.25,0.42,0.58,0.75].map((y,i) => ({ x:0.38, y, layer:1, id:i+5 })),
      // hidden 2
      ...[0.3,0.5,0.7].map((y,i) => ({ x:0.62, y, layer:2, id:i+9 })),
      // output
      ...[0.35,0.5,0.65].map((y,i) => ({ x:0.85, y, layer:3, id:i+12 })),
    ];
    let phase = 0;
    function draw() {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0,0,w,h);
      phase += 0.025;
      // connections
      nodes.forEach(n => {
        nodes.filter(m => m.layer === n.layer+1).forEach(m => {
          const pulse = Math.sin(phase - n.x * 8) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.moveTo(n.x*w, n.y*h);
          ctx.lineTo(m.x*w, m.y*h);
          ctx.strokeStyle = t.accent + Math.floor(pulse * 60 + 15).toString(16).padStart(2,'0');
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });
      });
      // nodes
      nodes.forEach(n => {
        const pulse = Math.sin(phase - n.x * 6 + n.y * 3) * 0.5 + 0.5;
        const r = 4 + pulse * 2;
        ctx.beginPath();
        ctx.arc(n.x*w, n.y*h, r, 0, Math.PI*2);
        ctx.fillStyle = t.accent + Math.floor(pulse * 180 + 60).toString(16).padStart(2,'0');
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x*w, n.y*h, r*2.5, 0, Math.PI*2);
        ctx.fillStyle = t.accent + '18';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
    return () => cancelAnimationFrame(animId);
  }, [t.accent]);

  const wavePoints = Array.from({length: 40}, (_,i) => {
    const x = (i/39)*100;
    const y = 50 - Math.sin(i*0.4 + tick*0.3)*18 - Math.sin(i*0.8 + tick*0.5)*10;
    return `${x},${y}`;
  }).join(' ');

  const barData = [72,55,88,43,96,67,81,59,74,90,52,85];

  return (
    <div style={{ position:'relative', userSelect:'none' }}>
      {/* Glow behind */}
      <div style={{ position:'absolute', top:'20%', left:'10%', width:'80%', height:'60%', background:`${t.accent}15`, filter:'blur(50px)', borderRadius:'50%', pointerEvents:'none' }} />

      {/* Main panel */}
      <div style={{ position:'relative', background:`${t.bgCard||t.bgAlt}`, border:`1px solid ${t.accent}33`, borderRadius:20, padding:20, backdropFilter:'blur(10px)' }}>

        {/* Top row: header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:14, color:t.text }}>Krucial AI Platform</div>
            <div style={{ color:t.textMuted, fontSize:11, marginTop:2 }}>Live Operations Dashboard</div>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#00C896', boxShadow:'0 0 8px #00C896' }} />
            <span style={{ color:'#00C896', fontSize:11, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700 }}>LIVE</span>
          </div>
        </div>

        {/* Neural network canvas — full width */}
        <div style={{ background:`${t.accent}08`, border:`1px solid ${t.accent}18`, borderRadius:12, marginBottom:12, overflow:'hidden', position:'relative' }}>
          <div style={{ position:'absolute', top:8, left:12, color:t.textMuted, fontSize:10, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'0.08em', textTransform:'uppercase', zIndex:1 }}>Neural Model — Inference Active</div>
          <canvas ref={canvasRef} style={{ width:'100%', height:110, display:'block' }} />
          <div style={{ position:'absolute', bottom:8, right:12, background:`${t.accent}22`, borderRadius:6, padding:'3px 10px' }}>
            <span style={{ color:t.accent, fontSize:10, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>98.4% accuracy</span>
          </div>
        </div>

        {/* Middle row: 3 mini cards */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:12 }}>
          {/* Camera feeds */}
          <div style={{ background:`${t.accent}08`, border:`1px solid ${t.accent}18`, borderRadius:10, padding:'10px 12px' }}>
            <div style={{ color:t.textMuted, fontSize:9, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8, fontFamily:"'Space Grotesk',sans-serif" }}>CCTV Feeds</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
              {['CAM_01','CAM_02','CAM_03','CAM_04'].map((cam,i) => (
                <div key={cam} style={{ background:`${t.accent}${i===tick%4?'30':'12'}`, borderRadius:4, height:28, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${t.accent}${i===tick%4?'66':'22'}`, transition:'all 0.4s' }}>
                  <span style={{ color: i===tick%4 ? t.accent : t.textMuted, fontSize:8, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>{cam}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:6, color:t.accent, fontSize:9, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>4 Active · 0 Alerts</div>
          </div>

          {/* Detection events chart */}
          <div style={{ background:`${t.accent}08`, border:`1px solid ${t.accent}18`, borderRadius:10, padding:'10px 12px' }}>
            <div style={{ color:t.textMuted, fontSize:9, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8, fontFamily:"'Space Grotesk',sans-serif" }}>Detections/hr</div>
            <div style={{ display:'flex', gap:2, alignItems:'flex-end', height:36 }}>
              {barData.map((h,i) => (
                <div key={i} style={{ flex:1, height:`${h}%`, background: i === tick%barData.length ? t.accent : `${t.accent}44`, borderRadius:'1px 1px 0 0', transition:'all 0.5s ease' }} />
              ))}
            </div>
            <div style={{ marginTop:6, color:t.accent, fontSize:9, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>↑ 12% vs yesterday</div>
          </div>

          {/* IoT sensors */}
          <div style={{ background:`${t.accent}08`, border:`1px solid ${t.accent}18`, borderRadius:10, padding:'10px 12px' }}>
            <div style={{ color:t.textMuted, fontSize:9, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8, fontFamily:"'Space Grotesk',sans-serif" }}>IoT Sensors</div>
            {[['Temp','23.4°C',85],['Humid','62%',62],['AQ','Good',90]].map(([k,v,pct]) => (
              <div key={k} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                <span style={{ color:t.textMuted, fontSize:9, width:32, flexShrink:0 }}>{k}</span>
                <div style={{ flex:1, height:3, background:`${t.accent}22`, borderRadius:2 }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:t.accent, borderRadius:2 }} />
                </div>
                <span style={{ color:t.accent, fontSize:9, fontWeight:700, width:28, textAlign:'right' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave / signal line */}
        <div style={{ background:`${t.accent}08`, border:`1px solid ${t.accent}18`, borderRadius:10, padding:'10px 12px', marginBottom:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
            <span style={{ color:t.textMuted, fontSize:9, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:"'Space Grotesk',sans-serif" }}>Data Pipeline — Real-time Signal</span>
            <span style={{ color:t.accent, fontSize:9, fontWeight:700 }}>48ms latency</span>
          </div>
          <svg viewBox="0 0 100 100" style={{ width:'100%', height:40 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={t.accent} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={t.accent} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polyline points={wavePoints} fill="none" stroke={t.accent} strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
            <polygon points={`0,100 ${wavePoints} 100,100`} fill="url(#waveGrad)"/>
          </svg>
        </div>

        {/* Bottom stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
          {[['14,892','Events Today'],['0.3%','False Pos.'],['99.9%','Uptime'],['6','Active Bots']].map(([val,label]) => (
            <div key={label} style={{ textAlign:'center', padding:'8px 4px', background:`${t.accent}08`, borderRadius:8 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:800, color:t.accent }}>{val}</div>
              <div style={{ color:t.textMuted, fontSize:9, marginTop:2, fontFamily:"'Space Grotesk',sans-serif" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TRUST BAR ────────────────────────────────────────────────────────────────
function TrustBar({ theme: t }) {
  const industries = ['Government & Public Sector', 'Retail & E-Commerce', 'Logistics & Warehousing', 'Healthcare Systems', 'Banking & Finance', 'Real Estate & Construction'];
  return (
    <div style={{ background: t.bgAlt, borderTop: `1px solid ${t.accent}22`, borderBottom: `1px solid ${t.accent}22`, padding: '20px 5%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: t.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Trusted Across</span>
        {industries.map(ind => (
          <span key={ind} style={{ color: t.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, opacity: 0.6, whiteSpace: 'nowrap' }}>{ind}</span>
        ))}
      </div>
    </div>
  );
}

// ── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICE_DATA = [
  { id:'ai',    icon:'Brain',    title:'AI Solutions',           desc:'We build custom machine learning models, predictive analytics engines, and NLP systems — trained on your data, deployed in your environment. Not off-the-shelf; purpose-built for your industry.', tags:['Custom ML Models','NLP','Predictive Analytics','Computer Vision'], pattern:'neural', stat:'98.4% model accuracy' },
  { id:'cctv',  icon:'Camera',   title:'CCTV AI Systems',        desc:'Transform passive cameras into intelligent sensors. Real-time facial recognition, intrusion detection, PPE compliance, crowd analytics and license plate recognition — all with instant alerts.', tags:['Face Recognition','Intrusion Detection','LPR','PPE Detection'], pattern:'grid', stat:'35% loss reduction avg.' },
  { id:'data',  icon:'FileText', title:'Data Digitisation',      desc:'Convert paper records, forms, and legacy documents into structured digital data using AI-powered OCR, intelligent extraction, and automated validation — at scale, with full audit trails.', tags:['AI-OCR','Form Extraction','Data Validation','Secure Storage'], pattern:'doc', stat:'10× faster than manual' },
  { id:'auto',  icon:'GitMerge', title:'Automation',             desc:'Eliminate repetitive manual processes with intelligent RPA, workflow orchestration, and smart dashboards. Free your team to focus on decisions — not data entry.', tags:['RPA','Workflow Automation','Smart Dashboards','Process Intelligence'], pattern:'flow', stat:'60% ops cost reduction' },
  { id:'iot',   icon:'Wifi',     title:'IoT & Smart Systems',    desc:'Connect your physical world — smart offices, energy monitoring, environmental sensors, asset tracking, and connected device dashboards — all managed from a single control platform.', tags:['Smart Offices','Energy Monitoring','Asset Tracking','Sensor Networks'], pattern:'nodes', stat:'40% energy savings' },
  { id:'cloud', icon:'Cloud',    title:'Cloud & Infrastructure', desc:"Design and deploy enterprise-grade private cloud, secure server rooms, and hybrid infrastructure. Data-sovereignty compliant, high-availability architectures built for Pakistan's connectivity landscape.", tags:['Private Cloud','Server Room Design','Hybrid Deployment','HA Architecture'], pattern:'cloud', stat:'99.9% uptime SLA' },
];

function ServicePattern({ pattern, accent }) {
  const svgStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 };
  if (pattern === 'neural') return (
    <svg style={svgStyle} viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
      {[[30,60],[80,30],[80,90],[140,50],[140,90],[170,60]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="5" fill={accent}/>)}
      {[[30,60,80,30],[30,60,80,90],[80,30,140,50],[80,90,140,90],[140,50,170,60],[140,90,170,60],[80,30,80,90],[140,50,140,90]].map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="1.5"/>)}
    </svg>
  );
  if (pattern === 'grid') return (
    <svg style={svgStyle} viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3].map(r => [0,1,2,3,4].map(c => <rect key={`${r}${c}`} x={c*44+8} y={r*28+8} width={36} height={22} rx="2" stroke={accent} strokeWidth="1" fill="none"/>))}
      <rect x={52} y={22} width={80} height={48} rx="3" stroke={accent} strokeWidth="2" fill="none"/>
    </svg>
  );
  if (pattern === 'doc') return (
    <svg style={svgStyle} viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
      <rect x="40" y="15" width="80" height="100" rx="4" stroke={accent} strokeWidth="1.5" fill="none"/>
      {[30,42,54,66,78,90].map(y => <line key={y} x1="52" y1={y} x2="108" y2={y} stroke={accent} strokeWidth="1"/>)}
      <rect x="135" y="25" width="55" height="70" rx="4" stroke={accent} strokeWidth="1.5" fill="none"/>
      {[38,50,62,74].map(y => <line key={y} x1="142" y1={y} x2="183" y2={y} stroke={accent} strokeWidth="1"/>)}
    </svg>
  );
  if (pattern === 'flow') return (
    <svg style={svgStyle} viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
      {[20,75,130].map((x,i) => <React.Fragment key={x}><rect x={x} y={45} width={40} height={28} rx="4" stroke={accent} strokeWidth="1.5" fill="none"/>{i<2 && <line x1={x+40} y1={59} x2={x+75} y2={59} stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)"/>}</React.Fragment>)}
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke={accent} strokeWidth="1"/></marker></defs>
    </svg>
  );
  if (pattern === 'nodes') return (
    <svg style={svgStyle} viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
      <circle cx="100" cy="60" r="12" stroke={accent} strokeWidth="1.5" fill="none"/>
      {[[30,20],[170,20],[30,100],[170,100],[20,60],[180,60]].map(([cx,cy],i) => <React.Fragment key={i}><circle cx={cx} cy={cy} r="6" stroke={accent} strokeWidth="1" fill="none"/><line x1="100" y1="60" x2={cx} y2={cy} stroke={accent} strokeWidth="1"/></React.Fragment>)}
    </svg>
  );
  if (pattern === 'cloud') return (
    <svg style={svgStyle} viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
      <path d="M60,80 Q45,80 45,65 Q45,50 60,50 Q62,35 80,35 Q95,25 110,40 Q125,30 140,45 Q155,45 155,60 Q155,75 140,78 Z" stroke={accent} strokeWidth="1.5" fill="none"/>
      {[75,100,125].map(x => <React.Fragment key={x}><line x1={x} y1={78} x2={x} y2={105}/><rect x={x-10} y={100} width={20} height={14} rx="2" stroke={accent} strokeWidth="1" fill="none"/></React.Fragment>)}
    </svg>
  );
  return null;
}

function Services({ theme: t }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" style={{ background: t.bg, padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 64, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>What We Do</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: t.text, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            End-to-End AI Services
          </h2>
          <p style={{ color: t.textMuted, fontSize: 17, marginTop: 16, maxWidth: 520, margin: '16px auto 0' }}>Six specialised practices — from custom AI models to smart infrastructure.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }} className="services-grid">
          {SERVICE_DATA.map((svc, i) => (
            <div key={svc.id}
              onMouseEnter={() => setHovered(svc.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', overflow: 'hidden',
                background: hovered === svc.id ? t.bgCard : t.bgAlt,
                border: `1px solid ${hovered === svc.id ? t.accent + '66' : t.accent + '18'}`,
                padding: '40px 32px', cursor: 'pointer',
                transition: 'all 0.35s ease',
                transform: hovered === svc.id ? 'translateY(-4px)' : 'none',
                boxShadow: hovered === svc.id ? `0 20px 60px ${t.accent}22` : 'none',
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 0.07}s`,
              }}>
              <ServicePattern pattern={svc.pattern} accent={t.accent} />
              <div style={{ position: 'relative' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: `${t.accent}18`, border: `1px solid ${t.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: t.accent }}>
                  <Icon name={svc.icon} size={22} color={t.accent} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 10, letterSpacing: '-0.02em' }}>{svc.title}</h3>
                <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{svc.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{ background: `${t.accent}15`, color: t.accent, borderRadius: 4, padding: '3px 10px', fontSize: 11, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.04em' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${t.accent}18`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: t.accent, fontSize: 12, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{svc.stat}</span>
                  <span style={{ color: t.accent, fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", opacity: hovered === svc.id ? 1 : 0.3, transition: 'opacity 0.2s' }}>Learn more →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks({ theme: t }) {
  const [ref, visible] = useInView();
  const steps = [
    { n: '01', title: 'Consultation', desc: 'We deeply understand your business challenges, existing infrastructure, and desired outcomes.' },
    { n: '02', title: 'Architecture', desc: 'Custom AI solution design — model selection, data pipelines, hardware and software stack.' },
    { n: '03', title: 'Deployment', desc: 'End-to-end integration of hardware, software, and AI models with zero-downtime rollout.' },
    { n: '04', title: 'Scale & Support', desc: 'Ongoing maintenance, model retraining, analytics dashboards and 24/7 expert support.' },
  ];
  return (
    <section style={{ background: t.bgAlt, padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 64, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <div style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Our Process</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: t.text, letterSpacing: '-0.03em' }}>From Idea to Deployment</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }} className="process-grid">
          {/* Connector line */}
          <div style={{ position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 1, background: `linear-gradient(90deg, transparent, ${t.accent}44, transparent)`, display: 'flex' }} className="process-line" />

          {steps.map((step, i) => (
            <div key={step.n} style={{ padding: '0 24px 0', textAlign: 'center', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.12}s` }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: t.bg, border: `2px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, color: t.accent }}>{step.n}</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHY KRUCIAL ──────────────────────────────────────────────────────────────
function WhyUs({ theme: t }) {
  const [ref, visible] = useInView();
  const points = [
    ['Custom-Built AI', 'No off-the-shelf solutions — every system is engineered for your exact context.'],
    ['End-to-End Delivery', 'We handle hardware, software, integration and ongoing support — one partner.'],
    ['Local Deployment', 'On-premise options for data-sensitive environments with full sovereignty.'],
    ['Scalable Architecture', 'Systems designed to grow with you — from pilot to enterprise-wide rollout.'],
    ['Industry Expertise', 'Specialists in retail, logistics, surveillance, healthcare and smart cities.'],
  ];
  return (
    <section style={{ background: t.bg, padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="why-grid">
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-40px)', transition: 'all 0.8s ease' }}>
          <div style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Why Choose Us</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: t.text, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 48 }}>
            Built Different.<br />Deployed Better.
          </h2>
          {points.map(([title, desc], i) => (
            <div key={title} style={{ display: 'flex', gap: 20, marginBottom: 28, opacity: visible ? 1 : 0, transition: `all 0.7s ease ${0.1 + i * 0.1}s` }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${t.accent}22`, border: `1px solid ${t.accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.accent }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 4 }}>{title}</div>
                <div style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: abstract control room visual */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(40px)', transition: 'all 0.8s ease 0.2s' }}>
          <ControlRoomVisual theme={t} />
        </div>
      </div>
    </section>
  );
}

function ControlRoomVisual({ theme: t }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(x => (x + 1) % 20), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: t.bgAlt, border: `1px solid ${t.accent}33`, borderRadius: 16, padding: 28, fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {['Computer Vision', 'Data Pipeline', 'Alert Engine', 'Model Registry'].map((name, i) => (
          <div key={name} style={{ background: t.bg, border: `1px solid ${t.accent}22`, borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: '0.08em', marginBottom: 8, textTransform: 'uppercase' }}>{name}</div>
            <div style={{ height: 4, background: `${t.accent}22`, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${55 + ((tick * 7 + i * 17) % 40)}%`, background: t.accent, borderRadius: 2, transition: 'width 0.8s ease' }} />
            </div>
            <div style={{ fontSize: 11, color: t.accent, marginTop: 6, fontWeight: 600 }}>{55 + ((tick * 7 + i * 17) % 40)}% load</div>
          </div>
        ))}
      </div>

      {[
        ['Total Detections Today', '14,892', '+12%'],
        ['False Positive Rate', '0.3%', '-0.1%'],
        ['Avg Response Time', '48ms', '-5ms'],
      ].map(([label, val, delta]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: `1px solid ${t.accent}15` }}>
          <span style={{ color: t.textMuted, fontSize: 13 }}>{label}</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: t.text, fontWeight: 700, fontSize: 15, marginRight: 8 }}>{val}</span>
            <span style={{ color: t.accent, fontSize: 12 }}>{delta}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── INDUSTRIES ───────────────────────────────────────────────────────────────
function Industries({ theme: t }) {
  const [ref, visible] = useInView();
  const inds = [
    { icon: '🏛️', title: 'Government & Smart Cities', desc: 'Traffic management, public safety surveillance, smart infrastructure monitoring and citizen services automation across city networks.', tag: 'Smart Cities' },
    { icon: '🛒', title: 'Retail & Malls', desc: 'Customer footfall analytics, heatmapping, AI loss prevention, queue management and personalized in-store intelligence systems.', tag: 'Retail AI' },
    { icon: '📦', title: 'Logistics & Warehousing', desc: 'Inventory tracking with computer vision, automated sorting, delivery route optimization and real-time operations dashboards.', tag: 'Supply Chain' },
    { icon: '🏥', title: 'Healthcare', desc: 'Patient monitoring systems, AI-assisted diagnostics, medical record digitisation, compliance automation and secure data management.', tag: 'MedTech AI' },
    { icon: '🏦', title: 'Banking & Finance', desc: 'Real-time fraud detection, KYC automation, intelligent document processing, regulatory compliance dashboards and risk analytics.', tag: 'FinTech AI' },
    { icon: '🏗️', title: 'Real Estate & Construction', desc: 'Site safety monitoring, AI-powered PPE detection, project progress tracking, drone analytics and workforce management.', tag: 'ConTech' },
  ];
  return (
    <section style={{ background: t.bgAlt, padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 64, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <div style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Industries We Serve</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: t.text, letterSpacing: '-0.03em' }}>Sector-Specific Intelligence</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="industries-grid">
          {inds.map((ind, i) => (
            <div key={ind.title} style={{ padding: '28px 24px', border: `1px solid ${t.accent}22`, borderRadius: 12, background: t.bg, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.08}s`, cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.accent}66`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${t.accent}22`; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ width:44, height:44, borderRadius:10, background:`${t.accent}18`, border:`1px solid ${t.accent}33`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, color:t.accent }}>
                <Icon name={ind.icon} size={20} color={t.accent} />
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ background: `${t.accent}18`, color: t.accent, borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>{ind.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 }}>{ind.title}</h3>
              <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.65 }}>{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CASE STUDY ───────────────────────────────────────────────────────────────
function CaseStudy({ theme: t }) {
  const [ref, visible] = useInView();
  const cases = [
    {
      client: 'Retail Chain — Karachi',
      industry: 'Retail',
      challenge: 'High theft rate with no real-time visibility across 8 store locations.',
      solution: 'Deployed AI-powered CCTV analytics with facial recognition, intrusion alerts and behavior anomaly detection.',
      results: [['35%', 'Reduction in losses'], ['8', 'Stores connected'], ['< 3s', 'Alert response time']],
      accent: t.accent,
    },
    {
      client: 'Construction Site — Lahore',
      industry: 'Construction',
      challenge: 'Safety violations and PPE non-compliance causing project delays and insurance liabilities.',
      solution: 'AI camera network detecting hard hat, vest, and restricted zone violations with automated reporting.',
      results: [['92%', 'PPE compliance rate'], ['60%', 'Fewer incidents'], ['Real-time', 'Violation alerts']],
      accent: t.accent,
    },
    {
      client: 'Logistics Firm — Port Qasim',
      industry: 'Logistics',
      challenge: 'Manual inventory counts taking 3 days per cycle, with frequent discrepancy errors.',
      solution: 'Computer vision + IoT sensors for automated inventory scanning, real-time stock tracking and anomaly detection.',
      results: [['10×', 'Faster inventory counts'], ['99.1%', 'Accuracy rate'], ['3 days → 4hrs', 'Cycle time']],
      accent: t.accent,
    },
  ];

  return (
    <section style={{ background: t.bg, padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 64, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <div style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Proven Results</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: t.text, letterSpacing: '-0.03em' }}>Real Projects. Real Impact.</h2>
          <p style={{ color: t.textMuted, fontSize: 17, marginTop: 16, maxWidth: 500, margin: '16px auto 0' }}>Every deployment is measured by business outcomes — not just technical metrics.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="cases-grid">
          {cases.map((c, i) => (
            <div key={i} style={{ background: t.bgAlt, border: `1px solid ${t.accent}22`, borderRadius: 16, overflow: 'hidden', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: `all 0.7s ease ${i * 0.1}s` }}>
              {/* Header */}
              <div style={{ background: `${t.accent}12`, borderBottom: `1px solid ${t.accent}22`, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: t.text, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14 }}>{c.client}</span>
                <span style={{ color: t.accent, background: `${t.accent}22`, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{c.industry}</span>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: t.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Challenge</div>
                  <p style={{ color: t.text, fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{c.challenge}</p>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: t.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Solution</div>
                  <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{c.solution}</p>
                </div>
                {/* Results */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, borderTop: `1px solid ${t.accent}15`, paddingTop: 20 }}>
                  {c.results.map(([val, label]) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: t.accent, lineHeight: 1.1 }}>{val}</div>
                      <div style={{ color: t.textMuted, fontSize: 10, marginTop: 4, lineHeight: 1.3, fontFamily: "'Space Grotesk', sans-serif" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button style={{ background: 'transparent', color: t.accent, border: `1px solid ${t.accent}55`, borderRadius: 8, padding: '13px 32px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background = `${t.accent}15`; e.target.style.borderColor = t.accent; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = `${t.accent}55`; }}>
            View All Case Studies →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────────
function CTA({ theme: t, onDemoClick }) {
  const [ref, visible] = useInView();
  return (
    <section style={{ background: t.bg, padding: '100px 5%' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.8s ease' }}>
        <div style={{ position: 'relative', background: t.bgAlt, border: `1px solid ${t.accent}44`, borderRadius: 24, padding: '72px 60px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 300, background: `${t.accent}12`, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Ready to Start?</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: t.text, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
              Transform Your Business<br />with AI Today
            </h2>
            <p style={{ color: t.textMuted, fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
              Let's design a solution tailored to your needs — from proof of concept to full deployment.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={onDemoClick}
                style={{ background: t.accent, color: t.accentText || '#fff', border: 'none', borderRadius: 8, padding: '16px 36px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: `0 0 40px ${t.accent}55`, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = `0 8px 50px ${t.accent}77`; }}
                onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = `0 0 40px ${t.accent}55`; }}>
                Get in Touch
              </button>
              <button
                style={{ background: 'transparent', color: t.text, border: `1px solid ${t.accent}55`, borderRadius: 8, padding: '16px 36px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.borderColor = t.accent; e.target.style.background = `${t.accent}11`; }}
                onMouseLeave={e => { e.target.style.borderColor = `${t.accent}55`; e.target.style.background = 'transparent'; }}>
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ theme: t }) {
  const cols = [
    { title: 'Company', links: [['About Us','pages/about.html'],['Careers','#'],['Blog','#'],['Press','#']] },
    { title: 'Services', links: [['AI Solutions','pages/ai-solutions.html'],['CCTV AI Systems','pages/cctv-ai.html'],['Automation','pages/automation.html'],['Data Digitisation','pages/data-digitisation.html'],['IoT & Smart Systems','pages/iot-smart-systems.html'],['Cloud & Infrastructure','pages/cloud-infrastructure.html']] },
    { title: 'Support', links: [['Contact','pages/contact.html'],['Industries','pages/industries.html'],['Case Studies','pages/case-studies.html'],['Privacy Policy','#'],['Terms','#']] },
  ];
  return (
    <footer style={{ background: t.bgAlt, borderTop: `1px solid ${t.accent}22`, padding: '60px 5% 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src={window.__resources && window.__resources.logo || "uploads/logo-1777108586958.png"} alt="Krucial" style={{ height: 32, filter: t.logoFilter || 'invert(1)' }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: t.text }}>KRUCIAL<span style={{ color: t.accent }}>.</span></span>
            </div>
            <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Intelligent AI solutions built for real-world impact — designed, deployed, and scaled for your business.</p>
            <div style={{ marginTop: 20 }}>
              <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 4 }}>📧 info@krucialsystems.com</div>
              <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 4 }}>📞 +92 (21) 000-0000</div>
              <div style={{ color: t.textMuted, fontSize: 13 }}>📍 Karachi, Pakistan</div>
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: t.text, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</div>
              {col.links.map(([label, href]) => (
                <a key={label} href={href} style={{ display: 'block', color: t.textMuted, fontSize: 14, marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => e.target.style.color = t.accent}
                  onMouseLeave={e => e.target.style.color = t.textMuted}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${t.accent}15`, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: t.textMuted, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif" }}>© 2026 Krucial Systems — All Rights Reserved</span>
          <span style={{ color: t.textMuted, fontSize: 13 }}>Karachi · Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

// ── DEMO MODAL ────────────────────────────────────────────────────────────────
function DemoModal({ theme: t, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#00000088', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: t.bg, border: `1px solid ${t.accent}44`, borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 480, position: 'relative', boxShadow: `0 40px 100px ${t.accent}22` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: t.textMuted, cursor: 'pointer', fontSize: 20 }}>✕</button>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text, fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Request Received!</h3>
            <p style={{ color: t.textMuted, fontSize: 15 }}>Our team will reach out within 24 hours.</p>
          </div>
        ) : (
          <>
            <div style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Get in Touch</div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text, fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28 }}>Let's Talk AI</h3>
            <form onSubmit={handleSubmit}>
              {[['name', 'Full Name'], ['email', 'Work Email'], ['company', 'Company Name']].map(([field, label]) => (
                <div key={field} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', color: t.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</label>
                  <input type={field === 'email' ? 'email' : 'text'} required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                    style={{ width: '100%', background: t.bgAlt, border: `1px solid ${t.accent}33`, borderRadius: 8, padding: '12px 14px', color: t.text, fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', color: t.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tell us about your needs</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', background: t.bgAlt, border: `1px solid ${t.accent}33`, borderRadius: 8, padding: '12px 14px', color: t.text, fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ width: '100%', background: t.accent, color: t.accentText || '#fff', border: 'none', borderRadius: 8, padding: '14px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', boxShadow: `0 0 30px ${t.accent}44` }}>
                Send Request →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Navbar, Hero, TrustBar, Services, HowItWorks, WhyUs, Industries, CaseStudy, CTA, Footer, DemoModal });
