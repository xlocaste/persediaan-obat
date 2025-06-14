<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Pengeluaran Obat</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8 text-sm font-sans text-gray-800">
    <div class="text-center mb-6">
        <h1 class="text-2xl font-bold uppercase">Data Pengeluaran Obat</h1>
    </div>

    <table class="w-full border border-gray-300 border-collapse text-left text-sm">
        <thead class="bg-gray-100">
            <tr>
                <th class="border border-gray-300 px-4 py-2">Nama Barang</th>
                <th class="border border-gray-300 px-4 py-2">Tujuan</th>
                <th class="border border-gray-300 px-4 py-2">Jumlah</th>
                <th class="border border-gray-300 px-4 py-2">Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($daftarPengeluar as $item)
                <tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">{{ $item->nama_barang }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ $item->nama_tujuan }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ $item->jumlah }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ $item->created_at->format('d M Y') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" class="text-center px-4 py-4 text-gray-500">
                        Tidak ada data pengeluaran.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
