<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LiveStreamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'isLive' => filter_var($this->input('isLive'), FILTER_VALIDATE_BOOLEAN),
        ]);
    }

    public function rules(): array
    {
        return [
            'isLive'  => 'required|boolean',
            'title'   => 'required|string|max:255',
            'videoUrl' => 'required|string|max:255'
        ];
    }
}
