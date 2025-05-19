<?php

namespace App\Http\Requests\KelolaDataObatMasuk;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'id_penerimaan'=> ['required', 'string', 'max:255'],
            'id_obat'=> ['required', 'string', 'max:255'],
            'id_distributor'=> ['required', 'string', 'max:255'],
            'jumlah_masuk'=> ['required', 'integer', 'min:1'],
            'tanggal_masuk'=> ['required', 'date'],
            'nama_distributor'=> ['required', 'string', 'max:255'],
            'petugas_penerima'=> ['required', 'string', 'max:255'],
            'keterangan'=> ['nullable', 'string'],
        ];
    }
}
