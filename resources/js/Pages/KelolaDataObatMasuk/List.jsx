import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function List({ auth, KDOM }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl leading-tight">Data Obat Masuk</h2>}
        >
            <Head title="Data Obat Masuk" />

            <div className="py-4 px-4 rounded-lg">
                <div className="py-4 px-4 rounded-lg max-w-full overflow-x-auto bg-white">
                    <div className='flex items-center justify-end mb-4'>
                        <PrimaryButton>
                            <Link href={route('kelola-data-obat-masuk.create')}>
                                + TAMBAH DATA OBAT MASUK
                            </Link>
                        </PrimaryButton>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full max-w-full table-auto border border-gray-200 mx-auto text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase">Jumlah Masuk</th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase">Tanggal Masuk</th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase">Nama Distributor</th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase">Petugas Penerima</th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase">Keterangan</th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {KDOM.data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{item.jumlah_masuk}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{item.tanggal_masuk}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{item.nama_distributor}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{item.petugas_penerima}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{item.keterangan}</td>
                                    <td className="px-3 py-2 whitespace-nowrap space-x-1">
                                    <Link
                                        href={route('kelola-data-obat-masuk.show', item.id)}
                                        className="inline-flex items-center px-2 py-1 text-blue-500 text-xs font-semibold"
                                    >
                                        <FaEye />
                                    </Link>
                                    <Link
                                        href={route('kelola-data-obat-masuk.edit', item.id)}
                                        className="inline-flex items-center px-2 py-1 text-yellow-500 text-xs font-semibold "
                                    >
                                        <FaRegEdit />
                                    </Link>
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={route('kelola-data-obat-masuk.destroy', item.id)}
                                        className="inline-flex items-center px-2 py-1 text-red-500 text-xs font-semibold"
                                        onClick={(e) => {
                                        if (!confirm('Yakin ingin menghapus data ini?')) {
                                            e.preventDefault();
                                        }
                                        }}
                                    >
                                        <FaRegTrashAlt />
                                    </Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing {KDOM.from} to {KDOM.to} of {KDOM.total} entries
                            </div>
                            <div className="space-x-2">
                                {KDOM.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || ''}
                                        className={`px-3 py-1 text-sm border rounded ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-200'
                                        } ${!link.url && 'cursor-not-allowed text-gray-400'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
