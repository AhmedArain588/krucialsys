<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

defineProps({ stats: Object, recent: Array });

const fmt = (d) => new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<template>
    <Head title="Admin Dashboard" />

    <AdminLayout title="Dashboard">
        <div class="tiles">
            <div class="tile">
                <div class="tile-label">Total submissions</div>
                <div class="tile-value">{{ stats.submissions }}</div>
            </div>
            <div class="tile">
                <div class="tile-label">Unread</div>
                <div class="tile-value" :class="{ hot: stats.unreadSubmissions > 0 }">{{ stats.unreadSubmissions }}</div>
            </div>
            <div class="tile">
                <div class="tile-label">Active theme</div>
                <div class="tile-value sm">{{ stats.activeTheme ?? '—' }}</div>
            </div>
            <div class="tile">
                <div class="tile-label">Themes available</div>
                <div class="tile-value">{{ stats.themes }}</div>
            </div>
        </div>

        <section class="panel">
            <header class="panel-head">
                <h2>Recent submissions</h2>
                <Link href="/admin/submissions" class="link">View all →</Link>
            </header>

            <p v-if="!recent.length" class="empty">No contact submissions yet.</p>

            <table v-else class="table">
                <thead>
                    <tr><th>Name</th><th>Email</th><th>Service</th><th>Received</th><th></th></tr>
                </thead>
                <tbody>
                    <tr v-for="r in recent" :key="r.id">
                        <td class="strong">{{ r.name }}</td>
                        <td class="muted">{{ r.email }}</td>
                        <td class="muted">{{ r.service ?? '—' }}</td>
                        <td class="muted">{{ fmt(r.created_at) }}</td>
                        <td><span v-if="!r.read_at" class="pill">New</span></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </AdminLayout>
</template>

<style scoped>
.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px; margin-bottom: 26px; }
.tile { background: #12151F; border: 1px solid #232838; border-radius: 12px; padding: 18px 20px; }
.tile-label { color: #8A93A8; font-size: 12px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 8px; }
.tile-value { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #E8EAF2; }
.tile-value.sm { font-size: 18px; }
.tile-value.hot { color: #0A84FF; }

.panel { background: #12151F; border: 1px solid #232838; border-radius: 12px; overflow: hidden; }
.panel-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #232838; }
.panel-head h2 { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; margin: 0; color: #E8EAF2; }
.link { color: #0A84FF; font-size: 13px; text-decoration: none; }
.link:hover { text-decoration: underline; }

.empty { color: #8A93A8; font-size: 14px; padding: 26px 20px; margin: 0; }

.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.table th { text-align: left; color: #8A93A8; font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; padding: 11px 20px; border-bottom: 1px solid #232838; }
.table td { padding: 13px 20px; border-bottom: 1px solid #1A1E2B; color: #E8EAF2; }
.table tr:last-child td { border-bottom: none; }
.strong { font-weight: 600; }
.muted { color: #8A93A8; }
.pill { background: #0A84FF; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
</style>
