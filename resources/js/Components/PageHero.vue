<script setup>
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();
const emit = defineEmits(['demo']);
defineProps({ badge: String, title: String, highlight: String, subtitle: String, cta: String });
</script>

<template>
    <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
        <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
        <div :style="{ position:'absolute', top:'30%', right:'10%', width:'400px', height:'400px', borderRadius:'50%', background:`${t.accent}0A`, filter:'blur(60px)' }" />
        <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'28px' }">
                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">{{ badge }}</span>
            </div>
            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,5vw,68px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px', maxWidth:'800px' }">
                {{ title }} <span :style="{ color:t.accent }">{{ highlight }}</span>
            </h1>
            <p :style="{ color:t.textMuted, fontSize:'clamp(15px,1.5vw,18px)', lineHeight:1.7, maxWidth:'560px', marginBottom: cta ? '40px' : '0' }">{{ subtitle }}</p>
            <button v-if="cta" @click="$emit('demo')"
                :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'15px 32px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}44`, transition:'all 0.2s' }"
                @mouseenter="(e) => { e.target.style.transform='translateY(-3px)'; e.target.style.boxShadow=`0 8px 40px ${t.accent}66`; }"
                @mouseleave="(e) => { e.target.style.transform=''; e.target.style.boxShadow=`0 0 40px ${t.accent}44`; }"
            >{{ cta }}</button>
        </div>
    </section>
</template>
