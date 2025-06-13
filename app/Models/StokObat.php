<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StokObat extends Model
{
    use HasFactory;

    protected $table = 'stok_obat';

    protected $fillable = [
        'penerima_id',
        'tanggal',
        'jumlah',
        'satuan',
    ];

    public function penerima()
    {
        return $this->belongsTo(Penerima::class);
    }
}
