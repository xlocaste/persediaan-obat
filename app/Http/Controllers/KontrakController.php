<?php

namespace App\Http\Controllers;

use App\Http\Requests\Kontrak\StoreRequest;
use App\Http\Requests\Kontrak\UpdateRequest;
use App\Models\Distributor;
use App\Models\Kontrak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class KontrakController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $daftarKontrak = Kontrak::with('distributor')
            ->when($search, function ($query, $search) {
                $query->where('no_id_paket', 'like', "%{$search}%")
                    ->orWhere('nama_penyedia', 'like', "%{$search}%")
                    ->orWhereHas('distributor', function ($q) use ($search) {
                        $q->where('nama_perusahaan', 'like', "%{$search}%");
                    });
            })
            ->get();

        return Inertia::render('Kontrak/List', [
            'kontrak' => $daftarKontrak,
            'filters' => [
                'search' => $search,
            ],
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

    public function destroy(Kontrak $kontrak)
    {
        $kontrak->delete();

        return Redirect::route('kontrak.index')->with('message', 'Data kontrak berhasil dihapus.');
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
