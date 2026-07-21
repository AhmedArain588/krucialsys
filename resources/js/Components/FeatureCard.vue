<script setup>
import { useTheme } from '@/composables/useTheme';
import KsIcon from '@/Components/KsIcon.vue';
const { theme: t } = useTheme();
defineProps({ icon: String, title: String, desc: String });
</script>

<template>
    <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:'14px', padding:'28px 24px', cursor:'default', transition:'all 0.3s' }"
        @mouseenter="(e) => { e.currentTarget.style.borderColor=`${t.accent}55`; e.currentTarget.style.transform='translateY(-4px)'; }"
        @mouseleave="(e) => { e.currentTarget.style.borderColor=`${t.accent}22`; e.currentTarget.style.transform='none'; }"
    >
        <div :style="{ width:'44px', height:'44px', borderRadius:'10px', background:`${t.accent}18`, border:`1px solid ${t.accent}33`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }">
            <KsIcon :name="icon" :size="20" :color="t.accent" />
        </div>
        <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, marginBottom:'8px' }">{{ title }}</h3>
        <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.65 }">{{ desc }}</p>
    </div>
</template>
