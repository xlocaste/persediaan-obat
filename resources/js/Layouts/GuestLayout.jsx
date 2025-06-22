import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { FaMapMarkerAlt } from "react-icons/fa";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full">
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/bg-login.jpg')" }}
            >
                <div className='flex items-center justify-center w-full h-full flex-col'>
                    <img src="/images/logo.png" alt="" width={180} className='absolute top-16'/>
                    <p className='text-white font-bold text-4xl'>SIPERO</p>
                    <p className='text-white font-light text-sm'>Sistem Persediaan Obat</p>
                    <p className='absolute text-white bottom-14'>Dinas Kesehatan dan Keluarga Berencana Kota Singkawang</p>
                    <p className='absolute text-white bottom-4 flex items-center text-center'><FaMapMarkerAlt /> Jl. Alianyang, Pasiran, Kec. Singkawang Barat, Kota Singkawang – Kalimantan Barat 79123</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-gray-100 px-6 py-8">
                <div className="mb-6">
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md rounded-lg max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
