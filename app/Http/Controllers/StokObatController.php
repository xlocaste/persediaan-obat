<?php

namespace App\Http\Controllers;

use App\Models\StokObat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StokObatController extends Controller
{
    public function index(Request $request)
    {
        $query = StokObat::with('penerima.pengiriman.kontrak');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where('tanggal', 'like', "%$search%")
                ->orWhere('satuan', 'like', "%$search%")
                ->orWhereHas('penerima.pengiriman', function ($q) use ($search) {
                    $q->where('nama_barang', 'like', "%$search%");
                });
        }

        $stokObat = $query->get();

        return Inertia::render('StokObat/List', [
            'stokObat' => $stokObat,
            'filters' => $request->only('search'),
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
