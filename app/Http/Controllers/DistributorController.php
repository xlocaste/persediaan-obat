<?php

namespace App\Http\Controllers;

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
}
