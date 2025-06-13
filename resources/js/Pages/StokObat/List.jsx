import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');


export default function List({ auth, stokObat, filters }) {
    const [search, setSearch] = useState(filters?.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("stok-obat.index"), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Stok Obat
                </h2>
            }
        >
            <Head title="Stok Obat" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama barang, tanggal, satuan..."
                                    className="border rounded px-3 py-2 w-full max-w-md"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                                >
                                    Cari
                                </button>
                            </form>

                            {/* Table */}
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">Nama Barang</th>
                                        <th className="px-4 py-2">Tanggal</th>
                                        <th className="px-4 py-2">Jumlah</th>
                                        <th className="px-4 py-2">Satuan</th>
                                        <th className="px-4 py-2">Dari Penerima</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {stokObat.length > 0 ? (
                                        stokObat.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">
                                                    {item.penerima?.pengiriman?.pemesanan?.nama_barang || "-"}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.tanggal ? dayjs(item.tanggal).format('D MMMM YYYY') : '-'}
                                                </td>
                                                <td className="px-4 py-2">{item.jumlah}</td>
                                                <td className="px-4 py-2">{item.satuan}</td>
                                                <td className="px-4 py-2">
                                                    Penerima ID: {item.penerima?.id || "-"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                                Tidak ada data stok obat.
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
