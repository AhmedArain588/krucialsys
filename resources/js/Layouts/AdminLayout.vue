<script setup>
import { computed, ref, watch } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';

defineProps({ title: String });

const page = usePage();
const user = computed(() => page.props.auth?.user);
const unread = computed(() => page.props.stats?.unreadSubmissions ?? page.props.unreadCount ?? 0);

// Flash toast
const toast = ref(null);
let toastTimer;
watch(
    () => page.props.flash?.success,
    (msg) => {
        if (!msg) return;
        toast.value = msg;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => (toast.value = null), 4000);
    },
    { immediate: true }
);

const nav = [
    { label: 'Dashboard',   route: 'admin.dashboard',        href: '/admin' },
    { label: 'Site Theme',  route: 'admin.themes.index',     href: '/admin/themes' },
    { label: 'Submissions', route: 'admin.submissions.index', href: '/admin/submissions', badge: true },
];

const isActive = (href) => {
    const path = page.url.split('?')[0];
    return href === '/admin' ? path === '/admin' : path.startsWith(href);
};

const logout = () => router.post('/logout');
</script>

<template>
    <div class="admin">
        <aside class="sidebar">
            <div class="brand">
                <img :src="'/logo.png'" alt="Krucial Systems" class="brand-mark" />
                <div>
                    <div class="brand-name">Krucial</div>
                    <div class="brand-sub">Admin</div>
                </div>
            </div>

            <nav class="nav">
                <Link v-for="item in nav" :key="item.href" :href="item.href"
                      class="nav-item" :class="{ active: isActive(item.href) }">
                    <span>{{ item.label }}</span>
                    <span v-if="item.badge && unread > 0" class="badge">{{ unread }}</span>
                </Link>
            </nav>

            <div class="sidebar-foot">
                <a href="/" target="_blank" rel="noopener" class="nav-item subtle">View site ↗</a>
            </div>
        </aside>

        <div class="main">
            <header class="topbar">
                <h1 class="page-title">{{ title }}</h1>
                <div class="user">
                    <div class="user-meta">
                        <div class="user-name">{{ user?.name }}</div>
                        <div class="user-mail">{{ user?.email }}</div>
                    </div>
                    <button class="btn-ghost" @click="logout">Log out</button>
                </div>
            </header>

            <main class="content">
                <slot />
            </main>
        </div>

        <Transition name="toast">
            <div v-if="toast" class="toast">{{ toast }}</div>
        </Transition>
    </div>
</template>

<style scoped>
/* Admin chrome uses a fixed palette, deliberately independent of the site
   theme, so editing site colours can never make this panel unreadable. */
.admin {
    --a-bg: #0B0D14;
    --a-panel: #12151F;
    --a-panel-2: #171B27;
    --a-line: #232838;
    --a-text: #E8EAF2;
    --a-muted: #8A93A8;
    --a-accent: #0A84FF;
    --a-danger: #FF4D5E;
    --a-ok: #16C784;

    display: flex;
    min-height: 100vh;
    background: var(--a-bg);
    color: var(--a-text);
    font-family: 'Inter', sans-serif;
}

.sidebar {
    width: 240px;
    flex-shrink: 0;
    background: var(--a-panel);
    border-right: 1px solid var(--a-line);
    display: flex;
    flex-direction: column;
    padding: 22px 14px;
    position: sticky;
    top: 0;
    height: 100vh;
}

.brand { display: flex; align-items: center; gap: 10px; padding: 0 8px 22px; }
.brand-mark { width: 34px; height: 34px; border-radius: 8px; background: #fff; object-fit: contain; }
.brand-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; line-height: 1.1; }
.brand-sub { color: var(--a-muted); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; }

.nav { display: flex; flex-direction: column; gap: 4px; }
.nav-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px; border-radius: 9px;
    color: var(--a-muted); text-decoration: none;
    font-size: 14px; font-weight: 500;
    transition: background .16s, color .16s;
}
.nav-item:hover { background: var(--a-panel-2); color: var(--a-text); }
.nav-item.active { background: color-mix(in srgb, var(--a-accent) 16%, transparent); color: #fff; }
.nav-item.subtle { font-size: 13px; }

.badge {
    background: var(--a-accent); color: #fff;
    font-size: 11px; font-weight: 700;
    min-width: 20px; text-align: center;
    padding: 2px 6px; border-radius: 999px;
}

.sidebar-foot { margin-top: auto; }

.main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

.topbar {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    padding: 18px 28px;
    border-bottom: 1px solid var(--a-line);
    background: var(--a-panel);
    position: sticky; top: 0; z-index: 10;
}
.page-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; margin: 0; }

.user { display: flex; align-items: center; gap: 14px; }
.user-meta { text-align: right; line-height: 1.25; }
.user-name { font-size: 13px; font-weight: 600; }
.user-mail { font-size: 11px; color: var(--a-muted); }

.btn-ghost {
    background: transparent; color: var(--a-muted);
    border: 1px solid var(--a-line); border-radius: 8px;
    padding: 7px 14px; font-size: 13px; cursor: pointer;
    transition: all .16s; font-family: inherit;
}
.btn-ghost:hover { color: var(--a-danger); border-color: var(--a-danger); }

.content { padding: 28px; flex: 1; }

.toast {
    position: fixed; bottom: 26px; right: 26px; z-index: 100;
    background: var(--a-ok); color: #04140D;
    padding: 12px 18px; border-radius: 10px;
    font-size: 14px; font-weight: 600;
    box-shadow: 0 16px 40px #0008;
}
.toast-enter-active, .toast-leave-active { transition: all .25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }

@media (max-width: 860px) {
    .admin { flex-direction: column; }
    .sidebar { width: auto; height: auto; position: static; flex-direction: row; align-items: center; gap: 14px; overflow-x: auto; }
    .brand { padding: 0 8px 0 0; }
    .nav { flex-direction: row; }
    .sidebar-foot { margin-top: 0; }
    .content { padding: 18px; }
}
</style>
