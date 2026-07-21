<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import FeatureCard from '@/Components/FeatureCard.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';
import KsIcon from '@/Components/KsIcon.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

// OCR scanning animation
const scanProgress = ref(0);
const extracting = ref(0);
let scanInterval, extractInterval;

onMounted(() => {
    scanInterval = setInterval(() => {
        scanProgress.value = (scanProgress.value + 1.5) % 110;
    }, 30);
    extractInterval = setInterval(() => {
        extracting.value = (extracting.value + 1) % 4;
    }, 800);
});
onUnmounted(() => { clearInterval(scanInterval); clearInterval(extractInterval); });

/* Illustrative OCR output — a sample document, not real client data. */
const extractedFields = [
    { label:'Invoice #', value:'INV-2026-08491' },
    { label:'Date', value:'2026-04-25' },
    { label:'Vendor', value:'Sample Vendor (Pvt) Ltd' },
    { label:'Amount', value:'PKR 245,800' },
];

const features = [
    ['FileText','AI-Powered OCR','Extract text from scanned documents, handwritten forms and images with 99%+ accuracy using deep learning models.'],
    ['Cpu','Intelligent Form Extraction','Automatically identify and extract structured data from forms, invoices, receipts and certificates.'],
    ['CheckCircle','Data Validation','Rule-based and AI validation to ensure extracted data meets your business logic before entry.'],
    ['Server','Secure Cloud Storage','Encrypted, searchable, tamper-proof digital archives — GDPR and local compliance ready.'],
    ['RefreshCw','Legacy Data Migration','Convert paper archives, legacy databases and old formats into modern, structured digital records.'],
    ['Network','System Integration','Push extracted data directly into your ERP, CRM, HIS or custom databases through API integration.'],
];

const process = [
    ['01','Document Assessment','Audit your paper archives, classify document types and design the digitisation workflow.'],
    ['02','AI Model Configuration','Configure extraction templates for each document type and train models on your specific formats.'],
    ['03','Batch Processing','Process documents at scale — thousands per day — with automated quality checks.'],
    ['04','Validate & Deliver','Human-in-the-loop validation for exceptions, then delivery to your target system with audit trail.'],
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
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Data Digitisation</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Your Data.<br><span :style="{ color:t.accent }">Unlocked.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Convert paper records, legacy documents and unstructured data into AI-ready digital assets — at scale, with 99%+ accuracy and full audit trails.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Get a Free Data Audit</button>
                                <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.text, border:`1px solid ${t.accent}44`, borderRadius:'8px', padding:'14px 24px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                            </div>
                        </div>

                        <!-- OCR Scan Visual: side-by-side document + fields -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'18px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">AI-OCR Engine</span>
                                <span :style="{ color:t.accent, fontSize:'10px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif`, background:`${t.accent}22`, padding:'3px 10px', borderRadius:'4px' }">99.4% confidence</span>
                            </div>
                            <div :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }">
                                <!-- Document being scanned -->
                                <div :style="{ position:'relative', background:'#FFF', borderRadius:'6px', overflow:'hidden', aspectRatio:'3/4', boxShadow:`0 8px 24px ${t.accent}33`, border:`1px solid ${t.accent}22` }">
                                    <div :style="{ padding:'10px 12px' }">
                                        <div :style="{ height:'5px', width:'45%', background:'#222', marginBottom:'8px', borderRadius:'2px' }" />
                                        <div v-for="i in 5" :key="i"
                                            :style="{ height:'2px', width:`${60 + (i * 7) % 35}%`, background:'#888', marginBottom:'4px', borderRadius:'2px', opacity: 0.6 + ((i * 0.1) % 0.4) }" />
                                        <div :style="{ marginTop:'6px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px' }">
                                            <div v-for="i in 4" :key="`b${i}`">
                                                <div :style="{ height:'2px', width:'70%', background:'#aaa', marginBottom:'2px', borderRadius:'2px' }" />
                                                <div :style="{ height:'3px', width:'90%', background:'#333', borderRadius:'2px' }" />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Scan line -->
                                    <div :style="{
                                        position:'absolute', left:'-10%', right:'-10%',
                                        top:`${scanProgress}%`, height:'3px',
                                        background:`linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                                        boxShadow:`0 0 12px 3px ${t.accent}88`,
                                        pointerEvents:'none', transition:'top 0.03s linear'
                                    }" />
                                    <div :style="{
                                        position:'absolute', inset:0,
                                        background:`linear-gradient(180deg, transparent ${Math.max(0,scanProgress-8)}%, ${t.accent}22 ${scanProgress}%, transparent ${Math.min(100,scanProgress+5)}%)`,
                                        pointerEvents:'none'
                                    }" />
                                    <div :style="{ position:'absolute', top:'6px', right:'6px', display:'flex', alignItems:'center', gap:'4px', background:`${t.accent}dd`, borderRadius:'3px', padding:'2px 6px' }">
                                        <div :style="{ width:'4px', height:'4px', borderRadius:'50%', background:'#fff' }" />
                                        <span :style="{ color:'#000', fontSize:'8px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">SAMPLE</span>
                                    </div>
                                </div>
                                <!-- Extracted fields -->
                                <div :style="{ display:'flex', flexDirection:'column', gap:'8px' }">
                                    <div v-for="(f, i) in extractedFields" :key="f.label"
                                        :style="{
                                            background: i <= extracting ? `${t.accent}15` : t.bg,
                                            border: `1px solid ${i <= extracting ? t.accent + '55' : t.accent + '15'}`,
                                            borderRadius:'6px', padding:'8px 10px',
                                            transition:'all 0.4s ease',
                                            opacity: i <= extracting ? 1 : 0.4,
                                            flex:1,
                                            display:'flex', flexDirection:'column', justifyContent:'center',
                                        }">
                                        <div :style="{ color:t.textMuted, fontSize:'9px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'3px' }">{{ f.label }}</div>
                                        <div :style="{ color: i <= extracting ? t.accent : t.textMuted, fontSize:'12px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">{{ i <= extracting ? f.value : '...' }}</div>
                                    </div>
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
                        <div v-for="[v,l] in [['99%+','OCR Accuracy'],['10×','Faster Than Manual'],['2.4M','Records Processed'],['80%','Admin Time Saved']]" :key="l"
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
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">What We Digitise</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'520px', margin:'0 auto' }">From single-page forms to decades of paper archives.</p>
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
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">From Paper to Digital</h2>
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
                    <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'20px' }">Ready to <span :style="{ color:t.accent }">Go Paperless?</span></h2>
                    <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, marginBottom:'36px' }">Tell us about your documents and we'll scope a digitisation project within 48 hours.</p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44` }">Book a Free Consultation</button>
                        <a href="/services" :style="{ display:'inline-flex', alignItems:'center', color:t.accent, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">← All Services</a>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
