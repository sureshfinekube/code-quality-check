<?php
namespace App\Http\Livewire\Admin\Customers;
use App\Models\Customer;
use App\Models\MasterSettings;
use App\Models\Order;
use App\Models\OrderAddonDetail;
use App\Models\OrderDetails;
use App\Models\Payment;
use App\Models\Translation;
use App\Models\CollectionType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Livewire\Component;
use Illuminate\Pagination\Cursor;
class ViewSingleCustomer extends Component
{

    public $nextCursor,$search_query,$order_filter,$customer_id;
    protected $currentCursor;
    public $hasMorePages;
    public function render()
    {

        return view('livewire.admin.customers.view-single-customer');
    }
    public function mount($id)
    {
        $this->orders = new EloquentCollection();
       

        $this->loadOrders($id);
        if(session()->has('selected_language'))
        {   /* if session has selected language */
            $this->lang = Translation::where('id',session()->get('selected_language'))->first();
        }
        else{
            /* if session has no selected language */
            $this->lang = Translation::where('default',1)->first();
        }
    }
    public function loadOrders($id)
    {
        $this->customer_id = $id;
        if ($this->hasMorePages !== null  && ! $this->hasMorePages) {
            return;
        }
        
        $myorder = $this->filterdata();
        $this->orders->push(...$myorder->items());
        if ($this->hasMorePages = $myorder->hasMorePages()) {
            $this->nextCursor = $myorder->nextCursor()->encode();
        }
        $this->currentCursor = $myorder->cursor();
    }
    /* refresh the page */
    public function refresh()
    {
        // return 1;
         /* if search query or order filter is empty */
        if( $this->search_query == '' && $this->order_filter == '')
        {
            
            $this->orders->fresh();
        }
    }
    public function filterdata()
    {
       
        
        if($this->search_query || $this->search_query != '')
        {
            return 'hai';
            if($this->order_filter || $this->order_filter != '')
            {
                if(Auth::user()->user_type==1)
                {
                $orders = \App\Models\Order::where('order_number','like','%'.$this->search_query.'%')
                ->orwhere('customer_name','like','%'.$this->search_query.'%')
                ->where('customer_id', $this->customer_id)
                ->where('status',$this->order_filter)
                ->latest()
                ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                } else {
                    $orders = \App\Models\Order::where('created_by',Auth::user()->id)->where('order_number','like','%'.$this->search_query.'%')
                    ->orwhere('customer_name','like','%'.$this->search_query.'%')
                    ->where('status',$this->order_filter)
                    ->where('customer_id', $this->customer_id)
                    ->latest()
                    ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                }
                return $orders;
            }
            else{
                if(Auth::user()->user_type==1)
                {
                $orders = \App\Models\Order::where('order_number','like','%'.$this->search_query.'%')
                ->orwhere('customer_name','like','%'.$this->search_query.'%')
                ->latest()
                ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                } else {
                    $orders = \App\Models\Order::where('created_by',Auth::user()->id)->where('order_number','like','%'.$this->search_query.'%')
                    ->orwhere('customer_name','like','%'.$this->search_query.'%')
                    ->where('customer_id', $this->customer_id)
                    ->latest()
                    ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                }
                return $orders;
            }
        }
        else{
            if($this->order_filter || $this->order_filter != '')
            {
                

                if(Auth::user()->user_type==1)
                {
                    $orders = \App\Models\Order::where('status',$this->order_filter)
                    ->where('customer_id', $this->customer_id)
                    ->latest()
                    ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                } else {
                    $orders = \App\Models\Order::where('created_by',Auth::user()->id)->where('status',$this->order_filter)
                    ->where('customer_id', $this->customer_id)
                    ->latest()
                    ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                }

                return $orders;
            }
            else{
                if(Auth::user()->user_type==1)
                {
                    $orders = \App\Models\Order::latest()
                    ->where('customer_id', $this->customer_id)
                ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                } else {
                    $orders = \App\Models\Order::where('created_by',Auth::user()->id)->latest()
                    ->where('customer_id', $this->customer_id)
                    ->cursorPaginate(10, ['*'], 'cursor', Cursor::fromEncoded($this->nextCursor));
                }

                
                return $orders;
            }
        }
    }
}
