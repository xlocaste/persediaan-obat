<?php

namespace App\Http\Controllers;

use App\Http\Requests\Kontrak\StoreRequest;
use App\Http\Requests\Kontrak\UpdateRequest;
use App\Models\Distributor;
use App\Models\Kontrak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KontrakController extends Controller
{
    public function index()
    {
        $daftarKontrak = Kontrak::all();

        return Inertia::render('Kontrak/List', [
            'kontrak' => $daftarKontrak,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        Kontrak::create([
            'distributor_id' => $request->distributor_id,
            'no_id_paket' => $request->no_id_paket,
            'nama_penyedia' => $request->nama_penyedia,
            'no_tanggal_kontrak' => $request->no_tanggal_kontrak,
            'nilai_kontrak' => $request->nilai_kontrak,
            'tanggal_mulai_kontrak' => $request->tanggal_mulai_kontrak,
            'tanggal_berakhir_kontrak' => $request->tanggal_berakhir_kontrak,
            'masa_kontrak' => $request->masa_kontrak,
        ]);

        return redirect()->route('kontrak.index');
    }

    public function update(UpdateRequest $request, Kontrak $kontrak)
    {
        $kontrak->update([
            'distributor_id' => $request->distributor_id,
            'no_id_paket' => $request->no_id_paket,
            'nama_penyedia' => $request->nama_penyedia,
            'no_tanggal_kontrak' => $request->no_tanggal_kontrak,
            'nilai_kontrak' => $request->nilai_kontrak,
            'tanggal_mulai_kontrak' => $request->tanggal_mulai_kontrak,
            'tanggal_berakhir_kontrak' => $request->tanggal_berakhir_kontrak,
            'masa_kontrak' => $request->masa_kontrak,
        ]);

        return redirect()->route('kontrak.index');
    }

    public function edit(Kontrak $kontrak)
    {
        return Inertia::render('Kontrak/Update', [
            'kontrak' => $kontrak,
            'distributor' => Distributor::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Kontrak/Add', [
            'distributor' => Distributor::all()
        ]);
    }
}
