const express = require('express');
const router = express.Router();

const {
    Vendors
} = require('../db');

router.get('/:id', async (req, res) => {
    const vendors = await Vendors.findAll({
        where: {
            id: req.params.id
        },
        limit: 1
    });
    res.send(vendors);
});


router.get('/', async (req, res) => {
    const vendors = await Vendors.findAll();
    res.send(vendors);
});

router.post('/', async (req, res) => {
    try {
        const result = await Vendors.create({
            name: req.body.name,
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

router.delete('/', (req, res) => {
    Vendors.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.send({
            success: true
        })
    }).catch(() => {
        res.send({
            success: false
        })
    })
})

module.exports = router;