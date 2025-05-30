<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kontrak extends Model
{
    use HasFactory;

    protected $table = 'kontrak';

    protected $fillable = [
        'distributor_id',
        'no_id_paket',
        'nama_penyedia',
        'no_tanggal_kontrak',
        'nilai_kontrak',
        'tanggal_mulai_kontrak',
        'tanggal_berakhir_kontrak',
        'masa_kontrak',
    ];

    protected $casts = [
        'nilai_kontrak' => 'decimal:2',
        'tanggal_mulai_kontrak' => 'date',
        'tanggal_berakhir_kontrak' => 'date',
    ];

    public function distributor()
    {
        return $this->belongsTo(Distributor::class);
    }
}
