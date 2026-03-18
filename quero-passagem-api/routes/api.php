<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

Route::get('/locations', [TicketController::class, 'locations']);
Route::get('/locations/allowed', [TicketController::class, 'allowedLocations']);
Route::post('/search', [TicketController::class, 'search']);
Route::get('/seats/{travelId}', [TicketController::class, 'seats']);
Route::post('/booking', [TicketController::class, 'booking']);
