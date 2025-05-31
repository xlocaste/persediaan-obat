<?php

namespace App\Http\Controllers;

use App\Models\BuktiPenerimaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BuktiPenerimaanController extends Controller
{
    public function index()
    {
        $buktiPenerimaan = BuktiPenerimaan::with('penerima.pengiriman.pemesanan.kontrak')->get();

        return Inertia::render('BuktiPenerimaan/List', [
            'buktiPenerimaan' => $buktiPenerimaan,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
