<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengiriman extends Model
{
    use HasFactory;

    protected $table = 'pengiriman';

    protected $fillable = [
        'kontrak_id',
        'tanggal',
        'no_faktur',
        'nama_barang',
        'jumlah',
        'satuan',
    ];

    public function kontrak()
    {
        return $this->belongsTo(Kontrak::class);
    }
}
