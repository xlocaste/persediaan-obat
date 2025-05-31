import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Add({ auth, penerima }) {
    const { data, setData, post, processing, errors } = useForm({
        penerima_id: "",
        image: null,
        sp: "",
        spj_ba2: "",
        realisasi: "",
        keterangan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("bukti-penerimaan.store"), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Tambah Bukti Penerimaan
                </h2>
            }
        >
            <Head title="Tambah Bukti Penerimaan" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Pilih Penerima
                                </label>
                                <select
                                    value={data.penerima_id}
                                    onChange={(e) =>
                                        setData("penerima_id", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">
                                        -- Pilih Penerima --
                                    </option>
                                    {penerima.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.pengiriman?.no_faktur ??
                                                "Faktur Tidak Ada"}{" "}
                                            - {p.tanggal}
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
                                    Foto Bukti (Image)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    className="mt-1 block w-full"
                                />
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                ></textarea>
                                {errors.keterangan && (
                                    <p className="text-sm text-red-600">
                                        {errors.keterangan}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
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
