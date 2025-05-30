<?php

namespace App\Http\Controllers;

use App\Http\Requests\Distributor\StoreRequest;
use App\Models\Distributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function create()
    {
        return Inertia::render('Distributor/Add');
    }
}
