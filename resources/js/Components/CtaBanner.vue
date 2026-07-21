<script setup>
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();
const emit = defineEmits(['demo']);
</script>

<template>
    <section :style="{ background:t.bg, padding:'100px 5%' }">
        <div :style="{ maxWidth:'900px', margin:'0 auto', textAlign:'center' }">
            <div :style="{ position:'relative', background:t.bgAlt, border:`1px solid ${t.accent}44`, borderRadius:'24px', padding:'72px 60px', overflow:'hidden' }">
                <div :style="{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'500px', height:'300px', background:`${t.accent}12`, borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }" />
                <div :style="{ position:'relative' }">
                    <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'20px' }">Ready to Start?</div>
                    <h2 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'clamp(28px,4vw,52px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'20px' }">
                        Transform Your Business<br>with AI Today
                    </h2>
                    <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.7, maxWidth:'500px', margin:'0 auto 40px' }">
                        Let's design a solution tailored to your needs — from proof of concept to full deployment.
                    </p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="$emit('demo')"
                            :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'16px 36px', fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'16px', cursor:'pointer', boxShadow:`0 0 40px ${t.accent}55`, transition:'all 0.2s' }"
                            @mouseenter="(e) => { e.target.style.transform='translateY(-3px)'; e.target.style.boxShadow=`0 8px 50px ${t.accent}77`; }"
                            @mouseleave="(e) => { e.target.style.transform=''; e.target.style.boxShadow=`0 0 40px ${t.accent}55`; }"
                        >Book a Demo</button>
                        <Link href="/contact"
                            :style="{ display:'inline-block', textDecoration:'none', background:'transparent', color:t.text, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'16px 36px', fontFamily:`'Space Grotesk', sans-serif`, fontWeight:600, fontSize:'16px', cursor:'pointer', transition:'all 0.2s' }"
                            @mouseenter="(e) => { e.target.style.borderColor=t.accent; e.target.style.background=`${t.accent}11`; }"
                            @mouseleave="(e) => { e.target.style.borderColor=`${t.accent}55`; e.target.style.background='transparent'; }"
                        >Talk to an Expert</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
