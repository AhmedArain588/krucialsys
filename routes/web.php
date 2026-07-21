<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ThemeController;
use App\Http\Controllers\Admin\SubmissionController;

Route::get('/', fn() => Inertia::render('Home'));
Route::get('/services', fn() => Inertia::render('Services'));
Route::get('/services/ai-solutions', fn() => Inertia::render('services/AiSolutions'));
Route::get('/services/cctv-ai', fn() => Inertia::render('services/CctvAi'));
Route::get('/services/automation', fn() => Inertia::render('services/Automation'));
Route::get('/services/data-digitisation', fn() => Inertia::render('services/DataDigitisation'));
Route::get('/services/iot-smart-systems', fn() => Inertia::render('services/IotSmartSystems'));
Route::get('/services/cloud-infrastructure', fn() => Inertia::render('services/CloudInfrastructure'));
Route::get('/industries', fn() => Inertia::render('Industries'));
Route::get('/case-studies', fn() => Inertia::render('CaseStudies'));
Route::get('/about', fn() => Inertia::render('About'));
Route::get('/blog', fn() => Inertia::render('Blog'));
Route::get('/contact', fn() => Inertia::render('Contact'));
Route::get('/privacy-policy', fn() => Inertia::render('Privacy'));
Route::get('/terms', fn() => Inertia::render('Terms'));
// Throttled so the public form can't be used to flood the submissions table.
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1');

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/
Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'store']);
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

/*
|--------------------------------------------------------------------------
| Admin panel
|--------------------------------------------------------------------------
*/
Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/themes', [ThemeController::class, 'index'])->name('themes.index');
    Route::put('/themes/{theme}', [ThemeController::class, 'update'])->name('themes.update');
    Route::post('/themes/{theme}/activate', [ThemeController::class, 'activate'])->name('themes.activate');

    Route::get('/submissions', [SubmissionController::class, 'index'])->name('submissions.index');
    Route::post('/submissions/{submission}/toggle-read', [SubmissionController::class, 'toggleRead'])->name('submissions.toggleRead');
    Route::delete('/submissions/{submission}', [SubmissionController::class, 'destroy'])->name('submissions.destroy');
});
