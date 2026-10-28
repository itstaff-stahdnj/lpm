<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN_LPM = 'admin_lpm';
    case AUDITOR = 'auditor';
    case AUDITEE = 'auditee';
    case PIMPINAN = 'pimpinan';
    case USER = 'user';

    /**
     * Get the human-readable label for the role.
     */
    public function label(): string
    {
        return match ($this) {
            self::ADMIN_LPM => 'Admin LPM',
            self::AUDITOR => 'Auditor Internal (AMI)',
            self::AUDITEE => 'Auditee (Kaprodi / Unit)',
            self::PIMPINAN => 'Pimpinan Kampus',
            self::USER => 'Sivitas Akademika',
        };
    }

    /**
     * Get badge color styling for UI display.
     */
    public function badgeColor(): string
    {
        return match ($this) {
            self::ADMIN_LPM => 'indigo',
            self::AUDITOR => 'emerald',
            self::AUDITEE => 'amber',
            self::PIMPINAN => 'purple',
            self::USER => 'slate',
        };
    }

    /**
     * Get the description of the role's responsibilities.
     */
    public function description(): string
    {
        return match ($this) {
            self::ADMIN_LPM => 'Pengelola sistem SPMI, siklus PPEPP, instrumen, dan administrasi audit.',
            self::AUDITOR => 'Auditor internal bersertifikat yang melakukan visitasi, telaah bukti, dan penyusunan LHA.',
            self::AUDITEE => 'Pengelola program studi atau unit kerja yang mengisi evaluasi diri dan PTKP.',
            self::PIMPINAN => 'Ketua STAH, Wakil Ketua, dan Senat yang memantau mutu dan memimpin RTM.',
            self::USER => 'Dosen, mahasiswa, atau tenaga kependidikan umum.',
        };
    }
}
