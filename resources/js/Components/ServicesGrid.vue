<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import KsIcon from '@/Components/KsIcon.vue';

const { theme: t } = useTheme();
const hovered = ref(null);

const SERVICE_DATA = [
    { id:'ai', href:'/services/ai-solutions',    icon:'Brain',    title:'AI Solutions',           desc:'We build custom machine learning models, predictive analytics engines, and NLP systems — trained on your data, deployed in your environment. Not off-the-shelf; purpose-built for your industry.', tags:['Custom ML Models','NLP','Predictive Analytics','Computer Vision'], pattern:'neural', stat:'Purpose-built models' },
    { id:'cctv', href:'/services/cctv-ai',  icon:'Camera',   title:'CCTV AI Systems',        desc:'Transform passive cameras into intelligent sensors. Real-time facial recognition, intrusion detection, PPE compliance, crowd analytics and license plate recognition — all with instant alerts.', tags:['Face Recognition','Intrusion Detection','LPR','PPE Detection'], pattern:'grid', stat:'Live since 2008' },
    { id:'data', href:'/services/data-digitisation',  icon:'FileText', title:'Data Digitisation',      desc:'Convert paper records, forms, and legacy documents into structured digital data using AI-powered OCR, intelligent extraction, and automated validation — at scale, with full audit trails.', tags:['AI-OCR','Form Extraction','Data Validation','Secure Storage'], pattern:'doc', stat:'Election-scale records' },
    { id:'auto', href:'/services/automation',  icon:'GitMerge', title:'Automation',             desc:'Eliminate repetitive manual processes with intelligent RPA, workflow orchestration, and smart dashboards. Free your team to focus on decisions — not data entry.', tags:['RPA','Workflow Automation','Smart Dashboards','Process Intelligence'], pattern:'flow', stat:'Workflow orchestration' },
    { id:'iot', href:'/services/iot-smart-systems',   icon:'Wifi',     title:'IoT & Smart Systems',    desc:'Connect your physical world — smart offices, energy monitoring, environmental sensors, asset tracking, and connected device dashboards — all managed from a single control platform.', tags:['Smart Offices','Energy Monitoring','Asset Tracking','Sensor Networks'], pattern:'nodes', stat:'Single control platform' },
    { id:'cloud', href:'/services/cloud-infrastructure', icon:'Cloud',    title:'Cloud & Infrastructure', desc:"Design and deploy enterprise-grade private cloud, secure server rooms, and hybrid infrastructure. Data-sovereignty compliant, high-availability architectures built for Pakistan's connectivity landscape.", tags:['Private Cloud','Server Room Design','Hybrid Deployment','HA Architecture'], pattern:'cloud', stat:'Turn-key deployment' },
    { id:'chain', href:'/services/blockchain', icon:'Blocks', title:'Blockchain & Cardano', desc:'Smart contracts, native tokens and verifiable credentials engineered on Cardano — where deterministic execution and predictable fees make institutional deployment practical rather than experimental.', tags:['Aiken & Plutus','Native Tokens','Verifiable Credentials','dApps'], pattern:'neural', stat:'Cardano eUTXO' },
];
</script>

<template>
    <section :style="{ background:t.bg, padding:'100px 5%' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
            <!-- Heading -->
            <div :style="{ textAlign:'center', marginBottom:'64px' }">
                <div :style="{ display:'inline-block', color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">What We Do</div>
                <h2 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', lineHeight:1.1 }">End-to-End AI Services</h2>
                <p :style="{ color:t.textMuted, fontSize:'17px', marginTop:'16px', maxWidth:'520px', margin:'16px auto 0' }">Six specialised practices — from custom AI models to smart infrastructure.</p>
            </div>

            <!-- Grid -->
            <div class="services-grid" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px' }">
                <Link v-for="(svc, i) in SERVICE_DATA" :key="svc.id" :href="svc.href"
                    :style="{
                        display:'block', textDecoration:'none',
                        position:'relative', overflow:'hidden',
                        background: hovered === svc.id ? t.bgCard : t.bgAlt,
                        border:`1px solid ${hovered === svc.id ? t.accent+'66' : t.accent+'18'}`,
                        padding:'40px 32px', cursor:'pointer',
                        transition:'all 0.35s ease',
                        transform: hovered === svc.id ? 'translateY(-4px)' : 'none',
                        boxShadow: hovered === svc.id ? `0 20px 60px ${t.accent}22` : 'none',
                    }"
                    @mouseenter="hovered = svc.id"
                    @mouseleave="hovered = null"
                >
                    <div :style="{ position:'relative' }">
                        <div :style="{ width:'48px', height:'48px', borderRadius:'10px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px' }">
                            <KsIcon :name="svc.icon" :size="22" :color="t.accent" />
                        </div>
                        <h3 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'20px', fontWeight:700, color:t.text, marginBottom:'10px', letterSpacing:'-0.02em' }">{{ svc.title }}</h3>
                        <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.65, marginBottom:'20px' }">{{ svc.desc }}</p>
                        <div :style="{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }">
                            <span v-for="tag in svc.tags" :key="tag" :style="{ background:`${t.accent}15`, color:t.accent, borderRadius:'4px', padding:'3px 10px', fontSize:'11px', fontWeight:600, fontFamily:`'Space Grotesk', sans-serif`, letterSpacing:'0.04em' }">{{ tag }}</span>
                        </div>
                        <div :style="{ borderTop:`1px solid ${t.accent}18`, paddingTop:'14px', display:'flex', justifyContent:'space-between', alignItems:'center' }">
                            <span :style="{ color:t.accent, fontSize:'12px', fontWeight:700, fontFamily:`'Space Grotesk', sans-serif` }">{{ svc.stat }}</span>
                            <span :style="{ color:t.accent, fontSize:'13px', fontWeight:600, fontFamily:`'Space Grotesk', sans-serif`, opacity: hovered === svc.id ? 1 : 0.3, transition:'opacity 0.2s' }">Learn more →</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </section>
</template>
