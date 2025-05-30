import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function List({ auth, distributor }) {
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
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">Nama Perusahaan</th>
                                        <th className="px-4 py-2">Manager</th>
                                        <th className="px-4 py-2">Alamat</th>
                                        <th className="px-4 py-2">No Rekening</th>
                                        <th className="px-4 py-2">NPWP</th>
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
                                        </tr>
                                    ))}
                                    {distributor.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-4 text-center text-gray-500">Tidak ada data distributor.</td>
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
