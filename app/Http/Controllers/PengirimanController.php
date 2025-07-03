<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pengiriman\StoreRequest;
use App\Http\Requests\Pengiriman\UpdateRequest;
use App\Models\Kontrak;
use App\Models\Pengiriman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PengirimanController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengiriman::with('kontrak');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where('no_faktur', 'like', "%$search%")
                ->orWhere('satuan', 'like', "%$search%")
                ->orWhereHas('pemesanan.kontrak', function ($q) use ($search) {
                    $q->where('no_id_paket', 'like', "%$search%");
                });
        }

        $pengiriman = $query->get();

        return Inertia::render('Pengiriman/List', [
            'pengiriman' => $pengiriman,
            'filters' => $request->only('search'),
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        Pengiriman::create([
            'kontrak_id' => $request->kontrak_id,
            'tanggal' => $request->tanggal,
            'no_faktur' => $request->no_faktur,
            'nama_barang' => $request->nama_barang,
            'jumlah' => $request->jumlah,
            'satuan' => $request->satuan,
        ]);

        return redirect()->route('pengiriman.index');
    }

    public function update(UpdateRequest $request, Pengiriman $pengiriman)
    {
        $pengiriman->update([
            'kontrak_id' => $request->kontrak_id,
            'tanggal' => $request->tanggal,
            'no_faktur' => $request->no_faktur,
            'nama_barang' => $request->nama_barang,
            'jumlah' => $request->jumlah,
            'satuan' => $request->satuan,
        ]);

        return redirect()->route('pengiriman.index');
    }

    public function destroy(Pengiriman $pengiriman)
    {
        $pengiriman->delete();

        return redirect()->route('pengiriman.index')->with('message', 'Data pengiriman berhasil dihapus.');
    }

    public function edit(Pengiriman $pengiriman)
    {
        return Inertia::render('Pengiriman/Update', [
            'pengiriman' => $pengiriman,
            'kontrak' => Kontrak::with('distributor')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pengiriman/Add', [
            'kontrak' => Kontrak::with('distributor')->get(),
        ]);
    }
}
