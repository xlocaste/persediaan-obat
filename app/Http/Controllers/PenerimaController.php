<?php

namespace App\Http\Controllers;

use App\Http\Requests\Penerima\StoreRequest;
use App\Http\Requests\Penerima\UpdateRequest;
use App\Models\Penerima;
use App\Models\Pengiriman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PenerimaController extends Controller
{
    public function index()
    {
        $penerima = Penerima::with('pengiriman.pemesanan.kontrak')->get();

        return Inertia::render('Penerima/List', [
            'penerima' => $penerima,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        Penerima::create([
            'pengiriman_id' => $request->pengiriman_id,
            'tanggal' => $request->tanggal,
            'jumlah' => $request->jumlah,
            'satuan' => $request->satuan,
        ]);

        return redirect()->route('penerima.index');
    }

    public function update(UpdateRequest $request, Penerima $penerima)
    {
        $penerima->update([
            'pengiriman_id' => $request->pengiriman_id,
            'tanggal' => $request->tanggal,
            'jumlah' => $request->jumlah,
            'satuan' => $request->satuan,
        ]);

        return redirect()->route('penerima.index');
    }

    public function edit(Penerima $penerima)
    {
        return Inertia::render('Penerima/Update', [
            'penerima' => $penerima,
            'pengiriman' => Pengiriman::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Penerima/Add', [
            'pengiriman' => Pengiriman::all(),
        ]);
    }
}
