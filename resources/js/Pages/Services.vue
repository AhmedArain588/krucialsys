<script setup>
import { ref, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import PageHero from '@/Components/PageHero.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';
import KsIcon from '@/Components/KsIcon.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

const SERVICES = [
    { slug:'ai-solutions',         icon:'Brain',    title:'AI Solutions',           color:'#0A84FF', desc:'Custom machine learning, NLP, computer vision and predictive analytics built end-to-end for your business.', features:['Custom ML Models','Natural Language Processing','Computer Vision','Predictive Analytics','Model Monitoring'] },
    { slug:'cctv-ai',              icon:'Camera',   title:'CCTV AI Systems',        color:'#00C896', desc:'Transform your camera network into an intelligent security and analytics platform with real-time detection.', features:['Facial Recognition','Intrusion Detection','PPE Compliance','Crowd Analytics','License Plate Recognition'] },
    { slug:'automation',           icon:'GitMerge', title:'Automation',             color:'#9B6DFF', desc:'Eliminate repetitive tasks with intelligent RPA, workflow orchestration and AI-driven process intelligence.', features:['Robotic Process Automation','Workflow Orchestration','Smart Dashboards','Process Mining','Document Automation'] },
    { slug:'data-digitisation',    icon:'FileText', title:'Data Digitisation',      color:'#E8A020', desc:'Convert legacy documents and paper records into structured digital data using AI-powered OCR and extraction.', features:['AI-Powered OCR','Form Extraction','Data Validation','Legacy Migration','Audit Trails'] },
    { slug:'iot-smart-systems',    icon:'Wifi',     title:'IoT & Smart Systems',    color:'#FF6B6B', desc:'Connect your physical infrastructure — smart offices, energy systems, and sensor networks on one platform.', features:['Smart Office Automation','Energy Monitoring','Asset Tracking','Environmental Sensors','Remote Management'] },
    { slug:'cloud-infrastructure', icon:'Cloud',    title:'Cloud & Infrastructure', color:'#4ECDC4', desc:'Enterprise-grade private cloud, server rooms, and hybrid deployments with local support and data sovereignty.', features:['Private Cloud','Server Room Design','Hybrid Deployment','Disaster Recovery','24/7 Monitoring'] },
    { slug:'blockchain', icon:'Blocks', title:'Blockchain & Cardano', color:'#0033AD', desc:'Smart contracts, native tokens, verifiable credentials and on-chain record integrity, engineered on Cardano.', features:['Aiken & Plutus Contracts','Native Tokens & NFTs','Verifiable Credentials','dApp & Wallet Integration','Chain Infrastructure'] },
];

const hoveredSlug = ref(null);
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <PageHero badge="Our Expertise" title="Six Practices." highlight="One Partner." subtitle="From AI models to smart infrastructure — we deliver complete, end-to-end technology solutions built for your industry." cta="Book a Free Consultation" @demo="demoOpen = true" />

            <section :style="{ padding:'80px 5%', background:t.bg }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div class="grid-3" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }">
                        <div v-for="svc in SERVICES" :key="svc.slug"
                            :style="{
                                background: hoveredSlug===svc.slug ? t.bgCard : t.bgAlt,
                                border:`1px solid ${hoveredSlug===svc.slug ? svc.color+'66' : t.accent+'22'}`,
                                borderRadius:'16px', padding:'36px 28px',
                                transition:'all 0.3s',
                                transform: hoveredSlug===svc.slug ? 'translateY(-6px)' : 'none',
                                boxShadow: hoveredSlug===svc.slug ? `0 20px 60px ${svc.color}22` : 'none',
                            }"
                            @mouseenter="hoveredSlug = svc.slug"
                            @mouseleave="hoveredSlug = null"
                        >
                            <div :style="{ width:'52px', height:'52px', borderRadius:'12px', background:`${svc.color}22`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }">
                                <KsIcon :name="svc.icon" :size="26" :color="svc.color" />
                            </div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'22px', fontWeight:800, color:t.text, letterSpacing:'-0.02em', marginBottom:'12px' }">{{ svc.title }}</h3>
                            <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.65, marginBottom:'20px' }">{{ svc.desc }}</p>
                            <ul :style="{ listStyle:'none', marginBottom:'24px' }">
                                <li v-for="f in svc.features" :key="f" :style="{ display:'flex', alignItems:'center', gap:'8px', color:t.textMuted, fontSize:'13px', marginBottom:'6px' }">
                                    <span :style="{ width:'5px', height:'5px', borderRadius:'50%', background:svc.color, flexShrink:0, display:'inline-block' }" />
                                    {{ f }}
                                </li>
                            </ul>
                            <Link :href="`/services/${svc.slug}`" :style="{ display:'inline-flex', alignItems:'center', gap:'6px', color:svc.color, fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'14px', textDecoration:'none' }">
                                Explore Service →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
