import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Update({ auth, penerima, pengiriman }) {
    const { data, setData, put, processing, errors } = useForm({
        pengiriman_id: penerima.pengiriman_id || '',
        tanggal: penerima.tanggal || '',
        jumlah: penerima.jumlah || '',
        satuan: penerima.satuan || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('penerima.update', penerima.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Edit Penerimaan
                </h2>
            }
        >
            <Head title="Edit Penerimaan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Pilih Pengiriman
                                </label>
                                <select
                                    value={data.pengiriman_id}
                                    onChange={(e) => setData('pengiriman_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">-- Pilih Pengiriman --</option>
                                    {pengiriman.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.no_faktur} - {item.tanggal}
                                        </option>
                                    ))}
                                </select>
                                {errors.pengiriman_id && (
                                    <p className="text-sm text-red-600">{errors.pengiriman_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) => setData('tanggal', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.tanggal && (
                                    <p className="text-sm text-red-600">{errors.tanggal}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Jumlah
                                </label>
                                <input
                                    type="number"
                                    value={data.jumlah}
                                    onChange={(e) => setData('jumlah', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.jumlah && (
                                    <p className="text-sm text-red-600">{errors.jumlah}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Satuan
                                </label>
                                <input
                                    type="text"
                                    value={data.satuan}
                                    onChange={(e) => setData('satuan', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.satuan && (
                                    <p className="text-sm text-red-600">{errors.satuan}</p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Perbarui Penerimaan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
