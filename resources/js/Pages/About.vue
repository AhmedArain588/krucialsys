<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import FeatureCard from '@/Components/FeatureCard.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

const activeTeam = ref(0);
const teams = [
    { initials:'KS', label:'Leadership' },
    { initials:'ML', label:'AI / ML' },
    { initials:'CV', label:'Computer Vision' },
    { initials:'IN', label:'Infrastructure' },
    { initials:'IO', label:'IoT' },
    { initials:'DA', label:'Data' },
];
let interval;
onMounted(() => { interval = setInterval(() => activeTeam.value = (activeTeam.value + 1) % teams.length, 1500); });
onUnmounted(() => clearInterval(interval));

const values = [
    ['Target','Outcome-Driven','We measure success by your business results — not by lines of code or models deployed. Every engagement has defined, measurable goals.'],
    ['Wrench','End-to-End Ownership','We design, build, deploy and support — full stack, full cycle. One partner, complete accountability.'],
    ['Lock','Data Sovereignty','Your data stays yours. We build on-premise and private cloud solutions that never send sensitive data off-site without explicit consent.'],
    ['Users','Local Expertise','Based in Karachi, we understand Pakistani infrastructure, connectivity, compliance and business culture.'],
    ['TrendingUp','Built to Scale','We design systems for where you\'re going, not just where you are. Every deployment is architected for 10× growth.'],
    ['Brain','Research-Backed','Our AI is built on the latest research — not last year\'s tutorials. We invest in continuous model improvement.'],
];

const team = [
    { name:'Leadership & AI Strategy', role:'Driving product direction and client outcomes across all engagements', initials:'KS' },
    { name:'AI & ML Engineering', role:'Model design, training pipelines, MLOps and production deployment', initials:'ML' },
    { name:'Computer Vision', role:'CCTV AI, object detection, video analytics and edge inference', initials:'CV' },
    { name:'Infrastructure & Cloud', role:'Server room design, private cloud, hybrid deployments and DevOps', initials:'IN' },
    { name:'IoT & Embedded Systems', role:'Sensor networks, firmware, device management and edge computing', initials:'IO' },
    { name:'Data & Automation', role:'OCR pipelines, RPA, workflow automation and data engineering', initials:'DA' },
];

