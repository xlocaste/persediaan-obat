<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemesanan extends Model
{
    use HasFactory;

    protected $table = 'pemesanan';

    protected $fillable = [
        'kontrak_id',
        'nama_barang',
        'jumlah',
        'satuan',
    ];

    public function kontrak()
    {
        return $this->belongsTo(Kontrak::class);
    }
}
