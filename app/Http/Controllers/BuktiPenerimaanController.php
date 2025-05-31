<?php

namespace App\Http\Controllers;

use App\Http\Requests\BuktiPenerimaan\StoreRequest;
use App\Http\Requests\BuktiPenerimaan\UpdateRequest;
use App\Models\BuktiPenerimaan;
use App\Models\Penerima;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BuktiPenerimaanController extends Controller
{
    public function index()
    {
        $buktiPenerimaan = BuktiPenerimaan::with('penerima.pengiriman.pemesanan.kontrak')->get();

        return Inertia::render('BuktiPenerimaan/List', [
            'buktiPenerimaan' => $buktiPenerimaan,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        $path = $request->file('image')->store('bukti_penerimaan', 'public');

        BuktiPenerimaan::create([
            'penerima_id' => $request->penerima_id,
            'image' => $path,
            'sp' => $request->sp,
            'spj_ba2' => $request->spj_ba2,
            'realisasi' => $request->realisasi,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->route('bukti-penerimaan.index');
    }

    public function update(UpdateRequest $request, BuktiPenerimaan $buktiPenerimaan)
    {
        if ($request->hasFile('image')) {
            if ($buktiPenerimaan->image && Storage::disk('public')->exists($buktiPenerimaan->image)) {
                Storage::disk('public')->delete($buktiPenerimaan->image);
            }

            $validated['image'] = $request->file('image')->store('bukti_penerimaan', 'public');
        } else {
            $validated['image'] = $buktiPenerimaan->image;
        }

        $buktiPenerimaan->update([
            'penerima_id' => $request['penerima_id'],
            'image' => $validated['image'],
            'sp' => $request['sp'],
            'spj_ba2' => $request['spj_ba2'],
            'realisasi' => $request['realisasi'],
            'keterangan' => $request['keterangan'],
        ]);

        return redirect()->route('bukti-penerimaan.index');
    }

    public function edit(BuktiPenerimaan $buktiPenerimaan)
    {
        return Inertia::render('BuktiPenerimaan/Update', [
            'buktiPenerimaan' => $buktiPenerimaan,
            'penerima' => Penerima::with(['pengiriman'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('BuktiPenerimaan/Add', [
            'penerima' => Penerima::with(['pengiriman'])->get(),
        ]);
    }
}
