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
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->index()->after('email');
            $table->string('nidn_nip')->nullable()->index()->after('role');
            $table->string('unit_kerja')->nullable()->after('nidn_nip');
            $table->string('phone')->nullable()->after('unit_kerja');
            $table->boolean('is_active')->default(true)->after('phone');
            $table->timestamp('last_login_at')->nullable()->after('is_active');
            $table->string('last_login_ip')->nullable()->after('last_login_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'nidn_nip',
                'unit_kerja',
                'phone',
                'is_active',
                'last_login_at',
                'last_login_ip',
            ]);
        });
    }
};
