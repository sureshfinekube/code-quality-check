<div>
    <div class="row align-items-center justify-content-between mb-4">
        <div class="col">
            <h5 class="fw-500 text-white">{{ $lang->data['customers'] ?? 'Customers' }}</h5>
        </div>
        <div class="col-auto">
            <a data-bs-toggle="modal" data-bs-target="#addcustomer" wire:click="resetInputFields" class="btn btn-icon btn-3 btn-white text-primary mb-0">
                <i class="fa fa-plus me-2"></i> {{ $lang->data['add_new_customer'] ?? 'Add New Customer' }}
            </a>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header p-4">
                    <div class="row">
                        <div class="col-md-12">
                            <input type="text" class="form-control" placeholder="{{ $lang->data['search_here'] ?? 'Search Here' }}" wire:model="search">
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table align-items-center mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="text-uppercase text-secondary text-xs opacity-7">#</th>
                                    <th class="text-uppercase text-secondary text-xs opacity-7 ps-2">
                                        {{ $lang->data['customer_name'] ?? 'Customer Name' }}
                                    </th>
                                    <th class="text-uppercase text-secondary text-xs  opacity-7">
                                        {{ $lang->data['contact'] ?? 'Contact' }}
                                    </th>
                                    <th class="text-uppercase text-secondary text-xs opacity-7 ps-2">
                                        {{ $lang->data['address'] ?? 'Address' }}
                                    </th>
                                    <th class="text-secondary opacity-7"></th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                $i = 1;
                                @endphp
                                @foreach ($customers as $row)
                                <tr>
                                    <td>
                                        <p class="text-sm px-3 mb-0">{{ $i++ }}</p>
                                    </td>
                                    <td>
                                        <p class="text-sm font-weight-bold mb-0">{{ $row->name }}</p>
                                    </td>
                                    <td>
                                        <p class="text-sm px-3 mb-0">{{ $row->phone }}</p>
                                        <p class="text-sm px-3 mb-0">{{ $row->email }}</p>
                                    </td>
                                    <td>
                                        <p class="text-sm mb-0">{{ $row->address }}</p>
                                    </td>
                                    <td>
                                        <a data-bs-toggle="modal" data-bs-target="#editcustomer" wire:click="edit({{ $row->id }})" type="button" class="badge badge-xs badge-warning fw-600 text-xs">
                                            {{ $lang->data['edit'] ?? 'Edit' }}
                                        </a>
                                    </td>
                                    <td>
                                    <a href="{{ route('admin.view_single_customer', $row->id) }}" type="button"
                                                class="badge badge-xs badge-primary text-xs fw-600">
                                                {{ $lang->data['history'] ?? 'History' }}
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
                                                @this.call('loadCustomers')
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
    <div wire:ignore.self class="modal fade " id="addcustomer" tabindex="-1" role="dialog" aria-labelledby="addcustomer" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title fw-600" id="addcustomer">{{ $lang->data['add_customer'] ?? 'Add Customer' }}
                    </h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="row g-2 align-items-center">
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['customer_name'] ?? 'Customer Name' }}
                                    <span class="text-danger">*</span></label>
                                <input type="text" required class="form-control" placeholder="{{ $lang->data['enter_customer_name'] ?? 'Enter Customer Name' }}" wire:model="name">
                                @error('name')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['phone_number'] ?? 'Phone Number' }} <span class="text-danger">*</span></label>
                                <input type="text" required class="form-control" placeholder="{{ $lang->data['enter_phone_number'] ?? 'Enter Phone Number' }}" wire:model="phone">
                                @error('phone')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['email'] ?? 'Email' }}</label>
                                <input type="text" class="form-control" placeholder="{{ $lang->data['enter_email'] ?? 'Enter Email' }}" wire:model="email">
                                @error('email')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['tax_number'] ?? 'Tax Number' }}</label>
                                <input type="text" class="form-control" placeholder="{{ $lang->data['enter_tax_number'] ?? 'Enter Tax Number' }}" wire:model="tax_number">
                                @error('tax_number')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['special _discount'] ?? 'Special Discount' }}</label>
                                <input type="text" class="form-control" placeholder="{{ $lang->data['special'] ?? 'Enter Discount' }}" wire:model="spec_discount">
                                @error('spec_discount')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label">{{ $lang->data['address'] ?? 'Address' }}</label>
                                <textarea type="text" class="form-control" placeholder="{{ $lang->data['enter_address'] ?? 'Enter Address' }}" wire:model="address"></textarea>
                                @error('address')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-3">
                                <!-- Search input -->
                                <style>
                                    .pac-container {

                                    z-index: 9999 !important;
                                    }
                                </style>
                                <label class="form-label">{{ $lang->data['location'] ?? 'Location' }}</label>

                                <div x-data="{ searchQuery: '', map: null }" x-init="
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 16,
    });
