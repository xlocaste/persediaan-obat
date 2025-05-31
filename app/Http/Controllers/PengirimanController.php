<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pengiriman\StoreRequest;
use App\Http\Requests\Pengiriman\UpdateRequest;
use App\Models\Pemesanan;
use App\Models\Pengiriman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PengirimanController extends Controller
{
    public function index()
    {
        $pengiriman = Pengiriman::with('pemesanan.kontrak')->get();

        return Inertia::render('Pengiriman/List', [
            'pengiriman' => $pengiriman,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        Pengiriman::create([
            'pemesanan_id' => $request->pemesanan_id,
            'tanggal' => $request->tanggal,
            'no_faktur' => $request->no_faktur,
            'jumlah' => $request->jumlah,
            'satuan' => $request->satuan,
        ]);

        return redirect()->route('pengiriman.index');
    }

    public function update(UpdateRequest $request, Pengiriman $pengiriman)
    {
        $pengiriman->update([
            'pemesanan_id' => $request->pemesanan_id,
            'tanggal' => $request->tanggal,
            'no_faktur' => $request->no_faktur,
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
            'pemesanan' => Pemesanan::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pengiriman/Add', [
            'pemesanan' => Pemesanan::all(),
        ]);
    }
}
