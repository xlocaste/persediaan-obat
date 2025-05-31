<?php

namespace App\Http\Controllers;

use App\Models\Penerima;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PenerimaController extends Controller
{
    public function index()
    {
        $penerima = Penerima::with('pengiriman.pemesanan.kontrak')->get();

        return Inertia::render('Penerima/List', [
            'penerima' => $penerima,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
