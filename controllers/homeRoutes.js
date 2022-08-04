const router = require('express').Router();
const bcrypt = require("bcrypt");   
const User = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        // gets all user data and exludes password
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('loginHomepage', {
            users,
            // check if user is logged in, and loads homepage
            logged_in: req.session.logged_in,
            style: 'login.css'
          });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/login', (req, res) => {
    // if already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        res.render('loginHomepage', {
            style: 'login.css'
        });
    }
});


// Register new user
// URL is /user/register
router.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        // const newUser = req.body;
        // console.log(newUser);
        // saves hashed password to newUser
        // newUser.password = await bcrypt.hash(req.body.password, 10);

        // const userData = await User.create(newUser);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//load register page at /register
router.get('/register', (req, res, next) => {
    try {
        res.render('registration', {
            style: 'login.css'
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

//loads subscription page to test: DELETE LATER
router.get('/subscription', (req, res) => {
    try {
        res.render('subscription', {
            style: 'homepage.css'
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

//loads homepage to test: DELETE LATER
router.get('/homepage', (req, res) => {
    try {
        res.render('UserHomepage', {
            style: 'homepage.css'
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
