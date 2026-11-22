<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Utama Katalog & Pencarian
Route::get('/', function () {
    return Inertia::render('CatalogPage');
})->name('catalog');

// Halaman Detail Produk Lengkap (Fase 4)
Route::get('/product/{id}', function ($id) {
    return Inertia::render('ProductDetailPage', [
        'productId' => $id,
    ]);
})->name('product.detail');

// handler rute /compare
Route::get('/compare', function () {
    return Inertia::render('ComparePage');
})->name('compare');