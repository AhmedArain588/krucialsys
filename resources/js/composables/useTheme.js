import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

/**
 * The site theme is owned by the backend: an admin picks the active theme and
 * edits its colours at /admin/themes, and it arrives here as a shared Inertia
 * prop (see HandleInertiaRequests::share). There is no visitor-side switching.
 *
 * Used only if the server prop is somehow missing (e.g. themes not yet seeded).
 */
const FALLBACK = {
    key: 'darkBlue', name: 'Dark Tech Blue',
    bg: '#05060F', bgAlt: '#080A18', bgCard: '#0C0F1E',
    text: '#EEF0FF', textMuted: '#8892AA',
    accent: '#0A84FF', accentText: '#fff',
    logoFilter: 'invert(1) brightness(1)',
};

export function useTheme() {
    const page = usePage();

    const theme = computed(() => page.props.theme ?? FALLBACK);
    const themeKey = computed(() => theme.value.key);

    return { theme, themeKey };
}
