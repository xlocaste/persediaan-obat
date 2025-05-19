import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Add({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        id_penerimaan: '',
        id_obat: '',
        id_distributor: '',
        jumlah_masuk: '',
        tanggal_masuk: '',
        nama_distributor: '',
        petugas_penerima: '',
        keterangan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('kelola-data-obat-masuk.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl leading-tight">Tambah Data Obat Masuk</h2>}>
            <Head title="Tambah Data Obat Masuk" />

            <div className="py-6 px-4">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID Penerimaan</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.id_penerimaan}
                                onChange={(e) => setData('id_penerimaan', e.target.value)}
                            />
                            {errors.id_penerimaan && <div className="text-red-500 text-sm">{errors.id_penerimaan}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID Obat</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.id_obat}
                                onChange={(e) => setData('id_obat', e.target.value)}
                            />
                            {errors.id_obat && <div className="text-red-500 text-sm">{errors.id_obat}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID Distributor</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.id_distributor}
                                onChange={(e) => setData('id_distributor', e.target.value)}
                            />
                            {errors.id_distributor && <div className="text-red-500 text-sm">{errors.id_distributor}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jumlah Masuk</label>
                            <input
                                type="number"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.jumlah_masuk}
                                onChange={(e) => setData('jumlah_masuk', e.target.value)}
                            />
                            {errors.jumlah_masuk && <div className="text-red-500 text-sm">{errors.jumlah_masuk}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tanggal Masuk</label>
                            <input
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.tanggal_masuk}
                                onChange={(e) => setData('tanggal_masuk', e.target.value)}
                            />
                            {errors.tanggal_masuk && <div className="text-red-500 text-sm">{errors.tanggal_masuk}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Distributor</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.nama_distributor}
                                onChange={(e) => setData('nama_distributor', e.target.value)}
                            />
                            {errors.nama_distributor && <div className="text-red-500 text-sm">{errors.nama_distributor}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Petugas Penerima</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.petugas_penerima}
                                onChange={(e) => setData('petugas_penerima', e.target.value)}
                            />
                            {errors.petugas_penerima && <div className="text-red-500 text-sm">{errors.petugas_penerima}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.keterangan}
                                onChange={(e) => setData('keterangan', e.target.value)}
                            />
                            {errors.keterangan && <div className="text-red-500 text-sm">{errors.keterangan}</div>}
                        </div>

                        <div>
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
        </AuthenticatedLayout>
    );
}
