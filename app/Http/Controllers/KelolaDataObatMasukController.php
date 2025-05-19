<?php

namespace App\Http\Controllers;

use App\Http\Requests\KelolaDataObatMasuk\StoreRequest;
use App\Models\KelolaDataObatMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaDataObatMasukController extends Controller
{
    public function index()
    {
        $daftarKDOM = KelolaDataObatMasuk::paginate(5);

        return Inertia::render('KelolaDataObatMasuk/List', [
            'KDOM' => $daftarKDOM,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        KelolaDataObatMasuk::create([
            'id_penerimaan'    => $request->id_penerimaan,
            'id_obat'          => $request->id_obat,
            'id_distributor'   => $request->id_distributor,
            'jumlah_masuk'     => $request->jumlah_masuk,
            'tanggal_masuk'    => $request->tanggal_masuk,
            'nama_distributor' => $request->nama_distributor,
            'petugas_penerima' => $request->petugas_penerima,
            'keterangan'       => $request->keterangan,
        ]);

        return redirect()->route('kelola-data-obat-masuk.index');
    }

    public function show($kelolaDataObatMasuk)
    {
        $kelolaDataObatMasuk = KelolaDataObatMasuk::findOrFail($kelolaDataObatMasuk);

        return Inertia::render('KelolaDataObatMasuk/Detail', [
            'KelolaDataObatMasuk' => $kelolaDataObatMasuk
        ]);
    }

    public function create()
    {
        return Inertia::render('KelolaDataObatMasuk/Add');
    }
}
