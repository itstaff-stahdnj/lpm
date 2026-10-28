<?php

namespace App\Models;

use App\Enums\UserRole;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property UserRole $role
 * @property string|null $nidn_nip
 * @property string|null $unit_kerja
 * @property string|null $phone
 * @property bool $is_active
 * @property Carbon|null $last_login_at
 * @property string|null $last_login_ip
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'email',
    'password',
    'role',
    'nidn_nip',
    'unit_kerja',
    'phone',
    'is_active',
    'last_login_at',
    'last_login_ip',
])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail, PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Additional attributes to append to JSON array.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'role_label',
        'role_badge',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'role' => UserRole::class,
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Determine if user has the Admin LPM role.
     */
    public function isAdminLpm(): bool
    {
        return $this->role === UserRole::ADMIN_LPM;
    }

    /**
     * Determine if user is an Internal Quality Auditor (AMI).
     */
    public function isAuditor(): bool
    {
        return $this->role === UserRole::AUDITOR;
    }

    /**
     * Determine if user is an Auditee (Prodi / Unit).
     */
    public function isAuditee(): bool
    {
        return $this->role === UserRole::AUDITEE;
    }

    /**
     * Determine if user is a Campus Executive / Pimpinan.
     */
    public function isPimpinan(): bool
    {
        return $this->role === UserRole::PIMPINAN;
    }

    /**
     * Check if user matches any of the given roles.
     */
    public function hasRole(UserRole|string ...$roles): bool
    {
        foreach ($roles as $role) {
            $roleValue = $role instanceof UserRole ? $role->value : $role;
            if ($this->role->value === $roleValue) {
                return true;
            }
        }

        return false;
    }

    /**
     * Accessor for human-readable role label.
     */
    public function getRoleLabelAttribute(): string
    {
        return $this->role->label();
    }

    /**
     * Accessor for role badge color.
     */
    public function getRoleBadgeAttribute(): string
    {
        return $this->role->badgeColor();
    }
}
