<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@krucialsystems.com'],
            [
                'name' => 'Krucial Admin',
                'password' => 'KrucialAdmin@2026',   // hashed by the User model cast
                'is_admin' => true,
            ]
        );
    }
}
