const express = require('express');
const router = express.Router();

const {
    Users
} = require('../db');


router.post('/', async (req, res) => {
    try {
        const result = await Users.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                username: req.body.username
            }
        })
        let user = result[0];
        //console.log(user.dataValues.id)
        res.send({
            success: true,
            id: user.dataValues.id
        })

    } catch (e) {
        res.send({
            success: false,
            err: e.message
        });
    }
})

module.exports = router;