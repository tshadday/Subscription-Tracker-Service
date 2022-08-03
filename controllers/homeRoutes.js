const router = require('express').Router();
const { User } = require('../models');
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
    }
  
    res.render('loginHomepage');
  });
  
  router.get('/register', (req, res) => {
    try {
        res.render('registration')
    } catch (err) {
        res.status(400).json(err);
    }
})
module.exports = router;
