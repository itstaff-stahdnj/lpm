import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    CheckCircle2,
    FileText,
    BarChart3,
    Users,
    Search,
    Download,
    TrendingUp,
    ShieldCheck,
    Layers,
    Calendar,
    AlertTriangle,
    Building2,
    GraduationCap,
    Star,
    Clock,
    ArrowUpRight,
    ChevronRight,
    Filter,
    Sparkles,
    FileCheck,
    Eye,
    HelpCircle,
    Phone,
    Mail,
    MapPin,
    ExternalLink,
    ChevronDown,
    X,
    Check,
    MessageSquare,
    Info,
    ArrowRight
} from 'lucide-react';

interface Stats {
    totalStandar: number;
    standarTercapai: number;
    standarPersentase: number;
    ikmScore: number;
    ikmMax: number;
    ikmPercentage: number;
    ikmRating: string;
    totalAuditor: number;
    siklusAmi: string;
    amiProgress: number;
    totalDokumen: number;
    totalProdi: number;
    statusAipt: string;
}

interface PpeppStage {
    code: string;
    name: string;
    title: string;
    progress: number;
    status: string;
    count: number;
    unit: string;
    color: string;
    description: string;
    highlights: string[];
}

interface Akreditasi {
    id: number;
    tingkat: string;
    nama: string;
    lembaga: string;
    peringkat: string;
    skNumber: string;
    tahunSk: number;
    tanggalKadaluarsa: string;
    sisaHari: number;
    status: string;
    color: string;
}

interface AmiAudit {
    id: string;
    auditee: string;
    kategori: string;
    status: string;
    statusCode: string;
    auditor: string[];
    jadwal: string;
    temuan: {
        ktsMayor: number;
        ktsMinor: number;
        ofi: number;
    };
    catatan: string;
}

interface DokumenMutu {
    id: string;
    kode: string;
    judul: string;
    kategori: string;
    versi: string;
    tahun: number;
    ukuran: string;
    format: string;
    downloads: number;
    deskripsi: string;
}

interface DimensiSurvei {
    name: string;
    score: number;
    target: number;
    pct: number;
    desc: string;
}

interface StakeholderSurvei {
    group: string;
    responden: number;
    score: number;
    status: string;
}

interface SurveiData {
    ikmOverall: number;
    totalResponden: number;
    persentasePuas: number;
    dimensi: DimensiSurvei[];
    stakeholders: StakeholderSurvei[];
}

interface Auditor {
    nama: string;
    nidn: string;
    sertifikat: string;
    jabatan: string;
    bidang: string;
}

interface Pengumuman {
    id: number;
    judul: string;
    tanggal: string;
    kategori: string;
    penting: boolean;
    ringkasan: string;
}

interface Props {
    stats: Stats;
    ppeppStages: PpeppStage[];
    akreditasiList: Akreditasi[];
    amiAuditList: AmiAudit[];
    dokumenMutuList: DokumenMutu[];
    surveiData: SurveiData;
    auditorList: Auditor[];
    pengumumanList: Pengumuman[];
}

