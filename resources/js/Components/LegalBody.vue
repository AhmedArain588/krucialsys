<script setup>
import { useTheme } from '@/composables/useTheme';

defineProps({
    sections: { type: Array, required: true },
    updated: { type: String, required: true },
});

const { theme: t } = useTheme();
</script>

<template>
    <section :style="{ background:t.bg, padding:'60px 5% 100px' }">
        <div :style="{ maxWidth:'820px', margin:'0 auto' }">

            <div :style="{ color:t.textMuted, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif`, marginBottom:'44px', paddingBottom:'20px', borderBottom:`1px solid ${t.accent}22` }">
                Last updated: {{ updated }}
            </div>

            <div v-for="(s, i) in sections" :key="s.heading" :style="{ marginBottom:'40px' }">
                <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'21px', fontWeight:700, color:t.text, marginBottom:'16px', letterSpacing:'-0.01em' }">
                    <span :style="{ color:t.accent, marginRight:'10px' }">{{ String(i + 1).padStart(2, '0') }}</span>{{ s.heading }}
                </h2>
                <p v-for="(p, j) in s.body" :key="j"
                    :style="{ color:t.textMuted, fontSize:'15.5px', lineHeight:1.8, marginBottom:'14px' }">
                    {{ p }}
                </p>
            </div>

            <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:'12px', padding:'24px', marginTop:'48px' }">
                <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'15px', fontWeight:700, color:t.text, marginBottom:'8px' }">Questions?</div>
                <p :style="{ color:t.textMuted, fontSize:'14.5px', lineHeight:1.7, margin:0 }">
                    If anything here is unclear, or you want to exercise a request over your information, reach us through the
                    <a href="/contact" :style="{ color:t.accent, textDecoration:'none' }">contact page</a>.
                </p>
            </div>
        </div>
    </section>
</template>
