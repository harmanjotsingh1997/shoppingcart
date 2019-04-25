function deleteFromCart() {
  $.ajax({
    type: 'DELETE',
    url: '/cart',
    success: function(data) {
      if (data.success) {
        //console.log(data.success)
        refreshList();
      } else {
        alert(data.err);
      }
    }
  });
}

function removeFromList(id) {
  $.ajax({
    type: 'DELETE',
    url: '/products',
    data: {
      id: id
    },
    success: function(data) {
      if (data.success) {
        //console.log(data.success)
        $('#list').empty();
        deleteFromCart();
      } else {
        alert('Some error occurred');
      }
    }
  });
}

function fetchVendor(done) {
  $.get('/vendors', data => {
    done(data);
  });
}

function getVendor(id, done) {
  $.get(`/vendors/${id}`, data => {
    //console.log(data[0].name);
    done(data[0].name);
  });
}

function refreshList() {
  $.get('/products', data => {
    $('#productList').empty();
    $('#list').empty();
    if (data.length === 0) {
      $('#list').append('No products');
    } else {
      $('#list').append('List of products');
    }
    for (let product of data) {
      //console.log(product.vendorId);
      if (product.vendorId != null) {
        getVendor(product.vendorId, data => {
          $('#productList').append(
            `
                    <div class="col-md-3">
                        <div class="card" style="width: 15rem;" >
                            <div class="card-body">
                                <h5>Name: ${product.name}</h5>
                                <h5>Price: ${product.price}</h5>
                                <h5>Quantity: ${product.quantity}</h5>
                                <h5>Vendor: ${data}</h5>
                                <button class="btn btn-danger" onclick="removeFromList(${
                                  product.id
                                })">Remove Product </button>
                            </div>
                    </div>&nbsp
                    <br>`
          );
        });
      }
    }
  });
}

refreshList();

$('#addProduct').click(() => {
  let name = $('#productName').val();
  let price = $('#price').val();
  let quantity = $('#quantity').val();
  let vendorId = $('#vendorName').val();

  if (name == '' || price == 0) {
    alert('Fields cannot be empty');
  } else {
    $.post(
      '/products',
      {
        name,
        price,
        quantity,
        vendorId
      },
      data => {
        if (data.success) {
          refreshList();
        } else {
          alert('Some error occurred');
        }
      }
    );
  }
});

function createVendor(vendor) {
  return `<option value="${vendor.id}">${vendor.name}</option>`;
}

$(function() {
  let vendorName = $('#vendorName');

  fetchVendor(function(vendors) {
    vendorName.empty();
    //console.log(vendors)
    for (vendor of vendors) {
      vendorName.append(createVendor(vendor));
    }
  });
});
