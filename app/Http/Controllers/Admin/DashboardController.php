<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\Theme;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'submissions'       => ContactSubmission::count(),
                'unreadSubmissions' => ContactSubmission::whereNull('read_at')->count(),
                'themes'            => Theme::count(),
                'activeTheme'       => Theme::where('is_active', true)->value('name'),
            ],
            'recent' => ContactSubmission::latest()
                ->take(5)
                ->get(['id', 'name', 'email', 'service', 'read_at', 'created_at']),
        ]);
    }
}
