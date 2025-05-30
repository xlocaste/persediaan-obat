<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pemesanan\StoreRequest;
use App\Models\Kontrak;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function index()
    {
        $pemesanan = Pemesanan::with('kontrak')->get();

        return Inertia::render('Pemesanan/List', [
            'pemesanan' => $pemesanan,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        Pemesanan::create([
            'kontrak_id' => $request->kontrak_id,
            'nama_barang' => $request->nama_barang,
            'jumlah' => $request->jumlah,
            'satuan' => $request->satuan,
        ]);

        return redirect()->route('pemesanan.index');
    }

    public function create()
    {
        return Inertia::render('Pemesanan/Add', [
            'kontrak' => Kontrak::all(),
        ]);
    }
}
