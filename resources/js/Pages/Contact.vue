<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';
import KsIcon from '@/Components/KsIcon.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

const sent = ref(false);
const form = useForm({ name:'', email:'', phone:'', company:'', service:'', message:'' });
const services = ['AI Solutions','CCTV AI Systems','Automation','Data Digitisation','IoT & Smart Systems','Cloud & Infrastructure','Not sure yet'];
const submit = () => form.post('/contact', { onSuccess: () => { sent.value = true; form.reset(); } });

// Animation: pulses moving along channels
const channels = [
    { icon:'Mail',  label:'Email',     value:'info@krucialsys.com', sub:'Replies within 4 hours' },
    { icon:'Phone', label:'Phone', value:'92-21-32415196/7', sub:'Mon–Sat, 10am–7pm PKT' },
    { icon:'MapPin', label:'Office',   value:'14, Talpur Road, Karachi – 74400', sub:'Standard Chartered Bank Chambers' },
    { icon:'Clock', label:'Response',  value:'< 24 hours', sub:'Average reply time' },
];
const activeChannel = ref(0);
let interval;
onMounted(() => { interval = setInterval(() => activeChannel.value = (activeChannel.value + 1) % channels.length, 1500); });
onUnmounted(() => clearInterval(interval));

const faqs = [
    ['How long does a typical AI deployment take?','Most projects run 6–14 weeks from kickoff to go-live. Simpler automation projects can be live in 3–4 weeks; large-scale infrastructure takes 3–6 months.'],
    ["Do you work with businesses outside Karachi?",'Yes — we serve clients across Pakistan and can work remotely for software-only projects.'],
    ["What if we don't have clean data?",'Most of our clients start with messy, incomplete or paper-based data. Data preparation and digitisation is one of our core services.'],
    ['Do you offer a proof of concept before full deployment?','Yes. For most engagements we recommend a 2–4 week paid PoC to validate the approach before full investment.'],
    ['Who owns the AI models and data after deployment?','You do — 100%. All models, code and data are fully owned by your organisation.'],
];

const openFaq = ref(null);

