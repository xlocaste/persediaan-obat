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
        Schema::create('bukti_penerimaan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('penerima_id');
            $table->string('image');
            $table->string('sp');
            $table->string('spj_ba2');
            $table->string('realisasi');
            $table->text('keterangan');
            $table->timestamps();

            $table->foreign('penerima_id')->references('id')->on('penerima');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukti_penerimaan');
    }
};
