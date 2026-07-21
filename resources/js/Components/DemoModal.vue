<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();
const emit = defineEmits(['close']);

/**
 * Posts to the same endpoint as the contact page, so demo requests land in
 * contact_submissions and show up in the admin inbox. `service` marks where
 * the lead came from.
 */
const form = useForm({
    name: '', email: '', phone: '', company: '',
    service: 'Demo request', message: '',
});

const sent = ref(false);

const submit = () => form.post('/contact', {
    preserveScroll: true,
    onSuccess: () => { sent.value = true; form.reset(); },
});
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
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px' }">Get in Touch</div>
                <h3 :style="{ fontFamily:`'Space Grotesk', sans-serif`, color:t.text, fontSize:'26px', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'28px' }">Let's Talk AI</h3>
                <form @submit.prevent="submit">
                    <div v-for="[field, label] in [['name','Full Name'],['email','Work Email'],['phone','Phone'],['company','Company Name']]" :key="field" :style="{ marginBottom:'16px' }">
                        <label :style="{ display:'block', color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:600, marginBottom:'6px', letterSpacing:'0.06em', textTransform:'uppercase' }">{{ label }}</label>
                        <input :type="field === 'email' ? 'email' : (field === 'phone' ? 'tel' : 'text')"
                            :required="field === 'name' || field === 'email'" v-model="form[field]"
                            :style="{ width:'100%', background:t.bgAlt, border:`1px solid ${form.errors[field] ? '#FF4D5E' : t.accent + '33'}`, borderRadius:'8px', padding:'12px 14px', color:t.text, fontFamily:`'Inter', sans-serif`, fontSize:'14px', outline:'none', boxSizing:'border-box' }"
                        />
                        <div v-if="form.errors[field]" :style="{ color:'#FF4D5E', fontSize:'12px', marginTop:'5px' }">{{ form.errors[field] }}</div>
                    </div>
                    <div :style="{ marginBottom:'24px' }">
                        <label :style="{ display:'block', color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:600, marginBottom:'6px', letterSpacing:'0.06em', textTransform:'uppercase' }">Tell us about your needs</label>
                        <textarea rows="3" required v-model="form.message"
                            :style="{ width:'100%', background:t.bgAlt, border:`1px solid ${form.errors.message ? '#FF4D5E' : t.accent + '33'}`, borderRadius:'8px', padding:'12px 14px', color:t.text, fontFamily:`'Inter', sans-serif`, fontSize:'14px', outline:'none', resize:'vertical', boxSizing:'border-box' }"
                        />
                        <div v-if="form.errors.message" :style="{ color:'#FF4D5E', fontSize:'12px', marginTop:'5px' }">{{ form.errors.message }}</div>
                    </div>
                    <button type="submit" :disabled="form.processing"
                        :style="{ width:'100%', background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px', fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'15px', cursor: form.processing ? 'not-allowed' : 'pointer', opacity: form.processing ? 0.6 : 1, transition:'all 0.2s', boxShadow:`0 0 30px ${t.accent}44` }">
                        {{ form.processing ? 'Sending…' : 'Send Request →' }}
                    </button>
                </form>
            </template>
        </div>
    </div>
</template>
