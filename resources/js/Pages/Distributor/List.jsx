import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function List({ auth, distributor, filters }) {
    console.log(auth)
    const [search, setSearch] = useState(filters?.search || '');
    const isStaff = auth.user?.roles?.[0]?.name === 'staff';

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus distributor ini?')) {
            router.delete(route('distributor.destroy', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('distributor.index'), { search }, { preserveScroll: true, preserveState: true });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Daftar Distributor</h2>}
        >
            <Head title="Daftar Distributor" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex justify-between items-center">
                                <form onSubmit={handleSearch}>
                                    <input
                                        type="text"
                                        placeholder="Cari nama perusahaan / manager..."
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
                                    <Link href={route('distributor.create')}>
                                        <PrimaryButton>+ Tambah Distributor</PrimaryButton>
                                    </Link>
                                )}
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">Nama Perusahaan</th>
                                        <th className="px-4 py-2">Manager</th>
                                        <th className="px-4 py-2">Alamat</th>
                                        <th className="px-4 py-2">No Rekening</th>
                                        <th className="px-4 py-2">NPWP</th>
                                        {isStaff && (
                                            <th className="px-4 py-2">Action</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {distributor.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{item.nama_perusahaan}</td>
                                            <td className="px-4 py-2">{item.manager}</td>
                                            <td className="px-4 py-2">{item.alamat}</td>
                                            <td className="px-4 py-2">{item.no_rek}</td>
                                            <td className="px-4 py-2">{item.npwp}</td>
                                            {isStaff && (
                                                <td className="px-4 py-2 space-x-2 inline-flex">
                                                    <Link
                                                        href={route('distributor.edit', item.id)}
                                                        className="text-indigo-600 hover:underline"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                    {distributor.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                                                Tidak ada data distributor.
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
