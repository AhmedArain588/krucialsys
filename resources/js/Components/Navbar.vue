<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';

const { theme: t } = useTheme();
defineEmits(['demo']);

const scrolled = ref(false);
const menuOpen = ref(false);
const openDD = ref(null);

const handleScroll = () => { scrolled.value = window.scrollY > 40; };
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const NAV_ITEMS = [
    { label: 'Services', href: '/services', children: [
        { label: 'AI Solutions',           href: '/services/ai-solutions' },
        { label: 'CCTV AI Systems',        href: '/services/cctv-ai' },
        { label: 'Automation',             href: '/services/automation' },
        { label: 'Data Digitisation',      href: '/services/data-digitisation' },
        { label: 'IoT & Smart Systems',    href: '/services/iot-smart-systems' },
        { label: 'Cloud & Infrastructure', href: '/services/cloud-infrastructure' },
    ]},
    { label: 'Industries',   href: '/industries' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About',        href: '/about' },
    { label: 'Contact',      href: '/contact' },
];
</script>

<template>
    <nav :style="{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background: scrolled ? `${t.bg}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${t.accent}22` : 'none',
        transition:'all 0.4s ease',
        padding:'0 5%',
    }">
        <div :style="{ maxWidth:'1280px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'72px' }">
            <!-- Logo -->
            <Link href="/" :style="{ display:'flex', alignItems:'center', gap:'12px', textDecoration:'none' }">
                <img :src="'/logo.png'" :style="{ height:'38px', filter: t.logoFilter||'invert(1)', transition:'filter 0.3s' }" alt="Krucial Systems" />
                <span :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'18px', color:t.text, letterSpacing:'-0.02em' }">
                    Krucial <span :style="{ color:t.accent }">Systems</span>
                </span>
            </Link>

            <!-- Desktop Nav -->
            <div class="nav-links" :style="{ display:'flex', gap:'4px', alignItems:'center' }">
                <div v-for="item in NAV_ITEMS" :key="item.label"
                    :style="{ position:'relative' }"
                    @mouseenter="openDD = item.label"
                    @mouseleave="openDD = null"
                >
                    <Link :href="item.href" :style="{
                        display:'flex', alignItems:'center', gap:'4px',
                        color: openDD === item.label ? t.accent : t.textMuted,
                        fontFamily:`'Space Grotesk',sans-serif`, fontSize:'14px', fontWeight:500,
                        textDecoration:'none', letterSpacing:'0.02em',
                        transition:'color 0.2s', padding:'8px 12px', borderRadius:'6px'
                    }">
                        {{ item.label }}
                        <span v-if="item.children" :style="{
                            fontSize:'10px', opacity:0.7, display:'inline-block',
                            transition:'transform 0.2s',
                            transform: openDD === item.label ? 'rotate(180deg)' : 'none'
                        }">▾</span>
                    </Link>

                    <!-- Dropdown -->
                    <div v-if="item.children && openDD === item.label"
                        :style="{
                            position:'absolute', top:'100%', left:0,
                            background: t.bgCard||t.bgAlt,
                            border:`1px solid ${t.accent}33`,
                            borderRadius:'12px', padding:'8px',
                            minWidth:'220px',
                            boxShadow:'0 20px 60px #00000055',
                            zIndex:200
                        }"
                    >
                        <Link v-for="child in item.children" :key="child.label" :href="child.href"
                            :style="{
                                display:'block', padding:'10px 14px',
                                color:t.textMuted,
                                fontFamily:`'Space Grotesk',sans-serif`,
                                fontSize:'13px', fontWeight:500,
                                textDecoration:'none', borderRadius:'8px',
                                transition:'all 0.15s'
                            }"
                            @mouseenter="(e) => { e.currentTarget.style.background=`${t.accent}18`; e.currentTarget.style.color=t.accent; }"
                            @mouseleave="(e) => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=t.textMuted; }"
                        >{{ child.label }}</Link>
                    </div>
                </div>

                <button @click="$emit('demo')"
                    :style="{
                        marginLeft:'8px', background:t.accent, color:t.accentText||'#fff',
                        border:'none', borderRadius:'6px', padding:'10px 22px',
                        fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'14px',
                        cursor:'pointer', letterSpacing:'0.03em',
                        transition:'all 0.2s', boxShadow:`0 0 20px ${t.accent}55`
                    }"
                    @mouseenter="(e) => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow=`0 4px 30px ${t.accent}88`; }"
                    @mouseleave="(e) => { e.target.style.transform=''; e.target.style.boxShadow=`0 0 20px ${t.accent}55`; }"
                >Get in Touch</button>
            </div>

            <!-- Hamburger -->
            <button @click="menuOpen = !menuOpen" class="hamburger"
                :style="{ display:'none', background:'none', border:`1px solid ${t.accent}66`, borderRadius:'6px', padding:'8px 10px', cursor:'pointer', flexDirection:'column', gap:'4px' }">
                <div v-for="i in 3" :key="i" :style="{ width:'20px', height:'2px', background:t.accent }" />
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="menuOpen" :style="{ background:t.bg, borderTop:`1px solid ${t.accent}33`, padding:'16px 5% 24px', maxHeight:'80vh', overflowY:'auto' }">
            <div v-for="item in NAV_ITEMS" :key="item.label">
                <Link :href="item.href" :style="{ display:'block', color:t.text, fontFamily:`'Space Grotesk',sans-serif`, padding:'12px 0', borderBottom:`1px solid ${t.accent}11`, fontSize:'15px', fontWeight:600, textDecoration:'none' }">{{ item.label }}</Link>
                <Link v-for="child in item.children||[]" :key="child.label" :href="child.href"
                    :style="{ display:'block', color:t.textMuted, fontFamily:`'Space Grotesk',sans-serif`, padding:'9px 0 9px 16px', borderBottom:`1px solid ${t.accent}08`, fontSize:'13px', textDecoration:'none' }"
                >→ {{ child.label }}</Link>
            </div>
            <button @click="$emit('demo')" :style="{ marginTop:'16px', width:'100%', background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'6px', padding:'12px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600, fontSize:'15px', cursor:'pointer' }">Get in Touch</button>
        </div>
    </nav>
</template>
