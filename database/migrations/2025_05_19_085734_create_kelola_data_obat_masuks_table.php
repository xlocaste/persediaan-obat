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
        Schema::create('kelola_data_obat_masuk', function (Blueprint $table) {
            $table->id();
            $table->string('id_penerimaan');
            $table->string('id_obat');
            $table->string('id_distributor');
            $table->integer('jumlah_masuk');
            $table->date('tanggal_masuk');
            $table->string('nama_distributor');
            $table->string('petugas_penerima');
            $table->text('keterangan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelola_data_obat_masuk');
    }
};
