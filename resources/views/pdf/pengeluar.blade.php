<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Pengeluar</title>
    <link href="{{ public_path('css/app.css') }}" rel="stylesheet">
</head>
<body class="p-6 text-sm">
    <h1 class="text-xl font-bold mb-4">Data Pengeluaran Obat</h1>
    <table class="table-auto w-full border border-collapse">
        <thead>
            <tr class="bg-gray-100">
                <th class="border px-2 py-1">Nama Barang</th>
                <th class="border px-2 py-1">Tujuan</th>
                <th class="border px-2 py-1">Jumlah</th>
                <th class="border px-2 py-1">Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($daftarPengeluar as $item)
                <tr>
                    <td class="border px-2 py-1">{{ $item->nama_barang }}</td>
                    <td class="border px-2 py-1">{{ $item->nama_tujuan }}</td>
                    <td class="border px-2 py-1">{{ $item->jumlah }}</td>
                    <td class="border px-2 py-1">{{ $item->created_at->format('d M Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
