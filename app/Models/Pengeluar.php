<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengeluar extends Model
{
    use HasFactory;

    protected $table = 'pengeluar';

    protected $fillable = [
        'stok_obat_id',
        'nama_tujuan',
        'nama_barang',
        'jumlah',
    ];

    public function stokObat()
    {
        return $this->belongsTo(StokObat::class);
    }
}
