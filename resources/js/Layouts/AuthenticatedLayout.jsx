import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#f0fdfa] text-[#1f2937]">
            {/* Sidebar */}
            <aside className="fixed h-screen w-64 bg-[#00b9ae] text-white shadow-lg">
                <div className="flex items-center justify-center px-4 py-6">
                    <Link href="/">
                        <ApplicationLogo className="h-14 w-auto fill-current text-white" />
                    </Link>
                </div>

                <div className="p-4 space-y-1 flex flex-col">
                    {[
                        ["distributor.index", "Distributor"],
                        ["kontrak.index", "Kontrak"],
                        ["pemesanan.index", "Pemesanan"],
                        ["pengiriman.index", "Pengiriman"],
                        ["penerima.index", "Penerima"],
                        ["bukti-penerimaan.index", "Bukti Penerimaan"],
                        ["pengeluar.index", "Pengeluar"],
                        ["stok-obat.index", "Stok Obat"],
                    ].map(([routeName, label]) => (
                        <Link
                            key={routeName}
                            href={route(routeName)}
                            active={route().current(routeName)}
                            className="p-2 rounded-lg hover:bg-[#f0fdfa] hover:text-[#00b9ae] transition duration-200 font-medium"
                        >
                            {label}
                        </Link>
                    ))}

                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-[#f0fdfa] hover:text-[#00b9ae] transition duration-200 font-medium"
                    >
                        {user.name}
                        <svg
                            className={`w-4 h-4 ml-2 transition-transform ${
                                showDropdown ? "rotate-180" : "rotate-0"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {showDropdown && (
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-left p-2 rounded-lg hover:bg-[#f0fdfa] hover:text-[#00b9ae] transition duration-200"
                        >
                            Log Out
                        </Link>
                    )}
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col">
                {header && (
                    <header className="bg-gradient-to-r from-[#00b9ae] via-[#2dd4bf] to-[#6ee7b7] shadow ml-64">
                        <div className="max-w-7xl mx-auto py-6 px-4 text-white font-semibold tracking-wide">
                            {header}
                        </div>
                    </header>
                )}

                <main
                    className="ml-64 relative h-full overflow-auto"
                    style={{
                        backgroundImage: "url('/images/bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay gelap */}
                    <div className="absolute inset-0 bg-black opacity-50 z-0" />

                    {/* Konten di atas background */}
                    <div className="relative z-10 p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
