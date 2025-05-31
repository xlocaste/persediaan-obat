<?php

namespace App\Http\Requests\Penerima;

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
            'pengiriman_id' => 'required|exists:pengiriman,id',
            'tanggal' => 'required|date',
            'jumlah' => 'required|integer|min:1',
            'satuan' => 'required|string|max:50',
        ];
    }

    public function messages(): array
    {
        return [
            'pengiriman_id.required' => 'Pengiriman wajib dipilih.',
            'pengiriman_id.exists' => 'Data pengiriman tidak ditemukan.',
            'tanggal.required' => 'Tanggal wajib diisi.',
            'tanggal.date' => 'Format tanggal tidak valid.',
            'jumlah.required' => 'Jumlah wajib diisi.',
            'jumlah.integer' => 'Jumlah harus berupa angka.',
            'jumlah.min' => 'Jumlah minimal 1.',
            'satuan.required' => 'Satuan wajib diisi.',
            'satuan.string' => 'Satuan harus berupa teks.',
            'satuan.max' => 'Satuan maksimal 50 karakter.',
        ];
    }
}
