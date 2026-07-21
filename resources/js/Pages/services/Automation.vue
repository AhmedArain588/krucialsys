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

const active = ref(0);
let interval;
onMounted(() => { interval = setInterval(() => active.value = (active.value + 1) % 5, 1400); });
onUnmounted(() => clearInterval(interval));

const steps = [{x:8,y:42,label:'Trigger',w:18},{x:32,y:20,label:'Fetch Data',w:18},{x:32,y:64,label:'Validate',w:18},{x:58,y:42,label:'Process',w:18},{x:82,y:42,label:'Output',w:18}];
const edges = [[0,1],[0,2],[1,3],[2,3],[3,4]];

const features = [
    ['GitMerge','Robotic Process Automation','Software bots that replicate human actions — login, extract, enter data — across any application, 24/7 without errors.'],
    ['Cpu','Workflow Orchestration','Multi-step process automation with conditional logic, parallel execution, exception handling and audit trails.'],
    ['BarChart2','Smart Dashboards','Real-time operational intelligence — KPI tracking, anomaly alerts, and management reporting — auto-generated.'],
    ['FileText','Document Automation','Automated document generation, approval routing, e-signatures and archiving — no manual steps.'],
    ['RefreshCw','Process Mining','Discover bottlenecks, inefficiencies and automation opportunities from your existing system logs.'],
    ['Link','System Integration','Connect ERP, CRM, banking systems and legacy apps without API — through intelligent screen and data automation.'],
];

const process = [
    ['01','Process Audit','Map current workflows, identify manual bottlenecks and quantify automation ROI.'],
    ['02','Bot Design','Design automation logic, exception handling rules and integration points.'],
    ['03','Build & Test','Develop, test and validate bots in staging before live deployment.'],
    ['04','Deploy & Scale','Go-live with monitoring, performance dashboards and ongoing optimization.'],
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
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Intelligent Automation</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Stop Doing It<br>Manually.<br><span :style="{ color:t.accent }">Automate It.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Intelligent RPA and workflow automation that frees your team from repetitive work — running 24/7 with zero errors and full audit trails.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Get a Process Audit</button>
                                <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.text, border:`1px solid ${t.accent}44`, borderRadius:'8px', padding:'14px 24px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                            </div>
                        </div>
                        <!-- Workflow Visual -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'24px', fontFamily:`'Space Grotesk',sans-serif` }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'14px' }">Workflow Automation Engine</span>
                                <span :style="{ color:'#00C896', fontSize:'11px', background:'#00C89622', borderRadius:'100px', padding:'3px 10px', fontWeight:700 }">● RUNNING</span>
                            </div>
                            <svg viewBox="0 0 100 90" :style="{ width:'100%', height:'200px', marginBottom:'16px' }">
                                <line v-for="([a,b],i) in edges" :key="i"
                                    :x1="steps[a].x+steps[a].w/2" :y1="steps[a].y+8"
                                    :x2="steps[b].x+steps[b].w/2" :y2="steps[b].y+8"
                                    :stroke="active===a||active===b ? t.accent : t.accent+'33'"
                                    :stroke-width="active===a||active===b ? '1.5' : '0.8'"
                                    :stroke-dasharray="active===a||active===b ? 'none' : '2,2'"
                                    style="transition:stroke 0.3s"
                                />
                                <g v-for="(s,i) in steps" :key="i">
                                    <rect :x="s.x" :y="s.y" :width="s.w" height="16" rx="3"
                                        :fill="active===i ? t.accent+'33' : t.accent+'10'"
                                        :stroke="active===i ? t.accent : t.accent+'44'"
                                        stroke-width="1" style="transition:all 0.3s" />
                                    <text :x="s.x+s.w/2" :y="s.y+10" text-anchor="middle"
                                        :fill="active===i ? t.accent : t.textMuted"
                                        font-size="4" font-family="Space Grotesk" :font-weight="active===i?'700':'400'">{{ s.label }}</text>
                                </g>
                            </svg>
                            <div :style="{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px' }">
                                <div v-for="[l,v] in [['Bots Running','12 active'],['Tasks Today','8,492'],['Avg. Handle Time','0.8s'],['Error Rate','0.02%']]" :key="l"
                                    :style="{ background:t.bg, border:`1px solid ${t.accent}18`, borderRadius:'8px', padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }">
                                    <span :style="{ color:t.textMuted, fontSize:'11px' }">{{ l }}</span>
                                    <span :style="{ color:t.accent, fontWeight:700, fontSize:'12px' }">{{ v }}</span>
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
                        <div v-for="[v,l] in [['60%','Cost Savings'],['12','Bots Active'],['8,492','Tasks/Day'],['0.02%','Error Rate']]" :key="l"
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
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">What We Automate</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'520px', margin:'0 auto' }">From simple data entry to complex multi-system workflows.</p>
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
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Process</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">From Audit to Automation</h2>
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
                    <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'20px' }">Ready to <span :style="{ color:t.accent }">Automate Your Operations?</span></h2>
                    <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, marginBottom:'36px' }">Book a free process audit and we'll identify your highest-ROI automation opportunities within 5 business days.</p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44` }">Book a Free Process Audit</button>
                        <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.accent, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
