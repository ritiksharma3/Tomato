<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Http\Resources\HistoryResource;
use App\Models\History;
use App\Http\Requests\HistoryRequest;
use Illuminate\Http\Request;

class HistoryController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $id = $request->input("userID");
        $data = History::where("userID", $id)->paginate(30);
        $message = "History retrieved successfully";
        return $this->sendResponse(HistoryResource::collection($data), $message);
    }

    public function user_history(Request $request)
    {
        $id = $request->input("userID");
        $data = History::where("userID", $id)->paginate(30);
        $message = "History retrieved successfully";
        return $this->sendResponse(HistoryResource::collection($data), $message);
    }

    public function search(Request $request)
    {
        // $q = $request->input('q');
        // $data = Outlet::search($q)->paginate(30);
        // $message = "Outlets retrieved successfully";
        // return $this->sendResponse(OutletResource::collection($data), $message);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(HistoryRequest $request)
    {
        $obj = History::create($request->all());
        $message = 'History created successfully';

        return $this->sendResponse(new HistoryResource($obj), $message);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\History  $History
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        $data = History::where("userID", $id)->paginate(30);
        $message = "History retrieved successfully";
        return $this->sendResponse(HistoryResource::collection($data), $message);

    }

    public function get_highest($userID)
    {
        // $id = $request->input("userID");
        $data = History::where("userID", $userID)->max('score');
        $message = "History retrieved successfully";
        return $this->sendResponse(['highest_score' => $data], $message);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request       $request
     * @param  \App\Models\History  $obj
     * @return \Illuminate\Http\JsonResponse
     */
    // public function update(HistoryRequest $request, int $id)
    // {
    //     $obj = History::find($request['id']);
    //     $obj->update($request->all());
    //     return $this->sendResponse(new HistoryResource($obj), 'History updated successfully');
    // }

    // /**
    //  * Soft Delete the specified resource from storage.
    //  *
    //  * @param  \App\Models\Outlet  $obj
    //  * @return \Illuminate\Http\JsonResponse
    //  */
    // public function destroy(OutletRequest $request, int $id)
    // {
    //     Outlet::destroy($id);
    //     return $this->sendResponse(null, 'Outlet '.$id.' Deleted Successfully');
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  \App\Models\Outlet  $obj
    //  * @return \Illuminate\Http\JsonResponse
    //  */
    // public function prune(OutletRequest $request, int $id){
    //     Outlet::withTrashed()->find($request->input('id', ''))?->forceDelete();
    //     return $this->sendResponse(null, 'Outlet Permanently Deleted');
    // }
}
