import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function List({ auth, stokObat }) {
    console.log(stokObat)
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
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">Tanggal</th>
                                        <th className="px-4 py-2">Jumlah</th>
                                        <th className="px-4 py-2">Satuan</th>
                                        <th className="px-4 py-2">
                                            Dari Penerima
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {stokObat.length > 0 ? (
                                        stokObat.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-2">
                                                    {item.tanggal}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.jumlah}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.satuan}
                                                </td>
                                                <td className="px-4 py-2">
                                                    Penerima ID: {item.penerima?.id || "-"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-4 text-center text-gray-500"
                                            >
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
