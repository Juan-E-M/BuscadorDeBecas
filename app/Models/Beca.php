<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beca extends Model
{
    use HasFactory;
    protected $fillable = [
        'institution',
        'name',
        'summary',
        'type',
        'obligation',
        'region',
        'start_date',
        'end_date',
        'budget',
        'status',
        'others',
        'link',
        'file_path',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
    public function ocde()
    {
        return $this->belongsToMany(Ocde::class, 'beca_ocde', 'beca_id', 'ocde_id');
    }
    public function ods()
    {
        return $this->belongsToMany(Ods::class, 'beca_ods', 'beca_id', 'ods_id');
    }
}
