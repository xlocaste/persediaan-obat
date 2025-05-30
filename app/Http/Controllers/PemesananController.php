<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function index()
    {
        $pemesanan = Pemesanan::with('kontrak')->get();

        return Inertia::render('Pemesanan/List', [
            'pemesanan' => $pemesanan,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
