<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;  // ✅ ADD THIS
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable; // ✅ INCLUDE TRAIT HERE

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
