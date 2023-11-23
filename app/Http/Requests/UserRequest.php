<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Support\Facades\Auth;

class UserRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the post request.
     *
     * @return array
     */
    public function store()
    {
        return [
            'name' => 'required',
            'email' => 'required|email:rfc,dns|unique:users',
            'password' => 'required|confirmed|min:8',
        ];
    }

    /**
     * Get the validation rules that apply to the put/patch request.
     *
     * @return array
     */
    // public function update()
    // {
    //     return [
    //         'id' => 'required|exists:users',
    //         'name' => 'required',
    //         'email' => 'required|email:rfc,dns|unique:users,email,' . $this->id,
    //         'mobile' => 'required|numeric|min:10',
    //         'role' => 'required',
    //         'outletId' => 'required|exists:outlets,id',
    //         'status' => 'required|in:Active,Inactive'

    //     ];
    // }

    /**
     * Get the validation rules that apply to the delete request.
     *
     * @return array
     */
    public function destroy()
    {
        return [
            'id' => 'exists:users,id'
        ];
    }

    public function restore()
    {
        return [
            'id' => 'exists:users,id'
        ];
    }

    public function purge()
    {
        return [
            'id' => 'exists:users,id'
        ];
    }
}
