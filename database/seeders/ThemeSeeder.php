<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * The five presets originally hardcoded in resources/js/composables/useTheme.js.
     */
    public function run(): void
    {
        $themes = [
            ['key' => 'darkBlue', 'name' => 'Dark Tech Blue', 'bg' => '#05060F', 'bg_alt' => '#080A18', 'bg_card' => '#0C0F1E', 'text' => '#EEF0FF', 'text_muted' => '#8892AA', 'accent' => '#0A84FF', 'accent_text' => '#ffffff', 'logo_filter' => 'invert(1) brightness(1)', 'is_active' => true],
            ['key' => 'midnightGreen', 'name' => 'Midnight Green', 'bg' => '#050E0B', 'bg_alt' => '#071410', 'bg_card' => '#0A1A14', 'text' => '#E8F5F0', 'text_muted' => '#7A9990', 'accent' => '#00C896', 'accent_text' => '#000000', 'logo_filter' => 'invert(1)', 'is_active' => false],
            ['key' => 'navyGold', 'name' => 'Corporate Navy', 'bg' => '#F5F7FA', 'bg_alt' => '#EAEEF4', 'bg_card' => '#FFFFFF', 'text' => '#0D1528', 'text_muted' => '#5A6880', 'accent' => '#1A3A8F', 'accent_text' => '#ffffff', 'logo_filter' => 'none', 'is_active' => false],
            ['key' => 'darkViolet', 'name' => 'Dark Violet', 'bg' => '#0A080F', 'bg_alt' => '#100C18', 'bg_card' => '#160F22', 'text' => '#F0ECFF', 'text_muted' => '#8878AA', 'accent' => '#9B6DFF', 'accent_text' => '#ffffff', 'logo_filter' => 'invert(1)', 'is_active' => false],
            ['key' => 'darkGold', 'name' => 'Dark Gold', 'bg' => '#090807', 'bg_alt' => '#110F0C', 'bg_card' => '#181410', 'text' => '#F5F0E8', 'text_muted' => '#8A7D68', 'accent' => '#E8A020', 'accent_text' => '#000000', 'logo_filter' => 'invert(1)', 'is_active' => false],
        ];

        foreach ($themes as $theme) {
            // updateOrCreate keeps re-seeding safe without clobbering edited colours.
            Theme::firstOrCreate(['key' => $theme['key']], $theme);
        }
    }
}
