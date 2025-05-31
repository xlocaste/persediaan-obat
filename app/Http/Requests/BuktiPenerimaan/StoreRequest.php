<?php

namespace App\Http\Requests\BuktiPenerimaan;

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
            'penerima_id' => ['required', 'exists:penerima,id'],
            'image' => ['required', 'image', 'max:2048'],
            'sp' => ['required', 'string', 'max:255'],
            'spj_ba2' => ['required', 'string', 'max:255'],
            'realisasi' => ['required', 'string', 'max:255'],
            'keterangan' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'penerima_id.required' => 'Penerima harus dipilih.',
            'penerima_id.exists' => 'Penerima tidak ditemukan.',
            'image.required' => 'Gambar bukti harus diunggah.',
            'image.image' => 'File harus berupa gambar.',
            'image.max' => 'Ukuran gambar maksimal 2MB.',
            'sp.required' => 'Field SP wajib diisi.',
            'spj_ba2.required' => 'Field SPJ/BA-2 wajib diisi.',
            'realisasi.required' => 'Field realisasi wajib diisi.',
            'keterangan.required' => 'Keterangan wajib diisi.',
        ];
    }
}
