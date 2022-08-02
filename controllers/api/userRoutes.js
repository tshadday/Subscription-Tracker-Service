const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
    try {
        // takes email input from user and saves as userEmail
        const userEmail = await User.findOne({ where: { email: req.body.email } });

        // if there is no saved email associated with the one that was input, send error
        if (!userEmail) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
  
      // uses function in User.js to compare input password to saved encrypted password
      const validPassword = await userData.checkPassword(req.body.password);

        // if user input password and saved password don't match, send error
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
        
        // saves the current session, sets user_id as userEmail id in sessions, and sets logged_in to true
        req.session.save(() => {
            req.session.user_id = userEmail.id;
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