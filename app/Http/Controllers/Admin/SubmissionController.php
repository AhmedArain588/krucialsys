<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->trim()->toString();

        $submissions = ContactSubmission::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    foreach (['name', 'email', 'company', 'service', 'message'] as $column) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                });
            })
            ->when($request->boolean('unread'), fn ($q) => $q->whereNull('read_at'))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Submissions', [
            'submissions' => $submissions,
            'filters'     => ['search' => $search, 'unread' => $request->boolean('unread')],
            'unreadCount' => ContactSubmission::whereNull('read_at')->count(),
        ]);
    }

    public function toggleRead(ContactSubmission $submission)
    {
        $submission->update([
            'read_at' => $submission->read_at ? null : now(),
        ]);

        return back();
    }

    public function destroy(ContactSubmission $submission)
    {
        $submission->delete();

        return back()->with('success', 'Submission deleted.');
    }
}
