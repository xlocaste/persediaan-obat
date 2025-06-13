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
        Schema::table('pengeluar', function (Blueprint $table) {
            $table->dropForeign(['pemesanan_id']);
            $table->dropColumn('pemesanan_id');

            $table->unsignedBigInteger('stok_obat_id')->after('id');
            $table->foreign('stok_obat_id')->references('id')->on('stok_obat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengeluar', function (Blueprint $table) {
            $table->dropForeign(['stok_obat_id']);
            $table->dropColumn('stok_obat_id');

            $table->unsignedBigInteger('pemesanan_id')->after('id');
            $table->foreign('pemesanan_id')->references('id')->on('pemesanan');
        });
    }
};
