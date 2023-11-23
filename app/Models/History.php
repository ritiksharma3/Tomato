<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class History extends Model
{
    use HasFactory, SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'score',
        'userID'
    ];

    public function scopeSearch($query, $s)
    {
        // return $query->where('outletName', 'like', '%' . $s . '%')
        //     ->orwhere('address', 'like', '%' . $s . '%')
        //     ->orwhere('country', 'like', '%' . $s . '%')
        //     ->orwhere('city', 'like', '%' . $s . '%');
    }
}
