<script setup>
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
const { theme: t } = useTheme();

/**
 * Real delivered engagements. Figures here are drawn from the company
 * profile — do not add performance percentages that aren't measured.
 */
const cases = [
    {
        client:'Pakistan Peoples Party', industry:'Political',
        challenge:'No unified view of how the party was being represented across broadcast, print and a fast-growing social media landscape.',
        solution:'A monitoring platform covering television, radio and newspapers alongside every official social media handle, backed by a satellite feed capture and archiving system at the Sindh Media Cell.',
        results:[['32','TV channels monitored'],['4','Platforms delivered'],['Satellite','Feed capture']],
    },
    {
        client:'ISPR, 5 Corps HQ', industry:'Defence',
        challenge:'Broadcast monitoring and video distribution running on ageing network infrastructure.',
        solution:'Media monitoring setup across 16 channels, an FTP server for video dissemination, and a fully revamped network.',
        results:[['16','Channels monitored'],['FTP','Video dissemination'],['Full','Network revamp']],
    },
    {
        client:'District Municipal Corporation, Sindh', industry:'Government',
        challenge:'Attendance recorded manually across a large public-sector workforce, with no central record.',
        solution:'An integrated time and attendance system deployed organisation-wide, replacing paper registers with verifiable digital records.',
        results:[['Integrated','Time & attendance'],['Org-wide','Deployment'],['Digital','Verified records']],
    },
];
</script>

<template>
    <section :style="{ background:t.bg, padding:'100px 5%' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
            <div :style="{ textAlign:'center', marginBottom:'64px' }">
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Proven Results</div>
                <h2 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">Real Projects. Real Impact.</h2>
                <p :style="{ color:t.textMuted, fontSize:'17px', marginTop:'16px', maxWidth:'500px', margin:'16px auto 0' }">Every deployment is measured by business outcomes — not just technical metrics.</p>
            </div>

            <div class="cases-grid" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }">
                <div v-for="(c, i) in cases" :key="i" :style="{ background:t.bgAlt, border:`1px solid ${t.accent}22`, borderRadius:'16px', overflow:'hidden' }">
                    <div :style="{ background:`${t.accent}12`, borderBottom:`1px solid ${t.accent}22`, padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center' }">
                        <span :style="{ color:t.text, fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'14px' }">{{ c.client }}</span>
                        <span :style="{ color:t.accent, background:`${t.accent}22`, borderRadius:'100px', padding:'3px 10px', fontSize:'11px', fontWeight:700, fontFamily:`'Space Grotesk', sans-serif` }">{{ c.industry }}</span>
                    </div>
                    <div :style="{ padding:'24px' }">
                        <div :style="{ marginBottom:'16px' }">
                            <div :style="{ color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' }">Challenge</div>
                            <p :style="{ color:t.text, fontSize:'13px', lineHeight:1.6, fontFamily:`'Inter', sans-serif` }">{{ c.challenge }}</p>
                        </div>
                        <div :style="{ marginBottom:'20px' }">
                            <div :style="{ color:t.textMuted, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' }">Solution</div>
                            <p :style="{ color:t.textMuted, fontSize:'13px', lineHeight:1.6, fontFamily:`'Inter', sans-serif` }">{{ c.solution }}</p>
                        </div>
                        <div :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', borderTop:`1px solid ${t.accent}15`, paddingTop:'20px' }">
                            <div v-for="([val, label]) in c.results" :key="label" :style="{ textAlign:'center' }">
                                <div :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'18px', fontWeight:800, color:t.accent, lineHeight:1.1 }">{{ val }}</div>
                                <div :style="{ color:t.textMuted, fontSize:'10px', marginTop:'4px', lineHeight:1.3, fontFamily:`'Space Grotesk', sans-serif` }">{{ label }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div :style="{ textAlign:'center', marginTop:'48px' }">
                <Link href="/case-studies" :style="{ display:'inline-block', textDecoration:'none', background:'transparent', color:t.accent, border:`1px solid ${t.accent}55`, borderRadius:'8px', padding:'13px 32px', fontFamily:`'Space Grotesk', sans-serif`, fontWeight:600, fontSize:'14px', cursor:'pointer', transition:'all 0.2s' }"
                    @mouseenter="(e) => { e.target.style.background=`${t.accent}15`; e.target.style.borderColor=t.accent; }"
                    @mouseleave="(e) => { e.target.style.background='transparent'; e.target.style.borderColor=`${t.accent}55`; }"
                >View All Case Studies →</Link>
            </div>
        </div>
    </section>
</template>
