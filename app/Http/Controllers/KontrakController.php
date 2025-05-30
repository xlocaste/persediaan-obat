<?php

namespace App\Http\Controllers;

use App\Models\Kontrak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KontrakController extends Controller
{
    public function index()
    {
        $daftarKontrak = Kontrak::all();

        return Inertia::render('Kontrak/List', [
            'kontrak' => $daftarKontrak,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