const inputStyle = (t) => ({
    width: '100%', background: t.bgAlt, border: `1px solid ${t.accent}33`, borderRadius: '8px',
    padding: '12px 14px', color: t.text, fontFamily: "'Inter',sans-serif", fontSize: '14px',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
});
const labelStyle = (t) => ({
    display: 'block', color: t.textMuted, fontFamily: "'Space Grotesk',sans-serif",
    fontSize: '11px', fontWeight: 700, marginBottom: '6px',
    letterSpacing: '0.08em', textTransform: 'uppercase',
});
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero with channels visual -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Get in Touch</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Let's Build Something<br><span :style="{ color:t.accent }">Remarkable.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">Tell us your challenge — our engineering team will design a solution and get back to you within 24 hours.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <a href="#contact-form" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44`, textDecoration:'none' }">Send a Message</a>
                            </div>
                        </div>

                        <!-- Channels visual -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'18px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">Direct Channels</span>
                                <span :style="{ color:'#00C896', fontSize:'11px', fontWeight:700, display:'flex', alignItems:'center', gap:'5px' }">
                                    <span :style="{ width:'6px', height:'6px', borderRadius:'50%', background:'#00C896', boxShadow:'0 0 6px #00C896' }" />
                                    AVAILABLE
                                </span>
                            </div>

                            <div :style="{ display:'flex', flexDirection:'column', gap:'8px' }">
                                <div v-for="(c, i) in channels" :key="c.label"
                                    :style="{
                                        display:'flex', alignItems:'center', gap:'12px',
                                        background: i === activeChannel ? `${t.accent}22` : t.bg,
                                        border:`1px solid ${i === activeChannel ? t.accent + 'aa' : t.accent + '22'}`,
                                        borderRadius:'10px', padding:'12px 14px',
                                        transition:'all 0.4s ease',
                                        boxShadow: i === activeChannel ? `0 0 20px ${t.accent}44` : 'none',
                                    }">
                                    <div :style="{
                                        width:'36px', height:'36px', borderRadius:'10px',
                                        background:`${t.accent}22`, border:`1px solid ${t.accent}44`,
                                        display:'flex', alignItems:'center', justifyContent:'center',
                                        flexShrink:0,
                                    }">
                                        <KsIcon :name="c.icon" :size="16" :color="t.accent" />
                                    </div>
                                    <div :style="{ flex:1 }">
                                        <div :style="{ color:t.textMuted, fontSize:'9px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'2px' }">{{ c.label }}</div>
                                        <div :style="{ color:t.text, fontSize:'12px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">{{ c.value }}</div>
                                        <div :style="{ color:t.textMuted, fontSize:'10px', marginTop:'2px' }">{{ c.sub }}</div>
                                    </div>
                                    <div v-if="i === activeChannel" :style="{
                                        width:'8px', height:'8px', borderRadius:'50%',
                                        background:t.accent, boxShadow:`0 0 8px ${t.accent}`,
                                    }" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-form" :style="{ padding:'80px 5%', background:t.bg }">
                <div class="grid-2" :style="{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'64px', alignItems:'start' }">
                    <div>
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Contact Information</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'32px' }">Talk to Our<br><span :style="{ color:t.accent }">Engineering Team</span></h2>

                        <div v-for="[icon,label,val] in [['Mail','Email','info@krucialsys.com'],['Phone','Phone','92-21-32415196/7'],['MapPin','Office','14, Talpur Road, Karachi'],['Clock','Response Time','Within 24 business hours']]" :key="label"
                            :style="{ display:'flex', gap:'16px', marginBottom:'24px', alignItems:'flex-start' }">
                            <div :style="{ width:'44px', height:'44px', borderRadius:'10px', background:`${t.accent}18`, border:`1px solid ${t.accent}33`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }">
                                <KsIcon :name="icon" :size="20" :color="t.accent" />
                            </div>
                            <div>
                                <div :style="{ color:t.textMuted, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'4px' }">{{ label }}</div>
                                <span :style="{ color:t.text, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'15px', fontWeight:600 }">{{ val }}</span>
                            </div>
                        </div>

                        <div :style="{ marginTop:'40px', padding:'24px', background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:'14px' }">
                            <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'12px' }">Services We Offer</div>
                            <div v-for="s in services.slice(0,-1)" :key="s" :style="{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'8px' }">
                                <div :style="{ width:'5px', height:'5px', borderRadius:'50%', background:t.accent, flexShrink:0 }" />
                                <span :style="{ color:t.textMuted, fontSize:'14px' }">{{ s }}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div v-if="sent" :style="{ textAlign:'center', padding:'60px 40px', background:t.bgAlt, border:`1px solid ${t.accent}44`, borderRadius:'20px' }">
                            <div :style="{ fontSize:'56px', marginBottom:'20px', color:t.accent }">✓</div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, color:t.text, fontSize:'26px', fontWeight:800, marginBottom:'12px' }">Message Received!</h3>
                            <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7 }">Our team will respond within <strong :style="{ color:t.text }">24 business hours</strong>.</p>
                        </div>
                        <form v-else @submit.prevent="submit" :style="{ background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:'20px', padding:'40px' }">
                            <div class="grid-2" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }">
                                <div>
                                    <label :style="labelStyle(t)">Full Name *</label>
                                    <input required type="text" v-model="form.name" :style="inputStyle(t)" />
                                    <div v-if="form.errors.name" :style="{ color:'#FF6B6B', fontSize:'12px', marginTop:'4px' }">{{ form.errors.name }}</div>
                                </div>
                                <div>
                                    <label :style="labelStyle(t)">Work Email *</label>
                                    <input required type="email" v-model="form.email" :style="inputStyle(t)" />
                                    <div v-if="form.errors.email" :style="{ color:'#FF6B6B', fontSize:'12px', marginTop:'4px' }">{{ form.errors.email }}</div>
                                </div>
                            </div>
                            <div class="grid-2" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }">
                                <div>
                                    <label :style="labelStyle(t)">Company</label>
                                    <input type="text" v-model="form.company" :style="inputStyle(t)" />
                                </div>
                                <div>
                                    <label :style="labelStyle(t)">Phone Number</label>
                                    <input type="tel" v-model="form.phone" :style="inputStyle(t)" />
                                </div>
                            </div>
                            <div :style="{ marginBottom:'16px' }">
                                <label :style="labelStyle(t)">Service of Interest</label>
                                <select v-model="form.service" :style="{ ...inputStyle(t), appearance:'none' }">
                                    <option value="">Select a service...</option>
                                    <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
                                </select>
                            </div>
                            <div :style="{ marginBottom:'24px' }">
                                <label :style="labelStyle(t)">Tell us about your project *</label>
                                <textarea required rows="5" v-model="form.message"
                                    placeholder="Describe your challenge, current setup, and what outcomes you're looking for..."
                                    :style="{ ...inputStyle(t), resize:'vertical' }" />
                                <div v-if="form.errors.message" :style="{ color:'#FF6B6B', fontSize:'12px', marginTop:'4px' }">{{ form.errors.message }}</div>
                            </div>
                            <button type="submit" :disabled="form.processing"
                                :style="{ width:'100%', background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'16px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'16px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44`, opacity: form.processing ? 0.7 : 1 }"
                            >{{ form.processing ? 'Sending...' : 'Send Message →' }}</button>
                        </form>
                    </div>
                </div>
            </section>

            <section :style="{ background:t.bgAlt, padding:'80px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'900px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'48px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">FAQs</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">Common Questions</h2>
                    </div>
                    <div v-for="([q, a], i) in faqs" :key="q" :style="{ background:t.bg, border:`1px solid ${t.accent}${openFaq===i?'44':'18'}`, borderRadius:'12px', marginBottom:'10px', overflow:'hidden', transition:'border-color 0.2s' }">
                        <button @click="openFaq = openFaq===i ? null : i"
                            :style="{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 24px', background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }">
                            <span :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'16px', color:t.text }">{{ q }}</span>
                            <span :style="{ color:t.accent, fontSize:'20px', transition:'transform 0.2s', transform: openFaq===i ? 'rotate(45deg)' : 'none', flexShrink:0, marginLeft:'16px' }">+</span>
                        </button>
                        <div v-if="openFaq===i" :style="{ padding:'0 24px 20px', color:t.textMuted, fontSize:'15px', lineHeight:1.7, fontFamily:`'Inter',sans-serif` }">{{ a }}</div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
