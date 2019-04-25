const express = require('express');

const app = express();

const {
    db
} = require('./db');

const vendors = require('./routes/vendors')
const products = require('./routes/products');
const users = require('./routes/users');
const cart = require('./routes/cart');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', express.static(__dirname + '/public'))

// Use Routes
app.use('/vendors', vendors);
app.use('/products', products);
app.use('/users', users);
app.use('/cart', cart);

const port = process.env.PORT || 5000;

db.sync()
    .then(() => {
        app.listen(port)
    })