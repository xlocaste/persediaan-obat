import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, buktiPenerimaan, penerima }) {
    const { data, setData, post, progress, errors, processing } = useForm({
        _method: "put",
        penerima_id: buktiPenerimaan.penerima_id || "",
        image: null,
        sp: buktiPenerimaan.sp || "",
        spj_ba2: buktiPenerimaan.spj_ba2 || "",
        realisasi: buktiPenerimaan.realisasi || "",
        keterangan: buktiPenerimaan.keterangan || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("bukti-penerimaan.update", buktiPenerimaan.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Edit Bukti Penerimaan
                </h2>
            }
        >
            <Head title="Edit Bukti Penerimaan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded shadow-sm">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            encType="multipart/form-data"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Penerima
                                </label>
                                <select
                                    value={data.penerima_id}
                                    onChange={(e) =>
                                        setData("penerima_id", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                >
                                    <option value="">
                                        -- Pilih Penerima --
                                    </option>
                                    {penerima.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.pengiriman.no_faktur} -{" "}
                                            {item.tanggal}
                                        </option>
                                    ))}
                                </select>
                                {errors.penerima_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.penerima_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload Gambar (Opsional, ganti jika perlu)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    className="w-full mt-1"
                                />
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded h-2 mt-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        />
                                    </div>
                                )}
                                {errors.image && (
                                    <p className="text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    SP
                                </label>
                                <input
                                    type="text"
                                    value={data.sp}
                                    onChange={(e) =>
                                        setData("sp", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                />
                                {errors.sp && (
                                    <p className="text-sm text-red-600">
                                        {errors.sp}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    SPJ / BA-2
                                </label>
                                <input
                                    type="text"
                                    value={data.spj_ba2}
                                    onChange={(e) =>
                                        setData("spj_ba2", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                />
                                {errors.spj_ba2 && (
                                    <p className="text-sm text-red-600">
                                        {errors.spj_ba2}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Realisasi
                                </label>
                                <input
                                    type="text"
                                    value={data.realisasi}
                                    onChange={(e) =>
                                        setData("realisasi", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                />
                                {errors.realisasi && (
                                    <p className="text-sm text-red-600">
                                        {errors.realisasi}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Keterangan
                                </label>
                                <textarea
                                    value={data.keterangan}
                                    onChange={(e) =>
                                        setData("keterangan", e.target.value)
                                    }
                                    className="w-full mt-1 border rounded px-3 py-2"
                                ></textarea>
                                {errors.keterangan && (
                                    <p className="text-sm text-red-600">
                                        {errors.keterangan}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Update Bukti
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
