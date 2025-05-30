import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function List({ auth, pemesanan }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data pemesanan ini?')) {
            router.delete(route('pemesanan.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Daftar Pemesanan</h2>}
        >
            <Head title="Daftar Pemesanan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex justify-end">
                                <Link href={route('pemesanan.create')}>
                                    <PrimaryButton>+ Tambah Pemesanan</PrimaryButton>
                                </Link>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">No ID Paket (Kontrak)</th>
                                        <th className="px-4 py-2">Nama Barang</th>
                                        <th className="px-4 py-2">Jumlah</th>
                                        <th className="px-4 py-2">Satuan</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pemesanan.length > 0 ? (
                                        pemesanan.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">{item.kontrak?.no_id_paket || '-'}</td>
                                                <td className="px-4 py-2">{item.nama_barang}</td>
                                                <td className="px-4 py-2">{item.jumlah}</td>
                                                <td className="px-4 py-2">{item.satuan}</td>
                                                <td className="px-4 py-2 space-x-2">
                                                    <Link
                                                        href={route('pemesanan.edit', item.id)}
                                                        className="text-indigo-600 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                                Tidak ada data pemesanan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
