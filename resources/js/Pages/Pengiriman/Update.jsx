import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Update({ auth, pengiriman, kontrak }) {
    const { data, setData, put, processing, errors } = useForm({
        kontrak_id: pengiriman.kontrak_id || '',
        tanggal: pengiriman.tanggal || '',
        nama_barang: pengiriman.nama_barang || '',
        no_faktur: pengiriman.no_faktur || '',
        jumlah: pengiriman.jumlah || '',
        satuan: pengiriman.satuan || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('pengiriman.update', pengiriman.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Edit Pengiriman</h2>}
        >
            <Head title="Edit Pengiriman" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pilih kontrak</label>
                                <select
                                    value={data.kontrak_id}
                                    onChange={(e) => setData('kontrak_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">-- Pilih Kontrak --</option>
                                    {kontrak.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.distributor.nama_perusahaan} ({p.nama_penyedia} {p.no_tanggal_kontrak})
                                        </option>
                                    ))}
                                </select>
                                {errors.kontrak_id && <p className="text-sm text-red-600">{errors.kontrak_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) => setData('tanggal', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.tanggal && <p className="text-sm text-red-600">{errors.tanggal}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                                <input
                                    type="text"
                                    value={data.nama_barang}
                                    onChange={(e) => setData('nama_barang', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.nama_barang && <p className="text-sm text-red-600">{errors.nama_barang}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">No Faktur</label>
                                <input
                                    type="text"
                                    value={data.no_faktur}
                                    onChange={(e) => setData('no_faktur', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.no_faktur && <p className="text-sm text-red-600">{errors.no_faktur}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jumlah</label>
                                <input
                                    type="number"
                                    value={data.jumlah}
                                    onChange={(e) => setData('jumlah', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.jumlah && <p className="text-sm text-red-600">{errors.jumlah}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Satuan</label>
                                <input
                                    type="text"
                                    value={data.satuan}
                                    onChange={(e) => setData('satuan', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.satuan && <p className="text-sm text-red-600">{errors.satuan}</p>}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Perbarui Pengiriman
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
