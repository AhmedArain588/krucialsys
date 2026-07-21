<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();

const tick = ref(0);
let interval = null;
onMounted(() => { interval = setInterval(() => tick.value = (tick.value + 1) % 20, 800); });
onUnmounted(() => clearInterval(interval));

const points = [
    ['Custom-Built AI', 'No off-the-shelf solutions — every system is engineered for your exact context.'],
    ['End-to-End Delivery', 'We handle hardware, software, integration and ongoing support — one partner.'],
    ['Local Deployment', 'On-premise options for data-sensitive environments with full sovereignty.'],
    ['Scalable Architecture', 'Systems designed to grow with you — from pilot to enterprise-wide rollout.'],
    ['Industry Expertise', 'Specialists in government, defence, retail, logistics and building management.'],
];

const modules = ['Computer Vision','Data Pipeline','Alert Engine','Model Registry'];
/* Verifiable delivery facts — not simulated telemetry. */
const metrics = [['Operating since','2008',''],['Global offices','3','KHI · DXB · HSV'],['Broadcast channels monitored','48',''],];
</script>

<template>
    <section :style="{ background:t.bg, padding:'100px 5%' }">
        <div class="why-grid" :style="{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }">
            <!-- Left -->
            <div>
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Why Choose Us</div>
                <h2 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'clamp(28px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'48px' }">
                    Built Different.<br>Deployed Better.
                </h2>
                <div v-for="([title, desc], i) in points" :key="title" :style="{ display:'flex', gap:'20px', marginBottom:'28px' }">
                    <div :style="{ width:'32px', height:'32px', borderRadius:'50%', background:`${t.accent}22`, border:`1px solid ${t.accent}66`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px' }">
                        <div :style="{ width:'8px', height:'8px', borderRadius:'50%', background:t.accent }" />
                    </div>
                    <div>
                        <div :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'15px', color:t.text, marginBottom:'4px' }">{{ title }}</div>
                        <div :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.6 }">{{ desc }}</div>
                    </div>
                </div>
            </div>

            <!-- Right: Control room visual -->
            <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'28px', fontFamily:`'Space Grotesk', sans-serif` }">
                <div :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }">
                    <div v-for="(name, i) in modules" :key="name" :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'8px', padding:'14px 16px' }">
                        <div :style="{ fontSize:'10px', color:t.textMuted, letterSpacing:'0.08em', marginBottom:'8px', textTransform:'uppercase' }">{{ name }}</div>
                        <div :style="{ height:'4px', background:`${t.accent}22`, borderRadius:'2px', overflow:'hidden' }">
                            <div :style="{ height:'100%', width:`${55 + ((tick * 7 + i * 17) % 40)}%`, background:t.accent, borderRadius:'2px', transition:'width 0.8s ease' }" />
                        </div>
                        <div :style="{ fontSize:'11px', color:t.accent, marginTop:'6px', fontWeight:600 }">{{ 55 + ((tick * 7 + i * 17) % 40) }}% load</div>
                    </div>
                </div>
                <div v-for="([label, val, delta]) in metrics" :key="label" :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:`1px solid ${t.accent}15` }">
                    <span :style="{ color:t.textMuted, fontSize:'13px' }">{{ label }}</span>
                    <div :style="{ textAlign:'right' }">
                        <span :style="{ color:t.text, fontWeight:700, fontSize:'15px', marginRight:'8px' }">{{ val }}</span>
                        <span :style="{ color:t.accent, fontSize:'12px' }">{{ delta }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
