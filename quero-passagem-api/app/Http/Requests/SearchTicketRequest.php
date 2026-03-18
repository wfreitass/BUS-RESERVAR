<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchTicketRequest extends FormRequest
{
    /**
     * Determina se o usuário está autorizado a fazer este pedido.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Regras de validação para a busca de passagens.
     */
    public function rules(): array
    {
        return [
            'origin_id'         => 'required|string',
            'origin_state'      => 'required|string|size:2|in:SP,PR,sp,pr',
            'destination_id'    => 'required|string',
            'destination_state' => 'required|string|size:2|in:SP,PR,sp,pr',
            'date'              => 'required|date_format:Y-m-d'
        ];
    }

    public function messages()
    {
        return [
            'origin_state.in'        => 'Busca permitida somente para cidades e rodoviárias de SP e PR.',
            'destination_state.in'   => 'Busca permitida somente para cidades e rodoviárias de SP e PR.',
            'origin_state.size'      => 'O estado de origem deve ter 2 caracteres.',
            'destination_state.size' => 'O estado de destino deve ter 2 caracteres.',
            'date.date_format'       => 'O formato da data deve ser YYYY-MM-DD.'
        ];
    }
}
