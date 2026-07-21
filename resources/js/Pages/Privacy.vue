<script setup>
import { ref, watch } from 'vue';
import { Head } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import PageHero from '@/Components/PageHero.vue';
import Footer from '@/Components/Footer.vue';
import DemoModal from '@/Components/DemoModal.vue';
import LegalBody from '@/Components/LegalBody.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

/**
 * Written around what Krucial Systems actually operates: a contact form,
 * surveillance and media-monitoring deployments, and data digitisation work
 * carried out on client-owned records.
 */
const sections = [
    {
        heading: 'Who we are',
        body: [
            'Krucial Systems is a systems integration and software company founded in Karachi in 2008, with offices in Karachi, Dubai and Huntsville, Alabama. This policy explains how we handle personal information across our website and our client engagements.',
        ],
    },
    {
        heading: 'Information we collect through this website',
        body: [
            'When you submit our contact or demo request form we collect the name, email address, phone number, company name, service of interest and message that you choose to provide. We use this solely to respond to your enquiry and to discuss a potential engagement.',
            'We do not sell this information, and we do not share it with third parties for marketing purposes.',
        ],
    },
    {
        heading: 'Client data in our engagements',
        body: [
            'Much of our work involves systems that process data belonging to our clients — digitised records, surveillance footage, access control logs and monitored media. In those engagements the client is the data controller and Krucial Systems acts on their instructions.',
            'We do not use client data for any purpose beyond delivering and supporting the contracted system. Where a deployment is on-premise or in a client-controlled private cloud, that data does not leave the client environment.',
        ],
    },
    {
        heading: 'Surveillance and monitoring systems',
        body: [
            'CCTV, access control and media monitoring systems we install are operated by the client, not by us. Responsibility for lawful use — including signage, retention periods, and any consent or notification required in the relevant jurisdiction — rests with the operating organisation.',
            'Our role is to design, deploy and maintain the system. We access recorded material only when required for support or maintenance, and only with the client’s authorisation.',
        ],
    },
    {
        heading: 'Retention',
        body: [
            'Contact form submissions are retained for as long as needed to handle your enquiry and for a reasonable period afterwards for our business records. You can ask us to delete your submission at any time.',
            'Retention of client system data is governed by the individual engagement agreement.',
        ],
    },
    {
        heading: 'Security',
        body: [
            'We apply access controls, redundancy planning and backup planning to the systems we run and to our own infrastructure. No system is completely secure, but we take reasonable technical and organisational measures appropriate to the sensitivity of the data involved.',
        ],
    },
    {
        heading: 'Your choices',
        body: [
            'You may request access to, correction of, or deletion of any personal information you have submitted to us through this website. Contact us using the details on our contact page and we will respond.',
        ],
    },
    {
        heading: 'Changes to this policy',
        body: [
            'We may update this policy as our services change. The revision date below reflects the most recent update.',
        ],
    },
];
</script>

<template>
    <Head title="Privacy Policy" />

    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <PageHero badge="Legal" title="Privacy" highlight="Policy." subtitle="How Krucial Systems handles personal information — on this website and across the systems we deliver." />
            <LegalBody :sections="sections" updated="21 July 2026" />
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
