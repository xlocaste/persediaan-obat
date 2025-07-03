import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaEdit, FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');


export default function List({ auth, kontrak, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const isStaff = auth.user?.roles?.[0]?.name === 'staff';

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kontrak ini?')) {
            router.delete(route('kontrak.destroy', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('kontrak.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Daftar Kontrak</h2>}
        >
            <Head title="Daftar Kontrak" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex justify-between items-center">
                                <form onSubmit={handleSearch}>
                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="border rounded px-3 py-2 w-64"
                                    />
                                    <button
                                        type="submit"
                                        className="ml-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                                    >
                                        Cari
                                    </button>
                                </form>

                                {isStaff && (
                                    <div className="mb-4 flex justify-end">
                                        <Link href={route('kontrak.create')}>
                                            <PrimaryButton>+ Tambah Kontrak</PrimaryButton>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Tabel Data */}
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">No ID Paket</th>
                                        <th className="px-4 py-2">Nama Penyedia</th>
                                        <th className="px-4 py-2">No & Tgl Kontrak</th>
                                        <th className="px-4 py-2">Nilai Kontrak</th>
                                        <th className="px-4 py-2">Tanggal Mulai</th>
                                        <th className="px-4 py-2">Tanggal Berakhir</th>
                                        <th className="px-4 py-2">Masa Kontrak</th>
                                        {isStaff && (
                                            <th className="px-4 py-2 text-center">Aksi</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {kontrak.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{item.no_id_paket}</td>
                                            <td className="px-4 py-2">{item.nama_penyedia}</td>
                                            <td className="px-4 py-2">{item.no_tanggal_kontrak}</td>
                                            <td className="px-4 py-2">Rp {parseFloat(item.nilai_kontrak).toLocaleString('id-ID')}</td>
                                            <td className="px-4 py-2">
                                            {item.tanggal_mulai_kontrak ? dayjs(item.tanggal_mulai_kontrak).format('D MMMM YYYY') : '-'}
                                            </td>
                                            <td className="px-4 py-2">
                                            {item.tanggal_berakhir_kontrak ? dayjs(item.tanggal_berakhir_kontrak).format('D MMMM YYYY') : '-'}
                                            </td>
                                            <td className="px-4 py-2">{item.masa_kontrak}</td>
                                            {isStaff && (
                                                <td className="px-4 py-2 flex justify-center gap-2">
                                                    <Link
                                                        href={route('kontrak.edit', item.id)}
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
                                    ))}
                                    {kontrak.length === 0 && (
                                        <tr>
                                            <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                                                Tidak ada data kontrak.
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
