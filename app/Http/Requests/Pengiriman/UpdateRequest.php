<?php

namespace App\Http\Requests\Pengiriman;

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
            'pemesanan_id' => 'required|exists:pemesanan,id',
            'tanggal' => 'required|date',
            'no_faktur' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'satuan' => 'required|string|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'pemesanan_id.required' => 'Pemesanan wajib dipilih.',
            'pemesanan_id.exists' => 'Pemesanan yang dipilih tidak valid.',
            'tanggal.required' => 'Tanggal pengiriman wajib diisi.',
            'tanggal.date' => 'Format tanggal pengiriman tidak valid.',
            'no_faktur.required' => 'No Faktur wajib diisi.',
            'no_faktur.string' => 'No Faktur harus berupa teks.',
            'no_faktur.max' => 'No Faktur maksimal 255 karakter.',
            'jumlah.required' => 'Jumlah wajib diisi.',
            'jumlah.integer' => 'Jumlah harus berupa angka.',
            'jumlah.min' => 'Jumlah minimal 1.',
            'satuan.required' => 'Satuan wajib diisi.',
            'satuan.string' => 'Satuan harus berupa teks.',
            'satuan.max' => 'Satuan maksimal 100 karakter.',
        ];
    }
}
