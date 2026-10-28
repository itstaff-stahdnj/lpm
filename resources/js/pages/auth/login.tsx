import { FormEventHandler } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { request } from '@/routes/password';
import PasskeyVerify from '@/components/passkey-verify';
import { ShieldCheck, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const demoAccounts = [
        {
            role: 'Admin LPM',
            email: 'admin@lpm.stahdnj.ac.id',
            name: 'Dr. I Made Sujana, M.Pd.',
            desc: 'Pengelola SPMI & Siklus PPEPP',
            badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        },
        {
            role: 'Auditor Internal',
            email: 'auditor@lpm.stahdnj.ac.id',
            name: 'I Ketut Wardana, M.Si.',
            desc: 'Auditor AMI Visitasi & LHA',
            badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
            role: 'Auditee (Kaprodi)',
            email: 'kaprodi@lpm.stahdnj.ac.id',
            name: 'Ni Luh Putu Astuti, M.Pd.',
            desc: 'Pengisi Evaluasi Diri & PTKP',
            badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
        },
        {
            role: 'Pimpinan Kampus',
            email: 'pimpinan@lpm.stahdnj.ac.id',
            name: 'Prof. Dr. I Wayan Paramartha',
            desc: 'Ketua STAH DNJ & Pimpinan RTM',
            badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
        },
    ];

    const handleSelectDemo = (email: string) => {
        setData((prev) => ({
            ...prev,
            email,
            password: 'password',
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
            onSuccess: () => {
                // Pastikan langsung navigasi ke dashboard tanpa tertahan di login
                window.location.href = '/dashboard';
            },
        });
    };

    return (
        <div className="w-full">
            <Head title="Masuk ke Portal Penjaminan Mutu (LPM)" />

            <PasskeyVerify />

            {/* BRAND HEADER */}
            <div className="mb-6 flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-amber-500 text-white shadow-lg shadow-indigo-600/20 mb-3">
                    <ShieldCheck className="h-7 w-7" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    Masuk ke Dashboard LPM
                </h1>
                <p className="mt-1 text-xs text-slate-500 max-w-sm">
                    Sistem Informasi Penjaminan Mutu Internal (SI-SPMI)
                    <br />
                    <span className="font-medium text-slate-700">STAH Dharma Nusantara Jakarta</span>
                </p>
            </div>

            {/* STATUS MESSAGE */}
            {status && (
                <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-800">
                    {status}
                </div>
            )}

            {/* DEMO ACCOUNTS 1-CLICK SELECTOR */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <KeyRound className="h-3.5 w-3.5 text-indigo-600" />
                        Pilih Cepat Akun Uji Coba:
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Password: password</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {demoAccounts.map((acc) => (
                        <button
                            key={acc.email}
                            type="button"
                            onClick={() => handleSelectDemo(acc.email)}
                            className={`flex flex-col text-left rounded-xl border p-2.5 transition-all text-xs ${
                                data.email === acc.email
                                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500'
                                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold border ${acc.badgeBg}`}>
                                    {acc.role}
                                </span>
                                {data.email === acc.email && (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                                )}
                            </div>
                            <span className="mt-1.5 font-bold text-slate-900 text-[11px] truncate">{acc.name}</span>
                            <span className="text-[10px] text-slate-500 truncate">{acc.email}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid gap-4">
                    <div className="grid gap-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                            Email atau NIDN / NIP Kampus
                        </Label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="admin@lpm.stahdnj.ac.id atau 2105037801"
                            className="text-xs"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-1.5">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                                Password
                            </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={request()}
                                    className="ml-auto text-xs text-indigo-600 hover:underline"
                                    tabIndex={5}
                                >
                                    Lupa password?
                                </TextLink>
                            )}
                        </div>
                        <PasswordInput
                            id="password"
                            name="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="text-xs"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', !!checked)}
                        />
                        <Label htmlFor="remember" className="text-xs font-normal text-slate-600 cursor-pointer">
                            Ingat saya di perangkat ini
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-md shadow-indigo-700/20"
                        tabIndex={4}
                        disabled={processing}
                        data-test="login-button"
                    >
                        {processing ? (
                            <>
                                <Spinner />
                                <span>Memverifikasi Akses...</span>
                            </>
                        ) : (
                            <span>Masuk ke Dashboard SPMI</span>
                        )}
                    </Button>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <Link href="/" className="inline-flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium">
                        <ArrowLeft className="h-3 w-3" /> Kembali ke Portal Publik
                    </Link>
                    <span>Helpdesk: <a href="mailto:lpm@stahdnj.ac.id" className="text-indigo-600 hover:underline">lpm@stahdnj.ac.id</a></span>
                </div>
            </form>
        </div>
    );
}

Login.layout = {
    title: 'Portal Penjaminan Mutu',
    description: 'Silakan masuk menggunakan akun LPM, Dosen, atau Unit Kerja Anda',
};
