<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'category',
        'date',
        'author',
        'description', // ADDED: description fillable
        'image'
    ];
}
