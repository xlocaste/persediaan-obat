import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function List({ auth, daftarPengeluar, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const isStaff = auth.user?.roles?.[0]?.name === 'staff';

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data pengeluar ini?")) {
            router.delete(route("pengeluar.destroy", id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("pengeluar.index"), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Pengeluar
                </h2>
            }
        >
            <Head title="Pengeluar" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center w-full">
                                <form onSubmit={handleSearch} className="flex gap-2 w-full">
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full"
                                        placeholder="Cari nama barang atau tujuan..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 shrink-0"
                                    >
                                        Cari
                                    </button>
                                </form>

                                <div className="flex justify-end items-center gap-2 w-full">
                                    <a
                                        href={route('pengeluar.print')}
                                        target="_blank"
                                        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                                    >
                                        Print Semua
                                    </a>

                                    {isStaff && (
                                        <Link href={route("pengeluar.create")}>
                                            <PrimaryButton className="py-3">+ Tambah Pengeluar</PrimaryButton>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Nama Barang</th>
                                        <th className="px-4 py-2 text-left">Nama Tujuan</th>
                                        <th className="px-4 py-2 text-left">Nama Barang</th>
                                        <th className="px-4 py-2 text-left">Jumlah</th>
                                        {isStaff && (
                                            <th className="px-4 py-2 text-center">Action</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {daftarPengeluar.length > 0 ? (
                                        daftarPengeluar.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">
                                                    {
                                                        item.stok_obat?.penerima?.pengiriman?.nama_barang || "-"
                                                    }
                                                </td>
                                                <td className="px-4 py-2">{item.nama_tujuan}</td>
                                                <td className="px-4 py-2">{item.nama_barang}</td>
                                                <td className="px-4 py-2">{item.jumlah}</td>
                                                {isStaff && (
                                                    <td className="px-4 py-2 text-center space-x-2 inline-flex">
                                                        <Link
                                                            href={route("pengeluar.edit", item.id)}
                                                            className="text-indigo-600 hover:underline"
                                                            >
                                                            <FaEdit />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="text-red-600 hover:underline"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-4 py-4 text-center text-gray-500"
                                            >
                                                Tidak ada data pengeluar.
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
