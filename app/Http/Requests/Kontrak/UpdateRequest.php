<?php

namespace App\Http\Requests\Kontrak;

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
            'distributor_id' => ['required', 'exists:distributor,id'],
            'no_id_paket' => ['required', 'string', 'max:255'],
            'nama_penyedia' => ['required', 'string', 'max:255'],
            'no_tanggal_kontrak' => ['required', 'string', 'max:255'],
            'nilai_kontrak' => ['required', 'numeric', 'min:0'],
            'tanggal_mulai_kontrak' => ['required', 'date'],
            'tanggal_berakhir_kontrak' => ['required', 'date', 'after_or_equal:tanggal_mulai_kontrak'],
            'masa_kontrak' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'distributor_id.required' => 'Distributor harus dipilih.',
            'distributor_id.exists' => 'Distributor tidak valid.',
            'no_id_paket.required' => 'Nomor ID Paket wajib diisi.',
            'nama_penyedia.required' => 'Nama penyedia wajib diisi.',
            'no_tanggal_kontrak.required' => 'Nomor dan tanggal kontrak wajib diisi.',
            'nilai_kontrak.required' => 'Nilai kontrak wajib diisi.',
            'nilai_kontrak.numeric' => 'Nilai kontrak harus berupa angka.',
            'tanggal_mulai_kontrak.required' => 'Tanggal mulai kontrak wajib diisi.',
            'tanggal_berakhir_kontrak.required' => 'Tanggal berakhir kontrak wajib diisi.',
            'tanggal_berakhir_kontrak.after_or_equal' => 'Tanggal berakhir harus setelah atau sama dengan tanggal mulai.',
            'masa_kontrak.required' => 'Masa kontrak wajib diisi.',
        ];
    }
}
