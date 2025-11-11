<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveStream extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'live_streams';

    protected $fillable = [
        'is_live',
        'video_url', // <-- MUST BE snake_case (Database column name)
        'title',
    ];

    protected $casts = [
        'is_live' => 'boolean',
    ];
}
