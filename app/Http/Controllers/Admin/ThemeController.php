<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThemeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Themes', [
            'themes' => Theme::orderBy('id')->get(),
        ]);
    }

    /**
     * Update the colours of a single theme.
     */
    public function update(Request $request, Theme $theme)
    {
        $hex = ['required', 'string', 'regex:/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/'];

        $validated = $request->validate([
            'name'        => 'required|string|max:60',
            'bg'          => $hex,
            'bg_alt'      => $hex,
            'bg_card'     => $hex,
            'text'        => $hex,
            'text_muted'  => $hex,
            'accent'      => $hex,
            'accent_text' => $hex,
            'logo_filter' => 'required|string|max:64',
        ], [
            '*.regex' => 'Colours must be hex values such as #0A84FF.',
        ]);

        $theme->update($validated);

        return back()->with('success', "“{$theme->name}” saved.");
    }

    /**
     * Make a theme the live site-wide theme.
     */
    public function activate(Theme $theme)
    {
        $theme->activate();

        return back()->with('success', "“{$theme->name}” is now live on the site.");
    }
}
