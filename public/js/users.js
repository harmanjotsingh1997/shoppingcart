function addToCart(userId, productId, id) {
  let quantity = Number($(`#${id}`).val());
  $.post('/cart', {
    userId,
    productId,
    quantity
  }, (data) => {
    if (data.success) {
      alert("Item added to cart successfully")
    } else {
      alert("Some error occurred");
    }
  })

}

function getVendor(id, done) {
  $.get(`/vendors/${id}`, (data) => {
    //console.log(data[0].name);
    done(data[0].name);
  })
}

function refreshList(userId) {
  $('#listText').empty();
  $('#listText').append("List of Products");
  $.get('/products', (data) => {
    $('#productList').empty();
    for (let product of data) {
      if (product.vendorId != null) {
        getVendor(product.vendorId, (data) => {
          $('#productList').append(
            `
            <div class="col-md-3">
                <div class="card" style="width: 15rem;" >
                    <div class="card-body">
                        <h5>Name: ${product.name}</h5>
                        <h5>Price: ${product.price}</h5>
                        <h5>Quantity: <input id="${product.id}" type="number" value="1" min="1" max="${product.quantity}"></h5>
                        <h5>Vendor: ${data}</h5>
                        <button class="btn btn-primary" onclick="addToCart(${userId}, ${product.id}, ${product.id})">Add To Cart </button>
                    </div>
            </div>
            <br>`
          )

        })
      }


    }

  })
}


$('#login').click(() => {
  let username = $('#username').val();
  let email = $('#email').val();

  if (username == "" || email == "") {
    alert("Fields cannot be empty")
  } else {
    $.post('/users', {
      username,
      email
    }, (data) => {
      if (data.success) {
        $('#welcomeText').empty();
        $('#welcomeText').append(`Welcome ${username}`)
        refreshList(data.id)
      } else {
        alert('Some error occurred')
      }
    })
  }
})