import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { FaFileContract, FaClipboardList, FaTruck, FaUserCheck, FaFileSignature, FaUserMinus, FaPills } from "react-icons/fa";

const menuItems = [
    { route: "distributor.index", label: "Distributor", icon: <HiMiniBuildingOffice2 className="w-5 h-5 mr-2" /> },
    { route: "kontrak.index", label: "Kontrak", icon: <FaFileContract className="w-5 h-5 mr-2" /> },
    { route: "pengiriman.index", label: "Pengiriman", icon: <FaTruck className="w-5 h-5 mr-2" /> },
    { route: "penerima.index", label: "Penerima", icon: <FaUserCheck className="w-5 h-5 mr-2" /> },
    { route: "bukti-penerimaan.index", label: "Bukti Penerimaan", icon: <FaFileSignature className="w-5 h-5 mr-2" /> },
    { route: "pengeluar.index", label: "Pengeluar", icon: <FaUserMinus className="w-5 h-5 mr-2" /> },
    { route: "stok-obat.index", label: "Stok Obat", icon: <FaPills className="w-5 h-5 mr-2" /> },
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#f0fdfa] text-[#1f2937]">
            <aside className="fixed h-screen w-64 bg-[#00b9ae] text-white shadow-lg">
                <div className="flex items-center justify-center px-4 py-6">
                    <Link href="/">
                        <ApplicationLogo className="h-14 w-auto fill-current text-white" />
                    </Link>
                </div>

                <div className="p-4 space-y-1 flex flex-col">
                    {menuItems.map(({ route: routeName, label, icon }) => (
                        <Link
                            key={routeName}
                            href={route(routeName)}
                            active={route().current(routeName)}
                            className="flex items-center p-2 rounded-lg hover:bg-[#f0fdfa] hover:text-[#00b9ae] transition duration-200 font-medium"
                        >
                            {icon}
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
                    <div className="absolute inset-0 bg-black opacity-50 z-0" />

                    <div className="relative z-10 p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
