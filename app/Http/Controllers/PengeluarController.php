<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pengeluar\StoreRequest;
use App\Http\Requests\Pengeluar\UpdateRequest;
use App\Models\Pengeluar;
use App\Models\StokObat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PengeluarController extends Controller
{
    public function index()
    {
        $daftarPengeluar = Pengeluar::with('stokObat.penerima.pengiriman.pemesanan')->get();

        return Inertia::render('Pengeluar/List', [
            'daftarPengeluar' => $daftarPengeluar,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Pengeluar/Add', [
            'stokObat' => StokObat::with('penerima')->get(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            $stokObat = StokObat::findOrFail($request->stok_obat_id);

            if ($stokObat->jumlah < $request->jumlah) {
                throw new \Exception('Stok tidak mencukupi untuk pengeluaran ini.');
            }

            $stokObat->jumlah -= $request->jumlah;
            $stokObat->save();

            Pengeluar::create([
                'stok_obat_id' => $stokObat->id,
                'nama_tujuan' => $request->nama_tujuan,
                'nama_barang' => $request->nama_barang,
                'jumlah' => $request->jumlah,
            ]);
        });

        return redirect()->route('pengeluar.index');
    }

    public function edit(Pengeluar $pengeluar)
    {
        return Inertia::render('Pengeluar/Update', [
            'pengeluar' => $pengeluar,
            'stokObat' => StokObat::with('penerima.pengiriman.pemesanan')->get(),
        ]);
    }

    public function update(UpdateRequest $request, Pengeluar $pengeluar)
    {
        DB::transaction(function () use ($request, $pengeluar) {
            $selisih = $request->jumlah - $pengeluar->jumlah;

            if ($selisih > 0) {
                $stokObat = StokObat::findOrFail($request->stok_obat_id);
                if ($stokObat->jumlah < $selisih) {
                    throw new \Exception('Stok tidak cukup untuk perubahan jumlah.');
                }
                $stokObat->jumlah -= $selisih;
                $stokObat->save();
            } elseif ($selisih < 0) {
                $stokObat = StokObat::findOrFail($request->stok_obat_id);
                $stokObat->jumlah += abs($selisih);
                $stokObat->save();
            }

            $pengeluar->update([
                'stok_obat_id' => $request->stok_obat_id,
                'nama_tujuan' => $request->nama_tujuan,
                'nama_barang' => $request->nama_barang,
                'jumlah' => $request->jumlah,
            ]);
        });

        return redirect()->route('pengeluar.index');
    }

    public function destroy(Pengeluar $pengeluar)
    {
        DB::transaction(function () use ($pengeluar) {
            $stokObat = StokObat::findOrFail($pengeluar->stok_obat_id);
            $stokObat->jumlah += $pengeluar->jumlah;
            $stokObat->save();

            $pengeluar->delete();
        });

        return redirect()->route('pengeluar.index')
            ->with('success', 'Data pengeluar berhasil dihapus dan stok dikembalikan.');
    }
}
