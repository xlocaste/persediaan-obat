import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Selamat Datang di Aplikasi Stok Obat" />
            <div className="relative min-h-screen text-white font-sans overflow-hidden">

                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/bg.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 flex flex-col min-h-screen backdrop-blur-sm">
                    <main className="flex flex-col justify-center h-screen container mx-auto px-6 text-center items-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                            Selamat Datang di Sistem Persediaan Obat
                        </h2>
                        <p className="mb-8 text-[#f0fdfa] text-lg max-w-2xl mx-auto">
                            Aplikasi ini membantu mencatat, memantau, dan mengelola persediaan obat
                            dengan mudah, cepat, dan efisien.
                        </p>

                        <div className="space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block px-6 py-3 bg-[#00b9ae] hover:bg-[#2dd4bf] text-white font-semibold rounded shadow-md transition"
                                >
                                    Masuk ke Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block px-6 py-3 bg-[#00b9ae] hover:bg-[#2dd4bf] text-white font-semibold rounded shadow-md transition"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block px-6 py-3 border border-white text-white hover:bg-white/10 font-semibold rounded transition"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