">
                                    <input type="text" x-model="searchQuery" id="search-input" placeholder="Enter your search query"     wire:model="location_address" class="form-control">
                                    
                                    <input type="hidden"  class="form-control"  >
                                    <div id="map"></div>


                                </div>
                            </div>



                            <div class="col-md-12 mb-1">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="employee" checked wire:model="is_active">
                                    <label class="form-check-label" for="employee">{{ $lang->data['is_active'] ?? 'Is Active' }} ?</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $lang->data['cancel'] ?? 'Cancel' }}</button>
                        <button type="submit" class="btn btn-primary" wire:click.prevent="store()">{{ $lang->data['save'] ?? 'Save' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" wire:ignore.self id="editcustomer" tabindex="-1" role="dialog" aria-labelledby="editcustomer" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title fw-600" id="editcustomer">
                        {{ $lang->data['enter_customer'] ?? 'Enter Customer' }}
                    </h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="row g-2 align-items-center">
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['customer_name'] ?? 'Customer Name' }}
                                    <span class="text-danger">*</span></label>
                                <input type="text" required class="form-control" placeholder="{{ $lang->data['enter_customer_name'] ?? 'Enter Customer Name' }}" wire:model="name">
                                @error('name')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['phone_number'] ?? 'Phone Number' }} <span class="text-danger">*</span></label>
                                <input type="text" required class="form-control" placeholder="{{ $lang->data['enter_phone_number'] ?? 'Enter Phone Number' }}" wire:model="phone">
                                @error('phone')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['email'] ?? 'Email' }}</label>
                                <input type="text" class="form-control" placeholder="{{ $lang->data['enter_email'] ?? 'Enter Email' }}" wire:model="email">
                                @error('email')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['tax_number'] ?? 'Tax Number' }}</label>
                                <input type="text" class="form-control" placeholder="{{ $lang->data['enter_tax_number'] ?? 'Enter Tax Number' }}" wire:model="tax_number">
                                @error('tax_number')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-1">
                                <label class="form-label">{{ $lang->data['special _discount'] ?? 'Special Discount' }}</label>
                                <input type="text" class="form-control" placeholder="{{ $lang->data['special'] ?? 'Enter Discount' }}" wire:model="spec_discount">
                                @error('spec_discount')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label">{{ $lang->data['address'] ?? 'Address' }}</label>
                                <textarea type="text" class="form-control" placeholder="{{ $lang->data['enter_address'] ?? 'Enter Address' }}" wire:model="address"></textarea>
                                @error('address')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div x-data="{ searchQuery: '', map: null }" x-init="
map = new google.maps.Map(document.getElementById('map1'), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 16,
});
">
                                <input type="text"  id="search-input1" placeholder="Enter your search query"     wire:model="location_address1" class="form-control">
                                
                                <input type="hidden"  class="form-control"  >
                                <div id="map1"></div>
                                

                            </div>
                            <div class="col-md-12 mb-1">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="employee" checked wire:model="is_active">
                                    <label class="form-check-label" for="employee">{{ $lang->data['is_active'] ?? 'Is Active' }} ?</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $lang->data['cancel'] ?? 'Cancel' }}</button>
                        <button type="submit" class="btn btn-primary" wire:click.prevent="update()">{{ $lang->data['save'] ?? 'Save' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDuEgg8yUclLLT6JJ5zCz3TvudAzEd4Xr4&libraries=places"></script>


<script>
    let searchBox = new google.maps.places.SearchBox(document.getElementById('search-input'));
    searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        let bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (place.geometry.viewport) {
               
            bounds.union(place.geometry.viewport);
            var input_address_val = $('#search-input').val();
            
            $('#search-input').val(input_address_val).trigger('input');
            var element = document.getElementById('search-input');
            element.dispatchEvent(new Event('input'));  
            
            } else {
                
            bounds.extend(place.geometry.location);
            var input_address_val = $('#search-input').val();
               
            $('#search-input').val(input_address_val).trigger('input');
            var element = document.getElementById('search-input');
            element.dispatchEvent(new Event('input'));
        
            
            }
        });
        map.fitBounds(bounds);
    });

    let searchBox1 = new google.maps.places.SearchBox(document.getElementById('search-input1'));
    searchBox1.addListener('places_changed', function() {
        let places = searchBox1.getPlaces();

        if (places.length == 0) {
            return;
        }

        let bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (place.geometry.viewport) {
               
            bounds.union(place.geometry.viewport);
            var input_address_val = $('#search-input1').val();
            
            $('#search-input1').val(input_address_val).trigger('input');
            var element = document.getElementById('search-input1');
            element.dispatchEvent(new Event('input'));  
            
            } else {
                
            bounds.extend(place.geometry.location);
            var input_address_val = $('#search-input1').val();
               
            $('#search-input1').val(input_address_val).trigger('input');
            var element = document.getElementById('search-input1');
            element.dispatchEvent(new Event('input'));
        
            
            }
        });
        map.fitBounds(bounds);
    });
</script>
</div>