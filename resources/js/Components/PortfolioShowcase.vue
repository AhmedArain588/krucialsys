<script setup>
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import KsIcon from '@/Components/KsIcon.vue';

/* Hide the closing CTA when this section is used on the case studies page itself. */
defineProps({ showCta: { type: Boolean, default: false } });

const { theme: t } = useTheme();

/**
 * Flagship engagement: Pakistan Peoples Party.
 * Four platforms delivered for a single client, plus the earlier
 * media-cell infrastructure build documented in the company profile.
 */
const pppProjects = [
    {
        icon: 'Users',
        name: 'Jiyala Application',
        tag: 'Web & Mobile',
        desc: 'A member-facing web and mobile application built for party workers — digital membership, organisational hierarchy and direct engagement from the palm of the hand.',
        points: ['Native mobile + responsive web', 'Digital membership records', 'Worker engagement at scale'],
    },
    {
        icon: 'FileText',
        name: 'Voter Information System',
        tag: 'Data Platform',
        desc: 'A searchable voter information platform giving constituency teams instant access to structured electoral data instead of scattered paper records.',
        points: ['Constituency-level lookup', 'Structured electoral records', 'Fast field access'],
    },
    {
        icon: 'GitMerge',
        name: 'Election Data Digitisation',
        tag: 'Digitisation',
        desc: 'Large-scale conversion of election records from paper into clean, queryable digital data — turning archives into an asset that can actually be analysed.',
        points: ['Bulk record capture', 'Validation & clean-up', 'Analysis-ready output'],
    },
    {
        icon: 'Activity',
        name: 'Media Monitoring System',
        tag: 'Monitoring',
        desc: 'Full-spectrum monitoring for the party across every channel that carries its name — television, radio, print and the full range of social media handles, in one place.',
        points: ['TV, radio & newspapers', 'All social media handles', 'Unified entity view'],
    },
];

/* Infrastructure delivered for the PPP Sindh Media Cell. */
const mediaCell = [
    'Media monitoring for 32 TV channels over satellite',
    'Archiving software for video clips, pictures and audio',
    'Centralised monitoring room and server room',
    'CCTV, access control and fire alarm systems',
    'Full network build-out',
];

/* Wider delivery history from the company profile. */
const otherWork = [
    { icon: 'Landmark',  client: 'Sindh Information Department',          detail: 'Systems built end-to-end by Krucial Systems for the Government of Sindh.' },
    { icon: 'Camera',    client: 'ISPR, 5 Corps HQ',                     detail: 'Media monitoring setup for 16 channels, FTP server for video dissemination, and a fully revamped network.' },
    { icon: 'Landmark',  client: 'District Municipal Corporation, Sindh', detail: 'Integrated time and attendance system deployed across the organisation.' },
    { icon: 'Package',   client: 'Rehmat Shipping',                      detail: 'CCTV and access control systems securing shipping operations.' },
    { icon: 'Building2', client: 'Riazeda (Pvt) Ltd',                    detail: 'CCTV, access control and a time attendance solution.' },
    { icon: 'Camera',    client: 'Vaneeza Ahmed, Karachi',               detail: 'CCTV installation and site surveillance.' },
];

/* Accreditations and distribution partnerships. */
const partnerships = [
    { name: 'LumenSoft Candela', role: 'Sole Distributor — Sindh' },
    { name: 'Intuit QuickBooks', role: 'Official Partner' },
    { name: 'Checkpoint Systems', role: 'EAS Solutions Provider' },
];

const webProjects = ['PPP.ORG.PK', 'ASEEFABZ.COM', 'BAKHTAWARBZ.COM', 'ETIHADSERVICES.COM (UAE)', 'FLOODANDDISASTERVICTIMS.ORG', 'Riazeda (Pvt) Ltd', 'Rahmat Shipping (Pvt) Ltd'];

const appProjects = ['Pakistan Peoples Party', 'QueB Technologies (USA)', 'Al Wabil Center'];

