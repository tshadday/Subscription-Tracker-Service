const router = require('express').Router();   
const { User } = require('../../models');
const { Subscription } = require('../../models');
const { Unsub } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

// route: api/users/login
router.post('/login', async (req, res) => {
  try {
    // takes email input from user and saves as userEmail
    const userData = await User.findOne({ where: { email: req.body.email } });

    // if there is no saved email associated with the one that was input, send error
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email' });
      return;
    }
    console.log(req.body.password);
    console.log(userData.password);

    // if user input password and saved password don't match, send error
    if (req.body.password !== userData.password) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }


    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.user_name = userData.user_name;
    // saves the current session, sets logged_in to true
    req.session.save();

    res.redirect('/');

  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
});

// on logout, destroys current session and sets logged_in to false
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;