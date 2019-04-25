let totalPrice = 0,
  totalProducts = 0,
  c = 0;
function removeFromCart(id, userId) {
  $.ajax({
    type: 'DELETE',
    url: '/cart',
    data: {
      id: id
    },
    success: function(data) {
      if (data.success) {
        c = 0;
        totalPrice = 0;
        totalProducts = 0;
        $('#totalProducts').empty();
        $('#listText').empty();
        $('#totalPrice').empty();
        cartItems(userId);
      } else {
        alert('Some error occurred');
      }
    }
  });
}

function getVendor(id, done) {
  $.get(`/vendors/${id}`, data => {
    //console.log(id);
    done(data[0].name);
  });
}

function refreshList(productId, quantity, id, userId, done, l) {
  //console.log(productId);
  $.get(`/products/${productId}`, product => {
    //console.log(product[0].vendorId);
    let price = product[0].price * quantity;
    totalPrice += price;
    totalProducts += 1;
    if (product[0].vendorId != null) {
      getVendor(product[0].vendorId, data => {
        c += 1;
        $('#productList').append(
          `
            <div class="col-md-3">
                <div class="card" style="width: 15rem;" >
                    <div class="card-body">
                        <h5>Name: ${product[0].name}</h5>
                        <h5>Total Price: ${price}</h5>
                        <h5>Quantity: <input id="${
                          product.id
                        }" type="number" value="${quantity}" min="1" max="${
            product[0].quantity
          }"></h5>
                        <h5>Vendor: ${data}</h5>
                        <button class="btn btn-danger" onclick="removeFromCart(${id}, ${userId})">Remove From Cart </button>
                    </div>
            </div>
            <br>`
        );
        if (c == l) done();
      });
    }
  });
}

function fetchCartItems(products, userId, done) {
  $('#productList').empty();
  if (products.length === 0) {
    $('#listText').append('No products in Cart');
  } else {
    $('#listText').append('List of Products in Cart');
  }
  for (let product of products) {
    //console.log(product)
    refreshList(product.productId, product.quantity, product.id, userId, done, products.length);
    //console.log(c);
  }
}

function cartItems(userId) {
  $.get(`/cart/${userId}`, products => {
    fetchCartItems(products, userId, () => {
      $('#totalProducts').append(`Total Products in Cart: ${totalProducts}`);
      $('#totalPrice').append(`Total Price: ${totalPrice}`);
    });
  });
}

$('#login').click(() => {
  let username = $('#username').val();
  let email = $('#email').val();
  if (username == '' || email == '') {
    alert('Fields cannot be empty');
  } else {
    $.post(
      '/users',
      {
        username,
        email
      },
      data => {
        if (data.success) {
          $('#welcomeText').empty();
          $('#totalProducts').empty();
          $('#listText').empty();
          $('#totalPrice').empty();
          $('#welcomeText').append(`Welcome ${username}`);

          cartItems(data.id);
        } else {
          alert('Some error occurred');
        }
      }
    );
  }
});
