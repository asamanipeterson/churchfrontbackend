<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\MinistryController;
use App\Http\Controllers\LiveStreamController;


Route::middleware('auth:sanctum')->controller(AuthController::class)->group(function () {
    Route::post('/logout',  'logout');
    Route::get('/user',  'user');
    Route::post('/register', 'register');
    Route::post('/login',  'login');
});

Route::middleware('auth:sanctum')->controller(EventController::class)->group(function () {
    Route::get('/events',  'index');
    Route::post('/events',  'store');
    Route::put('/events/{event}',  'update');
    Route::delete('/events/{event}', 'destroy');
});

Route::middleware('auth:sanctum')->controller(PostController::class)->group(function () {
    Route::get('/posts',  'index');
    Route::post('/posts',  'store');
    Route::put('/posts/{post}',  'update');
    Route::delete('/posts/{post}',  'destroy');
});

Route::middleware('auth:sanctum')->controller(NewsController::class)->group(function () {
    Route::get('/news',  'index');
    Route::post('/news',  'store');
    Route::put('/news/{news}',  'update');
    Route::delete('/news/{news}',  'destroy');
});

Route::middleware('auth:sanctum')->controller(MinistryController::class)->group(function () {
    Route::get('/ministries',  'index');
    Route::post('/ministries',  'store');
    Route::put('/ministries/{ministry}',  'update');
    Route::delete('/ministries/{ministry}',  'destroy');
});

Route::middleware('auth:sanctum')->controller(LiveStreamController::class)->group(function () {
    Route::get('/livestream', 'show');
    Route::put('/livestream', 'update');
});
