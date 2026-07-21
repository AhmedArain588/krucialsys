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
const scanY = ref(0);
const alertActive = ref(false);
let tickInterval, scanInterval, alertInterval;

onMounted(() => {
    tickInterval = setInterval(() => tick.value++, 1000);
    let y = 0, dir = 1;
    scanInterval = setInterval(() => { y += dir * 1.5; if (y > 100) dir = -1; if (y < 0) dir = 1; scanY.value = y; }, 30);
    alertInterval = setInterval(() => alertActive.value = !alertActive.value, 3000);
});
onUnmounted(() => { clearInterval(tickInterval); clearInterval(scanInterval); clearInterval(alertInterval); });

const cams = [
    { label:'CAM 01 — Entrance', persons:2, status:'active' },
    { label:'CAM 02 — Warehouse', persons:0, status:'active' },
    { label:'CAM 03 — Parking', persons:1, status:'alert' },
    { label:'CAM 04 — Server Room', persons:0, status:'active' },
];
const detections = [
    { x:18, y:25, w:28, h:45, label:'Person', conf:96 },
    { x:55, y:30, w:22, h:38, label:'Person', conf:91 },
    { x:68, y:55, w:18, h:25, label:'Bag', conf:84 },
];

const features = [
    ['Camera','Facial Recognition','Match faces against watchlists in real-time with sub-second response across unlimited camera streams.'],
    ['Shield','Intrusion Detection','Detect unauthorised access to restricted zones immediately — with configurable alert escalation.'],
    ['HardHat','PPE Compliance','Automated hard hat, vest and footwear detection on construction and industrial sites.'],
    ['Users','Crowd Analytics','Real-time headcount, crowd density mapping and dwell-time analysis for any venue.'],
    ['Globe','License Plate Recognition','High-speed LPR for parking, toll, logistics and access control — 99.2% accuracy.'],
    ['BarChart2','Video Analytics','Heatmaps, flow analysis, queue detection and behaviour anomaly scoring from any camera.'],
];

const process = [
    ['01','Site Survey','Camera placement planning, network assessment, lighting requirements and coverage mapping.'],
    ['02','Hardware Install','Camera procurement, mounting, cabling, NVR/DVR setup and network configuration.'],
    ['03','AI Integration','Model deployment, alert configuration, dashboard setup and integration with existing systems.'],
    ['04','Live & Support','Go-live monitoring, staff training, 24/7 alert management and quarterly model updates.'],
];
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero with split layout -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">CCTV AI Systems</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Cameras That<br><span :style="{ color:t.accent }">See, Think</span><br>and Act.
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Transform your passive camera network into an intelligent security platform. Real-time detection, instant alerts, and actionable analytics — 24/7.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Book a Site Survey</button>
                                <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.text, border:`1px solid ${t.accent}44`, borderRadius:'8px', padding:'14px 24px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                            </div>
                        </div>
                        <!-- CCTV Visual -->
                        <div :style="{ display:'flex', flexDirection:'column', gap:'10px' }">
                            <div :style="{ position:'relative', background:t.bg, border:`2px solid ${t.accent}44`, borderRadius:'12px', overflow:'hidden', aspectRatio:'16/9' }">
                                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}10 1px,transparent 1px),linear-gradient(90deg,${t.accent}10 1px,transparent 1px)`, backgroundSize:'32px 32px' }" />
                                <div :style="{ position:'absolute', left:0, right:0, top:`${scanY}%`, height:'2px', background:`linear-gradient(90deg,transparent,${t.accent}88,transparent)`, pointerEvents:'none' }" />
                                <div v-for="(box,i) in detections" :key="i"
                                    :style="{ position:'absolute', left:`${box.x}%`, top:`${box.y}%`, width:`${box.w}%`, height:`${box.h}%`, border:`2px solid ${t.accent}`, borderRadius:'2px' }">
                                    <div :style="{ position:'absolute', top:'-18px', left:0, background:`${t.accent}dd`, borderRadius:'3px', padding:'2px 6px', fontSize:'10px', color:'#000', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, whiteSpace:'nowrap' }">{{ box.label }} {{ box.conf }}%</div>
                                </div>
                                <div v-if="alertActive" :style="{ position:'absolute', top:'12px', right:'12px', display:'flex', alignItems:'center', gap:'6px', background:'#FF4444dd', borderRadius:'6px', padding:'4px 10px' }">
                                    <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:'#fff' }" />
                                    <span :style="{ color:'#fff', fontSize:'10px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">MOTION ALERT</span>
                                </div>
                                <div :style="{ position:'absolute', bottom:'8px', left:'10px', color:`${t.accent}cc`, fontSize:'10px', fontFamily:`'Space Grotesk',sans-serif` }">CAM_03 · 4K · LIVE</div>
                                <div :style="{ position:'absolute', top:'8px', left:'10px', display:'flex', alignItems:'center', gap:'6px' }">
                                    <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:'#00C896', boxShadow:'0 0 6px #00C896' }" />
                                    <span :style="{ color:'#00C896', fontSize:'10px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">LIVE · AI ACTIVE</span>
                                </div>
                            </div>
                            <div :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'6px' }">
                                <div v-for="(cam,i) in cams" :key="i" :style="{ background:t.bg, border:`1px solid ${cam.status==='alert'?t.accent+'88':t.accent+'22'}`, borderRadius:'8px', padding:'8px' }">
                                    <div :style="{ background:`${t.accent}10`, borderRadius:'4px', height:'36px', marginBottom:'6px', display:'flex', alignItems:'center', justifyContent:'center' }">
                                        <KsIcon name="Camera" :size="14" :color="t.accent" />
                                    </div>
                                    <div :style="{ color:t.textMuted, fontSize:'9px', fontFamily:`'Space Grotesk',sans-serif`, lineHeight:1.3 }">{{ cam.label }}</div>
                                    <div v-if="cam.persons" :style="{ color:t.accent, fontSize:'9px', fontWeight:700, marginTop:'2px' }">{{ cam.persons }} detected</div>
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
                        <div v-for="[v,l] in [['99.7%','Detection Accuracy'],['< 3s','Alert Response'],['35%','Avg Loss Reduction'],['24/7','Monitoring']]" :key="l"
                            :style="{ textAlign:'center', padding:'28px 20px', background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'12px' }">
                            <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'36px', fontWeight:800, color:t.accent, marginBottom:'8px' }">{{ v }}</div>
                            <div :style="{ color:t.textMuted, fontSize:'13px', fontWeight:500 }">{{ l }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features -->
            <section :style="{ background:t.bg, padding:'90px 5%' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Capabilities</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">What Our CCTV AI Can Do</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'520px', margin:'0 auto' }">Beyond recording — intelligent surveillance that acts on what it sees.</p>
                    </div>
                    <div class="grid-3" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }">
                        <FeatureCard v-for="[icon,title,desc] in features" :key="title" :icon="icon" :title="title" :desc="desc" />
                    </div>
                </div>
            </section>

            <!-- Process -->
            <section :style="{ background:t.bgAlt, padding:'90px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Deployment Process</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">From Survey to Live System</h2>
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

            <!-- CTA -->
            <section :style="{ background:t.bg, padding:'90px 5%' }">
                <div :style="{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }">
                    <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'20px' }">Ready to Make Your <span :style="{ color:t.accent }">Cameras Intelligent?</span></h2>
                    <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, marginBottom:'36px' }">We'll conduct a free site assessment and propose a customised AI camera solution within 48 hours.</p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44` }">Book a Free Site Assessment</button>
                        <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.accent, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
