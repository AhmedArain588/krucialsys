<script setup>
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();
/* Sectors we have actually delivered into. */
const industries = ['Government & Public Sector','Defence','Political Organisations','Retail & Fashion','Logistics & Shipping','Publishing'];
</script>

<template>
    <div :style="{ background:t.bgAlt, borderTop:`1px solid ${t.accent}22`, borderBottom:`1px solid ${t.accent}22`, padding:'20px 5%', overflow:'hidden' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto', display:'flex', alignItems:'center', gap:'48px', justifyContent:'center', flexWrap:'wrap' }">
            <span :style="{ color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', whiteSpace:'nowrap' }">Trusted Across</span>
            <span v-for="ind in industries" :key="ind" :style="{ color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'13px', fontWeight:500, opacity:0.6, whiteSpace:'nowrap' }">{{ ind }}</span>
        </div>
    </div>
</template>
