<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';
import IndustriesServed from '@/Components/IndustriesServed.vue';
import CtaBanner from '@/Components/CtaBanner.vue';
import DemoModal from '@/Components/DemoModal.vue';
import KsIcon from '@/Components/KsIcon.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

const activeIndustry = ref(0);
let interval;
/**
 * Sectors served, labelled by the capability delivered rather than by
 * performance percentages — we don't publish metrics we haven't measured.
 */
const industries = [
    { icon:'Building2', name:'Government',     metric:'Monitoring', label:'& Digitisation' },
    { icon:'Shield', name:'Defence',           metric:'Media', label:'Intelligence' },
    { icon:'ShoppingCart', name:'Retail',      metric:'POS', label:'& Surveillance' },
    { icon:'Package', name:'Logistics',        metric:'Access', label:'& Tracking' },
    { icon:'Building2', name:'Real Estate',    metric:'BMS', label:'Integration' },
    { icon:'Users', name:'Political',          metric:'Platforms', label:'& Monitoring' },
];
onMounted(() => { interval = setInterval(() => activeIndustry.value = (activeIndustry.value + 1) % industries.length, 1500); });
onUnmounted(() => clearInterval(interval));
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero with industries grid visual -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Industries</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Sector-Specific<br><span :style="{ color:t.accent }">Intelligence.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Systems built for the unique demands of every sector — from government and defence to retail, logistics and facilities management.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Discuss Your Industry</button>
                            </div>
                        </div>

                        <!-- Industry tiles visual -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'18px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">Active Deployments</span>
                                <span :style="{ color:'#00C896', fontSize:'11px', fontWeight:700, display:'flex', alignItems:'center', gap:'5px' }">
                                    <span :style="{ width:'6px', height:'6px', borderRadius:'50%', background:'#00C896', boxShadow:'0 0 6px #00C896' }" />
                                    {{ industries.length }} SECTORS
                                </span>
                            </div>
                            <div :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }">
                                <div v-for="(ind, i) in industries" :key="ind.name"
                                    :style="{
                                        background: i === activeIndustry ? `${t.accent}22` : t.bg,
                                        border:`1px solid ${i === activeIndustry ? t.accent + 'aa' : t.accent + '22'}`,
                                        borderRadius:'10px', padding:'14px 10px',
                                        textAlign:'center', transition:'all 0.4s ease',
                                        transform: i === activeIndustry ? 'scale(1.05)' : 'scale(1)',
                                        boxShadow: i === activeIndustry ? `0 0 20px ${t.accent}55` : 'none',
                                    }">
                                    <div :style="{ width:'30px', height:'30px', borderRadius:'8px', background:`${t.accent}22`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 8px' }">
                                        <KsIcon :name="ind.icon" :size="16" :color="t.accent" />
                                    </div>
                                    <div :style="{ color:t.text, fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'10px', marginBottom:'4px' }">{{ ind.name }}</div>
                                    <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontWeight:800, fontSize:'14px' }">{{ ind.metric }}</div>
                                    <div :style="{ color:t.textMuted, fontSize:'8px', marginTop:'2px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.04em' }">{{ ind.label }}</div>
                                </div>
                            </div>
                            <div :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', marginTop:'10px' }">
                                <div v-for="[k,v] in [['2008','Since'],['3','Offices'],['6','Sectors']]" :key="k"
                                    :style="{ background:t.bg, border:`1px solid ${t.accent}18`, borderRadius:'8px', padding:'10px', textAlign:'center' }">
                                    <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'14px', fontWeight:800 }">{{ k }}</div>
                                    <div :style="{ color:t.textMuted, fontSize:'9px', marginTop:'2px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em' }">{{ v }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <IndustriesServed />
            <CtaBanner @demo="demoOpen = true" />
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
