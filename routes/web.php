<?php

use App\Http\Controllers\LpmController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LpmController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
