<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pemesanan\StoreRequest;
use App\Http\Requests\Pemesanan\UpdateRequest;
use App\Models\Kontrak;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function index(Request $request)
    {
        $query = Pemesanan::with('kontrak');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where('nama_barang', 'like', "%$search%")
                ->orWhere('satuan', 'like', "%$search%")
                ->orWhereHas('kontrak', function ($q) use ($search) {
                    $q->where('no_id_paket', 'like', "%$search%");
                });
        }

        $pemesanan = $query->get();

        return Inertia::render('Pemesanan/List', [
            'pemesanan' => $pemesanan,
            'filters' => $request->only('search'),
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

    public function update(UpdateRequest $request, Pemesanan $pemesanan)
    {
        $pemesanan->update([
            'kontrak_id' => $request->kontrak_id,
            'nama_barang' => $request->nama_barang,
            'jumlah' => $request->jumlah,
            'satuan' => $request->satuan,
        ]);

        return redirect()->route('pemesanan.index');
    }

    public function destroy(Pemesanan $pemesanan)
    {
        $pemesanan->delete();

        return redirect()->route('pemesanan.index')->with('message', 'Data pemesanan berhasil dihapus.');
    }

    public function edit(Pemesanan $pemesanan)
    {
        return Inertia::render('Pemesanan/Update', [
            'pemesanan' => $pemesanan,
            'kontrak' => Kontrak::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pemesanan/Add', [
            'kontrak' => Kontrak::all(),
        ]);
    }
}
