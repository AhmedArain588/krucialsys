<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import FeatureCard from '@/Components/FeatureCard.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';
import KsIcon from '@/Components/KsIcon.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

const tick = ref(0);
const sensors = ref([
    { x:18, y:25, label:'Temp', value:23.4, unit:'°C' },
    { x:55, y:18, label:'Humid', value:62, unit:'%' },
    { x:80, y:35, label:'Air', value:'Good', unit:'' },
    { x:25, y:62, label:'Energy', value:842, unit:'W' },
    { x:62, y:70, label:'Motion', value:'OK', unit:'' },
    { x:88, y:75, label:'Asset', value:42, unit:'' },
]);
let interval;
onMounted(() => {
    interval = setInterval(() => {
        tick.value++;
        sensors.value = sensors.value.map(s => {
            if (typeof s.value === 'number') {
                const v = s.value + (Math.random() - 0.5) * (s.label === 'Temp' ? 0.2 : 5);
                return { ...s, value: s.label === 'Temp' ? Math.round(v * 10) / 10 : Math.round(v) };
            }
            return s;
        });
    }, 1500);
});
onUnmounted(() => clearInterval(interval));

// Connection lines between sensors
const connections = [[0,1],[0,3],[1,2],[2,5],[3,4],[4,5],[1,4]];

const features = [
    ['Building2','Smart Office Automation','Automated lighting, HVAC, access control and meeting room management — all centrally managed.'],
    ['Zap','Energy Monitoring','Real-time energy consumption tracking with anomaly detection, cost analysis and automated alerts.'],
    ['Target','Asset Tracking','RFID and GPS-based tracking for equipment, vehicles and valuable assets across your facilities.'],
    ['Wifi','Environmental Sensors','Air quality, temperature, humidity and noise monitoring for compliance and staff wellbeing.'],
    ['Globe','Remote Device Management','Monitor, configure and update thousands of IoT devices from a single cloud dashboard.'],
    ['Activity','Predictive Maintenance','Sensor-driven alerts before equipment fails — reducing downtime by up to 40%.'],
];

