<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('live_streams', function (Blueprint $table) {
            // We keep the primary key, but since we only expect one row,
            // we will conventionally use 'id' = 1.
            $table->id();

            // Stream status (boolean)
            $table->boolean('is_live')->default(false);

            // Stream metadata
            $table->string('title', 255)->default(''); // ✅ Add default
            $table->string('video_url', 255)->nullable()->default(''); // ✅ Add safe default // URL where the stream is hosted

            // Since this is a config table, we disable built-in timestamps (created_at/updated_at)
            // as per the Model definition.
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_streams');
    }
};
