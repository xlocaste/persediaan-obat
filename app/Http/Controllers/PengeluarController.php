<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pengeluar\StoreRequest;
use App\Http\Requests\Pengeluar\UpdateRequest;
use App\Models\Pengeluar;
use App\Models\StokObat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Spatie\Browsershot\Browsershot;

class PengeluarController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengeluar::with('stokObat.penerima.pengiriman');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where('nama_barang', 'like', "%$search%")
                ->orWhere('nama_tujuan', 'like', "%$search%")
                ->orWhereHas('stokObat.penerima.pengiriman', function ($q) use ($search) {
                    $q->where('nama_barang', 'like', "%$search%");
                });
        }

        $daftarPengeluar = $query->get();

        return Inertia::render('Pengeluar/List', [
            'daftarPengeluar' => $daftarPengeluar,
            'filters' => $request->only('search'),
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Pengeluar/Add', [
            'stokObat' => StokObat::with('penerima')->get(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $stokObat = StokObat::find($request->stok_obat_id);

        if (!$stokObat) {
            return redirect()->back()
                ->with('error', 'Stok obat tidak ditemukan.')
                ->withInput();
        }

        if ($stokObat->jumlah < $request->jumlah) {
            return redirect()->back()
                ->with('error', 'Stok tidak mencukupi untuk pengeluaran ini.')
                ->withInput();
        }

        DB::transaction(function () use ($stokObat, $request) {
            $stokObat->jumlah -= $request->jumlah;
            $stokObat->save();

            Pengeluar::create([
                'stok_obat_id' => $stokObat->id,
                'nama_tujuan' => $request->nama_tujuan,
                'nama_barang' => $request->nama_barang,
                'jumlah' => $request->jumlah,
            ]);
        });

        return redirect()->route('pengeluar.index')
            ->with('success', 'Pengeluaran berhasil disimpan.');
    }


    public function edit(Pengeluar $pengeluar)
    {
        return Inertia::render('Pengeluar/Update', [
            'pengeluar' => $pengeluar,
            'stokObat' => StokObat::with('penerima.pengiriman.pemesanan')->get(),
        ]);
    }

    public function update(UpdateRequest $request, Pengeluar $pengeluar)
    {
        DB::transaction(function () use ($request, $pengeluar) {
            $selisih = $request->jumlah - $pengeluar->jumlah;

            if ($selisih > 0) {
                $stokObat = StokObat::findOrFail($request->stok_obat_id);
                if ($stokObat->jumlah < $selisih) {
                    throw new \Exception('Stok tidak cukup untuk perubahan jumlah.');
                }
                $stokObat->jumlah -= $selisih;
                $stokObat->save();
            } elseif ($selisih < 0) {
                $stokObat = StokObat::findOrFail($request->stok_obat_id);
                $stokObat->jumlah += abs($selisih);
                $stokObat->save();
            }

            $pengeluar->update([
                'stok_obat_id' => $request->stok_obat_id,
                'nama_tujuan' => $request->nama_tujuan,
                'nama_barang' => $request->nama_barang,
                'jumlah' => $request->jumlah,
            ]);
        });

        return redirect()->route('pengeluar.index');
    }

    public function destroy(Pengeluar $pengeluar)
    {
        DB::transaction(function () use ($pengeluar) {
            $stokObat = StokObat::findOrFail($pengeluar->stok_obat_id);
            $stokObat->jumlah += $pengeluar->jumlah;
            $stokObat->save();

            $pengeluar->delete();
        });

        return redirect()->route('pengeluar.index')
            ->with('success', 'Data pengeluar berhasil dihapus dan stok dikembalikan.');
    }

    public function print()
    {
        $daftarPengeluar = Pengeluar::with('stokObat.penerima.pengiriman.pemesanan')->get();

        $html = view('pdf.pengeluar', [
            'daftarPengeluar' => $daftarPengeluar
        ])->render();

        $filename = 'pengeluar-' . now()->format('Ymd_His') . '.pdf';
        $pdfPath = storage_path("app/public/{$filename}");

        Browsershot::html($html)
            ->waitUntilNetworkIdle()
            ->format('A4')
            ->margins(10, 10, 10, 10)
            ->savePdf($pdfPath);

        return response()->file($pdfPath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="'.$filename.'"',
        ])->deleteFileAfterSend(true);
    }
}
