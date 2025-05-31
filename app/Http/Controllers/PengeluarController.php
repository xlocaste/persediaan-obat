<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pengeluar\StoreRequest;
use App\Http\Requests\Pengeluar\UpdateRequest;
use App\Models\Pemesanan;
use App\Models\Pengeluar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PengeluarController extends Controller
{
    public function index()
    {
        $daftarPengeluar = Pengeluar::with('pemesanan')->get();

        return Inertia::render('Pengeluar/List', [
            'daftarPengeluar' => $daftarPengeluar,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            $pengeluar = Pengeluar::create([
                'pemesanan_id' => $request->pemesanan_id,
                'nama_tujuan' => $request->nama_tujuan,
                'nama_barang' => $request->nama_barang,
                'jumlah' => $request->jumlah,
            ]);

            $pemesanan = Pemesanan::findOrFail($request->pemesanan_id);

            if ($pemesanan->jumlah < $request->jumlah) {
                throw new \Exception('Jumlah pengeluaran melebihi stok pemesanan');
            }

            $pemesanan->jumlah -= $request->jumlah;
            $pemesanan->save();
        });

        return redirect()->route('pengeluar.index');
    }

    public function update(UpdateRequest $request, Pengeluar $pengeluar)
    {
        $oldJumlah = $pengeluar->jumlah;
        $oldPemesananId = $pengeluar->pemesanan_id;

        $newJumlah = $request->jumlah;
        $newPemesananId = $request->pemesanan_id;

        if ($oldPemesananId != $newPemesananId) {
            $oldPemesanan = Pemesanan::find($oldPemesananId);
            if ($oldPemesanan) {
                $oldPemesanan->jumlah += $oldJumlah;
                $oldPemesanan->save();
            }

            $newPemesanan = Pemesanan::find($newPemesananId);
            if ($newPemesanan) {
                if ($newPemesanan->jumlah < $newJumlah) {
                    return back()->withErrors(['jumlah' => 'Jumlah melebihi stok pemesanan.']);
                }
                $newPemesanan->jumlah -= $newJumlah;
                $newPemesanan->save();
            }
        } else {
            $selisih = $newJumlah - $oldJumlah;

            $pemesanan = Pemesanan::find($oldPemesananId);
            if ($pemesanan) {
                if ($selisih > 0) {
                    if ($pemesanan->jumlah < $selisih) {
                        return back()->withErrors(['jumlah' => 'Jumlah melebihi stok pemesanan.']);
                    }
                    $pemesanan->jumlah -= $selisih;
                } else if ($selisih < 0) {
                    $pemesanan->jumlah += abs($selisih);
                }
                $pemesanan->save();
            }
        }

        $pengeluar->update([
            'pemesanan_id' => $newPemesananId,
            'nama_tujuan' => $request->nama_tujuan,
            'nama_barang' => $request->nama_barang,
            'jumlah' => $newJumlah,
        ]);

        return redirect()->route('pengeluar.index');
    }

    public function edit(Pengeluar $pengeluar)
    {
        return Inertia::render('Pengeluar/Update', [
            'pengeluar' => $pengeluar,
            'pemesanan' => Pemesanan::get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pengeluar/Add', [
            'pemesanan' => Pemesanan::get(),
        ]);
    }
}
