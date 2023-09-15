<div>
    <div class="row align-items-center justify-content-between mb-4">
        <div class="col">
            <h5 class="fw-500 text-white">{{ $lang->data['order_details'] ?? 'Order Details' }}</h5>
        </div>
        <div class="col-auto">
            <a href="{{ route('admin.customers') }}" class="btn btn-icon btn-3 btn-white text-primary mb-0">
                <i class="fa fa-arrow-left me-2"></i> {{ $lang->data['back'] ?? 'Back' }}
            </a>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header p-4">
                    <div class="row">
                        
                        <!-- <div class="col-md-3">
                            <select class="form-select" wire:model="order_filter">
                                <option class="select-box" value="">
                                    {{ $lang->data['all_orders'] ?? 'All Orders' }}
                                </option>
                                <option class="select-box" value="0">{{ $lang->data['pending'] ?? 'Pending' }}
                                </option>
                                <option class="select-box" value="1">
                                    {{ $lang->data['processing'] ?? 'Processing' }}
                                </option>
                                <option class="select-box" value="2">
                                    {{ $lang->data['ready_to_deliver'] ?? 'Ready To Deliver' }}
                                </option>
                                <option class="select-box" value="3">{{ $lang->data['delivered'] ?? 'Delivered' }}
                                </option>
                                <option class="select-box" value="4">{{ $lang->data['returned'] ?? 'Returned' }}
                                </option>
                            </select>
                        </div> -->
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table align-items-center mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="text-uppercase text-secondary text-xs opacity-7">
                                        {{ $lang->data['order_info'] ?? 'Order Info' }}
                                    </th>
                                    <th class="text-uppercase text-secondary text-xs  opacity-7">
                                        {{ $lang->data['customer'] ?? 'Customer' }}
                                    </th>
                                    <th class="text-uppercase text-secondary text-xs  opacity-7">
                                        {{ $lang->data['order_amount'] ?? 'Order Amount' }}
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xs opacity-7">
                                        {{ $lang->data['status'] ?? 'Status' }}
                                    </th>
                                    <th class="text-uppercase text-secondary text-xs opacity-7">
                                        {{ $lang->data['payment'] ?? 'Payment' }}
                                    </th>
                                    <th class="text-uppercase text-secondary text-xs opacity-7 ps-2">
                                        {{ $lang->data['created_by'] ?? 'Created By' }}
                                    </th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody wire:poll="refresh">
                                @foreach ($orders as $item)

                                <tr>
                                    <td>
                                        <p class="text-sm px-3 mb-0">
                                            <span class="me-2">{{ $lang->data['order_id'] ?? 'Order ID' }}:</span>
                                            <span class="font-weight-bold">{{ $item->order_number }}</span>
                                        </p>
                                        <p class="text-sm px-3 mb-0">
                                            <span class="me-2">{{ $lang->data['order_date'] ?? 'Order Date' }}:</span>
                                            <span class="font-weight-bold">{{ \Carbon\Carbon::parse($item->order_date)->format('d/m/y') }}</span>
                                        </p>
                                        <p class="text-sm px-3 mb-0">
                                            <span class="me-2">{{ $lang->data['delivery_date'] ?? 'Delivery Date' }}:</span>
                                            <span class="font-weight-bold">{{ \Carbon\Carbon::parse($item->delivery_date)->format('d/m/y') }}</span>
                                        </p>
                                    </td>
                                    <td>
                                        <p class="text-sm px-3 font-weight-bold mb-0">
                                            {{ $item->customer_name ?? ($lang->data['walk_in_customer'] ?? 'Walk In Customer') }}
                                        </p>
                                        <p class="text-sm px-3 mb-0">{{ $item->phone_number ?? '-' }}</p>
                                    </td>
                                    <td>
                                        <p class="text-sm px-3 font-weight-bold mb-0">{{ getCurrency() }}
                                            {{ number_format($item->total, 2) }}
                                        </p>
                                    </td>
                                    <td class="align-middle text-center">
                                        @if ($item->status == 0)
                                        <a type="button" class="badge badge-sm bg-secondary text-uppercase">{{ $lang->data['pending'] ?? 'Pending' }}</a>
                                        @elseif($item->status == 1)
                                        <a type="button" class="badge badge-sm bg-warning text-uppercase">{{ $lang->data['processing'] ?? 'Processing' }}</a>
                                        @elseif($item->status == 2)
                                        <a type="button" class="badge badge-sm bg-success text-uppercase">{{ $lang->data['ready_to_deliver'] ?? 'Ready To Deliver' }}</a>
                                        @elseif($item->status == 3)
                                        <a type="button" class="badge badge-sm bg-primary text-uppercase">{{ $lang->data['delivered'] ?? 'Delivered' }}</a>
                                        @elseif($item->status == 4)
                                        <a type="button" class="badge badge-sm bg-danger text-uppercase">{{ $lang->data['returned'] ?? 'Returned' }}</a>
                                        @endif
                                    </td>
                                    <td class="px-3">
                                        @php
                                        $paidamount = \App\Models\Payment::where('order_id', $item->id)->sum('received_amount');
                                        @endphp
                                        <p class="text-sm mb-0">
                                            <span class="me-2">{{ $lang->data['total_amount'] ?? 'Total Amount' }}:</span>
                                            <span class="font-weight-bold">{{ getCurrency() }}
                                                {{ number_format($item->total, 2) }}</span>
                                        </p>
                                        <p class="text-sm mb-1">
                                            <span class="me-2">{{ $lang->data['paid_amount'] ?? 'Paid Amount' }}:</span>

                                            <span class="font-weight-bold">{{ getCurrency() }}
                                                {{ number_format($paidamount, 2) }}</span>
                                        </p>
                                        @if ($paidamount < $item->total)
                                            @if($item->status != 4)
                                            <a data-bs-toggle="modal" data-bs-target="#addpayment" wire:click="payment({{ $item->id }})" type="button" class="badge badge-xs badge-success text-xs fw-600">
                                                {{ $lang->data['add_payment'] ?? 'Add Payment' }}
                                            </a>

                                            @endif
                                            @else
                                            <a data-bs-toggle="modal" type="button" class="badge badge-xs badge-dark text-xs fw-600">
                                                {{ $lang->data['fully_paid'] ?? 'Fully Paid' }}
                                            </a>
                                            @endif
                                    </td>
                                    <td>
                                        <p class="text-sm mb-0 text-uppercase">
                                            {{ $item->user->name ?? "" }}
                                        </p>
                                    </td>
                                    <td>
                                        <a href="{{ route('admin.view_single_order', $item->id) }}" type="button" class="badge badge-xs badge-primary text-xs fw-600">
                                            {{ $lang->data['view'] ?? 'View' }}
                                        </a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        @if($hasMorePages)
                        <div x-data="{
                                init () {
                                    let observer = new IntersectionObserver((entries) => {
                                        entries.forEach(entry => {
                                            if (entry.isIntersecting) {
                                                @this.call('loadOrders')
                                                console.log('loading...')
                                            }
                                        })
                                    }, {
                                        root: null
                                    });
                                    observer.observe(this.$el);
                                }
                            }" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                            <div class="text-center pb-2 d-flex justify-content-center align-items-center">
                                Loading...
                                <div class="spinner-grow d-inline-flex mx-2 text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>