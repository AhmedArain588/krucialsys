<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';

const { theme: t } = useTheme();

// ── Particle canvas ──────────────────────────────────────────────────────────
const canvasRef = ref(null);
let animId = null;
let particles = [];

function initCanvas() {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        init();
    };

    function init() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 9000);
        for (let i = 0; i < count; i++) {
            particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 1, pulse: Math.random() * Math.PI * 2 });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const accent = t.value.accent;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    const alpha = (1 - dist / 130) * 0.35;
                    ctx.beginPath();
                    ctx.strokeStyle = accent + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        particles.forEach(p => {
            p.pulse += 0.03;
            const pAlpha = 0.5 + 0.5 * Math.sin(p.pulse);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = accent + Math.floor(pAlpha * 200).toString(16).padStart(2, '0');
            ctx.fill();
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = accent + '18'; ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
        animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
}

// ── Featured work spotlight ──────────────────────────────────────────────────
const featured = [
    { short:'Jiyala',     tag:'Web & Mobile App', name:'Jiyala Application',
      blurb:'A member-facing web and mobile platform for party workers — digital membership, organisational structure and direct engagement.' },
    { short:'Voter Info', tag:'Data Platform',    name:'Voter Information System',
      blurb:'Searchable voter data giving constituency teams instant access to structured electoral records instead of scattered paper files.' },
    { short:'Elections',  tag:'Digitisation',     name:'Election Data Digitisation',
      blurb:'Large-scale conversion of election records from paper into clean, queryable data — archives turned into an analysable asset.' },
    { short:'Monitoring', tag:'Media Intelligence', name:'Media Monitoring System',
      blurb:'Full-spectrum monitoring across television, radio, newspapers and every social media handle carrying the party’s name.' },
];

const spotlight = ref(0);
let spotlightInterval = null;

let cleanupCanvas = null;

onMounted(() => {
    cleanupCanvas = initCanvas();
    spotlightInterval = setInterval(() => {
        spotlight.value = (spotlight.value + 1) % featured.length;
    }, 4500);
});

onUnmounted(() => {
    if (cleanupCanvas) cleanupCanvas();
    clearInterval(spotlightInterval);
});

</script>

<template>
    <section :style="{ position:'relative', minHeight:'100vh', background:t.bg, display:'flex', alignItems:'center', overflow:'hidden', paddingLeft:'5%', paddingRight:'5%' }">
        <!-- Particle canvas -->
        <canvas ref="canvasRef" :style="{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.7 }" />
        <!-- Gradient overlay -->
        <div :style="{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 70% 50%, ${t.accent}12 0%, transparent 60%)` }" />
        <!-- Grid overlay -->
        <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}08 1px, transparent 1px), linear-gradient(90deg, ${t.accent}08 1px, transparent 1px)`, backgroundSize:'60px 60px' }" />

        <div :style="{ position:'relative', maxWidth:'1280px', margin:'0 auto', padding:'120px 0 80px', width:'100%' }">
            <div class="hero-grid" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                <!-- Left -->
                <div>
                    <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'28px' }">
                        <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                        <span :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">AI-Powered Solutions</span>
                    </div>

                    <h1 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'clamp(36px,5vw,68px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                        Intelligent AI<br>
                        <span :style="{ color:t.accent }">Solutions</span> Built<br>
                        for Real-World<br>Impact
                    </h1>

                    <p :style="{ color:t.textMuted, fontSize:'clamp(15px,1.5vw,18px)', lineHeight:1.7, maxWidth:'480px', marginBottom:'40px', fontFamily:`'Inter', sans-serif` }">
                        From CCTV analytics to data digitisation and automation — we design, deploy, and scale AI systems tailored to your business.
                    </p>

                    <div :style="{ display:'flex', gap:'16px', flexWrap:'wrap' }">
                        <button @click="$emit('demo')"
                            :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44`, transition:'all 0.2s', letterSpacing:'0.02em' }"
                            @mouseenter="(e) => { e.target.style.transform='translateY(-3px)'; e.target.style.boxShadow=`0 8px 40px ${t.accent}66`; }"
                            @mouseleave="(e) => { e.target.style.transform=''; e.target.style.boxShadow=`0 0 40px ${t.accent}44`; }"
                        >Get a Free Consultation</button>
                        <Link href="/case-studies"
                            :style="{ display:'inline-block', textDecoration:'none', background:'transparent', color:t.text, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk', sans-serif`, fontWeight:600, fontSize:'15px', cursor:'pointer', transition:'all 0.2s' }"
                            @mouseenter="(e) => { e.target.style.borderColor=t.accent; e.target.style.background=`${t.accent}11`; }"
                            @mouseleave="(e) => { e.target.style.borderColor=`${t.accent}55`; e.target.style.background='transparent'; }"
                        >View Our Work →</Link>
                    </div>

                    <!-- Stats -->
                    <div :style="{ display:'flex', gap:'40px', marginTop:'56px', paddingTop:'40px', borderTop:`1px solid ${t.accent}22` }">
                        <div v-for="[num, label] in [['2008','Operating Since'],['3','Global Offices'],['20+','Specialists']]" :key="label">
                            <div :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'28px', fontWeight:800, color:t.accent }">{{ num }}</div>
                            <div :style="{ color:t.textMuted, fontSize:'12px', fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase', marginTop:'2px' }">{{ label }}</div>
                        </div>
                    </div>
                </div>

                <!-- Right: Featured work -->
                <div class="hero-visual" :style="{ position:'relative' }">
                    <!-- Glow -->
                    <div :style="{ position:'absolute', top:'20%', left:'10%', width:'80%', height:'60%', background:`${t.accent}15`, filter:'blur(50px)', borderRadius:'50%', pointerEvents:'none' }" />

                    <div :style="{ position:'relative', background:t.bgCard||t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'20px', padding:'22px' }">
                        <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'18px' }">
                            <div>
                                <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'14px', color:t.text }">Delivered Work</div>
                                <div :style="{ color:t.textMuted, fontSize:'11px', marginTop:'2px' }">Pakistan Peoples Party</div>
                            </div>
                            <span :style="{ color:t.accent, background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'4px 12px', fontSize:'10px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif`, letterSpacing:'0.08em' }">FLAGSHIP</span>
                        </div>

                        <!-- Rotating project spotlight -->
                        <div :style="{ background:`${t.accent}0A`, border:`1px solid ${t.accent}2E`, borderRadius:'14px', padding:'20px', marginBottom:'12px', minHeight:'150px' }">
                            <div :style="{ color:t.accent, fontSize:'10px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:`'Space Grotesk',sans-serif`, marginBottom:'9px' }">
                                {{ featured[spotlight].tag }}
                            </div>
                            <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'21px', fontWeight:800, color:t.text, marginBottom:'10px', letterSpacing:'-0.01em' }">
                                {{ featured[spotlight].name }}
                            </div>
                            <p :style="{ color:t.textMuted, fontSize:'13.5px', lineHeight:1.65, margin:0 }">
                                {{ featured[spotlight].blurb }}
                            </p>
                        </div>

                        <!-- Project selector -->
                        <div :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'6px', marginBottom:'14px' }">
                            <button v-for="(f, i) in featured" :key="f.name" @click="spotlight = i"
                                :style="{
                                    background: i === spotlight ? `${t.accent}26` : `${t.accent}0A`,
                                    border:`1px solid ${i === spotlight ? t.accent : t.accent + '22'}`,
                                    borderRadius:'8px', padding:'9px 4px', cursor:'pointer',
                                    color: i === spotlight ? t.accent : t.textMuted,
                                    fontFamily:`'Space Grotesk',sans-serif`, fontSize:'9.5px', fontWeight:700,
                                    transition:'all 0.25s',
                                }">
                                {{ f.short }}
                            </button>
                        </div>

                        <!-- Verified facts -->
                        <div :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }">
                            <div v-for="[val,label] in [['32','TV Channels'],['4','Platforms'],['2008','Since']]" :key="label"
                                :style="{ textAlign:'center', padding:'10px 4px', background:`${t.accent}0A`, borderRadius:'8px', border:`1px solid ${t.accent}1A` }">
                                <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:800, color:t.accent }">{{ val }}</div>
                                <div :style="{ color:t.textMuted, fontSize:'9px', marginTop:'2px', fontFamily:`'Space Grotesk',sans-serif` }">{{ label }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll indicator -->
        <div :style="{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', opacity:0.5 }">
            <span :style="{ color:t.textMuted, fontSize:'11px', fontFamily:`'Space Grotesk', sans-serif`, letterSpacing:'0.1em' }">SCROLL</span>
            <div :style="{ width:'1px', height:'40px', background:`linear-gradient(to bottom, ${t.accent}, transparent)` }" />
        </div>
    </section>
</template>
