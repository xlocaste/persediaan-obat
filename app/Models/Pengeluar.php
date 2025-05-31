<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengeluar extends Model
{
    use HasFactory;

    protected $table = 'pengeluar';

    protected $fillable = [
        'pemesanan_id',
        'nama_tujuan',
        'nama_barang',
        'jumlah',
    ];

    public function pemesanan()
    {
        return $this->belongsTo(Pemesanan::class);
    }
}
