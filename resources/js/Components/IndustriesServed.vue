<script setup>
import { useTheme } from '@/composables/useTheme';
import KsIcon from '@/Components/KsIcon.vue';
const { theme: t } = useTheme();

/* Sectors with delivered engagements behind them — see the portfolio section. */
const inds = [
    { icon:'Landmark', title:'Government & Public Sector', tag:'Public Sector', desc:'Integrated time and attendance, record digitisation and monitoring infrastructure — delivered for District Municipal Corporation, Sindh.' },
    { icon:'Shield', title:'Defence', tag:'Secure Systems', desc:'Multi-channel media monitoring, FTP video dissemination and network infrastructure — delivered for ISPR, 5 Corps HQ.' },
    { icon:'Users', title:'Political Organisations', tag:'Civic Tech', desc:'Membership applications, voter information systems, election data digitisation and nationwide media monitoring for the Pakistan Peoples Party.' },
    { icon:'ShoppingCart', title:'Retail & Fashion', tag:'Retail Systems', desc:'Retail management software, electronic article surveillance, footfall calculation and point-of-sale hardware for leading fashion and cosmetics brands.' },
    { icon:'Package', title:'Logistics & Shipping', tag:'Operations', desc:'CCTV, access control and time attendance systems securing port and shipping operations.' },
    { icon:'Building2', title:'Real Estate & Facilities', tag:'Building Management', desc:'Turn-key building management — biometric and RFID access control, fire alarm, PA systems, occupancy sensors and centralised monitoring rooms.' },
];
</script>

<template>
    <section :style="{ background:t.bgAlt, padding:'100px 5%' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
            <div :style="{ textAlign:'center', marginBottom:'64px' }">
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk', sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Industries We Serve</div>
                <h2 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:t.text, letterSpacing:'-0.03em' }">Sector-Specific Intelligence</h2>
            </div>
            <div class="industries-grid" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }">
                <div v-for="ind in inds" :key="ind.title"
                    :style="{ padding:'28px 24px', border:`1px solid ${t.accent}22`, borderRadius:'12px', background:t.bg, cursor:'default', transition:'all 0.3s' }"
                    @mouseenter="(e) => { e.currentTarget.style.borderColor=`${t.accent}66`; e.currentTarget.style.transform='translateY(-4px)'; }"
                    @mouseleave="(e) => { e.currentTarget.style.borderColor=`${t.accent}22`; e.currentTarget.style.transform='none'; }"
                >
                    <div :style="{ width:'44px', height:'44px', borderRadius:'10px', background:`${t.accent}18`, border:`1px solid ${t.accent}33`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px' }">
                        <KsIcon :name="ind.icon" :size="20" :color="t.accent" />
                    </div>
                    <div :style="{ marginBottom:'10px' }">
                        <span :style="{ background:`${t.accent}18`, color:t.accent, borderRadius:'4px', padding:'2px 8px', fontSize:'10px', fontWeight:700, fontFamily:`'Space Grotesk', sans-serif`, letterSpacing:'0.08em', textTransform:'uppercase' }">{{ ind.tag }}</span>
                    </div>
                    <h3 :style="{ fontFamily:`'Space Grotesk', sans-serif`, fontSize:'16px', fontWeight:700, color:t.text, marginBottom:'8px' }">{{ ind.title }}</h3>
                    <p :style="{ color:t.textMuted, fontSize:'13px', lineHeight:1.65 }">{{ ind.desc }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
