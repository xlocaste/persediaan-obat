import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Add({ auth, stokObat }) {
    console.log(stokObat)
    const { data, setData, post, processing, errors } = useForm({
        stok_obat_id: "",
        nama_tujuan: "",
        nama_barang: "",
        jumlah: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pengeluar.store"), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Tambah Pengeluar
                </h2>
            }
        >
            <Head title="Tambah Pengeluar" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Pilih Stok Obat
                                </label>
                                <select
                                    value={data.stok_obat_id}
                                    onChange={(e) =>
                                        setData("stok_obat_id", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">-- Pilih Stok --</option>
                                    {stokObat.map((stok) => (
                                        <option key={stok.id} value={stok.id}>
                                            {stok.penerima?.tanggal ?? '-'} -{" "}
                                            {stok.jumlah} {stok.satuan}
                                        </option>
                                    ))}
                                </select>
                                {errors.stok_obat_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.stok_obat_id}
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.jumlah && (
                                    <p className="text-sm text-red-600">
                                        {errors.jumlah}
                                    </p>
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
