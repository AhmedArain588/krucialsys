<script setup>
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();

const steps = [
    { n:'01', title:'Consultation', desc:'We deeply understand your business challenges, existing infrastructure, and desired outcomes.' },
    { n:'02', title:'Architecture', desc:'Custom AI solution design — model selection, data pipelines, hardware and software stack.' },
    { n:'03', title:'Deployment', desc:'End-to-end integration of hardware, software, and AI models with zero-downtime rollout.' },
    { n:'04', title:'Scale & Support', desc:'Ongoing maintenance, system tuning, analytics dashboards and dedicated engineering support.' },
];
</script>

<template>
    <section :style="{ background:t.bgAlt, padding:'100px 5%' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
            <div :style="{ textAlign:'center', marginBottom:'64px' }">
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Process</div>
                <h2 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">From Idea to Deployment</h2>
            </div>

            <div class="process-grid" :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, position:'relative' }">
                <!-- Connector line -->
                <div class="process-line" :style="{ position:'absolute', top:'32px', left:'12.5%', right:'12.5%', height:'1px', background:`linear-gradient(90deg, transparent, ${t.accent}44, transparent)` }" />

                <div v-for="(step, i) in steps" :key="step.n" :style="{ padding:'0 24px', textAlign:'center' }">
                    <div :style="{ width:'64px', height:'64px', borderRadius:'50%', background:t.bg, border:`2px solid ${t.accent}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', position:'relative', zIndex:1 }">
                        <span :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'16px', fontWeight:800, color:t.accent }">{{ step.n }}</span>
                    </div>
                    <h3 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'18px', fontWeight:700, color:t.text, marginBottom:'12px' }">{{ step.title }}</h3>
                    <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.65 }">{{ step.desc }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
