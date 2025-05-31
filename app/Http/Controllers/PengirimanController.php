<?php

namespace App\Http\Controllers;

use App\Models\Pengiriman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PengirimanController extends Controller
{
    public function index()
    {
        $pengiriman = Pengiriman::with('pemesanan')->get();

        return Inertia::render('Pengiriman/List', [
            'pengiriman' => $pengiriman,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
