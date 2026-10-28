<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $defaultPassword = Hash::make('password');

        // 1. Admin LPM (Ketua Lembaga Penjaminan Mutu)
        User::updateOrCreate(
            ['email' => 'admin@lpm.stahdnj.ac.id'],
            [
                'name' => 'Dr. I Made Sujana, M.Pd.',
                'password' => $defaultPassword,
                'role' => UserRole::ADMIN_LPM,
                'nidn_nip' => '2105037801',
                'unit_kerja' => 'Lembaga Penjaminan Mutu (LPM)',
                'phone' => '081234567890',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 2. Auditor Internal (AMI)
        User::updateOrCreate(
            ['email' => 'auditor@lpm.stahdnj.ac.id'],
            [
                'name' => 'I Ketut Wardana, M.Si.',
                'password' => $defaultPassword,
                'role' => UserRole::AUDITOR,
                'nidn_nip' => '2124088202',
                'unit_kerja' => 'Korps Auditor Internal AMI',
                'phone' => '081234567891',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 3. Auditee (Kaprodi / Kepala Unit)
        User::updateOrCreate(
            ['email' => 'kaprodi@lpm.stahdnj.ac.id'],
            [
                'name' => 'Ni Luh Putu Astuti, M.Pd.',
                'password' => $defaultPassword,
                'role' => UserRole::AUDITEE,
                'nidn_nip' => '2118098301',
                'unit_kerja' => 'Prodi S1 Pendidikan Agama Hindu',
                'phone' => '081234567892',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 4. Pimpinan Institusi (Ketua STAH)
        User::updateOrCreate(
            ['email' => 'pimpinan@lpm.stahdnj.ac.id'],
            [
                'name' => 'Prof. Dr. I Wayan Paramartha, S.Ag.',
                'password' => $defaultPassword,
                'role' => UserRole::PIMPINAN,
                'nidn_nip' => '197208151998031002',
                'unit_kerja' => 'Ketua STAH Dharma Nusantara Jakarta',
                'phone' => '081234567893',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 5. Dosen / Sivitas Akademika Umum
        User::updateOrCreate(
            ['email' => 'dosen@lpm.stahdnj.ac.id'],
            [
                'name' => 'I Gede Sutrisna, M.Pd.H.',
                'password' => $defaultPassword,
                'role' => UserRole::USER,
                'nidn_nip' => '2115048902',
                'unit_kerja' => 'Dosen Tetap Jurusan Dharma Acarya',
                'phone' => '081234567894',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
