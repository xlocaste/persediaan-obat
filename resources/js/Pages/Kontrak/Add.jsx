import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Add({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_perusahaan: '',
        manager: '',
        alamat: '',
        no_rek: '',
        npwp: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('distributor.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Tambah Distributor</h2>}
        >
            <Head title="Tambah Distributor" />

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
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
