import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function List({ auth, KDOM }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl leading-tight">Data Obat Masuk</h2>}
        >
            <Head title="Data Obat Masuk" />

            <div className="py-4 px-4 rounded-lg">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Penerimaan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Obat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Distributor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Distributor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Petugas Penerima</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-gray-200">
                            {KDOM.data.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id_penerimaan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id_obat}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id_distributor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.jumlah_masuk}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tanggal_masuk}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama_distributor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.petugas_penerima}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.keterangan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-2">
                                        <Link
                                            href={route('kelola-obat-masuk.edit', item.id)}
                                            className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition duration-200"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route('kelola-obat-masuk.destroy', item.id)}
                                            className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition duration-200"
                                            onClick={(e) => {
                                                if (!confirm('Yakin ingin menghapus data ini?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
