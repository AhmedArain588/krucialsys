<script setup>
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import KsIcon from '@/Components/KsIcon.vue';
const { theme: t } = useTheme();

/* Every entry must point at a real route — no placeholder anchors. */
const cols = [
    { title:'Company', links:[['About Us','/about'],['Case Studies','/case-studies'],['Industries','/industries'],['Insights','/blog']] },
    { title:'Services', links:[['AI Solutions','/services/ai-solutions'],['CCTV AI Systems','/services/cctv-ai'],['Automation','/services/automation'],['Data Digitisation','/services/data-digitisation'],['IoT & Smart Systems','/services/iot-smart-systems'],['Cloud & Infrastructure','/services/cloud-infrastructure'],['Blockchain & Cardano','/services/blockchain']] },
    { title:'Support', links:[['Contact','/contact'],['Privacy Policy','/privacy-policy'],['Terms of Use','/terms']] },
];

/* Offices exactly as recorded in the company profile. */
const offices = [
    { city:'Karachi — Head Office', lines:['14, Standard Chartered Bank Chambers,', 'Talpur Road, Karachi – 74400, Pakistan'], tel:'92-21-38921233', fax:'92-21-32415785' },
    { city:'Dubai — GCC Office',    lines:['Office 204, Saeed Tower 1,', 'Sheikh Zayed Road, Dubai, UAE'], tel:'+971 56 427 9233' },
    { city:'Huntsville — USA',      lines:['3017 Kirkland Dr NW,', 'Huntsville, AL 35810, USA'], tel:'+1 256 489 0690' },
];
</script>

<template>
    <footer :style="{ background:t.bgAlt, borderTop:`1px solid ${t.accent}22`, padding:'60px 5% 32px' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
            <div class="footer-grid" :style="{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'48px' }">
                <div>
                    <div :style="{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }">
                        <img :src="'/logo.png'" :style="{ height:'32px', filter:t.logoFilter||'invert(1)' }" alt="Krucial Systems" />
                        <span :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'16px', color:t.text }">Krucial <span :style="{ color:t.accent }">Systems</span></span>
                    </div>
                    <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.7, maxWidth:'280px' }">Intelligent AI solutions built for real-world impact — designed, deployed, and scaled for your business.</p>
                    <div :style="{ marginTop:'20px' }">
                        <a href="mailto:info@krucialsys.com"
                            :style="{ color:t.textMuted, fontSize:'13px', marginBottom:'8px', display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }">
                            <KsIcon name="Mail" :size="14" :color="t.accent" />info@krucialsys.com
                        </a>
                        <a href="tel:+922138921233"
                            :style="{ color:t.textMuted, fontSize:'13px', marginBottom:'8px', display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }">
                            <KsIcon name="Phone" :size="14" :color="t.accent" />92-21-38921233
                        </a>
                        <div :style="{ color:t.textMuted, fontSize:'13px', display:'flex', alignItems:'flex-start', gap:'8px', lineHeight:1.6 }">
                            <div :style="{ marginTop:'3px', flexShrink:0 }"><KsIcon name="MapPin" :size="14" :color="t.accent" /></div>
                            <span>14, Standard Chartered Bank Chambers,<br>Talpur Road, Karachi – 74400, Pakistan</span>
                        </div>
                    </div>
                </div>
                <div v-for="col in cols" :key="col.title">
                    <div :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontWeight:700, fontSize:'13px', color:t.text, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'20px' }">{{ col.title }}</div>
                    <Link v-for="[label, href] in col.links" :key="label" :href="href"
                        :style="{ display:'block', color:t.textMuted, fontSize:'14px', marginBottom:'10px', textDecoration:'none', transition:'color 0.2s', fontFamily:`'Inter', sans-serif` }"
                        @mouseenter="(e) => e.target.style.color=t.accent"
                        @mouseleave="(e) => e.target.style.color=t.textMuted"
                    >{{ label }}</Link>
                </div>
            </div>
            <!-- Offices -->
            <div class="footer-offices" :style="{ borderTop:`1px solid ${t.accent}15`, paddingTop:'32px', marginBottom:'28px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'24px' }">
                <div v-for="o in offices" :key="o.city">
                    <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'11px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }">{{ o.city }}</div>
                    <div :style="{ color:t.textMuted, fontSize:'13px', lineHeight:1.65 }">
                        <div v-for="line in o.lines" :key="line">{{ line }}</div>
                        <div :style="{ marginTop:'7px' }">Tel: {{ o.tel }}</div>
                        <div v-if="o.fax">Fax: {{ o.fax }}</div>
                    </div>
                </div>
            </div>

            <div :style="{ borderTop:`1px solid ${t.accent}15`, paddingTop:'28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }">
                <span :style="{ color:t.textMuted, fontSize:'13px', fontFamily:`'Space Grotesk', sans-serif` }">© 2026 Krucial Systems — All Rights Reserved</span>
                <div :style="{ display:'flex', gap:'18px', flexWrap:'wrap' }">
                    <Link href="/privacy-policy" :style="{ color:t.textMuted, fontSize:'13px', textDecoration:'none' }">Privacy Policy</Link>
                    <Link href="/terms" :style="{ color:t.textMuted, fontSize:'13px', textDecoration:'none' }">Terms of Use</Link>
                </div>
            </div>
        </div>
    </footer>
</template>
