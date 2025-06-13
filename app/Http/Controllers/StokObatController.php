<?php

namespace App\Http\Controllers;

use App\Models\StokObat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StokObatController extends Controller
{
    public function index()
    {
        $stokObat = StokObat::with('penerima.pengiriman.pemesanan.kontrak')->get();

        return Inertia::render('StokObat/List', [
            'stokObat' => $stokObat,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
