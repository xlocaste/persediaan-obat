<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengiriman', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kontrak_id');
            $table->date('tanggal');
            $table->string('nama_barang');
            $table->string('no_faktur');
            $table->integer('jumlah');
            $table->string('satuan');
            $table->timestamps();

            $table->foreign('kontrak_id')->references('id')->on('kontrak');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengiriman');
    }
};
