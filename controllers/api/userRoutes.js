const router = require('express').Router();   
const { User } = require('../../models/User');
const { Subscription } = require('../../models/Subscription');
const { Unsub } = require('../../models/Unsub');

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
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    // uses bcrypt to compare user input password to saved encrypted password
    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    // if user input password and saved password don't match, send error
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    // saves the current session, sets user_id as userEmail id in sessions, and sets logged_in to true
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Successfully logged in' });
    });

  } catch (err) {
    res.status(400).json(err);
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