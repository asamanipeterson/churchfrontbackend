<?php

namespace App\Http\Controllers;

use App\Models\Ministry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MinistryController extends Controller
{
    /**
     * Display a listing of the resource (GET /ministries).
     */
    public function index()
    {
        return Ministry::orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage (POST /ministries).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            // 'icon'        => 'required|string|max:50', // REMOVED
            'image'       => 'required|image|mimes:jpeg,png,jpg|max:6144',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('ministries', 'public');
        }

        $ministry = Ministry::create($validated);
        return response()->json($ministry, 201);
    }

    /**
     * Update the specified resource in storage (PUT/PATCH /ministries/{ministry}).
     */
    public function update(Request $request, Ministry $ministry)
    {
        $rules = [
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:1000',
            // 'icon'        => 'sometimes|required|string|max:50', // REMOVED
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:6144',
        ];

        $validated = $request->validate($rules);

        // Handle image update
        if ($request->hasFile('image')) {
            if ($ministry->image) {
                Storage::disk('public')->delete($ministry->image);
            }
            $validated['image'] = $request->file('image')->store('ministries', 'public');
        }

        $ministry->update($validated);
        return response()->json($ministry->fresh());
    }

    /**
     * Remove the specified resource from storage (DELETE /ministries/{ministry}).
     */
    public function destroy(Ministry $ministry)
    {
        // Delete the associated image file
        if ($ministry->image) {
            Storage::disk('public')->delete($ministry->image);
        }

        $ministry->delete();
        return response()->json(null, 204);
    }
}