const process = [
    ['01','Site Assessment','Map your facilities, identify sensor placement and design the IoT architecture.'],
    ['02','Hardware Deployment','Install sensors, gateways and edge devices with minimal disruption to operations.'],
    ['03','Platform Setup','Configure dashboards, alert rules, automation triggers and data pipelines.'],
    ['04','Monitor & Optimise','Ongoing monitoring, firmware updates and data-driven optimisation recommendations.'],
];
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
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">IoT & Smart Systems</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Connect Your<br><span :style="{ color:t.accent }">Physical World.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Smart offices, energy monitoring, asset tracking and environmental sensing — all on one intelligent platform with real-time dashboards.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Get a Free Site Assessment</button>
                                <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.text, border:`1px solid ${t.accent}44`, borderRadius:'8px', padding:'14px 24px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                            </div>
                        </div>

                        <!-- IoT Sensor Network Visual -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'20px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">Live Sensor Network</span>
                                <span :style="{ color:'#00C896', fontSize:'11px', fontWeight:700, display:'flex', alignItems:'center', gap:'5px' }">
                                    <span :style="{ width:'6px', height:'6px', borderRadius:'50%', background:'#00C896', boxShadow:'0 0 6px #00C896' }" />
                                    {{ sensors.length }} ACTIVE
                                </span>
                            </div>

                            <!-- Floor plan visual -->
                            <div :style="{ position:'relative', background:`${t.accent}08`, border:`1px solid ${t.accent}22`, borderRadius:'10px', height:'260px', overflow:'hidden' }">
                                <!-- Floor plan rooms -->
                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" :style="{ position:'absolute', inset:0, width:'100%', height:'100%' }">
                                    <rect x="2" y="2" width="48" height="46" :stroke="t.accent" stroke-opacity="0.3" stroke-width="0.3" fill="none" />
                                    <rect x="52" y="2" width="46" height="30" :stroke="t.accent" stroke-opacity="0.3" stroke-width="0.3" fill="none" />
                                    <rect x="52" y="34" width="46" height="14" :stroke="t.accent" stroke-opacity="0.3" stroke-width="0.3" fill="none" />
                                    <rect x="2" y="50" width="32" height="48" :stroke="t.accent" stroke-opacity="0.3" stroke-width="0.3" fill="none" />
                                    <rect x="36" y="50" width="62" height="48" :stroke="t.accent" stroke-opacity="0.3" stroke-width="0.3" fill="none" />
                                    <!-- Connections between sensors -->
                                    <line v-for="([a,b], i) in connections" :key="i"
                                        :x1="sensors[a].x" :y1="sensors[a].y"
                                        :x2="sensors[b].x" :y2="sensors[b].y"
                                        :stroke="t.accent" stroke-width="0.4"
                                        :stroke-opacity="0.4 + Math.sin(tick * 0.3 + i) * 0.3"
                                        stroke-dasharray="1,1"
                                    />
                                </svg>
                                <!-- Sensors -->
                                <div v-for="(s, i) in sensors" :key="i"
                                    :style="{
                                        position:'absolute',
                                        left:`${s.x}%`, top:`${s.y}%`,
                                        transform:'translate(-50%, -50%)',
                                    }">
                                    <!-- Pulse rings -->
                                    <div :style="{
                                        position:'absolute', top:'50%', left:'50%',
                                        transform:'translate(-50%, -50%)',
                                        width:'24px', height:'24px',
                                        borderRadius:'50%',
                                        background:`${t.accent}22`,
                                        animation:`pulse-${i % 3} 2s infinite`,
                                    }" />
                                    <!-- Node -->
                                    <div :style="{
                                        position:'relative', zIndex:2,
                                        width:'10px', height:'10px',
                                        borderRadius:'50%',
                                        background:t.accent,
                                        boxShadow:`0 0 8px ${t.accent}, 0 0 16px ${t.accent}88`,
                                    }" />
                                    <!-- Label -->
                                    <div :style="{
                                        position:'absolute',
                                        top:'14px', left:'50%',
                                        transform:'translateX(-50%)',
                                        background:t.bg, border:`1px solid ${t.accent}44`,
                                        borderRadius:'4px', padding:'2px 6px',
                                        fontSize:'9px', fontWeight:700,
                                        color:t.accent,
                                        fontFamily:`'Space Grotesk',sans-serif`,
                                        whiteSpace:'nowrap',
                                    }">{{ s.label }} {{ s.value }}{{ s.unit }}</div>
                                </div>
                            </div>

                            <!-- Stats row -->
                            <div :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', marginTop:'12px' }">
                                <div v-for="[k,v] in [['Devices','248'],['Data Points/min','12.4K'],['Uptime','99.9%']]" :key="k"
                                    :style="{ background:t.bg, border:`1px solid ${t.accent}18`, borderRadius:'8px', padding:'10px', textAlign:'center' }">
                                    <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'14px', fontWeight:800 }">{{ v }}</div>
                                    <div :style="{ color:t.textMuted, fontSize:'9px', marginTop:'2px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em' }">{{ k }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats -->
            <section :style="{ background:t.bgAlt, padding:'60px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div class="grid-4" :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }">
                        <div v-for="[v,l] in [['40%','Energy Savings'],['99.9%','Sensor Uptime'],['< 1s','Alert Latency'],['50+','Device Types']]" :key="l"
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
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">What We Connect</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'520px', margin:'0 auto' }">From a single smart office to a nationwide sensor network.</p>
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
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">From Survey to Smart Building</h2>
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
                    <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'20px' }">Ready to Build a <span :style="{ color:t.accent }">Smarter Facility?</span></h2>
                    <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, marginBottom:'36px' }">We'll assess your facility and propose an IoT architecture that pays for itself within 12 months.</p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44` }">Book a Free Assessment</button>
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
@keyframes pulse-0 { 0%,100% { transform:translate(-50%,-50%) scale(1); opacity:0.6; } 50% { transform:translate(-50%,-50%) scale(2); opacity:0; } }
@keyframes pulse-1 { 0%,100% { transform:translate(-50%,-50%) scale(1); opacity:0.6; } 50% { transform:translate(-50%,-50%) scale(2); opacity:0; } }
@keyframes pulse-2 { 0%,100% { transform:translate(-50%,-50%) scale(1); opacity:0.6; } 50% { transform:translate(-50%,-50%) scale(2); opacity:0; } }
</style>
