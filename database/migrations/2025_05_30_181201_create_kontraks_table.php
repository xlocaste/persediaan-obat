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
        Schema::create('kontrak', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('distributor_id');
            $table->string('no_id_paket');
            $table->string('nama_penyedia');
            $table->string('no_tanggal_kontrak');
            $table->decimal('nilai_kontrak', 15, 2);
            $table->date('tanggal_mulai_kontrak');
            $table->date('tanggal_berakhir_kontrak');
            $table->string('masa_kontrak');
            $table->timestamps();

            $table->foreign('distributor_id')->references('id')->on('distributor');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontrak');
    }
};
