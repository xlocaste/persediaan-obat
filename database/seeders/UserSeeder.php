<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roleStaff = Role::firstOrCreate(['name' => 'staff']);
        $rolePimpinan = Role::firstOrCreate(['name' => 'pimpinan']);

        $staff = User::firstOrCreate([
            'email' => 'staff@example.com',
        ], [
            'name' => 'Staff Penerima',
            'password' => Hash::make('password'),
        ]);
        $staff->assignRole($roleStaff);

        $pimpinan = User::firstOrCreate([
            'email' => 'pimpinan@example.com',
        ], [
            'name' => 'Pimpinan',
            'password' => Hash::make('password'),
        ]);
        $pimpinan->assignRole($rolePimpinan);
    }
}
