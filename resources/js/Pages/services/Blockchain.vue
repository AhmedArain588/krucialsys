<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { Head } from '@inertiajs/vue3';
import { useTheme } from '@/composables/useTheme';
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';
import CtaBanner from '@/Components/CtaBanner.vue';
import DemoModal from '@/Components/DemoModal.vue';
import KsIcon from '@/Components/KsIcon.vue';

const { theme: t } = useTheme();
const demoOpen = ref(false);
watch(t, theme => { document.body.style.background = theme.bg; }, { immediate: true });

/**
 * Cardano-focused blockchain practice.
 *
 * Everything here describes platform capability and our toolchain — not
 * delivered client work. Add real project references only once they can be
 * named and verified.
 */
const capabilities = [
    ['Blocks', 'Smart Contract Development', 'Validators written in Aiken or Plutus, built around Cardano’s eUTXO model — where transaction outcomes and fees are known before a transaction is ever submitted.'],
    ['Coins', 'Native Tokens & NFTs', 'Cardano treats tokens as first-class assets, so minting needs no smart contract and carries no custom-token bug risk. Full CIP-25 and CIP-68 metadata support.'],
    ['Link2', 'dApp & Wallet Integration', 'Web applications that connect through the CIP-30 wallet standard — Lace, Eternl, Nami, Vespr and any compliant wallet — with transaction building and signing handled cleanly.'],
    ['Fingerprint', 'Decentralised Identity', 'Verifiable credentials and DIDs, so a certificate or licence can be checked cryptographically without calling the issuing authority.'],
    ['ShieldCheck', 'On-Chain Notarisation', 'Anchoring document hashes and audit trails on-chain, giving records a tamper-evident timestamp that survives independent of any single database.'],
    ['Server', 'Chain Infrastructure', 'Node operation, stake pools, and chain indexing via Blockfrost, Koios and Ogmios — plus custom explorers and reporting over on-chain data.'],
];

/* Why Cardano specifically — technical properties of the platform. */
const whyCardano = [
    ['Deterministic execution', 'The eUTXO model lets a transaction’s result and cost be validated off-chain before submission. No surprise reverts after you have paid gas.'],
    ['Predictable fees', 'Fees are calculated from transaction size and script cost, not bid against network congestion — which makes budgeting a public-sector rollout realistic.'],
    ['Formal methods heritage', 'Plutus and the Ouroboros consensus protocol were built on peer-reviewed research and formal verification — the same rigour that suits records that must hold up under scrutiny.'],
    ['Energy profile', 'Proof of Stake settles transactions without proof-of-work mining, avoiding the energy cost that rules out other chains for many institutional buyers.'],
];

/* Where this connects to the work we already do. */
const applications = [
    ['FileText', 'Verifiable Records', 'Digitisation produces the record; anchoring its hash on-chain proves it hasn’t changed since. A natural extension of our data digitisation practice.'],
    ['Landmark', 'Government & Credentials', 'Licences, certificates and permits issued as verifiable credentials — checkable by any party, forgeable by none.'],
    ['Package', 'Supply Chain Provenance', 'Custody and condition tracked from origin to delivery, with each handover recorded immutably.'],
    ['BarChart2', 'Transparent Reporting', 'Public-interest data published so that anyone can independently audit it, without trusting the publisher’s own database.'],
];

const stack = ['Aiken', 'Plutus', 'Haskell', 'Lucid Evolution', 'Mesh SDK', 'CIP-30', 'CIP-25 / CIP-68', 'Blockfrost', 'Koios', 'Ogmios', 'cardano-cli', 'Hydra'];

/* ── Animated eUTXO walkthrough ──────────────────────────────────────────────
 * Steps through the four stages of a transaction so the diagram reads as a
 * process rather than a static picture. This illustrates the model — it is
 * deliberately not presented as live mainnet data.
 */
const PHASES = [
    { label: 'Selecting inputs',  detail: 'Wallet picks unspent outputs' },
    { label: 'Running validator', detail: 'Script evaluated off-chain' },
    { label: 'Producing outputs', detail: 'New UTXOs + change' },
    { label: 'Settled in block',  detail: 'Deterministic, fee as quoted' },
];

const phase = ref(0);
const blocks = ref([0, 1, 2, 3, 4, 5]);
let phaseInterval = null;
let blockInterval = null;

