<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBookingRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'travels' => 'required|array|min:1',
            'travels.*.travelId' => 'required|string',
            'travels.*.passengers' => 'required|array|min:1',
            'travels.*.passengers.*.name' => 'required|string',
            'travels.*.passengers.*.travelDocument' => 'required|string',
            'travels.*.passengers.*.travelDocumentType' => 'required|string',
            'travels.*.passengers.*.seatNumber' => 'required|string',
            'travels.*.passengers.*.birthDate' => 'required|string',
        ];
    }
}
