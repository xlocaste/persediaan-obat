import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Detail({ KelolaDataObatMasuk }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl leading-tight">Detail Data Obat Masuk</h2>}
        >
            <Head title="Detail Data Obat Masuk" />

            <div className="py-6 px-6 max-w-6xl m-4 bg-white shadow-sm rounded-lg">
                <div className="mb-6">
                    <Link
                        href={route('kelola-data-obat-masuk.index')}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        &larr; Kembali ke Daftar
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mx-auto">
                    <div>
                        <h3 className="font-semibold text-gray-700">ID Penerimaan</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.id_penerimaan}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">ID Obat</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.id_obat}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">ID Distributor</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.id_distributor}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">Jumlah Masuk</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.jumlah_masuk}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">Tanggal Masuk</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.tanggal_masuk}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">Nama Distributor</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.nama_distributor}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">Petugas Penerima</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.petugas_penerima}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">Keterangan</h3>
                        <p className="text-gray-900">{KelolaDataObatMasuk.keterangan || '-'}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
