import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gradient-to-b from-indigo-700 via-indigo-500 to-indigo-400 text-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <p className='font-bold text-xl'>Selamat Datang di Aplikasi SIPERO</p>
                            <p>Sistem Persediaan Obat</p>
                            <div className="flex justify-between gap-8 pt-4">
                                <div className="md:w-1/2">
                                    <h2 className="text-xl font-semibold mb-3">Visi</h2>
                                    <p className="leading-relaxed text-justify">
                                    Menjadi platform digital terpercaya dan efisien dalam pengelolaan proposal yang mendukung transparansi, akuntabilitas, dan percepatan proses administrasi dalam lingkungan institusi.
                                    </p>
                                </div>

                                <div className="md:w-1/2">
                                    <h2 className="text-xl font-semibold mb-3">Misi</h2>
                                    <ul className="list-decimal list-inside space-y-3 leading-relaxed text-justify">
                                        <li>Menyediakan sistem yang terintegrasi untuk memudahkan pengajuan, verifikasi, dan pemantauan proposal secara digital.</li>
                                        <li>Meningkatkan efisiensi proses administrasi proposal dengan meminimalkan penggunaan dokumen fisik dan mempercepat alur birokrasi.</li>
                                        <li>Mendukung transparansi dan akuntabilitas dalam setiap tahapan pengelolaan proposal melalui sistem pencatatan dan pelaporan yang akurat.</li>
                                        <li>Memfasilitasi kolaborasi antara pengguna (pemohon, reviewer, dan pengelola) melalui fitur komunikasi dan notifikasi dalam sistem.</li>
                                        <li>Menjamin keamanan dan kerahasiaan data proposal dengan penerapan standar keamanan informasi yang baik.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
