<?php

use App\Http\Controllers\DistributorController;
use App\Http\Controllers\KelolaDataObatMasukController;
use App\Http\Controllers\KontrakController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/distributor')->name('distributor.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/create', [DistributorController::class, 'create'])->name('create');
        Route::post('/', [DistributorController::class, 'store'])->name('store');
        Route::put('/{distributor}', [DistributorController::class, 'update'])->name('update');
        Route::delete('/{distributor}', [DistributorController::class, 'destroy'])->name('destroy');
        Route::get('/{distributor}/edit', [DistributorController::class, 'edit'])->name('edit');
        Route::get('/{distributor}', [DistributorController::class, 'show'])->name('show');
        Route::get('/', [DistributorController::class, 'index'])->name('index');
    });
});

Route::prefix('/kontrak')->name('kontrak.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/create', [KontrakController::class, 'create'])->name('create');
        Route::post('/', [KontrakController::class, 'store'])->name('store');
        Route::put('/{kontrak}', [KontrakController::class, 'update'])->name('update');
        Route::delete('/{kontrak}', [KontrakController::class, 'destroy'])->name('destroy');
        Route::get('/{kontrak}/edit', [KontrakController::class, 'edit'])->name('edit');
        Route::get('/{kontrak}', [KontrakController::class, 'show'])->name('show');
        Route::get('/', [KontrakController::class, 'index'])->name('index');
    });
});

require __DIR__.'/auth.php';
