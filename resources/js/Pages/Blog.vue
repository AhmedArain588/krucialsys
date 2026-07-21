<script setup>
import { ref, watch } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import PageHero from '@/Components/PageHero.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';
const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

/**
 * No articles published yet. Add entries here (or wire this page to the
 * database) as real posts are written — the empty state renders until then.
 */
const posts = [];
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <PageHero badge="Insights" title="Insights &" highlight="Updates." subtitle="Industry perspectives and technical deep-dives from the Krucial Systems engineering team." />

            <section :style="{ background:t.bg, padding:'60px 5% 100px' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <!-- Empty state -->
                    <div v-if="!posts.length" :style="{ textAlign:'center', padding:'70px 24px', background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:'16px' }">
                        <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'21px', fontWeight:700, color:t.text, marginBottom:'12px' }">Insights coming soon</h3>
                        <p :style="{ color:t.textMuted, fontSize:'15px', lineHeight:1.7, maxWidth:'460px', margin:'0 auto 26px' }">
                            We&rsquo;re preparing technical write-ups on media monitoring, data digitisation and the systems we build. In the meantime, our delivered work is on the case studies page.
                        </p>
                        <a href="/case-studies" :style="{ display:'inline-block', background:t.accent, color:t.accentText||'#fff', borderRadius:'8px', padding:'12px 26px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'14px', textDecoration:'none' }">View Case Studies</a>
                    </div>

                    <div v-else class="grid-3" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }">
                        <article v-for="post in posts" :key="post.title"
                            :style="{ background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:'16px', overflow:'hidden', cursor:'pointer', transition:'all 0.3s' }"
                            @mouseenter="(e) => { e.currentTarget.style.borderColor=`${t.accent}55`; e.currentTarget.style.transform='translateY(-4px)'; }"
                            @mouseleave="(e) => { e.currentTarget.style.borderColor=`${t.accent}22`; e.currentTarget.style.transform='none'; }"
                        >
                            <div :style="{ height:'180px', background:`${t.accent}08`, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:`1px solid ${t.accent}15` }">
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', background:`${t.accent}18`, padding:'6px 14px', borderRadius:'6px' }">{{ post.tag }}</span>
                            </div>
                            <div :style="{ padding:'28px' }">
                                <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, marginBottom:'12px', lineHeight:1.4 }">{{ post.title }}</h3>
                                <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.7, marginBottom:'20px' }">{{ post.excerpt }}</p>
                                <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:`1px solid ${t.accent}15`, paddingTop:'16px' }">
                                    <span :style="{ color:t.textMuted, fontSize:'12px' }">{{ post.date }}</span>
                                    <span :style="{ color:t.accent, fontSize:'12px', fontWeight:600 }">{{ post.readTime }}</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
