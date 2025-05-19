<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaDataObatMasuk extends Model
{
    use HasFactory;

    protected $table = 'kelola_data_obat_masuk';

    protected $fillable = [
        'id_penerimaan',
        'id_obat',
        'id_distributor',
        'jumlah_masuk',
        'tanggal_masuk',
        'nama_distributor',
        'petugas_penerima',
        'keterangan',
    ];
}
