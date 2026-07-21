<script setup>
import { ref, watch, computed } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

const props = defineProps({ themes: Array });

// Start on the live theme.
const selectedId = ref((props.themes.find((t) => t.is_active) ?? props.themes[0])?.id);

const form = useForm({
    name: '', bg: '', bg_alt: '', bg_card: '',
    text: '', text_muted: '', accent: '', accent_text: '', logo_filter: 'none',
});

const loadIntoForm = (id) => {
    const t = props.themes.find((x) => x.id === id);
    if (!t) return;
    form.defaults({
        name: t.name, bg: t.bg, bg_alt: t.bg_alt, bg_card: t.bg_card,
        text: t.text, text_muted: t.text_muted, accent: t.accent,
        accent_text: t.accent_text, logo_filter: t.logo_filter,
    });
    form.reset();
    form.clearErrors();
};

loadIntoForm(selectedId.value);
watch(selectedId, loadIntoForm);
// Re-sync after a save so "unsaved changes" clears correctly.
watch(() => props.themes, () => loadIntoForm(selectedId.value));

const fields = [
    { key: 'bg',          label: 'Background',      hint: 'Page background' },
    { key: 'bg_alt',      label: 'Alt background',  hint: 'Alternating sections' },
    { key: 'bg_card',     label: 'Card background', hint: 'Cards and panels' },
    { key: 'text',        label: 'Text',            hint: 'Headings and body' },
    { key: 'text_muted',  label: 'Muted text',      hint: 'Secondary copy' },
    { key: 'accent',      label: 'Accent',          hint: 'Buttons, links, highlights' },
    { key: 'accent_text', label: 'On accent',       hint: 'Text on accent buttons' },
];

const selectedIsLive = computed(
    () => props.themes.find((x) => x.id === selectedId.value)?.is_active ?? false
);

const save = () => form.put(`/admin/themes/${selectedId.value}`, { preserveScroll: true });

const activate = (id) => router.post(`/admin/themes/${id}/activate`, {}, { preserveScroll: true });

// A hex field is only valid to preview once it's a full colour.
const safe = (v) => (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) ? v : 'transparent');
</script>

<template>
    <Head title="Site Theme" />

    <AdminLayout title="Site Theme">
        <p class="intro">
            Pick which theme is live on the public site, and fine-tune its colours.
            Changes apply to every visitor as soon as you save.
        </p>

        <div class="grid">
            <!-- Theme list -->
            <aside class="list">
                <div v-for="t in themes" :key="t.id"
                     class="theme-row" :class="{ selected: t.id === selectedId }"
                     @click="selectedId = t.id">
                    <div class="swatches">
                        <span :style="{ background: t.bg }" />
                        <span :style="{ background: t.accent }" />
                        <span :style="{ background: t.text }" />
                    </div>
                    <div class="theme-meta">
                        <div class="theme-name">{{ t.name }}</div>
                        <div v-if="t.is_active" class="live">● Live</div>
                        <button v-else class="set-live" @click.stop="activate(t.id)">Set live</button>
                    </div>
                </div>
            </aside>

            <!-- Editor -->
            <section class="editor">
                <!-- Live status for the theme being edited -->
                <div class="live-bar" :class="{ islive: selectedIsLive }">
                    <template v-if="selectedIsLive">
                        <span class="live-dot" />
                        <span><strong>{{ form.name }}</strong> is live on the public site.</span>
                    </template>
                    <template v-else>
                        <span>You are editing <strong>{{ form.name }}</strong> — it is <em>not</em> the live theme.</span>
                        <button type="button" class="btn small" @click="activate(selectedId)">Make this theme live</button>
                    </template>
                </div>

                <form @submit.prevent="save">
                    <label class="field">
                        <span class="f-label">Theme name</span>
                        <input v-model="form.name" type="text" class="text-input" />
                        <small v-if="form.errors.name" class="err">{{ form.errors.name }}</small>
                    </label>

                    <div class="colors">
                        <div v-for="f in fields" :key="f.key" class="field">
                            <span class="f-label">{{ f.label }}</span>
                            <div class="color-row">
                                <input type="color" v-model="form[f.key]" class="picker" />
                                <input type="text" v-model="form[f.key]" class="text-input hex" spellcheck="false" />
                            </div>
                            <small class="hint">{{ f.hint }}</small>
                            <small v-if="form.errors[f.key]" class="err">{{ form.errors[f.key] }}</small>
                        </div>
                    </div>

                    <label class="field">
                        <span class="f-label">Logo filter</span>
                        <select v-model="form.logo_filter" class="text-input">
                            <option value="none">None — dark logo (for light backgrounds)</option>
                            <option value="invert(1)">Invert — white logo (for dark backgrounds)</option>
                            <option value="invert(1) brightness(1)">Invert + brighten</option>
                        </select>
                        <small class="hint">How the logo is adjusted to stay visible on this background.</small>
                    </label>

                    <div class="actions">
                        <button type="submit" class="btn" :disabled="form.processing || !form.isDirty">
                            {{ form.processing ? 'Saving…' : 'Save changes' }}
                        </button>
                        <button type="button" class="btn ghost" :disabled="!form.isDirty" @click="form.reset()">
                            Discard
                        </button>
                        <span v-if="form.isDirty" class="dirty">Unsaved changes</span>
                    </div>
                </form>
            </section>

            <!-- Live preview -->
            <section class="preview" :style="{ background: safe(form.bg) }">
                <div class="pv-label">Preview</div>

                <div class="pv-card" :style="{ background: safe(form.bg_card), borderColor: safe(form.accent) + '55' }">
                    <div class="pv-eyebrow" :style="{ color: safe(form.accent) }">AI SOLUTIONS</div>
                    <div class="pv-h" :style="{ color: safe(form.text) }">Intelligent AI Solutions</div>
                    <p class="pv-p" :style="{ color: safe(form.text_muted) }">
                        Built for real-world impact — CCTV analytics, data digitisation and automation.
                    </p>
                    <button class="pv-btn" :style="{ background: safe(form.accent), color: safe(form.accent_text) }">
                        Get in Touch
                    </button>
                </div>

                <div class="pv-alt" :style="{ background: safe(form.bg_alt), color: safe(form.text_muted) }">
                    Alternating section background
                </div>
            </section>
        </div>
    </AdminLayout>
