<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $data = User::get();
        $message = "Users retrieved successfully";
        return $this->sendResponse(UserResource::collection($data), $message);
    }

    public function search(Request $request)
    {
        $q = $request->input('q');
        $trashed = $request->input('trashed');
        $data = User::when($trashed, function($query) use ($trashed){
            $query->withTrashed();
        })->search($q)->paginate(30);
        $message = "Users retrieved successfully";
        return $this->sendResponse(UserResource::collection($data), $message);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserRequest $request)
    {
        $obj = User::create($request->all());
        $message = 'User created successfully';

        return $this->sendResponse(new UserResource($obj), $message);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $User
     * @return \Illuminate\Http\JsonResponse
     */
    // public function show(int $id)
    // {
    //     $obj = User::find($id);
    //     $obj->outlet;
    //     return $this->sendResponse(new UserResource($obj), 'User detail retrieved');
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request       $request
     * @param  \App\Models\User  $obj
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UserRequest $request, int $id)
    {
        $obj = User::find($id);
        $obj->update($request->all());
        return $this->sendResponse(new UserResource($obj), 'User updated successfully');
    }

    /**
     * Soft Delete the specified resource from storage.
     *
     * @param  \App\Models\User  $obj
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(UserRequest $request, int $id)
    {
        User::destroy($id);
        return $this->sendResponse(null, 'User '.$id.' Deleted Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $obj
     * @return \Illuminate\Http\JsonResponse
     */
    public function prune(Request $request){
        User::withTrashed()->find($request->input('id', ''))?->forceDelete();
        return $this->sendResponse(null, 'User Permanently Deleted');
    }

    public function restore(Request $request){
        User::withTrashed()->find($request->input('id',0))?->restore();
        return $this->sendResponse(null, 'User Restored Successfully');
    }
}
