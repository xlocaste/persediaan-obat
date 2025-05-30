<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distributor extends Model
{
    use HasFactory;

    protected $table = 'distributor';

    protected $fillable = [
        'nama_perusahaan',
        'manager',
        'alamat',
        'no_rek',
        'npwp',
    ];

}
