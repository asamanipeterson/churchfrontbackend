<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        return Post::latest()->get();
    }

    public function store(Request $request)
    {
        // ADDED: 'description' => 'required|string|max:1000'
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'date'     => 'required|date_format:Y-m-d',
            'author'   => 'sometimes|string|max:255',
            'description' => 'required|string|max:1000', // ADDED
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create($validated);
        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        // ADDED: 'description' => 'sometimes|required|string|max:1000'
        $rules = [
            'title'    => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'date'     => 'sometimes|required|date_format:Y-m-d',
            'author'   => 'sometimes|string|max:255',
            'description' => 'sometimes|required|string|max:1000', // ADDED
        ];

        if ($request->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg|max:2048';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('image')) {
            if ($post->image) Storage::disk('public')->delete($post->image);
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($validated);
        return response()->json($post->fresh());
    }

    public function destroy(Post $post)
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();

        return response()->json(null, 204);
    }
}
