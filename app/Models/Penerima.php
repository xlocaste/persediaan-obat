<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penerima extends Model
{
    use HasFactory;

    protected $table = 'penerima';

    protected $fillable = [
        'pengiriman_id',
        'tanggal',
        'jumlah',
        'satuan',
    ];

    public function pengiriman()
    {
        return $this->belongsTo(Pengiriman::class);
    }
}
