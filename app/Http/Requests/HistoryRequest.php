<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;
use App\Models\Shop;

class HistoryRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the post request.
     *
     * @return array
     */
    public function store()
    {
        return [
            'userID' => 'required|max:120|exists:users,id',
            'score' => 'required|max:250',
        ];
    }

    /**
     * Get the validation rules that apply to the put/patch request.
     *
     * @return array
     */
    // public function update()
    // {
    //     // return [
    //     //     'id' => 'required|exists:outlets,id',
    //     //     'outletName' => ['required', 'max:250', Rule::unique('outlets', 'outletName')->ignore($this->id)],
    //     //     'address' => 'required|max:250',
    //     //     'city' => 'required|max:120',
    //     //     'country' => 'required',
    //     //     'status' => 'in:Active,Inactive'
    //     // ];
    // }

    /**
     * Get the validation rules that apply to the delete request.
     *
     * @return array
     */
    // public function destroy()
    // {
    //     return [
    //         'id' => [Rule::exists('outlets', 'id')]
    //     ];
    // }

}
