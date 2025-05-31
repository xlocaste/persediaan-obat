import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, pengeluar, pemesanan }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        pemesanan_id: pengeluar.pemesanan_id || "",
        nama_tujuan: pengeluar.nama_tujuan || "",
        nama_barang: pengeluar.nama_barang || "",
        jumlah: pengeluar.jumlah || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pengeluar.update", pengeluar.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Edit Pengeluar
                </h2>
            }
        >
            <Head title="Edit Pengeluar" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Pilih Pemesanan
                                </label>
                                <select
                                    value={data.pemesanan_id}
                                    onChange={(e) =>
                                        setData("pemesanan_id", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                >
                                    <option value="">
                                        -- Pilih Pemesanan --
                                    </option>
                                    {pemesanan.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.nama_barang} - Jumlah: {p.jumlah}
                                        </option>
                                    ))}
                                </select>
                                {errors.pemesanan_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.pemesanan_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Tujuan
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_tujuan}
                                    onChange={(e) =>
                                        setData("nama_tujuan", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                />
                                {errors.nama_tujuan && (
                                    <p className="text-sm text-red-600">
                                        {errors.nama_tujuan}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Barang
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_barang}
                                    onChange={(e) =>
                                        setData("nama_barang", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                />
                                {errors.nama_barang && (
                                    <p className="text-sm text-red-600">
                                        {errors.nama_barang}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Jumlah
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.jumlah}
                                    onChange={(e) =>
                                        setData("jumlah", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                />
                                {errors.jumlah && (
                                    <p className="text-sm text-red-600">
                                        {errors.jumlah}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Update Pengeluar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
