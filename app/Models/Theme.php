<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Theme extends Model
{
    /**
     * Colour columns, in the order they are presented in the admin editor.
     * Keys are DB columns; values are the camelCase keys the Vue side expects.
     */
    public const COLOR_MAP = [
        'bg'          => 'bg',
        'bg_alt'      => 'bgAlt',
        'bg_card'     => 'bgCard',
        'text'        => 'text',
        'text_muted'  => 'textMuted',
        'accent'      => 'accent',
        'accent_text' => 'accentText',
    ];

    public const CACHE_KEY = 'ks.active_theme';

    protected $fillable = [
        'key', 'name', 'bg', 'bg_alt', 'bg_card',
        'text', 'text_muted', 'accent', 'accent_text',
        'logo_filter', 'is_active',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    protected static function booted(): void
    {
        // Any write invalidates the shared-prop cache.
        static::saved(fn () => Cache::forget(self::CACHE_KEY));
        static::deleted(fn () => Cache::forget(self::CACHE_KEY));
    }

    /**
     * Shape this theme the way useTheme() / the Vue components expect.
     */
    public function toPayload(): array
    {
        $payload = ['key' => $this->key, 'name' => $this->name];

        foreach (self::COLOR_MAP as $column => $jsKey) {
            $payload[$jsKey] = $this->{$column};
        }

        $payload['logoFilter'] = $this->logo_filter;

        return $payload;
    }

    /**
     * The live theme, cached. Falls back to the first theme, then to a
     * hardcoded default so the site still renders before seeding.
     */
    public static function activePayload(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            $theme = static::where('is_active', true)->first() ?? static::first();

            return $theme?->toPayload() ?? self::fallbackPayload();
        });
    }

    public static function fallbackPayload(): array
    {
        return [
            'key' => 'darkBlue', 'name' => 'Dark Tech Blue',
            'bg' => '#05060F', 'bgAlt' => '#080A18', 'bgCard' => '#0C0F1E',
            'text' => '#EEF0FF', 'textMuted' => '#8892AA',
            'accent' => '#0A84FF', 'accentText' => '#fff',
            'logoFilter' => 'invert(1) brightness(1)',
        ];
    }

    /**
     * Make this the one active theme.
     */
    public function activate(): void
    {
        static::query()->where('id', '!=', $this->id)->update(['is_active' => false]);

        $this->forceFill(['is_active' => true])->save();
    }
}
