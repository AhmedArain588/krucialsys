<script setup>
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import KsIcon from '@/Components/KsIcon.vue';

/**
 * Homepage teaser only — a short, scannable summary of delivered work that
 * drives to /case-studies. The full portfolio (per-project detail, capability
 * catalogue, partnerships, client roster) lives in PortfolioShowcase.vue and
 * should stay exclusive to the case studies page so the two don't duplicate.
 */
const { theme: t } = useTheme();

const flagshipProjects = ['Jiyala App', 'Voter Information System', 'Election Digitisation', 'Media Monitoring'];

const notable = [
    { icon: 'Landmark', client: 'Sindh Information Department', detail: 'Government of Sindh — systems delivered end-to-end' },
    { icon: 'Shield',   client: 'ISPR, 5 Corps HQ',                     detail: '16-channel monitoring & network revamp' },
    { icon: 'Landmark', client: 'District Municipal Corporation',       detail: 'Organisation-wide time & attendance' },
];

const brands = ['Deepak Perwani', 'Maria B.', 'PFDC', 'Generation', 'Breakout', 'Ferozsons', 'Chester Bernard'];
</script>

<template>
    <section :style="{ background:t.bgAlt, padding:'90px 5%' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">

            <div :style="{ textAlign:'center', marginBottom:'48px' }">
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Our Work</div>
                <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,4vw,46px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'16px' }">
                    Systems Running in the Real World
                </h2>
                <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.7, maxWidth:'620px', margin:'0 auto' }">
                    Since 2008 we&rsquo;ve delivered monitoring, digitisation and infrastructure for government, defence and enterprise across Pakistan and beyond.
                </p>
            </div>

            <!-- Flagship -->
            <div :style="{ background:t.bgCard, border:`1px solid ${t.accent}44`, borderRadius:'18px', padding:'34px', marginBottom:'16px' }">
                <div class="wh-flag" :style="{ display:'grid', gridTemplateColumns:'1fr auto', gap:'26px', alignItems:'center' }">
                    <div>
                        <div :style="{ display:'inline-flex', alignItems:'center', gap:'7px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'5px 13px', marginBottom:'16px' }">
                            <div :style="{ width:'5px', height:'5px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 6px ${t.accent}` }" />
                            <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'10.5px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }">Flagship Client</span>
                        </div>
                        <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'27px', fontWeight:800, color:t.text, marginBottom:'12px', letterSpacing:'-0.02em' }">Pakistan Peoples Party</h3>
                        <p :style="{ color:t.textMuted, fontSize:'15.5px', lineHeight:1.7, marginBottom:'20px', maxWidth:'560px' }">
                            Four platforms plus a complete media infrastructure &mdash; member applications, electoral data systems and nationwide media intelligence across TV, radio, print and social.
                        </p>
                        <div :style="{ display:'flex', flexWrap:'wrap', gap:'8px' }">
                            <span v-for="p in flagshipProjects" :key="p"
                                :style="{ background:`${t.accent}12`, border:`1px solid ${t.accent}2E`, borderRadius:'7px', padding:'7px 13px', color:t.text, fontSize:'12.5px', fontWeight:600, fontFamily:`'Space Grotesk',sans-serif` }">
                                {{ p }}
                            </span>
                        </div>
                    </div>

                    <!-- Key figures -->
                    <div class="wh-figs" :style="{ display:'flex', flexDirection:'column', gap:'10px', minWidth:'150px' }">
                        <div v-for="[v,l] in [['32','TV channels'],['4','Platforms'],['2008','Client since']]" :key="l"
                            :style="{ textAlign:'center', background:`${t.accent}0D`, border:`1px solid ${t.accent}22`, borderRadius:'11px', padding:'14px 18px' }">
                            <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'25px', fontWeight:800, color:t.accent, lineHeight:1 }">{{ v }}</div>
                            <div :style="{ color:t.textMuted, fontSize:'10.5px', marginTop:'5px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.06em' }">{{ l }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notable engagements -->
            <div class="wh-grid" :style="{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'12px', marginBottom:'40px' }">
                <div v-for="n in notable" :key="n.client"
                    :style="{ background:t.bgCard, border:`1px solid ${t.textMuted}22`, borderRadius:'13px', padding:'22px' }">
                    <KsIcon :name="n.icon" :size="19" :color="t.accent" />
                    <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'15px', fontWeight:700, color:t.text, margin:'13px 0 6px' }">{{ n.client }}</div>
                    <div :style="{ color:t.textMuted, fontSize:'13px', lineHeight:1.6 }">{{ n.detail }}</div>
                </div>
            </div>

            <!-- Brand strip + CTA -->
            <div :style="{ textAlign:'center' }">
                <div :style="{ color:t.textMuted, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'11px', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:'18px' }">
                    Also trusted by
                </div>
                <div :style="{ display:'flex', flexWrap:'wrap', gap:'9px', justifyContent:'center', marginBottom:'38px' }">
                    <span v-for="b in brands" :key="b"
                        :style="{ color:t.textMuted, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'13.5px', fontWeight:600, padding:'7px 15px', border:`1px solid ${t.textMuted}26`, borderRadius:'100px' }">
                        {{ b }}
                    </span>
                </div>

                <Link href="/case-studies"
                    :style="{ display:'inline-block', textDecoration:'none', background:t.accent, color:t.accentText||'#fff', borderRadius:'8px', padding:'15px 34px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', boxShadow:`0 0 30px ${t.accent}44` }">
                    See the Full Portfolio →
                </Link>
            </div>
        </div>
    </section>
</template>

<style scoped>
@media (max-width: 820px) {
    .wh-flag { grid-template-columns: 1fr !important; }
    .wh-figs { flex-direction: row !important; }
    .wh-figs > div { flex: 1; }
}
</style>
