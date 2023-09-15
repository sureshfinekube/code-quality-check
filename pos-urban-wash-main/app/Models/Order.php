<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_number',
        'customer_id',
        'customer_name',
        'phone_number',
        'order_date',
        'delivery_date',
        'special_discount',
        'sub_total',
        'addon_total',
        'discount',
        'tax_percentage',
        'tax_amount',
        'collection_type',
        'total',
        'note',
        'status',
        'nextday_order',
        'urgent_order',
        'order_type',
        'created_by',
        'financial_year_id'
    ];

      /* user relation */
      public function user()
      {
          return $this->belongsTo(\App\Models\User::class, 'created_by', 'id');
      }
}