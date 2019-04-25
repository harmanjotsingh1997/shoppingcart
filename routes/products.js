const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const {
    Products
} = require('../db');

router.get('/:id', async (req, res) => {
    const products = await Products.findAll({
        where: {
            id: req.params.id
        }
    });
    res.send(products);
});

router.get('/', async (req, res) => {
    const products = await Products.findAll();
    res.send(products);
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const result = await Products.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            vendorId: req.body.vendorId
        })
        res.send({
            success: true
        })

    } catch (e) {
        res.send({
            success: false,
            err: e.message
        });
    }
})

router.delete('/', async (req, res) => {
    let Id = 0;
    if (req.body.id != undefined)
        Id = req.body.id;
    try {
        const result = await Products.destroy({
            where: Sequelize.or({
                vendorId: null
            }, {

                id: Id
            })
        })
        //console.log(result);
        res.send({
            success: true
        })
    } catch (e) {
        res.send({
            success: false,
            err: e.message
        });
    }
})


module.exports = router;