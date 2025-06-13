<?php

use App\Http\Controllers\BuktiPenerimaanController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\KelolaDataObatMasukController;
use App\Http\Controllers\KontrakController;
use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PenerimaController;
use App\Http\Controllers\PengeluarController;
use App\Http\Controllers\PengirimanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StokObatController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/distributor')->name('distributor.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/create', [DistributorController::class, 'create'])->name('create');
        Route::post('/', [DistributorController::class, 'store'])->name('store');
        Route::put('/{distributor}', [DistributorController::class, 'update'])->name('update');
        Route::delete('/{distributor}', [DistributorController::class, 'destroy'])->name('destroy');
        Route::get('/{distributor}/edit', [DistributorController::class, 'edit'])->name('edit');
        Route::get('/{distributor}', [DistributorController::class, 'show'])->name('show');
        Route::get('/', [DistributorController::class, 'index'])->name('index');
    });
});

Route::prefix('/kontrak')->name('kontrak.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/create', [KontrakController::class, 'create'])->name('create');
        Route::post('/', [KontrakController::class, 'store'])->name('store');
        Route::put('/{kontrak}', [KontrakController::class, 'update'])->name('update');
        Route::delete('/{kontrak}', [KontrakController::class, 'destroy'])->name('destroy');
        Route::get('/{kontrak}/edit', [KontrakController::class, 'edit'])->name('edit');
        Route::get('/{kontrak}', [KontrakController::class, 'show'])->name('show');
        Route::get('/', [KontrakController::class, 'index'])->name('index');
    });
});

Route::prefix('/pemesanan')->name('pemesanan.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/create', [PemesananController::class, 'create'])->name('create');
        Route::post('/', [PemesananController::class, 'store'])->name('store');
        Route::put('/{pemesanan}', [PemesananController::class, 'update'])->name('update');
        Route::delete('/{pemesanan}', [PemesananController::class, 'destroy'])->name('destroy');
        Route::get('/{pemesanan}/edit', [PemesananController::class, 'edit'])->name('edit');
        Route::get('/{pemesanan}', [PemesananController::class, 'show'])->name('show');
        Route::get('/', [PemesananController::class, 'index'])->name('index');
    });
});

Route::prefix('/pengiriman')->name('pengiriman.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/create', [PengirimanController::class, 'create'])->name('create');
        Route::post('/', [PengirimanController::class, 'store'])->name('store');
        Route::put('/{pengiriman}', [PengirimanController::class, 'update'])->name('update');
        Route::delete('/{pengiriman}', [PengirimanController::class, 'destroy'])->name('destroy');
        Route::get('/{pengiriman}/edit', [PengirimanController::class, 'edit'])->name('edit');
        Route::get('/{pengiriman}', [PengirimanController::class, 'show'])->name('show');
        Route::get('/', [PengirimanController::class, 'index'])->name('index');
    });
});

Route::prefix('/penerima')->name('penerima.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/create', [PenerimaController::class, 'create'])->name('create');
        Route::post('/', [PenerimaController::class, 'store'])->name('store');
        Route::put('/{penerima}', [PenerimaController::class, 'update'])->name('update');
        Route::delete('/{penerima}', [PenerimaController::class, 'destroy'])->name('destroy');
        Route::get('/{penerima}/edit', [PenerimaController::class, 'edit'])->name('edit');
        Route::get('/{penerima}', [PenerimaController::class, 'show'])->name('show');
        Route::get('/', [PenerimaController::class, 'index'])->name('index');
    });
});

Route::prefix('/bukti-penerimaan')->name('bukti-penerimaan.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/create', [BuktiPenerimaanController::class, 'create'])->name('create');
        Route::post('/', [BuktiPenerimaanController::class, 'store'])->name('store');
        Route::put('/{buktiPenerimaan}', [BuktiPenerimaanController::class, 'update'])->name('update');
        Route::delete('/{buktiPenerimaan}', [BuktiPenerimaanController::class, 'destroy'])->name('destroy');
        Route::get('/{buktiPenerimaan}/edit', [BuktiPenerimaanController::class, 'edit'])->name('edit');
        Route::get('/{buktiPenerimaan}', [BuktiPenerimaanController::class, 'show'])->name('show');
        Route::get('/', [BuktiPenerimaanController::class, 'index'])->name('index');
    });
});

Route::prefix('/pengeluar')->name('pengeluar.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/create', [PengeluarController::class, 'create'])->name('create');
        Route::post('/', [PengeluarController::class, 'store'])->name('store');
        Route::put('/{pengeluar}', [PengeluarController::class, 'update'])->name('update');
        Route::delete('/{pengeluar}', [PengeluarController::class, 'destroy'])->name('destroy');
        Route::get('/{pengeluar}/edit', [PengeluarController::class, 'edit'])->name('edit');
        Route::get('/{pengeluar}', [PengeluarController::class, 'show'])->name('show');
        Route::get('/', [PengeluarController::class, 'index'])->name('index');
    });
});

Route::prefix('/stok-obat')->name('stok-obat.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [StokObatController::class, 'index'])->name('index');
    });
});
require __DIR__ . '/auth.php';
