const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')

const {
    CartItems
} = require('../db');

router.get('/:id', async (req, res) => {
    try {
        const result = await CartItems.findAll({
            where: {
                userId: req.params.id
            }
        })

        res.send(result);

    } catch (e) {
        res.send({
            success: false,
            err: e.message
        });
    }
})

router.post('/', async (req, res) => {
    try {
        const result = await CartItems.create({
            quantity: req.body.quantity,
            userId: req.body.userId,
            productId: req.body.productId
        })

        res.send({
            success: true,
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
        const result = await CartItems.destroy({
            where: Sequelize.or({
                id: Id
            }, {
                productId: null
            })
        })
        console.log(result);
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