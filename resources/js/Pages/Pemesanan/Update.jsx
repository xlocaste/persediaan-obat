import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Update({ auth, kontrak }) {
    const { data, setData, put, processing, errors } = useForm({
        distributor_id: kontrak.distributor_id || '',
        no_id_paket: kontrak.no_id_paket || '',
        nama_penyedia: kontrak.nama_penyedia || '',
        no_tanggal_kontrak: kontrak.no_tanggal_kontrak || '',
        nilai_kontrak: kontrak.nilai_kontrak || '',
        tanggal_mulai_kontrak: kontrak.tanggal_mulai_kontrak || '',
        tanggal_berakhir_kontrak: kontrak.tanggal_berakhir_kontrak || '',
        masa_kontrak: kontrak.masa_kontrak || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('kontrak.update', kontrak.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Edit Kontrak</h2>}
        >
            <Head title="Edit Kontrak" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">No ID Paket</label>
                                <input
                                    type="text"
                                    value={data.no_id_paket}
                                    onChange={(e) => setData('no_id_paket', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.no_id_paket && <p className="text-sm text-red-600">{errors.no_id_paket}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Penyedia</label>
                                <input
                                    type="text"
                                    value={data.nama_penyedia}
                                    onChange={(e) => setData('nama_penyedia', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.nama_penyedia && <p className="text-sm text-red-600">{errors.nama_penyedia}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">No & Tanggal Kontrak</label>
                                <input
                                    type="text"
                                    value={data.no_tanggal_kontrak}
                                    onChange={(e) => setData('no_tanggal_kontrak', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.no_tanggal_kontrak && <p className="text-sm text-red-600">{errors.no_tanggal_kontrak}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nilai Kontrak (Rp)</label>
                                <input
                                    type="number"
                                    value={data.nilai_kontrak}
                                    onChange={(e) => setData('nilai_kontrak', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.nilai_kontrak && <p className="text-sm text-red-600">{errors.nilai_kontrak}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Mulai Kontrak</label>
                                <input
                                    type="date"
                                    value={data.tanggal_mulai_kontrak}
                                    onChange={(e) => setData('tanggal_mulai_kontrak', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.tanggal_mulai_kontrak && <p className="text-sm text-red-600">{errors.tanggal_mulai_kontrak}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Berakhir Kontrak</label>
                                <input
                                    type="date"
                                    value={data.tanggal_berakhir_kontrak}
                                    onChange={(e) => setData('tanggal_berakhir_kontrak', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.tanggal_berakhir_kontrak && <p className="text-sm text-red-600">{errors.tanggal_berakhir_kontrak}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Masa Kontrak</label>
                                <input
                                    type="text"
                                    value={data.masa_kontrak}
                                    onChange={(e) => setData('masa_kontrak', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.masa_kontrak && <p className="text-sm text-red-600">{errors.masa_kontrak}</p>}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Perbarui Kontrak
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
