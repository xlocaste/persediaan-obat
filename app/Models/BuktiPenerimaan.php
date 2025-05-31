<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuktiPenerimaan extends Model
{
    use HasFactory;

    protected $table = 'bukti_penerimaan';

    protected $fillable = [
        'penerima_id',
        'image',
        'sp',
        'spj_ba2',
        'realisasi',
        'keterangan',
    ];

    public function penerima()
    {
        return $this->belongsTo(Penerima::class);
    }
}