export default function Welcome({
    stats,
    ppeppStages,
    akreditasiList,
    amiAuditList,
    dokumenMutuList,
    surveiData,
    auditorList,
    pengumumanList
}: Props) {
    const [activeTab, setActiveTab] = useState<'overview' | 'ppepp' | 'ami' | 'akreditasi' | 'survei' | 'dokumen' | 'profil'>('overview');
    const [selectedDocCategory, setSelectedDocCategory] = useState<string>('Semua');
    const [docSearchQuery, setDocSearchQuery] = useState<string>('');
    const [amiFilterStatus, setAmiFilterStatus] = useState<string>('Semua');
    const [selectedAuditDetail, setSelectedAuditDetail] = useState<AmiAudit | null>(null);
    const [selectedDocPreview, setSelectedDocPreview] = useState<DokumenMutu | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [feedbackForm, setFeedbackForm] = useState({ nama: '', peran: 'Mahasiswa', pesan: '', rating: '5' });
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Filter dokumen mutu
    const filteredDocs = useMemo(() => {
        return dokumenMutuList.filter((doc) => {
            const matchesCat = selectedDocCategory === 'Semua' || doc.kategori.toLowerCase().includes(selectedDocCategory.toLowerCase());
            const matchesSearch = doc.judul.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                doc.kode.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                doc.deskripsi.toLowerCase().includes(docSearchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [dokumenMutuList, selectedDocCategory, docSearchQuery]);

    // Filter AMI audits
    const filteredAmi = useMemo(() => {
        return amiAuditList.filter((item) => {
            if (amiFilterStatus === 'Semua') return true;
            if (amiFilterStatus === 'Selesai') return item.statusCode === 'verified';
            if (amiFilterStatus === 'Proses') return item.statusCode !== 'verified';
            return true;
        });
    }, [amiAuditList, amiFilterStatus]);

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackSubmitted(true);
        showToast('Terima kasih! Masukan mutu Anda telah berhasil dikirim ke LPM.');
        setTimeout(() => {
            setFeedbackForm({ nama: '', peran: 'Mahasiswa', pesan: '', rating: '5' });
            setFeedbackSubmitted(false);
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-500 selection:text-white">
            <Head>
                <title>LPM STAH Dharma Nusantara Jakarta - Portal Penjaminan Mutu & Akreditasi</title>
                <meta name="description" content="Sistem Informasi Penjaminan Mutu Internal (SI-SPMI) Lembaga Penjaminan Mutu (LPM) Sekolah Tinggi Agama Hindu Dharma Nusantara Jakarta." />
            </Head>

            {/* TOAST NOTIFICATION */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-white shadow-2xl ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* TOP BAR / RUNNING INFO */}
            <div className="border-b border-indigo-900/30 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 px-4 py-2 text-xs text-indigo-200">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="font-semibold text-white">Sistem Penjaminan Mutu Internal (SPMI):</span>
                        <span className="hidden sm:inline">Siklus IX Tahun Akademik 2025/2026 Aktif</span>
                    </div>
                    <div className="flex items-center gap-4 text-indigo-300">
                        <span className="hidden md:inline">Akreditasi Institusi: <strong className="text-amber-300">Baik Sekali (BAN-PT)</strong></span>
                        <a href="mailto:lpm@stahdnj.ac.id" className="hover:text-white flex items-center gap-1">
                            <Mail className="h-3 w-3" /> lpm@stahdnj.ac.id
                        </a>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-amber-500 text-white shadow-md shadow-indigo-600/20">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold tracking-tight text-slate-900 sm:text-lg">LPM STAH-DNJ</span>
                                <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">SPMI v4</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">Lembaga Penjaminan Mutu • STAH Dharma Nusantara Jakarta</p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="hidden xl:flex items-center gap-1">
                        {[
                            { id: 'overview', label: 'Ringkasan', icon: BarChart3 },
                            { id: 'ppepp', label: 'Siklus PPEPP', icon: Layers },
                            { id: 'ami', label: 'Audit Mutu (AMI)', icon: FileCheck },
                            { id: 'akreditasi', label: 'Akreditasi', icon: Award },
                            { id: 'survei', label: 'Survei Kepuasan', icon: TrendingUp },
                            { id: 'dokumen', label: 'Pusat Dokumen', icon: BookOpen },
                            { id: 'profil', label: 'Profil LPM', icon: Building2 },
                        ].map((tab) => {
                            const IconComponent = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                        isActive
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    <IconComponent className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={() => setActiveTab('dokumen')}
                            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
                        >
                            <Download className="h-3.5 w-3.5 text-slate-500" />
                            Unduh Dokumen
                        </button>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-700/20 hover:bg-indigo-800 transition"
                        >
                            <Users className="h-3.5 w-3.5" />
                            Portal Auditor / Admin
                        </Link>
                    </div>
                </div>

                {/* Mobile Tab Scrollbar */}
                <div className="flex xl:hidden overflow-x-auto border-t border-slate-200 px-4 py-2 gap-1.5 bg-slate-50/50">
                    {[
                        { id: 'overview', label: 'Ringkasan' },
                        { id: 'ppepp', label: 'Siklus PPEPP' },
                        { id: 'ami', label: 'Audit Mutu (AMI)' },
                        { id: 'akreditasi', label: 'Akreditasi' },
                        { id: 'survei', label: 'Survei & IKM' },
                        { id: 'dokumen', label: 'Dokumen Mutu' },
                        { id: 'profil', label: 'Profil LPM' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                                activeTab === tab.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-slate-600 border border-slate-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 py-16 text-white">
                {/* Decorative background glows */}
                <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
                <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-900/40 px-3.5 py-1.5 text-xs font-semibold text-indigo-200 backdrop-blur-md mb-4">
                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                            Sistem Penjaminan Mutu Berkelanjutan (Continuous Quality Improvement)
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                            Menjamin & Meningkatkan Mutu Pendidikan Tinggi Secara Berkelanjutan
                        </h1>
                        <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-2xl">
                            Portal terintegrasi Lembaga Penjaminan Mutu (LPM) Sekolah Tinggi Agama Hindu Dharma Nusantara Jakarta untuk mengawal siklus PPEPP, Audit Mutu Internal (AMI), serta pemenuhan standar akreditasi BAN-PT & LAM.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => setActiveTab('ppepp')}
                                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition"
                            >
                                <Layers className="h-4 w-4" />
                                Eksplorasi Siklus PPEPP
                            </button>
                            <button
                                onClick={() => setActiveTab('ami')}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/15 transition"
                            >
                                <FileCheck className="h-4 w-4 text-emerald-300" />
                                Hasil Audit Mutu Internal (AMI)
                            </button>
                            <button
                                onClick={() => setActiveTab('dokumen')}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold text-indigo-200 hover:text-white transition"
                            >
                                <BookOpen className="h-4 w-4" />
                                50 Standar SPMI
                            </button>
                        </div>
                    </div>

                    {/* QUICK KPI HIGHLIGHT CARDS */}
                    <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {/* KPI 1: IKM */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">Kepuasan Sivitas</span>
                                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                                    {stats.ikmRating}
                                </span>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-white">{stats.ikmScore}</span>
                                <span className="text-xs text-slate-400">/ {stats.ikmMax.toFixed(2)}</span>
                            </div>
                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${stats.ikmPercentage}%` }}></div>
                            </div>
                            <p className="mt-2 text-[11px] text-slate-300">Indeks Kepuasan Mahasiswa (93.5% Puas)</p>
                        </div>

                        {/* KPI 2: Ketercapaian Standar */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">Capaian Standar</span>
                                <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-[11px] font-bold text-blue-300">
                                    {stats.standarPersentase}% Terpenuhi
                                </span>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-white">{stats.standarTercapai}</span>
                                <span className="text-xs text-slate-400">/ {stats.totalStandar} Standar</span>
                            </div>
                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-blue-400" style={{ width: `${stats.standarPersentase}%` }}></div>
                            </div>
                            <p className="mt-2 text-[11px] text-slate-300">Standar Tridharma & Non-Akademik</p>
                        </div>

                        {/* KPI 3: Status AIPT */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">Akreditasi Institusi</span>
                                <Award className="h-4 w-4 text-amber-400" />
                            </div>
                            <div className="mt-3">
                                <span className="text-2xl font-extrabold text-amber-300">{stats.statusAipt}</span>
                            </div>
                            <p className="mt-3 text-[11px] text-slate-300">SK BAN-PT Berlaku hingga Maret 2028</p>
                            <div className="mt-2 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> 100% Program Studi Terakreditasi
                            </div>
                        </div>

                        {/* KPI 4: Siklus AMI */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">AMI Periode IX</span>
                                <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                                    Tahap Evaluasi
                                </span>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-white">{stats.totalAuditor}</span>
                                <span className="text-xs text-slate-400">Auditor Internal</span>
                            </div>
                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-amber-400" style={{ width: `${stats.amiProgress}%` }}></div>
                            </div>
                            <p className="mt-2 text-[11px] text-slate-300">Progres AMI: 85% UPPS/Unit Kerja Terverifikasi</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">

                {/* ============================================================== */}
                {/* TAB 1: OVERVIEW / DASHBOARD EKSEKUTIF */}
                {/* ============================================================== */}
                {activeTab === 'overview' && (
                    <div className="space-y-12">
                        {/* PPEPP Visual Tracker Bar */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <Layers className="h-5 w-5 text-indigo-600" />
                                        Siklus SPMI Perguruan Tinggi (PPEPP)
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Penetapan, Pelaksanaan, Evaluasi, Pengendalian, dan Peningkatan Mutu Berkelanjutan</p>
                                </div>
                                <button
                                    onClick={() => setActiveTab('ppepp')}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                                >
                                    Lihat Rincian PPEPP <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {ppeppStages.map((stage) => (
                                    <div
                                        key={stage.code}
                                        onClick={() => setActiveTab('ppepp')}
                                        className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-indigo-400 hover:bg-white hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                                                {stage.code}
                                            </span>
                                            <span className="text-[11px] font-bold text-emerald-600">
                                                {stage.progress}%
                                            </span>
                                        </div>
                                        <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-indigo-600">{stage.name}</h3>
                                        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{stage.description}</p>
                                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                                            <div className="h-full rounded-full bg-indigo-600" style={{ width: `${stage.progress}%` }}></div>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                                            <span>{stage.count} {stage.unit}</span>
                                            <span className="text-indigo-600 font-semibold">{stage.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dual Column Section: Status AMI & Akreditasi */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            {/* Left Column (8 cols): AMI & Survei */}
                            <div className="space-y-8 lg:col-span-8">
                                {/* Ringkasan AMI Terkini */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                        <div>
                                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                                <FileCheck className="h-5 w-5 text-emerald-600" />
                                                Audit Mutu Internal (AMI) Periode IX
                                            </h3>
                                            <p className="text-xs text-slate-500">Hasil verifikasi kepatuhan standar mutu pada unit kerja dan program studi</p>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab('ami')}
                                            className="text-xs font-semibold text-indigo-600 hover:underline"
                                        >
                                            Kelola Audit &rarr;
                                        </button>
                                    </div>

                                    {/* Temuan Summary Counters */}
                                    <div className="mt-6 grid grid-cols-3 gap-3">
                                        <div className="rounded-xl border border-red-100 bg-red-50/50 p-3.5 text-center">
                                            <span className="text-xs font-medium text-red-600">KTS Mayor</span>
                                            <p className="text-2xl font-extrabold text-red-700 mt-1">0</p>
                                            <span className="text-[10px] text-red-500">Nihil / Memenuhi</span>
                                        </div>
                                        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3.5 text-center">
                                            <span className="text-xs font-medium text-amber-700">KTS Minor</span>
                                            <p className="text-2xl font-extrabold text-amber-800 mt-1">10</p>
                                            <span className="text-[10px] text-amber-600">100% Ditindaklanjuti</span>
                                        </div>
                                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-center">
                                            <span className="text-xs font-medium text-blue-700">OFI (Peluang Mutu)</span>
                                            <p className="text-2xl font-extrabold text-blue-800 mt-1">15</p>
                                            <span className="text-[10px] text-blue-600">Rekomendasi Maju</span>
                                        </div>
                                    </div>

                                    {/* Auditee List Table Preview */}
                                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                                                <tr>
                                                    <th className="p-3">Auditee</th>
                                                    <th className="p-3">Auditor</th>
                                                    <th className="p-3 text-center">Temuan (Minor/OFI)</th>
                                                    <th className="p-3">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {amiAuditList.slice(0, 4).map((item) => (
                                                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                                                        <td className="p-3 font-semibold text-slate-800">{item.auditee}</td>
                                                        <td className="p-3 text-slate-600">{item.auditor[0]}</td>
                                                        <td className="p-3 text-center">
                                                            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-800 font-bold mr-1">
                                                                {item.temuan.ktsMinor}
                                                            </span>
                                                            <span className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-800 font-bold">
                                                                {item.temuan.ofi}
                                                            </span>
                                                        </td>
                                                        <td className="p-3">
                                                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                                item.statusCode === 'verified'
                                                                    ? 'bg-emerald-100 text-emerald-800'
                                                                    : 'bg-amber-100 text-amber-800'
                                                            }`}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Dimensi IKM Progress Breakdown */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                        <div>
                                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                                Hasil Survei Kepuasan Sivitas Akademika (IKM)
                                            </h3>
                                            <p className="text-xs text-slate-500">Berdasarkan survei 1.240 responden (Mahasiswa, Dosen, Tendik, Alumni & Pengguna)</p>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab('survei')}
                                            className="text-xs font-semibold text-indigo-600 hover:underline"
                                        >
                                            Detail Survei &rarr;
                                        </button>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        {surveiData.dimensi.map((d) => (
                                            <div key={d.name}>
                                                <div className="flex items-center justify-between text-xs font-semibold">
                                                    <span className="text-slate-800">{d.name}</span>
                                                    <span className="text-slate-600 font-bold">{d.score.toFixed(2)} / 4.00 ({d.pct}%)</span>
                                                </div>
                                                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" style={{ width: `${d.pct}%` }}></div>
                                                </div>
                                                <p className="mt-0.5 text-[10px] text-slate-400">{d.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (4 cols): Akreditasi & Agenda Mutu */}
                            <div className="space-y-8 lg:col-span-4">
                                {/* Akreditasi Card Widget */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                                            <Award className="h-4 w-4 text-amber-500" />
                                            Status Akreditasi
                                        </h3>
                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                            100% Terakreditasi
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        {akreditasiList.map((akr) => (
                                            <div key={akr.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 hover:bg-slate-100/70 transition">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{akr.tingkat}</span>
                                                    <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-extrabold text-indigo-700">
                                                        {akr.peringkat}
                                                    </span>
                                                </div>
                                                <h4 className="mt-1 text-xs font-bold text-slate-800">{akr.nama}</h4>
                                                <p className="text-[10px] text-slate-500 mt-0.5">SK: {akr.skNumber}</p>
                                                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/60 pt-2">
                                                    <span>Berlaku s.d: {akr.tanggalKadaluarsa}</span>
                                                    <span className="font-semibold text-emerald-600">{akr.sisaHari} hari lagi</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pengumuman & Agenda Mutu */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b border-slate-100 pb-3">
                                        <Calendar className="h-4 w-4 text-indigo-600" />
                                        Agenda & Pengumuman Mutu
                                    </h3>

                                    <div className="mt-4 space-y-3.5">
                                        {pengumumanList.map((p) => (
                                            <div key={p.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                                                <div className="flex items-center gap-2">
                                                    {p.penting && (
                                                        <span className="rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-700">Penting</span>
                                                    )}
                                                    <span className="text-[10px] font-semibold text-slate-400">{p.tanggal}</span>
                                                </div>
                                                <h4 className="mt-1 text-xs font-bold text-slate-800 hover:text-indigo-600 transition leading-snug">
                                                    {p.judul}
                                                </h4>
                                                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{p.ringkasan}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Kontak & Layanan LPM */}
                                <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-slate-50 p-5 shadow-xs">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                                        <HelpCircle className="h-4 w-4 text-indigo-600" />
                                        Layanan Penjaminan Mutu
                                    </h4>
                                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                                        Perlu konsultasi borang akreditasi, penyusunan SOP, atau klarifikasi hasil audit mutu? Hubungi sekretariat LPM STAH-DNJ.
                                    </p>
                                    <div className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                            <span>Gedung Rektorat Lt. 2, Kampus STAH DNJ</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                            <span>lpm@stahdnj.ac.id</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 2: SIKLUS SPMI (PPEPP DEEP DIVE) */}
                {/* ============================================================== */}
                {activeTab === 'ppepp' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="max-w-3xl">
                                <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                                    Pedoman SPMI Standar Nasional Dikti
                                </span>
                                <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                                    Siklus Penjaminan Mutu Internal (PPEPP)
                                </h2>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                    Sistem Penjaminan Mutu Internal (SPMI) di STAH Dharma Nusantara Jakarta dijalankan secara berkelanjutan melalui siklus <strong>PPEPP</strong> (Penetapan, Pelaksanaan, Evaluasi, Pengendalian, dan Peningkatan) untuk memastikan seluruh proses Tridharma Perguruan Tinggi memenuhi dan melampaui Standar Nasional Pendidikan Tinggi (SN-Dikti).
                                </p>
                            </div>

                            {/* 5 Stages Detail Cards */}
                            <div className="mt-8 space-y-6">
                                {ppeppStages.map((stage, idx) => (
                                    <div key={stage.code} className="rounded-xl border border-slate-200 p-6 transition hover:shadow-md bg-white">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-lg font-extrabold text-white shadow-md">
                                                    {stage.code}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-lg font-bold text-slate-900">{stage.title}</h3>
                                                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                                                            {stage.status}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{stage.description}</p>
                                                </div>
                                            </div>
                                            <div className="md:text-right shrink-0">
                                                <span className="text-2xl font-black text-slate-900">{stage.progress}%</span>
                                                <div className="text-[11px] font-medium text-slate-500">{stage.count} {stage.unit}</div>
                                            </div>
                                        </div>

                                        {/* Highlights list */}
                                        <div className="mt-4 border-t border-slate-100 pt-4 flex flex-wrap gap-2">
                                            {stage.highlights.map((h, i) => (
                                                <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Breakdown 50 Standar Mutu */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-indigo-600" />
                                Pemetaan 50 Standar Mutu SPMI STAH DNJ
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Dikelompokkan berdasarkan area standar akademik dan non-akademik</p>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-indigo-900 text-sm">Standar Pendidikan</h4>
                                        <span className="rounded bg-indigo-200 px-2 py-0.5 text-xs font-extrabold text-indigo-800">24 Standar</span>
                                    </div>
                                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                                        <li>• Standar Kompetensi Lulusan</li>
                                        <li>• Standar Isi Pembelajaran & RPS</li>
                                        <li>• Standar Proses & Integrasi OBE</li>
                                        <li>• Standar Penilaian Pembelajaran</li>
                                        <li>• Standar Dosen & Tenaga Kependidikan</li>
                                        <li>• Standar Sarana Prasarana Belajar</li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-emerald-900 text-sm">Standar Penelitian</h4>
                                        <span className="rounded bg-emerald-200 px-2 py-0.5 text-xs font-extrabold text-emerald-800">12 Standar</span>
                                    </div>
                                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                                        <li>• Standar Hasil & Publikasi SINTA</li>
                                        <li>• Standar Isi & Roadmap Riset</li>
                                        <li>• Standar Proses & Etika Penelitian</li>
                                        <li>• Standar Peneliti & HKI Dosen</li>
                                        <li>• Standar Pendanaan & Hibah Riset</li>
                                        <li>• Standar Pengelolaan LPPM</li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-amber-900 text-sm">Standar Pengabdian (PkM)</h4>
                                        <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-extrabold text-amber-800">8 Standar</span>
                                    </div>
                                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                                        <li>• Standar Hasil Pengabdian Umat</li>
                                        <li>• Standar Kemitraan Desa & Pasraman</li>
                                        <li>• Standar Keterlibatan Mahasiswa</li>
                                        <li>• Standar Pendanaan PkM</li>
                                        <li>• Standar Pengelolaan & Evaluasi</li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-purple-900 text-sm">Standar Tata Kelola</h4>
                                        <span className="rounded bg-purple-200 px-2 py-0.5 text-xs font-extrabold text-purple-800">6 Standar</span>
                                    </div>
                                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                                        <li>• Standar VMTS & Kepemimpinan</li>
                                        <li>• Standar Kerjasama Institusi</li>
                                        <li>• Standar Sistem Informasi & Data</li>
                                        <li>• Standar Keuangan & Akuntabilitas</li>
                                        <li>• Standar Penjaminan Mutu & SPMI</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 3: AUDIT MUTU INTERNAL (AMI) */}
                {/* ============================================================== */}
                {activeTab === 'ami' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* AMI Header & Controls */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                                <div>
                                    <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                                        Audit Mutu Internal (AMI) Periode IX
                                    </span>
                                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                                        Pelaksanaan & Laporan Audit Mutu Internal (AMI)
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Audit kepatuhan standar mutu Tridharma pada seluruh Unit Pengelola Program Studi (UPPS) dan Unit Penunjang
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setAmiFilterStatus('Semua')}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${amiFilterStatus === 'Semua' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                                    >
                                        Semua Auditee ({amiAuditList.length})
                                    </button>
                                    <button
                                        onClick={() => setAmiFilterStatus('Selesai')}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${amiFilterStatus === 'Selesai' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                                    >
                                        Selesai PTKP
                                    </button>
                                    <button
                                        onClick={() => setAmiFilterStatus('Proses')}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${amiFilterStatus === 'Proses' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                                    >
                                        Dalam Proses
                                    </button>
                                </div>
                            </div>

                            {/* Audit Cards Grid */}
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredAmi.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-400">{item.id}</span>
                                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                    item.statusCode === 'verified'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : item.statusCode === 'rtm'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <h3 className="mt-2 text-sm font-bold text-slate-900">{item.auditee}</h3>
                                            <span className="text-[11px] text-slate-500 font-medium">{item.kategori}</span>

                                            {/* Auditors */}
                                            <div className="mt-4 rounded-lg bg-slate-50 p-2.5 text-xs">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Tim Auditor:</span>
                                                <p className="font-semibold text-slate-700 mt-0.5">{item.auditor.join(', ')}</p>
                                                <span className="text-[10px] text-slate-400 mt-1 block">Jadwal: {item.jadwal}</span>
                                            </div>

                                            {/* Temuan badges */}
                                            <div className="mt-3 flex items-center gap-2 text-xs">
                                                <div className="flex-1 rounded-md bg-red-50 p-2 text-center">
                                                    <span className="text-[10px] text-red-600 font-medium">Mayor</span>
                                                    <p className="font-extrabold text-red-700">{item.temuan.ktsMayor}</p>
                                                </div>
                                                <div className="flex-1 rounded-md bg-amber-50 p-2 text-center">
                                                    <span className="text-[10px] text-amber-700 font-medium">Minor</span>
                                                    <p className="font-extrabold text-amber-800">{item.temuan.ktsMinor}</p>
                                                </div>
                                                <div className="flex-1 rounded-md bg-blue-50 p-2 text-center">
                                                    <span className="text-[10px] text-blue-700 font-medium">OFI</span>
                                                    <p className="font-extrabold text-blue-800">{item.temuan.ofi}</p>
                                                </div>
                                            </div>

                                            <p className="mt-3 text-[11px] text-slate-500 italic bg-slate-50/50 p-2 rounded border border-slate-100">
                                                "{item.catatan}"
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setSelectedAuditDetail(item)}
                                            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/50 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            Lihat Laporan Temuan & PTKP
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Auditor Internal Certified List */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Users className="h-4 w-4 text-indigo-600" />
                                Korps Auditor Mutu Internal (AMI) Bersertifikat
                            </h3>
                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {auditorList.map((auditor, idx) => (
                                    <div key={idx} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                                            {auditor.nama.substring(0, 2)}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-bold text-slate-900 truncate">{auditor.nama}</h4>
                                            <p className="text-[11px] text-slate-500">NIDN: {auditor.nidn} • {auditor.jabatan}</p>
                                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                                {auditor.sertifikat}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 4: AKREDITASI BAN-PT & LAM */}
                {/* ============================================================== */}
                {activeTab === 'akreditasi' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="max-w-3xl">
                                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                                    Sistem Penjaminan Mutu Eksternal (SPME)
                                </span>
                                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                                    Status Akreditasi Institusi & Program Studi
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Data resmi akreditasi Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) dan Lembaga Akreditasi Mandiri (LAM) untuk STAH Dharma Nusantara Jakarta.
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                {akreditasiList.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50/50 p-6 shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                                                    {item.tingkat}
                                                </span>
                                                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.nama}</h3>
                                                <p className="text-xs text-slate-500 font-medium">Lembaga Akreditasi: {item.lembaga}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-flex rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 text-sm font-black text-white shadow-xs">
                                                    {item.peringkat}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-2 text-xs">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500 font-medium">Nomor SK:</span>
                                                <span className="font-mono font-bold text-slate-800">{item.skNumber}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500 font-medium">Masa Berlaku:</span>
                                                <span className="font-semibold text-slate-800">s.d. {item.tanggalKadaluarsa}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-slate-200/60 pt-2">
                                                <span className="text-slate-500 font-medium">Sisa Masa Aktif:</span>
                                                <span className="font-bold text-emerald-600">{item.sisaHari} Hari</span>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                {item.status}
                                            </span>
                                            <button
                                                onClick={() => showToast(`Mengunduh Sertifikat SK Akreditasi: ${item.nama}`)}
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
                                            >
                                                <Download className="h-3 w-3 text-slate-500" />
                                                Unduh Sertifikat SK
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 5: SURVEI KEPUASAN & IKM */}
                {/* ============================================================== */}
                {activeTab === 'survei' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Overall IKM Score Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                                <div>
                                    <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                                        Hasil Pengukuran Indeks Kepuasan Masyarakat (IKM) 2025
                                    </span>
                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                                        Survei Kepuasan Sivitas Akademika & Pemangku Kepentingan
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Pengukuran berkala kepuasan mahasiswa, dosen, tendik, alumni (tracer study), dan instansi pengguna lulusan
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-600 p-5 text-white text-center shrink-0 shadow-lg shadow-indigo-600/20">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">Indeks Mutu Rata-Rata</span>
                                    <div className="text-4xl font-black mt-1">3.74 <span className="text-lg font-normal text-indigo-200">/ 4.00</span></div>
                                    <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold mt-2 inline-block">
                                        Kategori: Sangat Baik (93.5%)
                                    </span>
                                </div>
                            </div>

                            {/* 5 Dimensi Servqual Detail */}
                            <div className="mt-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                                    Capaian per Dimensi Mutu Pelayanan (Servqual 5 Dimensi)
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {surveiData.dimensi.map((dim, i) => (
                                        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-slate-800 text-sm">{dim.name}</h4>
                                                <span className="font-black text-indigo-700 text-sm">{dim.score.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{dim.desc}</p>
                                            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                                <div className="h-full rounded-full bg-indigo-600" style={{ width: `${dim.pct}%` }}></div>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                                                <span>Target: {dim.target.toFixed(2)}</span>
                                                <span className="text-emerald-600 font-bold">Tercapai ({dim.pct}%)</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stakeholder Group Table */}
                            <div className="mt-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                                    Tingkat Kepuasan Menurut Kelompok Responden
                                </h3>
                                <div className="overflow-hidden rounded-xl border border-slate-200">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                            <tr>
                                                <th className="p-3.5">Kelompok Pemangku Kepentingan</th>
                                                <th className="p-3.5 text-center">Jumlah Responden</th>
                                                <th className="p-3.5 text-center">Skor Kepuasan</th>
                                                <th className="p-3.5">Kategori Mutu</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {surveiData.stakeholders.map((s, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/70 transition">
                                                    <td className="p-3.5 font-bold text-slate-900">{s.group}</td>
                                                    <td className="p-3.5 text-center font-mono font-medium text-slate-600">{s.responden} orang</td>
                                                    <td className="p-3.5 text-center font-black text-indigo-700">{s.score.toFixed(2)} / 4.00</td>
                                                    <td className="p-3.5">
                                                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                                                            {s.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Feedback Form Widget */}
                        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/50 via-white to-amber-50/30 p-6 shadow-sm">
                            <div className="max-w-2xl">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                                    Kotak Aspirasi & Masukan Mutu Kampus
                                </h3>
                                <p className="text-xs text-slate-600 mt-1">
                                    LPM membuka ruang partisipasi bagi seluruh civitas akademika untuk memberikan saran konstruktif demi kemajuan Tridharma STAH DNJ.
                                </p>

                                <form onSubmit={handleFeedbackSubmit} className="mt-5 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap (Opsional)</label>
                                            <input
                                                type="text"
                                                value={feedbackForm.nama}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, nama: e.target.value })}
                                                placeholder="Nama Anda atau Anonim"
                                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">Peran / Status</label>
                                            <select
                                                value={feedbackForm.peran}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, peran: e.target.value })}
                                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                                            >
                                                <option>Mahasiswa</option>
                                                <option>Dosen</option>
                                                <option>Tenaga Kependidikan</option>
                                                <option>Alumni</option>
                                                <option>Masyarakat Umum</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Masukan, Kritik atau Usulan Perbaikan Mutu</label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={feedbackForm.pesan}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, pesan: e.target.value })}
                                            placeholder="Tuliskan masukan spesifik terkait perkuliahan, sarana prasarana, atau layanan kampus..."
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={feedbackSubmitted}
                                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-700/20 hover:bg-indigo-800 transition disabled:opacity-50"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        {feedbackSubmitted ? 'Mengirim...' : 'Kirim Masukan ke LPM'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 6: PUSAT DOKUMEN MUTU (REPOSITORY) */}
                {/* ============================================================== */}
                {activeTab === 'dokumen' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                                <div>
                                    <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                                        Repository Dokumen Mutu
                                    </span>
                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                                        Pusat Unduhan Dokumen SPMI & Akreditasi
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Kebijakan, manual mutu, standar pendidikan tinggi, formulir SOP, dan laporan hasil audit
                                    </p>
                                </div>
                                <div className="text-xs text-slate-500">
                                    Total <strong>{dokumenMutuList.length}</strong> Dokumen Resmi Terverifikasi
                                </div>
                            </div>

                            {/* Search & Filter Bar */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari nama dokumen, kode standar, atau kata kunci..."
                                        value={docSearchQuery}
                                        onChange={(e) => setDocSearchQuery(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                                    />
                                </div>

                                <div className="flex overflow-x-auto gap-1.5 pb-2 sm:pb-0">
                                    {['Semua', 'Kebijakan', 'Manual', 'Standar', 'SOP', 'AMI', 'Laporan'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedDocCategory(cat)}
                                            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                                selectedDocCategory === cat
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Document Cards List */}
                            <div className="mt-6 space-y-3">
                                {filteredDocs.length === 0 ? (
                                    <div className="py-12 text-center text-slate-400 text-xs">
                                        Tidak ada dokumen yang sesuai dengan pencarian "{docSearchQuery}".
                                    </div>
                                ) : (
                                    filteredDocs.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-indigo-400 hover:bg-indigo-50/10 hover:shadow-sm bg-white"
                                        >
                                            <div className="flex items-start gap-3.5">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 font-bold text-xs border border-red-200">
                                                    PDF
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                                                            {doc.kode}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-medium">
                                                            {doc.kategori} • {doc.versi} ({doc.tahun})
                                                        </span>
                                                    </div>
                                                    <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition">
                                                        {doc.judul}
                                                    </h3>
                                                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{doc.deskripsi}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 md:self-center shrink-0">
                                                <span className="text-[11px] text-slate-400 mr-2">{doc.ukuran} • {doc.downloads} unduhan</span>
                                                <button
                                                    onClick={() => setSelectedDocPreview(doc)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                                >
                                                    <Eye className="h-3.5 w-3.5 text-slate-400" />
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => showToast(`Mengunduh file: ${doc.judul}`)}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
                                                >
                                                    <Download className="h-3.5 w-3.5" />
                                                    Unduh
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 7: PROFIL & STRUKTUR LPM */}
                {/* ============================================================== */}
                {activeTab === 'profil' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Visi Misi Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                                Profil Institusi
                            </span>
                            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                                Lembaga Penjaminan Mutu (LPM) STAH DNJ
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Berdiri sebagai unit penjaminan mutu otonom untuk memastikan penyelenggaraan Tri Dharma Perguruan Tinggi yang akuntabel, unggul, dan berkarakter Dharma.
                            </p>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-5">
                                    <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                                        <Award className="h-4 w-4 text-indigo-600" />
                                        Visi Penjaminan Mutu
                                    </h3>
                                    <p className="mt-3 text-xs text-slate-700 leading-relaxed font-medium">
                                        "Menjadi Lembaga Penjaminan Mutu yang kredibel, independen, dan berorientasi pada pencapaian standar mutu pendidikan tinggi Hindu unggul berdaya saing nasional dan global pada tahun 2030."
                                    </p>
                                </div>

                                <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-5">
                                    <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-amber-600" />
                                        Misi Penjaminan Mutu
                                    </h3>
                                    <ul className="mt-3 space-y-2 text-xs text-slate-700 leading-relaxed">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                            <span>Mengembangkan dan mengoordinasikan implementasi SPMI di seluruh unit kerja kampus secara konsisten.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                            <span>Melaksanakan Audit Mutu Internal (AMI) secara berkala, objektif, dan transparan.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                            <span>Memfasilitasi dan mengawal proses akreditasi institusi dan program studi menuju peringkat Unggul.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Struktur Organisasi Bagan */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                Struktur Organisasi Lembaga Penjaminan Mutu
                            </h3>

                            <div className="mt-8 flex flex-col items-center">
                                {/* Ketua LPM */}
                                <div className="w-full max-w-sm rounded-xl border-2 border-indigo-600 bg-indigo-50 p-4 text-center shadow-sm">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Ketua LPM</span>
                                    <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">Dr. I Made Sujana, M.Pd.</h4>
                                    <p className="text-[11px] text-slate-600">NIDN: 2105037801 • Auditor Utama SPMI</p>
                                </div>

                                <div className="h-6 w-0.5 bg-indigo-300"></div>

                                {/* Sekretaris LPM */}
                                <div className="w-full max-w-xs rounded-xl border border-slate-300 bg-white p-3.5 text-center shadow-xs">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sekretaris LPM</span>
                                    <h4 className="font-bold text-slate-900 text-xs mt-0.5">Ni Wayan Sari, M.Ag.</h4>
                                    <p className="text-[10px] text-slate-500">Manajemen Administrasi & Dokumen Mutu</p>
                                </div>

                                <div className="h-6 w-0.5 bg-indigo-300"></div>

                                {/* Divisi Sub-Unit */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                                        <span className="text-[10px] font-bold text-indigo-700 uppercase">Divisi SPMI & Standar</span>
                                        <h5 className="font-bold text-slate-800 text-xs mt-1">Dr. I Gusti Ngurah Oka, M.Fil.H.</h5>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Penyusunan & Pemutakhiran 50 Standar</p>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                                        <span className="text-[10px] font-bold text-emerald-700 uppercase">Divisi Audit Mutu (AMI)</span>
                                        <h5 className="font-bold text-slate-800 text-xs mt-1">I Ketut Wardana, M.Si.</h5>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Koordinasi Auditor & Pelaksanaan AMI</p>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                                        <span className="text-[10px] font-bold text-amber-700 uppercase">Divisi Akreditasi & Data</span>
                                        <h5 className="font-bold text-slate-800 text-xs mt-1">Putu Gede Arianta, M.Kom.</h5>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Borang Akreditasi, IKM & PDDIKTI</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* DETAIL MODAL FOR AUDIT MUTU INTERNAL */}
            {selectedAuditDetail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                            <div>
                                <span className="text-[10px] font-bold text-slate-400">{selectedAuditDetail.id}</span>
                                <h3 className="font-bold text-slate-900 text-base">{selectedAuditDetail.auditee}</h3>
                                <p className="text-xs text-slate-500">{selectedAuditDetail.kategori}</p>
                            </div>
                            <button
                                onClick={() => setSelectedAuditDetail(null)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3.5 text-xs">
                            <div className="rounded-xl bg-slate-50 p-3 space-y-1.5">
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Auditor:</span>
                                    <span className="font-bold text-slate-800">{selectedAuditDetail.auditor.join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Jadwal Visitasi:</span>
                                    <span className="font-semibold text-slate-700">{selectedAuditDetail.jadwal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Status Siklus:</span>
                                    <span className="font-bold text-emerald-700">{selectedAuditDetail.status}</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-700 mb-2">Rekapitulasi Temuan Audit:</h4>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="rounded-lg bg-red-50 p-2">
                                        <span className="text-[10px] text-red-600 font-bold">KTS Mayor</span>
                                        <p className="text-lg font-black text-red-700">{selectedAuditDetail.temuan.ktsMayor}</p>
                                    </div>
                                    <div className="rounded-lg bg-amber-50 p-2">
                                        <span className="text-[10px] text-amber-700 font-bold">KTS Minor</span>
                                        <p className="text-lg font-black text-amber-800">{selectedAuditDetail.temuan.ktsMinor}</p>
                                    </div>
                                    <div className="rounded-lg bg-blue-50 p-2">
                                        <span className="text-[10px] text-blue-700 font-bold">OFI</span>
                                        <p className="text-lg font-black text-blue-800">{selectedAuditDetail.temuan.ofi}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-700 mb-1">Catatan & Rekomendasi Auditor:</h4>
                                <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600 leading-relaxed">
                                    {selectedAuditDetail.catatan}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
                            <button
                                onClick={() => setSelectedAuditDetail(null)}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={() => {
                                    showToast(`Mengunduh Berita Acara & LHA: ${selectedAuditDetail.auditee}`);
                                    setSelectedAuditDetail(null);
                                }}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                            >
                                <Download className="h-3.5 w-3.5" />
                                Unduh Laporan LHA
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DETAIL MODAL FOR DOKUMEN MUTU */}
            {selectedDocPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                            <div>
                                <span className="font-mono text-[10px] font-bold text-indigo-600">{selectedDocPreview.kode}</span>
                                <h3 className="font-bold text-slate-900 text-base mt-0.5">{selectedDocPreview.judul}</h3>
                                <p className="text-xs text-slate-500">{selectedDocPreview.kategori}</p>
                            </div>
                            <button
                                onClick={() => setSelectedDocPreview(null)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3 text-xs">
                            <div className="rounded-xl bg-slate-50 p-3.5 space-y-1.5">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Versi Revisi:</span>
                                    <span className="font-bold text-slate-800">{selectedDocPreview.versi}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Tahun Berlaku:</span>
                                    <span className="font-bold text-slate-800">{selectedDocPreview.tahun}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Ukuran File:</span>
                                    <span className="font-bold text-slate-800">{selectedDocPreview.ukuran} ({selectedDocPreview.format})</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Total Diunduh:</span>
                                    <span className="font-bold text-indigo-700">{selectedDocPreview.downloads} kali</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-700 mb-1">Deskripsi Ruang Lingkup:</h4>
                                <p className="rounded-lg border border-slate-200 bg-white p-3 text-slate-600 leading-relaxed">
                                    {selectedDocPreview.deskripsi}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
                            <button
                                onClick={() => setSelectedDocPreview(null)}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={() => {
                                    showToast(`Mengunduh dokumen: ${selectedDocPreview.judul}`);
                                    setSelectedDocPreview(null);
                                }}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                            >
                                <Download className="h-3.5 w-3.5" />
                                Unduh File PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <footer className="border-t border-slate-200 bg-white py-12 text-slate-600 text-xs">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-slate-900 text-sm">LPM STAH Dharma Nusantara Jakarta</span>
                            </div>
                            <p className="mt-3 text-slate-500 max-w-md leading-relaxed">
                                Lembaga Penjaminan Mutu (LPM) Sekolah Tinggi Agama Hindu Dharma Nusantara Jakarta mengawal mutu pelaksanaan Tridharma Perguruan Tinggi, budaya mutu berkelanjutan (PPEPP), dan akreditasi unggul.
                            </p>
                            <p className="mt-3 text-[11px] text-slate-400">
                                Kampus: Jl. Daksinapati Raya No. 10, Rawamangun, Pulo Gadung, Jakarta Timur 13220.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Tautan Penjaminan Mutu</h4>
                            <ul className="mt-3 space-y-2 text-slate-500">
                                <li><button onClick={() => setActiveTab('ppepp')} className="hover:text-indigo-600">Siklus SPMI (PPEPP)</button></li>
                                <li><button onClick={() => setActiveTab('ami')} className="hover:text-indigo-600">Audit Mutu Internal (AMI)</button></li>
                                <li><button onClick={() => setActiveTab('akreditasi')} className="hover:text-indigo-600">Status Akreditasi BAN-PT</button></li>
                                <li><button onClick={() => setActiveTab('survei')} className="hover:text-indigo-600">Indeks Kepuasan Mahasiswa (IKM)</button></li>
                                <li><button onClick={() => setActiveTab('dokumen')} className="hover:text-indigo-600">Buku Standar & SOP</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Tautan Eksternal Dikti</h4>
                            <ul className="mt-3 space-y-2 text-slate-500">
                                <li><a href="https://spmi.kemdikbud.go.id" target="_blank" rel="noreferrer" className="hover:text-indigo-600 flex items-center gap-1">Portal SPMI Kemendikbudristek <ExternalLink className="h-3 w-3" /></a></li>
                                <li><a href="https://banpt.or.id" target="_blank" rel="noreferrer" className="hover:text-indigo-600 flex items-center gap-1">Badan Akreditasi Nasional (BAN-PT) <ExternalLink className="h-3 w-3" /></a></li>
                                <li><a href="https://pddikti.kemdiktisaintek.go.id" target="_blank" rel="noreferrer" className="hover:text-indigo-600 flex items-center gap-1">PDDIKTI Pangkalan Data Dikti <ExternalLink className="h-3 w-3" /></a></li>
                                <li><a href="https://sinta.kemdikbud.go.id" target="_blank" rel="noreferrer" className="hover:text-indigo-600 flex items-center gap-1">SINTA Science & Tech Index <ExternalLink className="h-3 w-3" /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px]">
                        <p>© 2026 LPM STAH Dharma Nusantara Jakarta. All Rights Reserved.</p>
                        <p>Sistem Informasi Penjaminan Mutu Internal (SI-SPMI)</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
