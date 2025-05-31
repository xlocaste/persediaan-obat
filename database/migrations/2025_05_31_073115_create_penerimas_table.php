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
        Schema::create('penerima', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pengiriman_id');
            $table->date('tanggal');
            $table->integer('jumlah');
            $table->string('satuan');
            $table->timestamps();

            $table->foreign('pengiriman_id')->references('id')->on('pengiriman');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penerima');
    }
};
