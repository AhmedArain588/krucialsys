// Krucial Systems — Shared Themes & Utilities
// Load with: <script src="../shared/themes.js"></script>

const THEMES = {
  darkBlue:      { name:'Dark Tech Blue',    bg:'#05060F', bgAlt:'#080A18', bgCard:'#0C0F1E', text:'#EEF0FF', textMuted:'#8892AA', accent:'#0A84FF', accentText:'#fff', logoFilter:'invert(1)' },
  midnightGreen: { name:'Midnight Green',    bg:'#050E0B', bgAlt:'#071410', bgCard:'#0A1A14', text:'#E8F5F0', textMuted:'#7A9990', accent:'#00C896', accentText:'#000', logoFilter:'invert(1)' },
  navyGold:      { name:'Corporate Navy',    bg:'#F5F7FA', bgAlt:'#EAEEF4', bgCard:'#FFFFFF', text:'#0D1528', textMuted:'#5A6880', accent:'#1A3A8F', accentText:'#fff', logoFilter:'none' },
  darkViolet:    { name:'Dark Violet',       bg:'#0A080F', bgAlt:'#100C18', bgCard:'#160F22', text:'#F0ECFF', textMuted:'#8878AA', accent:'#9B6DFF', accentText:'#fff', logoFilter:'invert(1)' },
  darkGold:      { name:'Dark Gold',         bg:'#090807', bgAlt:'#110F0C', bgCard:'#181410', text:'#F5F0E8', textMuted:'#8A7D68', accent:'#E8A020', accentText:'#000', logoFilter:'invert(1)' },
};

function getSavedTheme() {
  try { const s = localStorage.getItem('ks_theme'); return (s && THEMES[s]) ? s : 'darkBlue'; } catch { return 'darkBlue'; }
}
function saveTheme(key) {
  try { localStorage.setItem('ks_theme', key); } catch {}
}
