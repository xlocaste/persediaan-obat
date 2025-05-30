import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Update({ auth, distributor }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_perusahaan: distributor.nama_perusahaan || '',
        manager: distributor.manager || '',
        alamat: distributor.alamat || '',
        no_rek: distributor.no_rek || '',
        npwp: distributor.npwp || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('distributor.update', distributor.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Edit Distributor</h2>}
        >
            <Head title="Edit Distributor" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
                                <input
                                    type="text"
                                    value={data.nama_perusahaan}
                                    onChange={(e) => setData('nama_perusahaan', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.nama_perusahaan && (
                                    <p className="text-sm text-red-600">{errors.nama_perusahaan}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Manager</label>
                                <input
                                    type="text"
                                    value={data.manager}
                                    onChange={(e) => setData('manager', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.manager && (
                                    <p className="text-sm text-red-600">{errors.manager}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                                <textarea
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.alamat && (
                                    <p className="text-sm text-red-600">{errors.alamat}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">No. Rekening</label>
                                <input
                                    type="text"
                                    value={data.no_rek}
                                    onChange={(e) => setData('no_rek', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.no_rek && (
                                    <p className="text-sm text-red-600">{errors.no_rek}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">NPWP</label>
                                <input
                                    type="text"
                                    value={data.npwp}
                                    onChange={(e) => setData('npwp', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.npwp && (
                                    <p className="text-sm text-red-600">{errors.npwp}</p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Perbarui
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
