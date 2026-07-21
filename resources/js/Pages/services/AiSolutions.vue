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

const canvasRef = ref(null);
let animId = null;
onMounted(() => {
    const canvas = canvasRef.value; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const layers = [[.1],[.25,.45,.65,.85],[.2,.4,.6,.8],[.3,.5,.7],[.5]];
    const xPos = [0.08,0.28,0.52,0.74,0.94];
    const nodes = layers.flatMap((ys,li) => ys.map((y,ni) => ({ x:xPos[li], y, li, ni })));
    const edges = []; nodes.forEach(n => nodes.filter(m => m.li===n.li+1).forEach(m => edges.push([n,m])));
    let phase = 0;
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    function draw() {
        const w=canvas.offsetWidth, h=canvas.offsetHeight;
        ctx.clearRect(0,0,w,h); phase+=0.02;
        const accent = t.value.accent;
        edges.forEach(([a,b]) => {
            const sig=Math.sin(phase-a.x*12)*0.5+0.5;
            ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b.x*w,b.y*h);
            ctx.strokeStyle=accent+Math.floor(sig*80+10).toString(16).padStart(2,'0');
            ctx.lineWidth=1.2; ctx.stroke();
        });
        nodes.forEach(n => {
            const pulse=Math.sin(phase-n.x*8+n.y*4)*0.5+0.5; const r=6+pulse*4;
            ctx.beginPath(); ctx.arc(n.x*w,n.y*h,r*3,0,Math.PI*2);
            ctx.fillStyle=accent+'18'; ctx.fill();
            ctx.beginPath(); ctx.arc(n.x*w,n.y*h,r,0,Math.PI*2);
            ctx.fillStyle=accent+Math.floor(pulse*200+55).toString(16).padStart(2,'0'); ctx.fill();
            if(n.li===4) {
                ctx.fillStyle=accent; ctx.font=`bold ${Math.round(w*0.018)}px Space Grotesk,sans-serif`;
                ctx.fillText(['Classify','Predict','Detect'][n.ni]||'', n.x*w+12, n.y*h+4);
            }
        });
        animId=requestAnimationFrame(draw);
    }
    resize(); draw(); window.addEventListener('resize',resize);
});
onUnmounted(() => { cancelAnimationFrame(animId); });

const features = [
    ['Brain','Custom ML Models','Supervised, unsupervised and reinforcement learning — trained on your proprietary data with full model ownership.'],
    ['MessageSquare','NLP & Text AI','Document classification, entity extraction, sentiment analysis, semantic search and intelligent chatbots.'],
    ['Eye','Computer Vision','Object detection, image segmentation, defect detection and visual QA pipelines for production lines.'],
    ['TrendingUp','Predictive Analytics','Demand forecasting, churn prediction, risk scoring, anomaly detection and recommendation engines.'],
    ['RefreshCw','MLOps & Retraining','Model versioning, drift detection, automated retraining pipelines, A/B testing and performance dashboards.'],
    ['Link','API Integration','Production REST APIs, webhooks, batch inference endpoints — integrate AI into any existing system.'],
];

const useCases = [
    ['Factory','Manufacturing QA','AI visual inspection on production lines detecting micro-defects, surface anomalies and dimensional variance — 99.1% catch rate replacing manual inspection.','Manufacturing','99.1% defect detection'],
    ['Landmark','Financial Risk','Real-time loan default prediction and fraud probability scoring integrated into core banking flows with < 50ms inference latency.','Banking','< 50ms inference'],
    ['ShoppingCart','Retail Demand Forecasting','SKU-level demand prediction reducing overstock by 30% and eliminating stockouts on top 500 SKUs across multi-branch retail chains.','Retail','30% overstock reduction'],
    ['Activity','Medical NLP','Clinical note processing — extracting diagnoses, medications and procedures from free text at 10× human speed with 98% accuracy.','Healthcare','98% extraction accuracy'],
];

