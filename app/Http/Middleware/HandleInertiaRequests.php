<?php

namespace App\Http\Middleware;

use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            // The live theme, set from the admin panel (cached, see Theme::activePayload).
            'theme' => fn () => Theme::activePayload(),

            'auth' => [
                'user' => $request->user()
                    ? $request->user()->only('id', 'name', 'email', 'is_admin')
                    : null,
            ],

            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ];
    }
}
