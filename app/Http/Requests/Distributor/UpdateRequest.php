<?php

namespace App\Http\Requests\Distributor;

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
            'nama_perusahaan' => ['required', 'string', 'max:255'],
            'manager' => ['required', 'string', 'max:255'],
            'alamat' => ['required', 'string'],
            'no_rek' => ['required', 'string', 'max:100'],
            'npwp' => ['required', 'string', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_perusahaan.required' => 'Nama perusahaan wajib diisi.',
            'nama_perusahaan.string' => 'Nama perusahaan harus berupa teks.',
            'nama_perusahaan.max' => 'Nama perusahaan maksimal 255 karakter.',
            'manager.required' => 'Nama manager wajib diisi.',
            'manager.string' => 'Nama manager harus berupa teks.',
            'manager.max' => 'Nama manager maksimal 255 karakter.',
            'alamat.required' => 'Alamat wajib diisi.',
            'alamat.string' => 'Alamat harus berupa teks.',
            'no_rek.required' => 'Nomor rekening wajib diisi.',
            'no_rek.string' => 'Nomor rekening harus berupa teks.',
            'no_rek.max' => 'Nomor rekening maksimal 100 karakter.',
            'npwp.required' => 'NPWP wajib diisi.',
            'npwp.string' => 'NPWP harus berupa teks.',
            'npwp.max' => 'NPWP maksimal 100 karakter.',
        ];
    }
}