const process = [
    ['01','Data Audit','Assess quality, volume, labelling needs and define optimal model strategy.'],
    ['02','Design & Train','Architecture selection, feature engineering, iterative training and validation.'],
    ['03','Test & Deploy','Rigorous testing, bias checks, then production deployment via API or on-premise.'],
    ['04','Monitor & Retrain','Drift detection, automated retraining, A/B testing and performance dashboards.'],
];
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero with split layout -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ position:'absolute', top:'30%', right:'10%', width:'400px', height:'400px', borderRadius:'50%', background:`${t.accent}0A`, filter:'blur(60px)' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">AI & Machine Learning</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                AI That Learns<br><span :style="{ color:t.accent }">Your Business.</span><br>Not Someone Else's.
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">We build custom machine learning models, NLP systems and computer vision pipelines — trained on your data, deployed in your environment, delivering measurable outcomes.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Get a Free Consultation</button>
                                <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.text, border:`1px solid ${t.accent}44`, borderRadius:'8px', padding:'14px 24px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                            </div>
                        </div>
                        <!-- Neural network visual -->
                        <div :style="{ position:'relative', borderRadius:'20px', overflow:'hidden', background:`${t.accent}08`, border:`1px solid ${t.accent}22` }">
                            <canvas ref="canvasRef" :style="{ width:'100%', height:'380px', display:'block' }" />
                            <div :style="{ position:'absolute', bottom:'16px', left:'16px', right:'16px', display:'flex', gap:'8px', flexWrap:'wrap' }">
                                <span v-for="l in ['Input Layer','Hidden × 2','Output Layer']" :key="l" :style="{ background:`${t.accent}22`, color:t.accent, borderRadius:'6px', padding:'4px 12px', fontSize:'11px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">{{ l }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats -->
            <section :style="{ background:t.bgAlt, padding:'60px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div class="grid-4" :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }">
                        <div v-for="[v,l] in [['98%','Model Accuracy'],['94%','Precision'],['97%','Recall Rate'],['<50ms','Inference Latency']]" :key="l"
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
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">What We Build</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'520px', margin:'0 auto' }">Every system engineered end-to-end for your industry context.</p>
                    </div>
                    <div class="grid-3" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }">
                        <FeatureCard v-for="[icon,title,desc] in features" :key="title" :icon="icon" :title="title" :desc="desc" />
                    </div>
                </div>
            </section>

            <!-- Use Cases -->
            <section :style="{ background:t.bgAlt, padding:'90px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Applications</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">Where We Deploy It</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'520px', margin:'0 auto' }">Production AI deployments across industries.</p>
                    </div>
                    <div class="grid-2" :style="{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'20px' }">
                        <div v-for="[icon,title,desc,tag,stat] in useCases" :key="title"
                            :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'16px', padding:'28px', transition:'all 0.3s' }"
                            @mouseenter="(e) => { e.currentTarget.style.borderColor=`${t.accent}55`; e.currentTarget.style.transform='translateY(-4px)'; }"
                            @mouseleave="(e) => { e.currentTarget.style.borderColor=`${t.accent}22`; e.currentTarget.style.transform='none'; }"
                        >
                            <div :style="{ display:'flex', justifyContent:'space-between', marginBottom:'16px', flexWrap:'wrap', gap:'8px' }">
                                <div :style="{ width:'44px',height:'44px',borderRadius:'10px',background:`${t.accent}18`,border:`1px solid ${t.accent}33`,display:'flex',alignItems:'center',justifyContent:'center' }">
                                    <KsIcon :name="icon" :size="20" :color="t.accent" />
                                </div>
                                <div :style="{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }">
                                    <span :style="{ background:`${t.accent}18`, color:t.accent, borderRadius:'4px', padding:'2px 10px', fontSize:'10px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase' }">{{ tag }}</span>
                                    <span :style="{ background:`${t.accent}33`, color:t.accent, borderRadius:'4px', padding:'2px 10px', fontSize:'11px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">{{ stat }}</span>
                                </div>
                            </div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'18px', fontWeight:700, color:t.text, marginBottom:'10px' }">{{ title }}</h3>
                            <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.65 }">{{ desc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Process -->
            <section :style="{ background:t.bg, padding:'90px 5%' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Process</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">From Raw Data to Deployed Model</h2>
                    </div>
                    <div class="grid-4" :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, position:'relative' }">
                        <div :style="{ position:'absolute', top:'32px', left:'12.5%', right:'12.5%', height:'1px', background:`linear-gradient(90deg,transparent,${t.accent}44,transparent)` }" />
                        <div v-for="[n,title,desc] in process" :key="n" :style="{ padding:'0 20px', textAlign:'center' }">
                            <div :style="{ width:'64px', height:'64px', borderRadius:'50%', background:t.bgAlt, border:`2px solid ${t.accent}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', position:'relative', zIndex:1 }">
                                <span :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'16px', fontWeight:800, color:t.accent }">{{ n }}</span>
                            </div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, marginBottom:'10px' }">{{ title }}</h3>
                            <p :style="{ color:t.textMuted, fontSize:'13px', lineHeight:1.65 }">{{ desc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <section :style="{ background:t.bgAlt, padding:'90px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }">
                    <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'20px' }">Ready to Deploy <span :style="{ color:t.accent }">Custom AI?</span></h2>
                    <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, marginBottom:'36px' }">Start with a free consultation — our ML engineers will map your data landscape and propose a solution within 48 hours.</p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44` }">Book a Free Demo</button>
                        <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.accent, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
