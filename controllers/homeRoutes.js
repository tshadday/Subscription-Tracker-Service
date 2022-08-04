const router = require('express').Router();
const bcrypt = require("bcrypt");   
const { User, Subscription } = require('../models');
//const auth = require('../utils/auth');

//needs auth
router.get('/', async (req, res) => {
    try {
        // gets all user data
        const subData = await Subscription.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                }
            ]
        });

        const subscriptions = subData.map((subscription) => subscription.get({ plain: true }));

        res.render('UserHomepage', {
            subscriptions,
            // check if user is logged in, and loads homepage
            logged_in: req.session.logged_in,
            style: 'homepage.css'
          });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/subscription/:id', async (req, res) => {
    try {
        const subData = await Subscription.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                }
            ]
        });

        const subscription = subData.get({ plain: true });

        res.render('subscription', {
            style: 'homepage.css',
            ...subscription,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// needs auth
router.get('/', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Subscription }],
        })

        const user = userData.get({ plain: true });

        res.render('UserHomepage', {
            style: 'homepage.css',
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // if logged in, redirect to homepage, else direct to login page
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
// URL is /users/register
router.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        const newUser = req.body;
        console.log(newUser);
        //saves hashed password to newUser
        newUser.password = await bcrypt.hash(req.body.password, 10);

        //const userData = await User.create(newUser);
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
// router.get('/subscription', (req, res) => {
//     try {
//         res.render('subscription', {
//             style: 'homepage.css'
//         })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

//loads homepage to test: DELETE LATER
// router.get('/', (req, res) => {
//     try {
//         res.render('UserHomepage', {
//             style: 'homepage.css'
//         })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

//loads page to create subscription data
router.get('/create', (req, res) => {
    try {
        res.render('createSubscription', {
            style: 'homepage.css'
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
