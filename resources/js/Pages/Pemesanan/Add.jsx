import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Add({ auth, kontrak }) {
    const { data, setData, post, processing, errors } = useForm({
        kontrak_id: '',
        nama_barang: '',
        jumlah: '',
        satuan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pemesanan.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Tambah Pemesanan</h2>}
        >
            <Head title="Tambah Pemesanan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pilih Kontrak</label>
                                <select
                                    value={data.kontrak_id}
                                    onChange={(e) => setData('kontrak_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">-- Pilih Kontrak --</option>
                                    {kontrak.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.no_id_paket} - {item.nama_penyedia}
                                        </option>
                                    ))}
                                </select>
                                {errors.kontrak_id && (
                                    <p className="text-sm text-red-600">{errors.kontrak_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                                <input
                                    type="text"
                                    value={data.nama_barang}
                                    onChange={(e) => setData('nama_barang', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.nama_barang && (
                                    <p className="text-sm text-red-600">{errors.nama_barang}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jumlah</label>
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
                                <label className="block text-sm font-medium text-gray-700">Satuan</label>
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
                                <PrimaryButton type="submit" disabled={processing}>
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