</template>

<style scoped>
.intro { color: #8A93A8; font-size: 14px; margin: 0 0 20px; max-width: 640px; line-height: 1.6; }

.grid { display: grid; grid-template-columns: 240px minmax(320px, 1fr) minmax(280px, 380px); gap: 18px; align-items: start; }

/* List */
.list { display: flex; flex-direction: column; gap: 8px; }
.theme-row {
    background: #12151F; border: 1px solid #232838; border-radius: 11px;
    padding: 13px 14px; cursor: pointer; transition: border-color .16s, background .16s;
}
.theme-row:hover { background: #171B27; }
.theme-row.selected { border-color: #0A84FF; background: #141A2A; }
.swatches { display: flex; gap: 5px; margin-bottom: 9px; }
.swatches span { width: 20px; height: 20px; border-radius: 5px; border: 1px solid #ffffff1a; }
.theme-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.theme-name { font-size: 13px; font-weight: 600; color: #E8EAF2; }
.live { color: #16C784; font-size: 11px; font-weight: 700; white-space: nowrap; }
.set-live {
    background: transparent; border: 1px solid #2E3549; color: #8A93A8;
    border-radius: 6px; padding: 4px 9px; font-size: 11px; cursor: pointer;
    font-family: inherit; transition: all .16s; white-space: nowrap;
}
.set-live:hover { border-color: #0A84FF; color: #0A84FF; }

/* Editor */
.editor { background: #12151F; border: 1px solid #232838; border-radius: 12px; padding: 20px; }

.live-bar {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    background: #1A1400; border: 1px solid #4A3A00; color: #E8C86A;
    border-radius: 9px; padding: 11px 14px; margin-bottom: 18px; font-size: 13px;
}
.live-bar.islive { background: #062016; border-color: #124A2E; color: #16C784; }
.live-bar strong { font-weight: 700; }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #16C784; box-shadow: 0 0 8px #16C784; flex-shrink: 0; }
.btn.small { padding: 6px 13px; font-size: 12px; margin-left: auto; }
.colors { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 15px; margin: 4px 0 18px; }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 15px; }
.f-label { color: #8A93A8; font-size: 12px; font-weight: 600; }
.color-row { display: flex; gap: 8px; align-items: center; }
.picker {
    width: 40px; height: 36px; padding: 0; flex-shrink: 0;
    background: transparent; border: 1px solid #2E3549; border-radius: 8px; cursor: pointer;
}
.text-input {
    width: 100%; background: #0B0D14; border: 1px solid #2E3549; border-radius: 8px;
    padding: 9px 11px; color: #E8EAF2; font-size: 13px; font-family: inherit;
    outline: none; transition: border-color .16s;
}
.text-input:focus { border-color: #0A84FF; }
.hex { font-family: ui-monospace, monospace; text-transform: uppercase; }
.hint { color: #6B738A; font-size: 11px; }
.err { color: #FF4D5E; font-size: 11px; }

.actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.btn {
    background: #0A84FF; color: #fff; border: none; border-radius: 8px;
    padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer;
    font-family: 'Space Grotesk', sans-serif; transition: opacity .16s;
}
.btn:hover:not(:disabled) { opacity: .9; }
.btn:disabled { opacity: .45; cursor: not-allowed; }
.btn.ghost { background: transparent; border: 1px solid #2E3549; color: #8A93A8; }
.dirty { color: #E8A020; font-size: 12px; }

/* Preview */
.preview { border: 1px solid #232838; border-radius: 12px; padding: 18px; position: sticky; top: 92px; overflow: hidden; }
.pv-label { color: #8A93A8; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 14px; mix-blend-mode: difference; }
.pv-card { border: 1px solid; border-radius: 12px; padding: 20px; margin-bottom: 12px; }
.pv-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .16em; margin-bottom: 9px; }
.pv-h { font-family: 'Space Grotesk', sans-serif; font-size: 21px; font-weight: 700; line-height: 1.2; margin-bottom: 9px; }
.pv-p { font-size: 13px; line-height: 1.6; margin: 0 0 16px; }
.pv-btn { border: none; border-radius: 8px; padding: 10px 18px; font-size: 13px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; cursor: default; }
.pv-alt { border-radius: 9px; padding: 14px; font-size: 12px; text-align: center; }

@media (max-width: 1180px) {
    .grid { grid-template-columns: 220px 1fr; }
    .preview { grid-column: 1 / -1; position: static; }
}
@media (max-width: 780px) {
    .grid { grid-template-columns: 1fr; }
}
</style>
