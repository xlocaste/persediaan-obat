import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function List({ auth, buktiPenerimaan, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const isStaff = auth.user?.roles?.[0]?.name === 'staff';

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus bukti penerimaan ini?')) {
            router.delete(route('bukti-penerimaan.destroy', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('bukti-penerimaan.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Bukti Penerimaan</h2>}
        >
            <Head title="Bukti Penerimaan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full sm:w-64"
                                        placeholder="Cari faktur, SP, realisasi..."
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
                                    <Link href={route('bukti-penerimaan.create')}>
                                        <PrimaryButton>+ Tambah Bukti</PrimaryButton>
                                    </Link>
                                )}
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">No Faktur (Penerima)</th>
                                        <th className="px-4 py-2 text-left">Gambar</th>
                                        <th className="px-4 py-2 text-left">SP</th>
                                        <th className="px-4 py-2 text-left">SPJ/BA-2</th>
                                        <th className="px-4 py-2 text-left">Realisasi</th>
                                        <th className="px-4 py-2 text-left">Keterangan</th>
                                        {isStaff && (
                                            <th className="px-4 py-2 text-center">Action</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {buktiPenerimaan.length > 0 ? (
                                        buktiPenerimaan.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">{item.penerima?.pengiriman?.no_faktur || '-'}</td>
                                                <td className="px-4 py-2">
                                                    <img src={`/storage/${item.image}`} alt="Bukti" className="h-12" />
                                                </td>
                                                <td className="px-4 py-2">{item.sp}</td>
                                                <td className="px-4 py-2">{item.spj_ba2}</td>
                                                <td className="px-4 py-2">{item.realisasi}</td>
                                                <td className="px-4 py-2">{item.keterangan}</td>
                                                {isStaff && (
                                                    <td className="px-4 py-2 text-center space-x-2 inline-flex">
                                                        <Link
                                                            href={route('bukti-penerimaan.edit', item.id)}
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
                                            <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                                                Tidak ada data bukti penerimaan.
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
