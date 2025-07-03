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
    public function index(Request $request)
    {
        $query = Penerima::with('pengiriman.kontrak');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where('satuan', 'like', "%$search%")
                ->orWhere('jumlah', 'like', "%$search%")
                ->orWhere('tanggal', 'like', "%$search%")
                ->orWhereHas('pengiriman', function ($q) use ($search) {
                    $q->where('no_faktur', 'like', "%$search%");
                });
        }

        $penerima = $query->get();

        return Inertia::render('Penerima/List', [
            'penerima' => $penerima,
            'filters' => $request->only('search'),
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

    public function destroy(Penerima $penerima)
    {
        $penerima->delete();

        return redirect()->route('penerima.index')->with('message', 'Data penerima berhasil dihapus.');
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