onMounted(() => {
    phaseInterval = setInterval(() => {
        phase.value = (phase.value + 1) % PHASES.length;
    }, 1600);

    // Chain grows leftward as new blocks are appended.
    blockInterval = setInterval(() => {
        blocks.value = [...blocks.value.slice(1), blocks.value.at(-1) + 1];
    }, 3200);
});

onUnmounted(() => {
    clearInterval(phaseInterval);
    clearInterval(blockInterval);
});

const inputsActive    = computed(() => phase.value >= 0);
const validatorActive = computed(() => phase.value === 1);
const outputsActive   = computed(() => phase.value >= 2);
const settled         = computed(() => phase.value === 3);
</script>

<template>
    <Head title="Blockchain & Cardano" />

    <div :style="{ background:t.bg, minHeight:'100vh' }">
        <Navbar @demo="demoOpen = true" />
        <main>
            <!-- Hero -->
            <section :style="{ position:'relative', background:t.bg, paddingTop:'130px', paddingBottom:'80px', paddingLeft:'5%', paddingRight:'5%', overflow:'hidden' }">
                <div :style="{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${t.accent}07 1px,transparent 1px),linear-gradient(90deg,${t.accent}07 1px,transparent 1px)`, backgroundSize:'60px 60px' }" />
                <div :style="{ maxWidth:'1280px', margin:'0 auto', position:'relative' }">
                    <div class="hero-split" :style="{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }">
                        <div>
                            <div :style="{ display:'inline-flex', alignItems:'center', gap:'8px', background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'100px', padding:'6px 16px', marginBottom:'24px' }">
                                <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background:t.accent, boxShadow:`0 0 8px ${t.accent}` }" />
                                <span :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }">Blockchain</span>
                            </div>
                            <h1 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(36px,4.5vw,62px)', fontWeight:800, color:t.text, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'24px' }">
                                Blockchain Built on<br><span :style="{ color:t.accent }">Cardano.</span>
                            </h1>
                            <p :style="{ color:t.textMuted, fontSize:'17px', lineHeight:1.75, marginBottom:'36px' }">
                                Smart contracts, native tokens, verifiable credentials and on-chain record integrity — engineered on a platform whose determinism and predictable costs suit institutional deployment.
                            </p>
                            <div :style="{ display:'flex', gap:'12px', flexWrap:'wrap' }">
                                <button @click="demoOpen=true" :style="{ background:t.accent, color:t.accentText||'#fff', border:'none', borderRadius:'8px', padding:'14px 28px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, fontSize:'15px', cursor:'pointer', boxShadow:`0 0 30px ${t.accent}44` }">Discuss a Project</button>
                            </div>
                        </div>

                        <!-- Animated eUTXO walkthrough -->
                        <div :style="{ background:t.bgAlt, border:`1px solid ${t.accent}33`, borderRadius:'16px', padding:'22px' }">
                            <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'18px' }">
                                <div>
                                    <div :style="{ color:t.text, fontWeight:700, fontSize:'13px', fontFamily:`'Space Grotesk',sans-serif` }">eUTXO Transaction Model</div>
                                    <div :style="{ color:t.textMuted, fontSize:'10.5px', marginTop:'2px' }">How a Cardano transaction resolves</div>
                                </div>
                                <span :style="{ color:t.accent, background:`${t.accent}18`, border:`1px solid ${t.accent}44`, borderRadius:'5px', padding:'3px 9px', fontSize:'9px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif`, letterSpacing:'0.08em' }">ILLUSTRATION</span>
                            </div>

                            <!-- Flow -->
                            <div :style="{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:'10px', alignItems:'center', marginBottom:'14px' }">
                                <!-- Inputs -->
                                <div :style="{ display:'flex', flexDirection:'column', gap:'8px' }">
                                    <div v-for="(i, n) in ['Input UTXO','Input UTXO']" :key="n"
                                        :style="{
                                            background: inputsActive ? `${t.accent}14` : t.bg,
                                            border:`1px solid ${inputsActive ? t.accent + '66' : t.accent + '2E'}`,
                                            borderRadius:'9px', padding:'12px 10px', textAlign:'center',
                                            color: inputsActive ? t.text : t.textMuted,
                                            fontSize:'11px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600,
                                            transition:'all 0.5s ease',
                                            transform: phase === 0 ? 'translateX(2px)' : 'none',
                                        }">
                                        {{ i }}
                                    </div>
                                </div>

                                <!-- Validator -->
                                <div :style="{ textAlign:'center' }">
                                    <div :style="{
                                        width:'50px', height:'50px', borderRadius:'12px',
                                        background: validatorActive ? `${t.accent}38` : `${t.accent}18`,
                                        border:`1px solid ${validatorActive ? t.accent : t.accent + '55'}`,
                                        display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto',
                                        boxShadow: validatorActive ? `0 0 22px ${t.accent}88` : 'none',
                                        transform: validatorActive ? 'scale(1.1)' : 'scale(1)',
                                        transition:'all 0.45s ease',
                                    }">
                                        <KsIcon name="ShieldCheck" :size="23" :color="t.accent" />
                                    </div>
                                    <div :style="{ color: validatorActive ? t.accent : t.textMuted, fontSize:'9px', marginTop:'7px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:700, letterSpacing:'0.06em', transition:'color 0.4s' }">VALIDATOR</div>
                                </div>

                                <!-- Outputs -->
                                <div :style="{ display:'flex', flexDirection:'column', gap:'8px' }">
                                    <div v-for="(o, n) in ['Output UTXO','Change']" :key="n"
                                        :style="{
                                            background: outputsActive ? `${t.accent}22` : t.bg,
                                            border:`1px solid ${outputsActive ? t.accent + '88' : t.accent + '22'}`,
                                            borderRadius:'9px', padding:'12px 10px', textAlign:'center',
                                            color: outputsActive ? t.text : t.textMuted,
                                            fontSize:'11px', fontFamily:`'Space Grotesk',sans-serif`, fontWeight:600,
                                            opacity: outputsActive ? 1 : 0.45,
                                            transform: outputsActive ? 'translateX(0)' : 'translateX(-6px)',
                                            transition:'all 0.5s ease',
                                        }">
                                        {{ o }}
                                    </div>
                                </div>
                            </div>

                            <!-- Phase indicator -->
                            <div :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'10px', padding:'12px 13px', marginBottom:'12px' }">
                                <div :style="{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'9px' }">
                                    <span :style="{ color:t.text, fontSize:'12px', fontWeight:700, fontFamily:`'Space Grotesk',sans-serif` }">{{ PHASES[phase].label }}</span>
                                    <span :style="{ color:t.textMuted, fontSize:'10.5px' }">{{ PHASES[phase].detail }}</span>
                                </div>
                                <div :style="{ display:'flex', gap:'4px' }">
                                    <div v-for="(p, i) in PHASES" :key="i"
                                        :style="{
                                            flex:1, height:'3px', borderRadius:'2px',
                                            background: i <= phase ? t.accent : `${t.accent}26`,
                                            boxShadow: i === phase ? `0 0 8px ${t.accent}` : 'none',
                                            transition:'all 0.4s ease',
                                        }" />
                                </div>
                            </div>

                            <!-- Chain strip -->
                            <div :style="{ background:t.bg, border:`1px solid ${t.accent}22`, borderRadius:'10px', padding:'12px 13px' }">
                                <div :style="{ color:t.textMuted, fontSize:'9.5px', fontFamily:`'Space Grotesk',sans-serif`, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'9px' }">Chain of blocks</div>
                                <div :style="{ display:'flex', gap:'5px', alignItems:'center' }">
                                    <template v-for="(b, i) in blocks" :key="b">
                                        <div :style="{
                                            flex:1, height:'26px', borderRadius:'5px',
                                            background: i === blocks.length - 1 && settled ? `${t.accent}44` : `${t.accent}14`,
                                            border:`1px solid ${i === blocks.length - 1 && settled ? t.accent : t.accent + '2E'}`,
                                            display:'flex', alignItems:'center', justifyContent:'center',
                                            transition:'all 0.5s ease',
                                        }">
                                            <KsIcon name="Blocks" :size="12" :color="t.accent" />
                                        </div>
                                        <div v-if="i < blocks.length - 1" :style="{ width:'5px', height:'1.5px', background:`${t.accent}55`, flexShrink:0 }" />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Capabilities -->
            <section :style="{ background:t.bgAlt, padding:'90px 5%' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'52px' }">
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">What We Build</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(28px,3.6vw,44px)', fontWeight:800, color:t.text, letterSpacing:'-0.02em' }">Cardano Engineering</h2>
                    </div>

                    <div class="industries-grid" :style="{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }">
                        <div v-for="[icon, title, desc] in capabilities" :key="title"
                            :style="{ background:t.bgCard, border:`1px solid ${t.textMuted}22`, borderRadius:'14px', padding:'28px' }">
                            <div :style="{ width:'46px', height:'46px', borderRadius:'11px', background:`${t.accent}15`, border:`1px solid ${t.accent}33`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'18px' }">
                                <KsIcon :name="icon" :size="22" :color="t.accent" />
                            </div>
                            <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'17px', fontWeight:700, color:t.text, marginBottom:'10px' }">{{ title }}</h3>
                            <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.7, margin:0 }">{{ desc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Why Cardano -->
            <section :style="{ background:t.bg, padding:'90px 5%' }">
                <div class="why-grid" :style="{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'start' }">
                    <div>
                        <div :style="{ color:t.accent, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'12px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }">Why Cardano</div>
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.4vw,40px)', fontWeight:800, color:t.text, letterSpacing:'-0.02em', lineHeight:1.15, marginBottom:'20px' }">
                            Chosen for Determinism,<br>Not Hype.
                        </h2>
                        <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.75 }">
                            Most institutional blockchain projects fail on unpredictable cost and unpredictable execution. Cardano&rsquo;s architecture addresses both directly, which is why we build here.
                        </p>
                    </div>

                    <div :style="{ display:'flex', flexDirection:'column', gap:'14px' }">
                        <div v-for="[title, desc] in whyCardano" :key="title"
                            :style="{ background:t.bgCard, border:`1px solid ${t.textMuted}22`, borderRadius:'12px', padding:'22px' }">
                            <div :style="{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'9px' }">
                                <KsIcon name="Check" :size="16" :color="t.accent" />
                                <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'16px', fontWeight:700, color:t.text, margin:0 }">{{ title }}</h3>
                            </div>
                            <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.7, margin:0 }">{{ desc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Applications -->
            <section :style="{ background:t.bgAlt, padding:'90px 5%' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto' }">
                    <div :style="{ textAlign:'center', marginBottom:'48px' }">
                        <h2 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'clamp(26px,3.4vw,40px)', fontWeight:800, color:t.text, letterSpacing:'-0.02em', marginBottom:'16px' }">Where It Fits Our Work</h2>
                        <p :style="{ color:t.textMuted, fontSize:'16px', lineHeight:1.7, maxWidth:'640px', margin:'0 auto' }">
                            Blockchain is most useful where a record&rsquo;s integrity has to be provable by someone who doesn&rsquo;t trust the system holding it &mdash; which is exactly where our digitisation and government work already operates.
                        </p>
                    </div>

                    <div class="industries-grid" :style="{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'16px' }">
                        <div v-for="[icon, title, desc] in applications" :key="title"
                            :style="{ background:t.bgCard, border:`1px solid ${t.textMuted}22`, borderRadius:'14px', padding:'26px', display:'flex', gap:'18px', alignItems:'flex-start' }">
                            <div :style="{ width:'44px', height:'44px', borderRadius:'11px', background:`${t.accent}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }">
                                <KsIcon :name="icon" :size="21" :color="t.accent" />
                            </div>
                            <div>
                                <h3 :style="{ fontFamily:`'Space Grotesk',sans-serif`, fontSize:'16.5px', fontWeight:700, color:t.text, marginBottom:'8px' }">{{ title }}</h3>
                                <p :style="{ color:t.textMuted, fontSize:'14px', lineHeight:1.7, margin:0 }">{{ desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Toolchain -->
            <section :style="{ background:t.bg, padding:'80px 5%' }">
                <div :style="{ maxWidth:'1280px', margin:'0 auto', textAlign:'center' }">
                    <div :style="{ color:t.textMuted, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'11px', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:'22px' }">Toolchain</div>
                    <div :style="{ display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center' }">
                        <span v-for="s in stack" :key="s"
                            :style="{ background:t.bgCard, border:`1px solid ${t.accent}2E`, borderRadius:'8px', padding:'9px 16px', color:t.text, fontFamily:`'Space Grotesk',sans-serif`, fontSize:'13px', fontWeight:600 }">
                            {{ s }}
                        </span>
                    </div>
                </div>
            </section>

            <CtaBanner @demo="demoOpen = true" />
        </main>
        <Footer />
        <DemoModal v-if="demoOpen" @close="demoOpen = false" />
    </div>
</template>
