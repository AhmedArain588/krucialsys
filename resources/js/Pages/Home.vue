<script setup>
import { ref, watch } from 'vue';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import HeroSection from '@/Components/HeroSection.vue';
import TrustBar from '@/Components/TrustBar.vue';
import ServicesGrid from '@/Components/ServicesGrid.vue';
import HowItWorks from '@/Components/HowItWorks.vue';
import WhyKrucial from '@/Components/WhyKrucial.vue';
import IndustriesServed from '@/Components/IndustriesServed.vue';
import WorkHighlights from '@/Components/WorkHighlights.vue';
import CtaBanner from '@/Components/CtaBanner.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);

watch(t, (theme) => {
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
}, { immediate: true });
</script>

<template>
    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <HeroSection @demo="demoOpen = true" />
            <TrustBar />
            <!-- Teaser only — the full portfolio lives on /case-studies -->
            <WorkHighlights />
            <ServicesGrid />
            <HowItWorks />
            <WhyKrucial />
            <IndustriesServed />
            <CtaBanner @demo="demoOpen = true" />
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
