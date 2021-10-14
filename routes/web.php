<?php

use App\Http\Controllers\Ejemplo3Controller; //es necesario cambiar el nom
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CursoController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get("/",[CursoController::class]);

Route::get('cursos',[CursoController::class,'index']);

Route::get('cursos/create',[CursoController::class,'create']);

Route::get('cursos/{curso}',[CursoController::class,'show']);


/*Route::post('users/{id}', function ($id) {
    
});*/

//Route::post('');






