import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="fixed h-screen w-64 bg-gradient-to-b from-indigo-700 via-indigo-500 to-indigo-400 text-white">
                <div className="flex items-center justify-center px-4 py-4">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto fill-current text-white" />
                    </Link>
                </div>

                <div className="p-4 space-y-2 flex flex-col">
                    <Link
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                    >
                        Kelola Data Obat Masuk
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        className="p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                    >
                        Daftar Obat
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        className="p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                    >
                        Distributor
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        className="p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                    >
                        Kelola Data Obat Keluar
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        className="p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                    >
                        Stok Obat
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        className="p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                    >
                        Rekapitulasi Obat
                    </Link>

                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="text-left p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                    >
                        {user.name}
                    </button>

                    {showDropdown && (
                        <form method="POST" action={route('logout')}>
                            <input type="hidden" name="_token" value={usePage().props.csrf_token} />
                            <button
                                type="submit"
                                className="w-full text-left p-2 rounded-lg hover:bg-white hover:text-indigo-700 focus:bg-white focus:text-indigo-700 transition duration-300 ease-in-out"
                            >
                                Log Out
                            </button>
                        </form>
                    )}
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                {header && (
                    <header className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 shadow ml-64">
                        <div className="max-w-7xl mx-auto py-6 px-4 text-white">
                            {header}
                        </div>
                    </header>
                )}

                <main className="ml-64">{children}</main>
            </div>
        </div>
    );
}
