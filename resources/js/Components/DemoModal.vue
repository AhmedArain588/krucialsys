<script setup>
import { ref } from 'vue';
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();
const emit = defineEmits(['close']);

const form = ref({ name:'', email:'', company:'', message:'' });
const sent = ref(false);
const submit = () => { sent.value = true; };
</script>

<template>
    <div
        :style="{ position:'fixed', inset:0, background:'#00000088', backdropFilter:'blur(8px)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }"
        @click.self="$emit('close')"
    >
        <div :style="{ background:t.bg, border:`1px solid ${t.accent}44`, borderRadius:'20px', padding:'48px 40px', width:'100%', maxWidth:'480px', position:'relative', boxShadow:`0 40px 100px ${t.accent}22` }">
            <button @click="$emit('close')" :style="{ position:'absolute', top:'20px', right:'20px', background:'none', border:'none', color:t.textMuted, cursor:'pointer', fontSize:'20px' }">✕</button>

            <div v-if="sent" :style="{ textAlign:'center', padding:'20px 0' }">
                <div :style="{ fontSize:'48px', marginBottom:'20px', color:t.accent }">✓</div>
                <h3 :style="{ fontFamily:`'Space Grotesk', sans-serif`, color:t.text, fontSize:'24px', fontWeight:700, marginBottom:'12px' }">Request Received!</h3>
                <p :style="{ color:t.textMuted, fontSize:'15px' }">Our team will reach out within 24 hours.</p>
            </div>

            <template v-else>
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px' }">Book a Demo</div>
                <h3 :style="{ fontFamily:`'Space Grotesk', sans-serif`, color:t.text, fontSize:'26px', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'28px' }">Let's Talk AI</h3>
                <form @submit.prevent="submit">
                    <div v-for="[field, label] in [['name','Full Name'],['email','Work Email'],['company','Company Name']]" :key="field" :style="{ marginBottom:'16px' }">
                        <label :style="{ display:'block', color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:600, marginBottom:'6px', letterSpacing:'0.06em', textTransform:'uppercase' }">{{ label }}</label>
                        <input :type="field === 'email' ? 'email' : 'text'" required v-model="form[field]"
                            :style="{ width:'100%', background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'8px', padding:'12px 14px', color:t.text, fontFamily:`'Inter', sans-serif`, fontSize:'14px', outline:'none', boxSizing:'border-box' }"
                        />
                    </div>
                    <div :style="{ marginBottom:'24px' }">
                        <label :style="{ display:'block', color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:600, marginBottom:'6px', letterSpacing:'0.06em', textTransform:'uppercase' }">Tell us about your needs</label>
                        <textarea rows="3" v-model="form.message"
                            :style="{ width:'100%', background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'8px', padding:'12px 14px', color:t.text, fontFamily:`'Inter', sans-serif`, fontSize:'14px', outline:'none', resize:'vertical', boxSizing:'border-box' }"
                        />
                    </div>
                    <button type="submit" :style="{ width:'100%', background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px', fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', transition:'all 0.2s', boxShadow:`0 0 30px ${t.accent}44` }">
                        Send Request →
                    </button>
                </form>
            </template>
        </div>
    </div>
</template>
