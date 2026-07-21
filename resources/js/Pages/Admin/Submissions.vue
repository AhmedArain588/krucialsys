<script setup>
import { ref, watch } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

const props = defineProps({ submissions: Object, filters: Object, unreadCount: Number });

const search = ref(props.filters.search ?? '');
const unreadOnly = ref(props.filters.unread ?? false);
const expanded = ref(null);

let debounce;
const applyFilters = () => {
    router.get('/admin/submissions',
        { search: search.value || undefined, unread: unreadOnly.value || undefined },
        { preserveState: true, replace: true, preserveScroll: true });
};

watch(search, () => {
    clearTimeout(debounce);
    debounce = setTimeout(applyFilters, 350);
});
watch(unreadOnly, applyFilters);

const toggleRead = (s) => router.post(`/admin/submissions/${s.id}/toggle-read`, {}, { preserveScroll: true, preserveState: true });

const destroy = (s) => {
    if (confirm(`Delete the submission from ${s.name}? This cannot be undone.`)) {
        router.delete(`/admin/submissions/${s.id}`, { preserveScroll: true });
    }
};

const toggleExpand = (s) => {
    expanded.value = expanded.value === s.id ? null : s.id;
    if (expanded.value === s.id && !s.read_at) toggleRead(s);
};

const fmt = (d) => new Date(d).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
</script>

<template>
    <Head title="Contact Submissions" />

    <AdminLayout title="Contact Submissions">
        <div class="bar">
            <input v-model="search" type="search" class="search" placeholder="Search name, email, company, message…" />
            <label class="check">
                <input v-model="unreadOnly" type="checkbox" />
                <span>Unread only ({{ unreadCount }})</span>
            </label>
            <span class="count">{{ submissions.total }} total</span>
        </div>

        <p v-if="!submissions.data.length" class="empty">
            No submissions match your filters.
        </p>

        <div v-else class="rows">
            <article v-for="s in submissions.data" :key="s.id"
                     class="row" :class="{ unread: !s.read_at, open: expanded === s.id }">
                <div class="row-head" @click="toggleExpand(s)">
                    <div class="who">
                        <div class="name">
                            <span v-if="!s.read_at" class="dot" />
                            {{ s.name }}
                        </div>
                        <a :href="`mailto:${s.email}`" class="email" @click.stop>{{ s.email }}</a>
                    </div>
                    <div class="svc">{{ s.service ?? '—' }}</div>
                    <div class="date">{{ fmt(s.created_at) }}</div>
                    <div class="chev">{{ expanded === s.id ? '▲' : '▼' }}</div>
                </div>

                <div v-if="expanded === s.id" class="row-body">
                    <dl class="meta">
                        <div v-if="s.company"><dt>Company</dt><dd>{{ s.company }}</dd></div>
                        <div v-if="s.phone"><dt>Phone</dt><dd>{{ s.phone }}</dd></div>
                        <div v-if="s.service"><dt>Service</dt><dd>{{ s.service }}</dd></div>
                    </dl>

                    <p class="message">{{ s.message }}</p>

                    <div class="row-actions">
                        <a :href="`mailto:${s.email}?subject=Re: your enquiry to Krucial Systems`" class="btn">Reply by email</a>
                        <button class="btn ghost" @click="toggleRead(s)">
                            Mark as {{ s.read_at ? 'unread' : 'read' }}
                        </button>
                        <button class="btn danger" @click="destroy(s)">Delete</button>
                    </div>
                </div>
            </article>
        </div>

        <nav v-if="submissions.last_page > 1" class="pager">
            <Link v-for="link in submissions.links" :key="link.label"
                  :href="link.url ?? ''"
                  class="page" :class="{ active: link.active, disabled: !link.url }"
                  preserve-scroll v-html="link.label" />
        </nav>
    </AdminLayout>
</template>

<style scoped>
.bar { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
.search {
    flex: 1; min-width: 220px;
    background: #12151F; border: 1px solid #2E3549; border-radius: 9px;
    padding: 10px 13px; color: #E8EAF2; font-size: 13px; font-family: inherit; outline: none;
}
.search:focus { border-color: #0A84FF; }
.check { display: flex; align-items: center; gap: 7px; color: #8A93A8; font-size: 13px; cursor: pointer; }
.check input { accent-color: #0A84FF; }
.count { color: #6B738A; font-size: 12px; }

.empty { color: #8A93A8; font-size: 14px; background: #12151F; border: 1px solid #232838; border-radius: 12px; padding: 30px; text-align: center; }

.rows { display: flex; flex-direction: column; gap: 8px; }
.row { background: #12151F; border: 1px solid #232838; border-radius: 11px; overflow: hidden; transition: border-color .16s; }
.row.unread { border-left: 3px solid #0A84FF; }
.row.open { border-color: #34405C; }

.row-head {
    display: grid; grid-template-columns: 2fr 1fr 1.2fr 24px;
    align-items: center; gap: 14px; padding: 14px 16px; cursor: pointer;
}
.row-head:hover { background: #171B27; }
.name { display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600; color: #E8EAF2; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: #0A84FF; flex-shrink: 0; }
.email { color: #8A93A8; font-size: 12px; text-decoration: none; }
.email:hover { color: #0A84FF; }
.svc, .date { color: #8A93A8; font-size: 12px; }
.chev { color: #6B738A; font-size: 10px; text-align: right; }

.row-body { padding: 4px 16px 16px; border-top: 1px solid #1A1E2B; }
.meta { display: flex; flex-wrap: wrap; gap: 22px; margin: 14px 0; }
.meta dt { color: #6B738A; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 3px; }
.meta dd { color: #E8EAF2; font-size: 13px; margin: 0; }
.message { color: #C7CDDC; font-size: 14px; line-height: 1.65; white-space: pre-wrap; background: #0B0D14; border-radius: 9px; padding: 14px; margin: 0 0 15px; }

.row-actions { display: flex; gap: 9px; flex-wrap: wrap; }
.btn {
    background: #0A84FF; color: #fff; border: none; border-radius: 8px;
    padding: 8px 15px; font-size: 12px; font-weight: 700; cursor: pointer;
    font-family: 'Space Grotesk', sans-serif; text-decoration: none; display: inline-block;
}
.btn:hover { opacity: .9; }
.btn.ghost { background: transparent; border: 1px solid #2E3549; color: #8A93A8; }
.btn.danger { background: transparent; border: 1px solid #4A2630; color: #FF4D5E; }
.btn.danger:hover { background: #FF4D5E; color: #fff; }

.pager { display: flex; gap: 6px; margin-top: 20px; flex-wrap: wrap; }
.page {
    background: #12151F; border: 1px solid #232838; border-radius: 7px;
    padding: 7px 12px; color: #8A93A8; font-size: 13px; text-decoration: none;
}
.page:hover { border-color: #0A84FF; color: #E8EAF2; }
.page.active { background: #0A84FF; color: #fff; border-color: #0A84FF; }
.page.disabled { opacity: .4; pointer-events: none; }

@media (max-width: 760px) {
    .row-head { grid-template-columns: 1fr 24px; }
    .svc, .date { display: none; }
}
</style>
