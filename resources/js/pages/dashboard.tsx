import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ShieldCheck,
    Award,
    FileCheck,
    Users,
    Layers,
    BookOpen,
    AlertTriangle,
    CheckCircle2,
    Clock,
    UploadCloud,
    Calendar,
    ArrowUpRight,
    TrendingUp,
    FileText,
    ExternalLink,
    ChevronRight,
    Sparkles,
    Settings,
    Plus,
    X,
    Filter,
    Download,
    Eye,
    MessageSquare,
    Check,
    ArrowRight
} from 'lucide-react';
import { dashboard } from '@/routes';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    role_label?: string;
    role_badge?: string;
    nidn_nip?: string;
    unit_kerja?: string;
    phone?: string;
    is_active: boolean;
}

export default function Dashboard() {
    const { auth } = usePage().props as {
        auth: {
            user: AuthUser;
            role?: string;
            roleLabel?: string;
            isAdminLpm?: boolean;
            isAuditor?: boolean;
            isAuditee?: boolean;
            isPimpinan?: boolean;
        };
    };

    const user = auth.user;
    const currentRole = user?.role || 'admin_lpm';

    // State for interactive Phases (Fase 1 - 5)
    const [selectedFase, setSelectedFase] = useState<number>(3); // Default to current active phase (Fase 3: Evaluasi & AMI)
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Interactive form state for adding audit findings in Fase 3
    const [showFindingModal, setShowFindingModal] = useState<boolean>(false);
    const [findingAuditee, setFindingAuditee] = useState<string>('Prodi S1 Pendidikan Agama Hindu');
    const [findingType, setFindingType] = useState<'KTS Minor' | 'KTS Mayor' | 'OFI'>('KTS Minor');
    const [findingText, setFindingText] = useState<string>('');
    const [findingsList, setFindingsList] = useState([
        { id: 1, auditee: 'Prodi S1 Pendidikan Agama Hindu', type: 'KTS Minor', desc: 'Kelengkapan rubrik penilaian otentik pada 3 mata kuliah keahlian belum terlampir pada silabus.', status: 'Dalam Perbaikan' },
        { id: 2, auditee: 'Prodi S1 Ilmu Komunikasi Hindu', type: 'OFI', desc: 'Peluang pelibatan mahasiswa dalam riset terapan dosen dan publikasi bersama pada jurnal SINTA 3.', status: 'Rekomendasi' },
        { id: 3, auditee: 'Lembaga Penelitian & PkM (LPPM)', type: 'KTS Minor', desc: 'Monitoring kemajuan laporan interim hibah internal belum menggunakan formulir baku LPM.', status: 'Selesai PTKP' },
        { id: 4, auditee: 'Perpustakaan & Lab Multimedia', type: 'OFI', desc: 'Perluasan repositori digital tugas akhir agar dapat diakses penuh oleh mahasiswa luar kampus.', status: 'Rekomendasi' },
    ]);

    // Checklist state for Fase 1 & Fase 2
    const [fase1Checklist, setFase1Checklist] = useState({
        skSenat: true,
        bukuStandar: true,
        manualPpepp: true,
        timAuditor: true,
        sosialisasi: true,
    });

    const [fase2LedStatus, setFase2LedStatus] = useState([
        { unit: 'Prodi S1 Pendidikan Agama Hindu', ledScore: 95, buktiCount: 42, status: 'Lengkap & Terverifikasi' },
        { unit: 'Prodi S1 Ilmu Komunikasi Hindu', ledScore: 92, buktiCount: 38, status: 'Lengkap & Terverifikasi' },
        { unit: 'Program Magister (S2) Pascasarjana', ledScore: 90, buktiCount: 31, status: 'Lengkap & Terverifikasi' },
        { unit: 'Lembaga Penelitian & PkM (LPPM)', ledScore: 88, buktiCount: 29, status: 'Menunggu 2 Berkas' },
        { unit: 'Bagian Administrasi Akademik (BAAK)', ledScore: 85, buktiCount: 25, status: 'Dalam Review' },
        { unit: 'Perpustakaan & Sumber Belajar', ledScore: 94, buktiCount: 22, status: 'Lengkap & Terverifikasi' },
    ]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleAddFinding = (e: React.FormEvent) => {
        e.preventDefault();
        if (!findingText.trim()) return;

        setFindingsList([
            ...findingsList,
            {
                id: Date.now(),
                auditee: findingAuditee,
                type: findingType,
                desc: findingText,
                status: 'Baru Dicatat',
            },
        ]);
        setFindingText('');
        setShowFindingModal(false);
        showToast(`Temuan ${findingType} berhasil ditambahkan untuk ${findingAuditee}!`);
    };

    const fases = [
        {
            no: 1,
            nama: 'Penetapan Standar',
            subtitle: 'Kesiapan & SK Dokumen Mutu',
            progress: 100,
            status: 'Selesai (100%)',
            badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            timeline: 'Agustus - September',
            icon: BookOpen,
        },
        {
            no: 2,
            nama: 'Pelaksanaan & LED',
            subtitle: 'Pengisian Evaluasi Diri & Bukti',
            progress: 95,
            status: 'Selesai Verifikasi (95%)',
            badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
            timeline: 'September - Oktober',
            icon: UploadCloud,
        },
        {
            no: 3,
            nama: 'Evaluasi & Visitasi AMI',
            subtitle: 'Audit Lapangan & Temuan KTS',
            progress: 85,
            status: 'Fase Berjalan Aktif (85%)',
            badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
            timeline: 'Oktober - November',
            icon: FileCheck,
        },
        {
            no: 4,
            nama: 'Pengendalian & PTKP',
            subtitle: 'Tindakan Koreksi & Sidang RTM',
            progress: 78,
            status: 'Tahap Tindak Lanjut (78%)',
            badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
            timeline: 'November - Desember',
            icon: ShieldCheck,
        },
        {
            no: 5,
            nama: 'Peningkatan Mutu',
            subtitle: 'Kaizen Standar & Akreditasi',
            progress: 70,
            status: 'Persiapan Eksternal (70%)',
            badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
            timeline: 'Januari - Februari',
            icon: Sparkles,
        },
    ];

    return (
        <>
            <Head title={`Dashboard Internal LPM - ${user?.name || 'Sistem Penjaminan Mutu'}`} />

            {/* TOAST NOTIFICATION */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-white shadow-2xl ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 max-w-7xl mx-auto w-full">

                {/* USER PROFILE & ROLE BANNER */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start sm:items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-amber-500 text-white font-extrabold text-xl shadow-md shadow-indigo-600/20">
                                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'PM'}
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-lg sm:text-xl font-bold text-slate-900">{user?.name}</h1>
                                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                                        currentRole === 'admin_lpm'
                                            ? 'bg-indigo-100 text-indigo-800'
                                            : currentRole === 'auditor'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : currentRole === 'auditee'
                                            ? 'bg-amber-100 text-amber-800'
                                            : currentRole === 'pimpinan'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-slate-100 text-slate-800'
                                    }`}>
                                        {user?.role_label || currentRole.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    {user?.email} • {user?.unit_kerja || 'Lembaga Penjaminan Mutu STAH DNJ'}
                                    {user?.nidn_nip && ` • NIDN/NIP: ${user.nidn_nip}`}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                                Lihat Portal Publik
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* FITUR UTAMA: SIKLUS SPMI BERBASIS 5 FASE */}
                {/* ============================================================== */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div>
                            <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                                Alur Kerja Penjaminan Mutu Internal
                            </span>
                            <h2 className="mt-2 text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Layers className="h-5 w-5 text-indigo-600" />
                                Manajemen Siklus Mutu & Audit (5 Fase SPMI)
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Pelaksanaan siklus PPEPP secara bertahap dan terukur dari penetapan dokumen hingga perbaikan mutu berkelanjutan
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span>Siklus Aktif: <strong>Fase 3 (Audit Lapangan & Evaluasi)</strong></span>
                        </div>
                    </div>

                    {/* FASE STEPPER SELECTOR */}
                    <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                        {fases.map((fase) => {
                            const IconComponent = fase.icon;
                            const isSelected = selectedFase === fase.no;
                            return (
                                <button
                                    key={fase.no}
                                    type="button"
                                    onClick={() => setSelectedFase(fase.no)}
                                    className={`flex flex-col text-left rounded-xl border p-4 transition-all ${
                                        isSelected
                                            ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-600/20'
                                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                                        }`}>
                                            F{fase.no}
                                        </div>
                                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold border ${fase.badgeBg}`}>
                                            {fase.progress}%
                                        </span>
                                    </div>
                                    <h3 className={`mt-3 text-xs font-bold line-clamp-1 ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                                        {fase.nama}
                                    </h3>
                                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{fase.subtitle}</p>
                                    <span className="text-[10px] text-slate-400 font-medium mt-2 block">{fase.timeline}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* FASE DETAIL CONTENT PANEL */}
                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/40 p-5 sm:p-6">

                        {/* ------------------------------------------------------------- */}
                        {/* FASE 1: PENETAPAN STANDAR SPMI */}
                        {/* ------------------------------------------------------------- */}
                        {selectedFase === 1 && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Fase 1: Penetapan Standar</span>
                                        <h3 className="text-base font-bold text-slate-900 mt-0.5">Penetapan & Kesiapan 50 Standar Mutu SPMI</h3>
                                        <p className="text-xs text-slate-500">Perumusan standar akademik, manual PPEPP, dan penugasan tim auditor SPMI</p>
                                    </div>
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 self-start sm:self-auto">
                                        Status: Selesai 100%
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Checklist Kesiapan */}
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            Checklist Dokumen Penetapan:
                                        </h4>
                                        <div className="space-y-2.5 text-xs text-slate-700">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={fase1Checklist.skSenat} readOnly className="rounded text-indigo-600 h-4 w-4" />
                                                <span>SK Senat & Ketua tentang Kebijakan SPMI (2024-2028)</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={fase1Checklist.bukuStandar} readOnly className="rounded text-indigo-600 h-4 w-4" />
                                                <span>Buku 50 Standar Mutu (24 Pendidikan, 12 Riset, 8 PkM, 6 Tata Kelola)</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={fase1Checklist.manualPpepp} readOnly className="rounded text-indigo-600 h-4 w-4" />
                                                <span>Buku Manual Mutu PPEPP (SOP Operasional 5 Siklus)</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={fase1Checklist.timAuditor} readOnly className="rounded text-indigo-600 h-4 w-4" />
                                                <span>SK Penugasan 14 Auditor Mutu Internal Bersertifikat</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={fase1Checklist.sosialisasi} readOnly className="rounded text-indigo-600 h-4 w-4" />
                                                <span>Sosialisasi Instrumen AMI ke seluruh UPPS dan Unit Penunjang</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Tindakan Cepat Fase 1 */}
                                    <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Aksi Dokumen Fase 1:</h4>
                                            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                                Dokumen penetapan mutu menjadi acuan tolok ukur pengujian pada saat visitasi AMI. Dokumen dapat diunduh dalam format resmi.
                                            </p>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => showToast('Mengunduh SK & Buku 50 Standar SPMI...')}
                                                    className="w-full inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                                >
                                                    <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-indigo-600" /> Buku Standar SPMI (50 Standar)</span>
                                                    <Download className="h-3.5 w-3.5 text-slate-400" />
                                                </button>
                                                <button
                                                    onClick={() => showToast('Mengunduh Manual Mutu PPEPP...')}
                                                    className="w-full inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                                >
                                                    <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-emerald-600" /> Manual Siklus Mutu PPEPP</span>
                                                    <Download className="h-3.5 w-3.5 text-slate-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ------------------------------------------------------------- */}
                        {/* FASE 2: PELAKSANAAN & EVALUASI DIRI (LED) */}
                        {/* ------------------------------------------------------------- */}
                        {selectedFase === 2 && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Fase 2: Pelaksanaan & LED</span>
                                        <h3 className="text-base font-bold text-slate-900 mt-0.5">Pengisian Lembar Evaluasi Diri (LED) & Unggah Bukti Sahih</h3>
                                        <p className="text-xs text-slate-500">Seluruh auditee mengunggah RPS OBE, SK Dosen, BKD, dan dokumen Tridharma</p>
                                    </div>
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 self-start sm:self-auto">
                                        Progres: 95% Selesai
                                    </span>
                                </div>

                                {/* Auditee LED Submission Table */}
                                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                            <tr>
                                                <th className="p-3">Program Studi / Unit Kerja</th>
                                                <th className="p-3 text-center">Skor Evaluasi Diri</th>
                                                <th className="p-3 text-center">Jumlah Bukti Sahih</th>
                                                <th className="p-3">Status Verifikasi Desk</th>
                                                <th className="p-3 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {fase2LedStatus.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 transition">
                                                    <td className="p-3 font-semibold text-slate-900">{item.unit}</td>
                                                    <td className="p-3 text-center font-bold text-indigo-700">{item.ledScore}%</td>
                                                    <td className="p-3 text-center text-slate-600">{item.buktiCount} Berkas</td>
                                                    <td className="p-3">
                                                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                                            item.status.includes('Lengkap')
                                                                ? 'bg-emerald-100 text-emerald-800'
                                                                : 'bg-amber-100 text-amber-800'
                                                        }`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <button
                                                            onClick={() => showToast(`Membuka berkas LED: ${item.unit}`)}
                                                            className="text-xs font-bold text-indigo-600 hover:underline"
                                                        >
                                                            Lihat Berkas &rarr;
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* ------------------------------------------------------------- */}
                        {/* FASE 3: EVALUASI & VISITASI AUDIT MUTU INTERNAL (ACTIVE) */}
                        {/* ------------------------------------------------------------- */}
                        {selectedFase === 3 && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Fase 3: Evaluasi & Visitasi Lapangan (Aktif)</span>
                                        <h3 className="text-base font-bold text-slate-900 mt-0.5">Audit Lapangan & Pencatatan Temuan KTS / OFI</h3>
                                        <p className="text-xs text-slate-500">Auditor melakukan konfirmasi fisik dan mencatat ketidaksesuaian standar</p>
                                    </div>
                                    <button
                                        onClick={() => setShowFindingModal(true)}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 self-start sm:self-auto"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Input Temuan Audit Baru
                                    </button>
                                </div>

                                {/* Temuan Counters */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="rounded-xl border border-red-200 bg-red-50/60 p-3.5 text-center">
                                        <span className="text-xs font-medium text-red-600">KTS Mayor (Fatal)</span>
                                        <p className="text-2xl font-black text-red-700 mt-1">0</p>
                                        <span className="text-[10px] text-red-500">Nihil / Memenuhi</span>
                                    </div>
                                    <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-center">
                                        <span className="text-xs font-medium text-amber-700">KTS Minor</span>
                                        <p className="text-2xl font-black text-amber-800 mt-1">{findingsList.filter(f => f.type === 'KTS Minor').length}</p>
                                        <span className="text-[10px] text-amber-600">Perlu Koreksi PTKP</span>
                                    </div>
                                    <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3.5 text-center">
                                        <span className="text-xs font-medium text-blue-700">OFI (Peluang Peningkatan)</span>
                                        <p className="text-2xl font-black text-blue-800 mt-1">{findingsList.filter(f => f.type === 'OFI').length}</p>
                                        <span className="text-[10px] text-blue-600">Rekomendasi Kaizen</span>
                                    </div>
                                </div>

                                {/* Daftar Temuan Audit Interaktif */}
                                <div className="rounded-xl border border-slate-200 bg-white p-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                                        Daftar Temuan Audit Berjalan (LHA Real-time):
                                    </h4>
                                    <div className="space-y-2.5">
                                        {findingsList.map((item) => (
                                            <div key={item.id} className="rounded-lg border border-slate-200 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                                            item.type === 'KTS Mayor'
                                                                ? 'bg-red-100 text-red-800'
                                                                : item.type === 'KTS Minor'
                                                                ? 'bg-amber-100 text-amber-800'
                                                                : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {item.type}
                                                        </span>
                                                        <span className="font-bold text-slate-900 text-xs">{item.auditee}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                                                </div>
                                                <div className="shrink-0 flex items-center gap-2">
                                                    <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
                                                        {item.status}
                                                    </span>
                                                    <button
                                                        onClick={() => showToast(`Membuka form PTKP untuk: ${item.auditee}`)}
                                                        className="rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                                                    >
                                                        Proses PTKP
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ------------------------------------------------------------- */}
                        {/* FASE 4: PENGENDALIAN & TINDAKAN KOREKSI PTKP / RTM */}
                        {/* ------------------------------------------------------------- */}
                        {selectedFase === 4 && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Fase 4: Pengendalian & RTM</span>
                                        <h3 className="text-base font-bold text-slate-900 mt-0.5">Permintaan Tindakan Koreksi (PTKP) & Rapat Tinjauan Manajemen</h3>
                                        <p className="text-xs text-slate-500">Pimpinan dan auditee menyepakati alokasi sumber daya dan komitmen perbaikan</p>
                                    </div>
                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 self-start sm:self-auto">
                                        Progres: 78% Selesai
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-purple-600" />
                                            Agenda Rapat Tinjauan Manajemen (RTM):
                                        </h4>
                                        <ul className="space-y-2 text-xs text-slate-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>Penyampaian ringkasan eksekutif temuan AMI oleh Ketua LPM.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>Klarifikasi dan paparan komitmen rencana perbaikan oleh para Kaprodi.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>Persetujuan alokasi dana perbaikan sarana lab dan insentif publikasi riset.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>Penandatanganan Berita Acara RTM oleh Ketua STAH dan Senat Akademik.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Dokumen Pengendalian Mutu:</h4>
                                            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                                Risalah RTM menjadi bukti primer bagi asesor BAN-PT / LAM bahwa siklus SPMI berjalan secara tertib dan dipimpin langsung oleh manajemen puncak.
                                            </p>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => showToast('Mengunduh Berita Acara & Risalah RTM...')}
                                                    className="w-full inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                                >
                                                    <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-purple-600" /> Risalah & Rekomendasi RTM 2025</span>
                                                    <Download className="h-3.5 w-3.5 text-slate-400" />
                                                </button>
                                                <button
                                                    onClick={() => showToast('Membuka Rekapitulasi Status PTKP Semua Unit...')}
                                                    className="w-full inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                                >
                                                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Rekap Lembar Tindak Lanjut PTKP</span>
                                                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ------------------------------------------------------------- */}
                        {/* FASE 5: PENINGKATAN STANDAR & AKREDITASI (KAIZEN) */}
                        {/* ------------------------------------------------------------- */}
                        {selectedFase === 5 && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Fase 5: Peningkatan Mutu (Kaizen)</span>
                                        <h3 className="text-base font-bold text-slate-900 mt-0.5">Peningkatan Tolok Ukur Standar & Kesiapan Akreditasi</h3>
                                        <p className="text-xs text-slate-500">Menaikkan standar mutu melampaui SN-Dikti untuk persiapan akreditasi Unggul</p>
                                    </div>
                                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 self-start sm:self-auto">
                                        Progres: 70% Berjalan
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Standar Kurikulum</span>
                                        <h4 className="font-bold text-slate-900 text-sm mt-1">Integrasi Penuh OBE</h4>
                                        <p className="text-xs text-slate-500 mt-1">Penaikan bobot evaluasi portofolio CPL mahasiswa hingga 100% pada semua mata kuliah.</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Standar Riset Dosen</span>
                                        <h4 className="font-bold text-slate-900 text-sm mt-1">Publikasi SINTA & Scopus</h4>
                                        <p className="text-xs text-slate-500 mt-1">Target kenaikan 2 artikel ilmiah bereputasi per dosen tetap per tahun akademik.</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Target Akreditasi</span>
                                        <h4 className="font-bold text-slate-900 text-sm mt-1">Menuju Peringkat Unggul</h4>
                                        <p className="text-xs text-slate-500 mt-1">Penyusunan instrumen borang 9 Kriteria BAN-PT & LAMDIK untuk reakreditasi 2026.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* MODAL INPUT TEMUAN AUDIT (FASE 3) */}
                {showFindingModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in">
                        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                                <div>
                                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                                        Fase 3: Audit Mutu Internal (AMI)
                                    </span>
                                    <h3 className="font-bold text-slate-900 text-base mt-1">Form Input Temuan Audit Baru</h3>
                                </div>
                                <button
                                    onClick={() => setShowFindingModal(false)}
                                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddFinding} className="mt-4 space-y-4 text-xs">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Unit Pengelola / Auditee:</label>
                                    <select
                                        value={findingAuditee}
                                        onChange={(e) => setFindingAuditee(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800"
                                    >
                                        <option>Prodi S1 Pendidikan Agama Hindu</option>
                                        <option>Prodi S1 Ilmu Komunikasi Hindu</option>
                                        <option>Program Magister (S2) Pascasarjana</option>
                                        <option>Lembaga Penelitian & PkM (LPPM)</option>
                                        <option>Bagian Administrasi Akademik (BAAK)</option>
                                        <option>Perpustakaan & Sumber Belajar</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Kategori Temuan Audit:</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['KTS Minor', 'KTS Mayor', 'OFI'] as const).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFindingType(type)}
                                                className={`rounded-lg border py-2 text-xs font-bold transition ${
                                                    findingType === type
                                                        ? type === 'KTS Mayor'
                                                            ? 'border-red-600 bg-red-100 text-red-900'
                                                            : type === 'KTS Minor'
                                                            ? 'border-amber-600 bg-amber-100 text-amber-900'
                                                            : 'border-blue-600 bg-blue-100 text-blue-900'
                                                        : 'border-slate-200 bg-slate-50 text-slate-600'
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Deskripsi & Rincian Ketidaksesuaian Standar:</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={findingText}
                                        onChange={(e) => setFindingText(e.target.value)}
                                        placeholder="Tuliskan temuan spesifik (contoh: Ketersediaan RPS belum mencakup indikator penilaian pada minggu ke-5 s.d. 8)..."
                                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowFindingModal(false)}
                                        className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                                    >
                                        Simpan Temuan Audit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard SPMI',
            href: dashboard(),
        },
    ],
};
