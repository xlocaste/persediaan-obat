<?php

namespace App\Http\Requests\Pengeluar;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'stok_obat_id' => ['required', 'exists:stok_obat,id'],
            'nama_tujuan' => ['required', 'string', 'max:255'],
            'nama_barang' => ['required', 'string', 'max:255'],
            'jumlah' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages()
    {
        return [
            'stok_obat_id.required' => 'Stok obat wajib dipilih.',
            'stok_obat_id.exists' => 'Stok obat tidak valid.',
            'nama_tujuan.required' => 'Nama tujuan wajib diisi.',
            'nama_barang.required' => 'Nama barang wajib diisi.',
            'jumlah.required' => 'Jumlah wajib diisi.',
            'jumlah.integer' => 'Jumlah harus berupa angka.',
            'jumlah.min' => 'Jumlah minimal 1.',
        ];
    }
}
