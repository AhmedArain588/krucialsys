<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import FeatureCard from '@/Components/FeatureCard.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

const tick = ref(0);
const cpuLoad = ref([45, 62, 38, 71]);
const trafficPoints = ref([]);
let interval, trafficInterval;

onMounted(() => {
    interval = setInterval(() => {
        tick.value++;
        cpuLoad.value = cpuLoad.value.map(v => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 12)));
    }, 1000);
    // Generate traffic graph data
    for (let i = 0; i < 30; i++) trafficPoints.value.push(40 + Math.random() * 40);
    trafficInterval = setInterval(() => {
        trafficPoints.value.shift();
        trafficPoints.value.push(40 + Math.random() * 40);
    }, 400);
});
onUnmounted(() => { clearInterval(interval); clearInterval(trafficInterval); });

const features = [
    ['Cloud','Private Cloud','Fully private, sovereign cloud infrastructure — your data never leaves your premises or jurisdiction.'],
    ['Server','Server Room Design','End-to-end server room design, rack installation, cooling, power and network configuration.'],
    ['Globe','Hybrid Deployment','Bridge on-premise infrastructure with cloud burst capacity for flexible, scalable computing.'],
    ['RefreshCw','Disaster Recovery','Automated backups, failover systems and documented recovery procedures to meet any RTO/RPO target.'],
    ['Shield','Security Hardening','Firewall configuration, intrusion detection, vulnerability scanning and compliance auditing.'],
    ['Activity','24/7 Managed Monitoring','Proactive monitoring with automated incident response, patching and performance optimisation.'],
];

const process = [
    ['01','Infrastructure Audit','Assess current setup, capacity requirements, compliance needs and business continuity targets.'],
    ['02','Architecture Design','Design infrastructure blueprint including topology, hardware specs and security architecture.'],
    ['03','Build & Deploy','Procure, install and configure hardware and software — zero-downtime migration if required.'],
    ['04','Manage & Scale','Ongoing management, monitoring, capacity planning and proactive upgrades.'],
];

// Build server rack rows
const serverRows = [
    { name:'web-01', status:'ok', label:'WEB' },
    { name:'app-01', status:'busy', label:'APP' },
    { name:'db-01',  status:'ok', label:'DB' },
    { name:'cache',  status:'ok', label:'CACHE' },
    { name:'lb-01',  status:'ok', label:'LB' },
];

