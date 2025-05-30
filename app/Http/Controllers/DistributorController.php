<?php

namespace App\Http\Controllers;

use App\Http\Requests\Distributor\StoreRequest;
use App\Http\Requests\Distributor\UpdateRequest;
use App\Models\Distributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DistributorController extends Controller
{
    public function index()
    {
        $daftarDistributor = Distributor::all();

        return Inertia::render('Distributor/List', [
            'distributor' => $daftarDistributor,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        Distributor::create([
            'nama_perusahaan' => $request->nama_perusahaan,
            'manager' => $request->manager,
            'alamat' => $request->alamat,
            'no_rek' => $request->no_rek,
            'npwp' => $request->npwp,
        ]);

        return redirect()->route('distributor.index');
    }

    public function update(UpdateRequest $request, Distributor $distributor)
    {
        $distributor->update([
            'nama_perusahaan' => $request->nama_perusahaan,
            'manager' => $request->manager,
            'alamat' => $request->alamat,
            'no_rek' => $request->no_rek,
            'npwp' => $request->npwp,
        ]);

        return redirect()->route('distributor.index');
    }

    public function destroy(Distributor $distributor)
    {
        $distributor->delete();

        return Redirect::route('distributor.index')->with('message', 'Data berhasil dihapus');
    }

    public function edit(Distributor $distributor)
    {
        return Inertia::render('Distributor/Update', [
            'distributor' => $distributor
        ]);
    }

    public function create()
    {
        return Inertia::render('Distributor/Add');
    }
}
