<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Staff Penerima',
            'email' => 'penerima@example.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Staff Pengeluar',
            'email' => 'pengeluar@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
