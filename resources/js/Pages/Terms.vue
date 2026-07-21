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
 * Scoped to how Krucial Systems actually engages: turn-key integration work
 * combining third-party hardware and software with custom development.
 */
const sections = [
    {
        heading: 'Scope of these terms',
        body: [
            'These terms govern your use of the Krucial Systems website. They are not a contract for services. Any engagement we undertake — integration, software development, digitisation or support — is governed by a separate written agreement signed by both parties, which takes precedence over anything on this site.',
        ],
    },
    {
        heading: 'Information on this site',
        body: [
            'The project descriptions, client references and capability information on this website describe work we have delivered. They are provided for general information and do not constitute a warranty, guarantee or commitment of any particular result in a future engagement.',
            'Scope, timelines, performance characteristics and pricing are defined per engagement and confirmed in writing.',
        ],
    },
    {
        heading: 'Enquiries and submissions',
        body: [
            'When you submit an enquiry through this site you agree to provide accurate information. Do not send confidential or sensitive material through the contact form — use it to start a conversation, and we will arrange an appropriate channel before anything sensitive is exchanged.',
            'An enquiry does not create a contractual relationship, and we may decline any request.',
        ],
    },
    {
        heading: 'Third-party products',
        body: [
            'Our solutions frequently incorporate third-party hardware and software, including retail management platforms, accounting software, surveillance equipment and article-surveillance systems. Those products carry their own licences, warranties and support terms from their respective vendors.',
            'Where we act as a distributor or partner for a vendor, that relationship is described accurately on this site, and the vendor’s own terms continue to apply to their product.',
        ],
    },
    {
        heading: 'Client responsibilities in deployed systems',
        body: [
            'For systems we install and hand over — surveillance, access control, monitoring and attendance systems — the operating organisation is responsible for using them lawfully in their jurisdiction. This includes any required notification, signage, consent, retention limits and permitted-purpose restrictions.',
            'We will advise on technical configuration, but we do not provide legal advice on the use of these systems.',
        ],
    },
    {
        heading: 'Intellectual property',
        body: [
            'The content, branding and design of this website belong to Krucial Systems. Ownership of deliverables produced during an engagement — source code, configurations and documentation — is set out in the relevant engagement agreement.',
        ],
    },
    {
        heading: 'Limitation of liability',
        body: [
            'This website is provided on an "as is" basis. To the extent permitted by law, Krucial Systems is not liable for any loss arising from reliance on the general information published here. Liability arising from a delivered engagement is governed by the limits agreed in that engagement’s contract.',
        ],
    },
    {
        heading: 'Governing law',
        body: [
            'These website terms are governed by the laws of Pakistan. The governing law for a specific engagement is stated in that engagement’s agreement, which may differ where the work is delivered through our Dubai or United States offices.',
        ],
    },
];
</script>

<template>
    <Head title="Terms of Use" />

    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <PageHero badge="Legal" title="Terms of" highlight="Use." subtitle="The terms that apply to this website — and how they relate to a signed engagement with Krucial Systems." />
            <LegalBody :sections="sections" updated="21 July 2026" />
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
