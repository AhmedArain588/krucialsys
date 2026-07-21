<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';
import CaseStudyHighlight from '@/Components/CaseStudyHighlight.vue';
import PortfolioShowcase from '@/Components/PortfolioShowcase.vue';
import CtaBanner from '@/Components/CtaBanner.vue';
import DemoModal from '@/Components/DemoModal.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

/**
 * Counters reflect verifiable facts from the company profile — years in
 * operation, channels monitored, offices. Avoid adding performance claims
 * (loss reduction, accuracy) unless they come from measured client data.
 */
const counters = ref({ years: 0, channels: 0, offices: 0 });
const targets = { years: 17, channels: 48, offices: 3 };
let counterInterval;

onMounted(() => {
    counterInterval = setInterval(() => {
        let done = true;
        for (const k in targets) {
            if (counters.value[k] < targets[k]) { counters.value[k] += Math.ceil(targets[k] / 30); done = false; }
            if (counters.value[k] > targets[k]) counters.value[k] = targets[k];
        }
        if (done) clearInterval(counterInterval);
    }, 40);
});
onUnmounted(() => clearInterval(counterInterval));

/* Delivery capability areas shown in the hero panel. */
const capabilities = [
    'Media monitoring & archiving',
    'Web & mobile applications',
    'Data digitisation at scale',
    'CCTV, access control & fire alarm',
    'Building management systems',
];
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero with results dashboard -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Case Studies</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Real Projects.<br><span :style="{ color:t.accent }">Real Impact.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Systems we designed, built and handed over — for government, defence, political organisations and enterprise clients across Pakistan and beyond.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Get Similar Results</button>
                            </div>
                        </div>

                        <!-- Results dashboard visual -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'18px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">Track Record</span>
                                <span :style="{ color:t.accent, fontSize:'11px', fontWeight:700 }">SINCE 2008</span>
                            </div>

                            <!-- Counters -->
                            <div :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', marginBottom:'12px' }">
                                <div v-for="[k,v,suffix] in [['Years Operating', counters.years, '+'],['Channels Monitored', counters.channels, ''],['Global Offices', counters.offices, '']]" :key="k"
                                    :style="{ background:t.bg, border:`1px solid ${t.accent}33`, borderRadius:'10px', padding:'14px 10px', textAlign:'center' }">
                                    <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'24px', fontWeight:800 }">{{ v }}{{ suffix }}</div>
                                    <div :style="{ color:t.textMuted, fontSize:'9px', marginTop:'2px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em' }">{{ k }}</div>
                                </div>
                            </div>

                            <!-- Capability list -->
                            <div :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'10px', padding:'14px' }">
                                <div :style="{ color:t.textMuted, fontSize:'10px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'10px' }">Delivered Capabilities</div>
                                <div v-for="c in capabilities" :key="c"
                                    :style="{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 0' }">
                                    <div :style="{ width:'5px', height:'5px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 6px ${t.accent}`, flexShrink:0 }" />
                                    <span :style="{ color:t.text, fontSize:'12.5px' }">{{ c }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PortfolioShowcase />
            <CaseStudyHighlight />
            <CtaBanner @demo="demoOpen = true" />
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
