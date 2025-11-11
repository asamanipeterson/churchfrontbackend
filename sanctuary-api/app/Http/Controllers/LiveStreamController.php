<?php

namespace App\Http\Controllers;

use App\Http\Requests\LiveStreamRequest;
use App\Models\LiveStream;

class LiveStreamController extends Controller
{
    private const SINGLETON_ID = 1;

    public function show()
    {
        $stream = LiveStream::firstOrCreate(['id' => self::SINGLETON_ID], [
            'title' => 'Offline Stream',
            'video_url' => '',
            'is_live' => false
        ]);

        // Convert snake_case → camelCase for frontend
        return response()->json([
            'id' => $stream->id,
            'isLive' => $stream->is_live,
            'title' => $stream->title,
            'videoUrl' => $stream->video_url,
        ]);
    }

    public function update(LiveStreamRequest $request)
    {
        $stream = LiveStream::firstOrCreate(['id' => self::SINGLETON_ID]);

        // Convert request camelCase → DB snake_case
        $stream->update([
            'is_live' => $request->input('isLive'),
            'title'   => $request->input('title'),
            'video_url' => $request->input('videoUrl'),
        ]);

        // Return updated version in camelCase
        return response()->json([
            'id' => $stream->id,
            'isLive' => $stream->is_live,
            'title' => $stream->title,
            'videoUrl' => $stream->video_url,
        ]);
    }
}
