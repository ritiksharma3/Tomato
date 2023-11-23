<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('users/search', [UserController::class, 'search']);
Route::post('users/restore', [UserController::class, 'restore']);
Route::post('users/purge', [UserController::class, 'prune']);
Route::resource('history', HistoryController::class);
// Route::get('/history/user', [HistoryController::class,'user_history']);
Route::get('history/score/{userID}', [HistoryController::class, 'get_highest']);
// Route::get('outlets/search', [OutletController::class, 'search']);
Route::resource('users', UserController::class);
// Route::resource('outlets', OutletController::class);
// Route::get('reports/search', [ReportController::class, 'search']);
// Route::resource('reports', ReportController::class);
