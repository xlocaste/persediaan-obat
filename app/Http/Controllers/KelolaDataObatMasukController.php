<?php

namespace App\Http\Controllers;

use App\Http\Requests\KelolaDataObatMasuk\StoreRequest;
use App\Http\Requests\KelolaDataObatMasuk\UpdateRequest;
use App\Models\KelolaDataObatMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
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

    public function update(UpdateRequest $request, KelolaDataObatMasuk $kelolaDataObatMasuk)
    {
        $kelolaDataObatMasuk->update([
            'id_penerimaan'    => $request->id_penerimaan,
            'id_obat'          => $request->id_obat,
            'id_distributor'   => $request->id_distributor,
            'jumlah_masuk'     => $request->jumlah_masuk,
            'tanggal_masuk'    => $request->tanggal_masuk,
            'nama_distributor' => $request->nama_distributor,
            'petugas_penerima' => $request->petugas_penerima,
            'keterangan'       => $request->keterangan,
        ]);

        return Inertia::location(route('kelola-data-obat-masuk.index'));
    }

    public function destroy(KelolaDataObatMasuk $kelolaDataObatMasuk)
    {
        $kelolaDataObatMasuk->delete();

        return Redirect::route('kelola-data-obat-masuk.index')->with('message', 'Data berhasil dihapus');
    }

    public function edit(KelolaDataObatMasuk $kelolaDataObatMasuk)
    {
        return Inertia::render('KelolaDataObatMasuk/Update', [
            'KelolaDataObatMasuk' => $kelolaDataObatMasuk
        ]);
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
