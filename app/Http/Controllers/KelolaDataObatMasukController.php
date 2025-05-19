<?php

namespace App\Http\Controllers;

use App\Models\KelolaDataObatMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
}
