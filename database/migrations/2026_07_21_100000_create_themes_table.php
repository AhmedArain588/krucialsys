<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('name');
            $table->string('bg', 32);
            $table->string('bg_alt', 32);
            $table->string('bg_card', 32);
            $table->string('text', 32);
            $table->string('text_muted', 32);
            $table->string('accent', 32);
            $table->string('accent_text', 32);
            $table->string('logo_filter', 64)->default('none');
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