const timeline = [
    ['2008 — Founded in Karachi','Krucial Systems was established in May 2008 as a systems integrator, delivering retail management, building management and surveillance solutions to businesses across Pakistan.'],
    ['Building Management & Security','Grew into complete turn-key infrastructure — CCTV, biometric and RFID access control, fire alarm systems, centralised monitoring rooms and full network build-outs for enterprise and government clients.'],
    ['Media Monitoring at Scale','Delivered satellite-based media monitoring for the Pakistan Peoples Party Sindh Media Cell and ISPR 5 Corps HQ, with archiving systems for video, audio and imagery.'],
    ['Digital Platforms & AI','Today we build the software layer on top of that infrastructure — web and mobile applications, data digitisation and AI-driven monitoring, from offices in Karachi, Dubai and Huntsville, Alabama.'],
];
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero with team org chart -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">About Krucial Systems</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                We Build AI That<br><span :style="{ color:t.accent }">Actually Works.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">A Karachi-based AI engineering company delivering production-grade intelligent systems across Pakistan and beyond.</p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Work With Us</button>
                            </div>
                        </div>

                        <!-- Team org chart visual -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'18px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }">
                                <span :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">Engineering Teams</span>
                                <span :style="{ color:t.accent, fontSize:'11px', fontWeight:700 }">20+ specialists</span>
                            </div>

                            <!-- Org chart -->
                            <div :style="{ position:'relative', height:'200px', marginBottom:'12px' }">
                                <!-- Connecting lines -->
                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" :style="{ position:'absolute', inset:0, width:'100%', height:'100%' }">
                                    <line v-for="i in 6" :key="i"
                                        x1="50" y1="20"
                                        :x2="10 + (i - 1) * 16" y2="75"
                                        :stroke="i - 1 === activeTeam ? t.accent : t.accent + '44'"
                                        stroke-width="0.4"
                                        :stroke-opacity="i - 1 === activeTeam ? 1 : 0.5"
                                        style="transition:all 0.4s"
                                    />
                                </svg>
                                <!-- Center node (CEO) -->
                                <div :style="{
                                    position:'absolute', left:'50%', top:'10%',
                                    transform:'translateX(-50%)',
                                    width:'48px', height:'48px',
                                    borderRadius:'50%',
                                    background:`${t.accent}33`, border:`2px solid ${t.accent}`,
                                    display:'flex', alignItems:'center', justifyContent:'center',
                                    boxShadow:`0 0 16px ${t.accent}66`
                                }">
                                    <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontWeight:800, fontSize:'12px' }">CEO</span>
                                </div>
                                <!-- Team nodes -->
                                <div v-for="(tm, i) in teams" :key="tm.initials"
                                    :style="{
                                        position:'absolute',
                                        left:`${10 + i * 16}%`, top:'70%',
                                        transform:'translate(-50%, 0)',
                                    }">
                                    <div :style="{
                                        width:'40px', height:'40px',
                                        borderRadius:'50%',
                                        background: i === activeTeam ? `${t.accent}33` : `${t.accent}11`,
                                        border:`2px solid ${i === activeTeam ? t.accent : t.accent + '44'}`,
                                        display:'flex', alignItems:'center', justifyContent:'center',
                                        boxShadow: i === activeTeam ? `0 0 16px ${t.accent}66` : 'none',
                                        transition:'all 0.4s',
                                        margin:'0 auto'
                                    }">
                                        <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontWeight:800, fontSize:'11px' }">{{ tm.initials }}</span>
                                    </div>
                                    <div :style="{
                                        textAlign:'center', marginTop:'6px',
                                        fontSize:'8px', fontWeight:700,
                                        fontFamily:`'Space Grotesk',sans-serif`,
                                        color: i === activeTeam ? t.accent : t.textMuted,
                                        transition:'color 0.4s',
                                    }">{{ tm.label }}</div>
                                </div>
                            </div>

                            <!-- Stats -->
                            <div :style="{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }">
                                <div v-for="[k,v] in [['2008','Founded'],['3','Offices'],['20+','Employees'],['6','Industries']]" :key="k"
                                    :style="{ background:t.bg, border:`1px solid ${t.accent}18`, borderRadius:'8px', padding:'10px', textAlign:'center' }">
                                    <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'14px', fontWeight:800 }">{{ k }}</div>
                                    <div :style="{ color:t.textMuted, fontSize:'9px', marginTop:'2px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em' }">{{ v }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Mission -->
            <section :style="{ background:t.bgAlt, padding:'80px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div class="grid-2" :style="{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }">
                    <div>
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Mission</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,42px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'24px' }">Bridging the Gap Between AI Research and <span :style="{ color:t.accent }">Real Business Outcomes</span></h2>
                        <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.75, marginBottom:'16px' }">Most businesses in Pakistan know AI has potential — but don't know where to start, who to trust, or how to make it work in practice. That's the gap Krucial Systems was built to close.</p>
                        <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.75 }">We're not consultants who hand over a report. We're engineers who stay until the system is live, tested and delivering measurable results.</p>
                    </div>
                    <div class="grid-2" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }">
                        <div v-for="[v,l] in [['2008','Founded in Karachi'],['20+','Team Members'],['3','Global Offices'],['6','Industries Served']]" :key="l"
                            :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'14px', padding:'24px 20px', textAlign:'center' }">
                            <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'32px', fontWeight:800, color:t.accent }">{{ v }}</div>
                            <div :style="{ color:t.textMuted, fontSize:'13px', marginTop:'6px' }">{{ l }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Values -->
            <section :style="{ background:t.bg, padding:'80px 5%' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">What Drives Us</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">Our Values</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'480px', margin:'0 auto' }">The principles behind every project we take on.</p>
                    </div>
                    <div class="grid-3" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }">
                        <FeatureCard v-for="[icon,title,desc] in values" :key="title" :icon="icon" :title="title" :desc="desc" />
                    </div>
                </div>
            </section>

            <!-- Team -->
            <section :style="{ background:t.bgAlt, padding:'80px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'56px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Team</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">The Engineering Team</h2>
                        <p :style="{ color:t.textMuted, fontSize:'17px', maxWidth:'480px', margin:'0 auto' }">Specialists across AI, vision, IoT, cloud and automation.</p>
                    </div>
                    <div class="grid-3" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }">
                        <div v-for="m in team" :key="m.name" :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'14px', padding:'24px' }">
                            <div :style="{ width:'52px', height:'52px', borderRadius:'50%', background:`${t.accent}22`, border:`2px solid ${t.accent}44`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }">
                                <span :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontWeight:800, fontSize:'14px', color:t.accent }">{{ m.initials }}</span>
                            </div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'16px', fontWeight:700, color:t.text, marginBottom:'6px' }">{{ m.name }}</h3>
                            <p :style="{ color:t.textMuted, fontSize:'13px', lineHeight:1.6 }">{{ m.role }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Story -->
            <section :style="{ background:t.bg, padding:'80px 5%' }">
                <div :style="{ maxWidth:'800px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'48px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Story</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">Built in Karachi.<br>Built for Pakistan.</h2>
                    </div>
                    <div v-for="([year,text]) in timeline" :key="year" :style="{ display:'flex', gap:'24px', marginBottom:'36px' }">
                        <div :style="{ width:'3px', background:`${t.accent}33`, borderRadius:'2px', flexShrink:0, position:'relative' }">
                            <div :style="{ position:'absolute', top:'4px', left:'50%', transform:'translateX(-50%)', width:'10px', height:'10px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                        </div>
                        <div>
                            <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'13px', fontWeight:700, marginBottom:'8px' }">{{ year }}</div>
                            <p :style="{ color:t.textMuted, fontSize:'15px', lineHeight:1.7 }">{{ text }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <section :style="{ background:t.bgAlt, padding:'80px 5%', borderTop:`1px solid ${t.accent}22` }">
                <div :style="{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }">
                    <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.5vw,40px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', marginBottom:'16px' }">Join Us or <span :style="{ color:t.accent }">Work With Us</span></h2>
                    <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, marginBottom:'32px' }">Whether you're a business looking for AI solutions or an engineer wanting to build them — we'd love to talk.</p>
                    <div :style="{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }">
                        <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Get a Demo</button>
                        <a href="/contact" :style="{ display:'inline-flex', alignItems:'center', color:t.text, border:`1px solid ${t.accent}44`, borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', textDecoration:'none' }">Contact Us</a>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
