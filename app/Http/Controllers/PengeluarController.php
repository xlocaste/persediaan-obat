<?php

namespace App\Http\Controllers;

use App\Models\Pengeluar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PengeluarController extends Controller
{
    public function index()
    {
        $daftarPengeluar = Pengeluar::with('pemesanan')->get();

        return Inertia::render('Pengeluar/List', [
            'daftarPengeluar' => $daftarPengeluar,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
