<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pengeluar\StoreRequest;
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

    public function create()
    {
        return Inertia::render('Pengeluar/Add', [
            'pemesanan' => Pemesanan::get(),
        ]);
    }
}