/* Turn-key capability catalogue. */
const capabilities = [
    { icon: 'ShoppingCart', title: 'Retail Management', items: ['Candela retail software', 'QuickBooks integration', 'Electronic Article Surveillance', 'Footfall calculators'] },
    { icon: 'Building2',    title: 'Building Management', items: ['Biometric & RFID access control', 'CCTV surveillance', 'Fire alarm systems', 'PA systems & occupancy sensors'] },
    { icon: 'Server',       title: 'Infrastructure & Hardware', items: ['Servers, PCs & networking', 'Barcode & receipt hardware', 'Redundancy planning', 'Backup planning'] },
];

/* Retail management software clients, grouped exactly as the profile lists them. */
const clientGroups = [
    { category: 'Garments', names: ['Deepak Perwani', 'WOV', 'Bumbles and Bumbles', 'Fiction', 'Soha Nigam', 'Chester Bernard', 'PFDC', 'Breakout', 'Ego', 'Generation', 'Maria B.', 'Asim Jofa'] },
    { category: 'Cosmetics', names: ['L’essence de Paris'] },
    { category: 'Supermarket', names: ['Navals’ Marts', 'Family Marts'] },
    { category: 'Publishers', names: ['Darusalam Publishers', 'Ferozsons Ltd'] },
    { category: 'Footwear', names: ['Foot Lookz', 'Miss Collection', 'Modila', 'Merito'] },
];

</script>

