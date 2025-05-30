import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Update({ auth, pemesanan, kontrak }) {
    const { data, setData, put, processing, errors } = useForm({
        kontrak_id: pemesanan.kontrak_id || '',
        nama_barang: pemesanan.nama_barang || '',
        jumlah: pemesanan.jumlah || '',
        satuan: pemesanan.satuan || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('pemesanan.update', pemesanan.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Edit Pemesanan</h2>}
        >
            <Head title="Edit Pemesanan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kontrak</label>
                                <select
                                    value={data.kontrak_id}
                                    onChange={(e) => setData('kontrak_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Pilih Kontrak</option>
                                    {kontrak.map(k => (
                                        <option key={k.id} value={k.id}>
                                            {k.no_id_paket} - {k.nama_penyedia}
                                        </option>
                                    ))}
                                </select>
                                {errors.kontrak_id && <p className="text-sm text-red-600">{errors.kontrak_id}</p>}
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
                                    Perbarui Pemesanan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
