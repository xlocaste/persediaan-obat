import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function List({ auth, penerima, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data penerima ini?')) {
            router.delete(route('penerima.destroy', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('penerima.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Daftar Penerima</h2>}
        >
            <Head title="Daftar Penerima" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Search & Tambah Button */}
                            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full sm:w-64"
                                        placeholder="Cari faktur, satuan, atau tanggal..."
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

                                <Link href={route('penerima.create')}>
                                    <PrimaryButton>+ Tambah Penerima</PrimaryButton>
                                </Link>
                            </div>

                            {/* Table */}
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">No Faktur (Pengiriman)</th>
                                        <th className="px-4 py-2 text-left">Tanggal</th>
                                        <th className="px-4 py-2 text-left">Jumlah</th>
                                        <th className="px-4 py-2 text-left">Satuan</th>
                                        <th className="px-4 py-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {penerima.length > 0 ? (
                                        penerima.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">{item.pengiriman?.no_faktur || '-'}</td>
                                                <td className="px-4 py-2">{item.tanggal}</td>
                                                <td className="px-4 py-2">{item.jumlah}</td>
                                                <td className="px-4 py-2">{item.satuan}</td>
                                                <td className="px-4 py-2 text-center space-x-2">
                                                    <Link
                                                        href={route('penerima.edit', item.id)}
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
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                                Tidak ada data penerima.
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