<template>
    <!-- Flagship client -->
    <section :style="{ background:t.bgAlt, padding:'90px 5%' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">

            <div :style="{ textAlign:'center', marginBottom:'56px' }">
                <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'20px' }">
                    <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                    <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Flagship Client</span>
                </div>
                <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(30px,3.6vw,46px)', fontWeight:800, color:t.text, lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:'18px' }">
                    Pakistan Peoples Party
                </h2>
                <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, maxWidth:'720px', margin:'0 auto' }">
                    Four platforms and a complete media infrastructure delivered for one of Pakistan&rsquo;s largest political organisations &mdash; from member-facing applications to nationwide media intelligence.
                </p>
            </div>

            <!-- All four platforms, laid out in full -->
            <div class="pf-projects" :style="{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'16px', marginBottom:'16px' }">
                <article v-for="(p, i) in pppProjects" :key="p.name"
                    :style="{ background:t.bgCard, border:`1px solid ${t.accent}33`, borderRadius:'18px', padding:'30px', display:'flex', flexDirection:'column' }">
                    <div :style="{ display:'flex', alignItems:'center', gap:'15px', marginBottom:'18px' }">
                        <div :style="{ width:'52px', height:'52px', borderRadius:'13px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }">
                            <KsIcon :name="p.icon" :size="24" :color="t.accent" />
                        </div>
                        <div>
                            <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'10.5px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:'5px' }">
                                {{ p.tag }}
                            </div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'20px', fontWeight:800, color:t.text, margin:0, letterSpacing:'-0.01em', lineHeight:1.2 }">
                                {{ p.name }}
                            </h3>
                        </div>
                    </div>

                    <p :style="{ color:t.textMuted, fontSize:'15px', lineHeight:1.7, marginBottom:'20px', flex:1 }">
                        {{ p.desc }}
                    </p>

                    <div :style="{ display:'flex', gap:'8px', flexWrap:'wrap' }">
                        <div v-for="pt in p.points" :key="pt"
                            :style="{ display:'inline-flex', alignItems:'center', gap:'6px', background:`${t.accent}10`, border:`1px solid ${t.accent}2E`, borderRadius:'8px', padding:'7px 12px' }">
                            <KsIcon name="Check" :size="13" :color="t.accent" />
                            <span :style="{ color:t.text, fontSize:'12.5px', fontWeight:500 }">{{ pt }}</span>
                        </div>
                    </div>
                </article>
            </div>

            <!-- Media cell infrastructure -->
            <div :style="{ background:t.bgCard, border:`1px solid ${t.textMuted}22`, borderRadius:'18px', padding:'32px' }">
                <div :style="{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }">
                    <KsIcon name="Server" :size="20" :color="t.accent" />
                    <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'19px', fontWeight:700, color:t.text, margin:0 }">
                        Sindh Media Cell &mdash; Infrastructure
                    </h3>
                </div>
                <div class="pf-grid-2" :style="{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'12px' }">
                    <div v-for="m in mediaCell" :key="m"
                        :style="{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'12px 14px', background:t.bgAlt, borderRadius:'10px' }">
                        <div :style="{ marginTop:'3px', flexShrink:0 }">
                            <KsIcon name="Check" :size="15" :color="t.accent" />
                        </div>
                        <span :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.6 }">{{ m }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Wider track record -->
    <section :style="{ background:t.bg, padding:'90px 5%' }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
            <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,3.2vw,40px)', fontWeight:800, color:t.text, textAlign:'center', letterSpacing:'-0.02em', marginBottom:'14px' }">
                Selected Engagements
            </h2>
            <p :style="{ color:t.textMuted, fontSize:'16px', textAlign:'center', maxWidth:'640px', margin:'0 auto 48px', lineHeight:1.7 }">
                Delivering systems integration, monitoring and digitisation across government, defence and enterprise since 2008.
            </p>

            <div class="pf-grid-2" :style="{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'16px', marginBottom:'60px' }">
                <div v-for="w in otherWork" :key="w.client"
                    :style="{ background:t.bgCard, border:`1px solid ${t.textMuted}22`, borderRadius:'14px', padding:'26px' }">
                    <div :style="{ width:'44px', height:'44px', borderRadius:'11px', background:`${t.accent}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }">
                        <KsIcon :name="w.icon" :size="21" :color="t.accent" />
                    </div>
                    <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, marginBottom:'9px' }">{{ w.client }}</h3>
                    <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.7, margin:0 }">{{ w.detail }}</p>
                </div>
            </div>

            <!-- Web & app development -->
            <div class="pf-grid-2" :style="{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'16px', marginBottom:'48px' }">
                <div :style="{ background:t.bgAlt, border:`1px solid ${t.textMuted}1A`, borderRadius:'18px', padding:'28px' }">
                    <div :style="{ display:'flex', alignItems:'center', gap:'11px', marginBottom:'18px' }">
                        <KsIcon name="Globe" :size="19" :color="t.accent" />
                        <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, margin:0 }">Web Development</h3>
                    </div>
                    <div :style="{ display:'flex', flexWrap:'wrap', gap:'8px' }">
                        <span v-for="w in webProjects" :key="w"
                            :style="{ background:t.bgCard, border:`1px solid ${t.accent}2E`, borderRadius:'8px', padding:'8px 14px', color:t.text, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.02em' }">
                            {{ w }}
                        </span>
                    </div>
                </div>

                <div :style="{ background:t.bgAlt, border:`1px solid ${t.textMuted}1A`, borderRadius:'18px', padding:'28px' }">
                    <div :style="{ display:'flex', alignItems:'center', gap:'11px', marginBottom:'18px' }">
                        <KsIcon name="Cpu" :size="19" :color="t.accent" />
                        <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, margin:0 }">App Development</h3>
                    </div>
                    <div :style="{ display:'flex', flexWrap:'wrap', gap:'8px' }">
                        <span v-for="a in appProjects" :key="a"
                            :style="{ background:t.bgCard, border:`1px solid ${t.accent}2E`, borderRadius:'8px', padding:'8px 14px', color:t.text, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.02em' }">
                            {{ a }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Turn-key capabilities -->
            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'22px', fontWeight:800, color:t.text, textAlign:'center', marginBottom:'10px', letterSpacing:'-0.01em' }">
                Complete Turn-Key Solutions
            </h3>
            <p :style="{ color:t.textMuted, fontSize:'15px', textAlign:'center', maxWidth:'600px', margin:'0 auto 32px', lineHeight:1.7 }">
                Hardware, software, integration and support under one roof — so a single partner carries the whole system.
            </p>
            <div class="pf-grid-2" :style="{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'16px', marginBottom:'48px' }">
                <div v-for="cap in capabilities" :key="cap.title"
                    :style="{ background:t.bgCard, border:`1px solid ${t.textMuted}22`, borderRadius:'14px', padding:'26px' }">
                    <div :style="{ display:'flex', alignItems:'center', gap:'11px', marginBottom:'16px' }">
                        <KsIcon :name="cap.icon" :size="19" :color="t.accent" />
                        <h4 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'16px', fontWeight:700, color:t.text, margin:0 }">{{ cap.title }}</h4>
                    </div>
                    <div v-for="item in cap.items" :key="item" :style="{ display:'flex', alignItems:'flex-start', gap:'9px', padding:'5px 0' }">
                        <div :style="{ marginTop:'3px', flexShrink:0 }"><KsIcon name="Check" :size="14" :color="t.accent" /></div>
                        <span :style="{ color:t.textMuted, fontSize:'13.5px', lineHeight:1.6 }">{{ item }}</span>
                    </div>
                </div>
            </div>

            <!-- Partnerships -->
            <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}2E`, borderRadius:'18px', padding:'32px', marginBottom:'48px' }">
                <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'11px', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', textAlign:'center', marginBottom:'22px' }">
                    Accreditations &amp; Partnerships
                </div>
                <div class="pf-grid-2" :style="{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'14px' }">
                    <div v-for="p in partnerships" :key="p.name"
                        :style="{ textAlign:'center', background:t.bgCard, border:`1px solid ${t.accent}22`, borderRadius:'12px', padding:'20px 16px' }">
                        <div :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'16px', fontWeight:700, color:t.text, marginBottom:'6px' }">{{ p.name }}</div>
                        <div :style="{ color:t.accent, fontSize:'12.5px', fontWeight:600 }">{{ p.role }}</div>
                    </div>
                </div>
            </div>

            <!-- Client roster, by sector -->
            <div>
                <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'22px', fontWeight:800, color:t.text, textAlign:'center', marginBottom:'10px', letterSpacing:'-0.01em' }">
                    Retail Management Clients
                </h3>
                <p :style="{ color:t.textMuted, fontSize:'15px', textAlign:'center', maxWidth:'600px', margin:'0 auto 32px', lineHeight:1.7 }">
                    Point-of-sale, inventory and article-surveillance systems running in stores across Pakistan.
                </p>

                <div :style="{ display:'flex', flexDirection:'column', gap:'18px', marginBottom:'10px' }">
                    <div v-for="g in clientGroups" :key="g.category"
                        class="pf-clients" :style="{ display:'grid', gridTemplateColumns:'130px 1fr', gap:'18px', alignItems:'start' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'11.5px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', paddingTop:'9px' }">
                            {{ g.category }}
                        </div>
                        <div :style="{ display:'flex', flexWrap:'wrap', gap:'9px' }">
                            <span v-for="c in g.names" :key="c"
                                :style="{ color:t.text, background:t.bgCard, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'13.5px', fontWeight:600, padding:'8px 16px', border:`1px solid ${t.textMuted}26`, borderRadius:'100px' }">
                                {{ c }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Closing CTA (homepage only) -->
                <div v-if="showCta" :style="{ marginTop:'52px', textAlign:'center' }">
                    <Link href="/case-studies"
                        :style="{ display:'inline-block', textDecoration:'none', background:t.accent, color:t.accentText||'#fff', borderRadius:'8px', padding:'15px 34px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', boxShadow:`0 0 30px ${t.accent}44` }">
                        Explore Our Full Portfolio →
                    </Link>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@media (max-width: 640px) {
    .pf-clients { grid-template-columns: 1fr !important; gap: 8px !important; }
}
</style>
