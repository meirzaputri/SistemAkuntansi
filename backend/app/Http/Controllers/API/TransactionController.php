<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        return Transaction::with('user')->orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $category = $request->category;

        if ($category === 'Kas Masuk') {
            $request->merge(['category' => 'kas_masuk']);
        }

        if ($category === 'Kas Keluar') {
            $request->merge(['category' => 'kas_keluar']);
        }
        
        $validated = $request->validate([
            'name' => 'required|string',
            'date' => 'required|date',
            'category' => 'required|in:kas_masuk,kas_keluar',
            'description' => 'nullable|string',
            'amount' => 'required|integer',
        ]);

        $validated['created_by'] = $request->user()->id;

        $transaction = Transaction::create($validated);

        return response()->json($transaction);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        $category = $request->category;

        if ($category === 'Kas Masuk') {
            $request->merge(['category' => 'kas_masuk']);
        }

        if ($category === 'Kas Keluar') {
            $request->merge(['category' => 'kas_keluar']);
        }

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'category' => 'required|in:kas_masuk,kas_keluar',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $transaction->update($validated);

        return response()->json([
            'message' => 'Transaction updated successfully',
            'data' => $transaction
        ]);
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $transaction->delete();

        return response()->json(['message' => 'Berhasil dihapus']);
    }


}