const trafficPath = (points) => {
    if (!points.length) return '';
    const w = 100, h = 100;
    return points.map((y, i) => {
        const x = (i / (points.length - 1)) * w;
        return `${i === 0 ? 'M' : 'L'} ${x} ${100 - y}`;
    }).join(' ');
};
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Cloud & Infrastructure</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Enterprise<br>Infrastructure.<br><span :style="{ color:t.accent }">Local Control.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Private cloud, secure server rooms and hybrid deployments — data-sovereignty compliant and built for Pakistan's connectivity landscape.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Get a Free Infrastructure Audit</button>
                                <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.text, border:`1px solid ${t.accent}44`, borderRadius:'8px', padding:'14px 24px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                            </div>
                        </div>

                        <!-- Server Rack Visual -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'18px', display:'flex', flexDirection:'column', gap:'10px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">Production Cluster</span>
                                <span :style="{ color:'#00C896', fontSize:'11px', fontWeight:700, display:'flex', alignItems:'center', gap:'5px', fontFamily:`'Space Grotesk',sans-serif` }">
                                    <span :style="{ width:'6px', height:'6px', borderRadius:'50%', background:'#00C896', boxShadow:'0 0 6px #00C896' }" />
                                    HEALTHY
                                </span>
                            </div>

                            <!-- Server rack -->
                            <div :style="{ background:t.bg, border:`1px solid ${t.accent}33`, borderRadius:'8px', padding:'8px 7px', display:'flex', flexDirection:'column', gap:'3px' }">
                                <div v-for="(srv, i) in serverRows" :key="srv.name"
                                    :style="{
                                        display:'flex', alignItems:'center', gap:'8px',
                                        background: srv.status==='busy' ? `${t.accent}22` : `${t.accent}10`,
                                        border:`1px solid ${srv.status==='busy' ? t.accent + '66' : t.accent + '22'}`,
                                        borderRadius:'4px', padding:'5px 9px',
                                    }">
                                    <div :style="{
                                        width:'6px', height:'6px', borderRadius:'50%',
                                        background: srv.status==='busy' ? '#FFA500' : '#00C896',
                                        boxShadow: `0 0 6px ${srv.status==='busy' ? '#FFA500' : '#00C896'}`,
                                        animation: srv.status==='busy' ? 'blink 1s infinite' : 'none',
                                    }" />
                                    <span :style="{ color:t.accent, fontSize:'9px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif`, width:'40px' }">{{ srv.label }}</span>
                                    <span :style="{ color:t.text, fontSize:'10px', fontFamily:'monospace', flex:1 }">{{ srv.name }}</span>
                                    <div :style="{ width:'60px', height:'3px', background:`${t.accent}22`, borderRadius:'2px', overflow:'hidden' }">
                                        <div :style="{
                                            height:'100%',
                                            width: `${30 + ((tick * 5 + i * 13) % 60)}%`,
                                            background: t.accent,
                                            transition:'width 1s ease',
                                        }" />
                                    </div>
                                </div>
                            </div>

                            <!-- Traffic graph + stats inline -->
                            <div :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'8px', padding:'10px 12px' }">
                                <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' }">
                                    <span :style="{ color:t.textMuted, fontSize:'9px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em' }">Network Traffic</span>
                                    <span :style="{ color:t.accent, fontSize:'10px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">2.4 Gbps · CPU 42% · RAM 61%</span>
                                </div>
                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" :style="{ width:'100%', height:'40px' }">
                                    <defs>
                                        <linearGradient id="cloudWave" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" :stop-color="t.accent" stop-opacity="0.4" />
                                            <stop offset="100%" :stop-color="t.accent" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path :d="trafficPath(trafficPoints) + ' L 100 100 L 0 100 Z'" fill="url(#cloudWave)" />
                                    <path :d="trafficPath(trafficPoints)" fill="none" :stroke="t.accent" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats -->
            <section :style="{ background:t.bgAlt, padding:'60px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div class="grid-4" :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }">
                        <div v-for="[v,l] in [['99.9%','Uptime SLA'],['<15min','RTO Target'],['100%','Data Sovereignty'],['24/7','Monitoring']]" :key="l"
                            :style="{ textAlign:'center', padding:'28px 20px', background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'12px' }">
                            <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'36px', fontWeight:800, color:t.accent, marginBottom:'8px' }">{{ v }}</div>
                            <div :style="{ color:t.textMuted, fontSize:'13px', fontWeight:500 }">{{ l }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <section :style="{ background:t.bg, padding:'90px 5%' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Capabilities</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">What We Build</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'520px', margin:'0 auto' }">Enterprise infrastructure built for reliability, security and local compliance.</p>
                    </div>
                    <div class="grid-3" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }">
                        <FeatureCard v-for="[icon,title,desc] in features" :key="title" :icon="icon" :title="title" :desc="desc" />
                    </div>
                </div>
            </section>

            <section :style="{ background:t.bgAlt, padding:'90px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Process</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">From Audit to Live Infrastructure</h2>
                    </div>
                    <div class="grid-4" :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, position:'relative' }">
                        <div :style="{ position:'absolute', top:'32px', left:'12.5%', right:'12.5%', height:'1px', background:`linear-gradient(90deg,transparent,${t.accent}44,transparent)` }" />
                        <div v-for="[n,title,desc] in process" :key="n" :style="{ padding:'0 20px', textAlign:'center' }">
                            <div :style="{ width:'64px', height:'64px', borderRadius:'50%', background:t.bg, border:`2px solid ${t.accent}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', position:'relative', zIndex:1 }">
                                <span :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'16px', fontWeight:800, color:t.accent }">{{ n }}</span>
                            </div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, marginBottom:'10px' }">{{ title }}</h3>
                            <p :style="{ color:t.textMuted, fontSize:'13px', lineHeight:1.65 }">{{ desc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section :style="{ background:t.bg, padding:'90px 5%' }">
                <div :style="{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }">
                    <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'20px' }">Ready to Build <span :style="{ color:t.accent }">Reliable Infrastructure?</span></h2>
                    <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, marginBottom:'36px' }">Free infrastructure audit — we'll assess your current setup and present a proposal within 48 hours.</p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44` }">Book a Free Audit</button>
                        <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.accent, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>

<style scoped>
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
</style>
