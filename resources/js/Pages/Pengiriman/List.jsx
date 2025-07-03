import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaEdit, FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

export default function List({ auth, pengiriman, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const isStaff = auth.user?.roles?.[0]?.name === 'staff';

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data pengiriman ini?')) {
            router.delete(route('pengiriman.destroy', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('pengiriman.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Daftar Pengiriman</h2>}
        >
            <Head title="Daftar Pengiriman" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full sm:w-64"
                                        placeholder="Cari ID paket, faktur, satuan..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                                    >
                                        Cari
                                    </button>
                                </form>

                                {isStaff && (
                                    <Link href={route('pengiriman.create')}>
                                        <PrimaryButton>+ Tambah Pengiriman</PrimaryButton>
                                    </Link>
                                )}
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">Pemesanan (No ID Paket)</th>
                                        <th className="px-4 py-2">No Faktur</th>
                                        <th className="px-4 py-2">Tanggal</th>
                                        <th className="px-4 py-2">Jumlah</th>
                                        <th className="px-4 py-2">Satuan</th>
                                        {isStaff && (
                                            <th className="px-4 py-2 text-center">Aksi</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pengiriman.length > 0 ? (
                                        pengiriman.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">
                                                    {item.pemesanan?.kontrak?.no_id_paket || '-'}
                                                </td>
                                                <td className="px-4 py-2">{item.no_faktur}</td>
                                                <td className="px-4 py-2">
                                                    {item.tanggal ? dayjs(item.tanggal).format('D MMMM YYYY') : '-'}
                                                </td>
                                                <td className="px-4 py-2">{item.jumlah}</td>
                                                <td className="px-4 py-2">{item.satuan}</td>
                                                {isStaff && (
                                                    <td className="px-4 py-2 flex justify-center gap-2">
                                                        <Link
                                                            href={route('pengiriman.edit', item.id)}
                                                            className="text-indigo-600 hover:text-indigo-800"
                                                            title="Edit"
                                                        >
                                                            <FaEdit />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Hapus"
                                                            >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                                                Tidak ada data pengiriman.
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
