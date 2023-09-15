<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'special_discount',
        'tax_number',
        'address',
        'special_discount',
        'location_address',
        'is_active',
        'created_by'
    ];
}