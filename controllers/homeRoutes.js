const router = require('express').Router();
const { User } = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('login')
    } catch (err) {res.status(400)}
});


module.exports = router;