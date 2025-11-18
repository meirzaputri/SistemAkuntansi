<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function daily(Request $request)
{
    $tanggal = $request->query('tanggal');

    if (!$tanggal) {
        return response()->json([
            'message' => 'Tanggal harus diisi'
        ], 422);
    }

    $transaksi = \App\Models\Transaction::with('user')->whereDate('date', $tanggal)->get();

    $totalMasuk = $transaksi->where('category', 'kas_masuk')->sum('amount');
    $totalKeluar = $transaksi->where('category', 'kas_keluar')->sum('amount');
    $saldo = $totalMasuk - $totalKeluar;

    return response()->json([
        'tanggal' => $tanggal,
        'total_kas_masuk' => $totalMasuk,
        'total_kas_keluar' => $totalKeluar,
        'saldo' => $saldo,
        'transaksi' => $transaksi,
    ]);
}

}
