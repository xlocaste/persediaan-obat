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
    public function index(Request $request)
    {
        $query = BuktiPenerimaan::with('penerima.pengiriman.kontrak');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where('sp', 'like', "%$search%")
                ->orWhere('spj_ba2', 'like', "%$search%")
                ->orWhere('realisasi', 'like', "%$search%")
                ->orWhere('keterangan', 'like', "%$search%")
                ->orWhereHas('penerima.pengiriman', function ($q) use ($search) {
                    $q->where('no_faktur', 'like', "%$search%");
                });
        }

        $buktiPenerimaan = $query->get();

        return Inertia::render('BuktiPenerimaan/List', [
            'buktiPenerimaan' => $buktiPenerimaan,
            'filters' => $request->only('search'),
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

    public function destroy(BuktiPenerimaan $buktiPenerimaan)
    {
        $buktiPenerimaan->delete();

        return redirect()->route('bukti-penerimaan.index')->with('message', 'Data bukti pengiriman berhasil dihapus.');
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
