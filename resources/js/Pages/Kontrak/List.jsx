import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function List({ auth, kontrak }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kontrak ini?')) {
            router.delete(route('kontrak.destroy', id));
        }
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
                            <div className="mb-4 flex justify-end">
                                <Link href={route('kontrak.create')}>
                                    <PrimaryButton>+ Tambah Kontrak</PrimaryButton>
                                </Link>
                            </div>
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
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {kontrak.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{item.no_id_paket}</td>
                                            <td className="px-4 py-2">{item.nama_penyedia}</td>
                                            <td className="px-4 py-2">{item.no_tanggal_kontrak}</td>
                                            <td className="px-4 py-2">Rp {parseFloat(item.nilai_kontrak).toLocaleString('id-ID')}</td>
                                            <td className="px-4 py-2">{item.tanggal_mulai_kontrak}</td>
                                            <td className="px-4 py-2">{item.tanggal_berakhir_kontrak}</td>
                                            <td className="px-4 py-2">{item.masa_kontrak}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <Link
                                                    href={route('kontrak.edit', item.id)}
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
