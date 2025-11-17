<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        return Event::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:3'],
            'date' => ['required', 'numeric', 'min:1', 'max:31'],
            'month' => ['required', 'regex:/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i'],
            'time' => ['required', 'regex:/^[0-9]{1,2}\.[0-9]{2} (am|pm)$/i'],
            'location' => ['required', 'string', 'min:3'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        return response()->json(Event::create($data), 201);
    }

    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'min:3'],
            'date' => ['sometimes', 'required', 'numeric', 'min:1', 'max:31'],
            'month' => ['sometimes', 'required', 'regex:/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i'],
            'time' => ['sometimes', 'required', 'regex:/^[0-9]{1,2}\.[0-9]{2} (am|pm)$/i'],
            'location' => ['sometimes', 'required', 'string', 'min:3'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event->update($data);
        return $event;
    }

    public function destroy(Event $event)
    {
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();
        return response()->json(null, 204);
    }
}
