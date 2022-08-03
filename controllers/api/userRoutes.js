const router = require('express').Router();   
const { User, update } = require('../../models/User');
const { Subscription } = require('../../models/Subscription');
const { Unsub } = require('../../models/Unsub');

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

// CREATE subscription
router.post('/', (req, res) => {
  Subscription.create(req.body)
    .then((newSub) => {
      res.json(newSub);
    })
    .catch((err) => {
      res.json(err);
    });
});
// GET all subscriptions
router.get('/:user_id', (req, res) => {
  Subscription.findAll().then((subData) => {
    res.json(subData);
  });
});
// UPDATE a subscription
router.put('/:sub_id', (req, res) => {
  Subscription.update(
    {
      sub_name: req.body.sub_title,
      cancel_date: req.body.cancel_date,
    },
    {
      where: {
        sub_id: req.params.sub_id,
      },
    }
  )
    .then((updatedSub) => {
      res.json(updatedSub);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
// DELETE a subscription
router.delete('/:sub_id', (req, res) => {
  Subscription.destroy({
    where: {
      sub_id: req.params.sub_id,
    },
  })
    .then((deletedSub) => {
      res.json(deletedSub);
    })
    .catch((err) => res.json(err));
});

// POST how to unsubscribe links
router.get('/sub/:id', async (req, res) => {
  try {
    const unsubData = await Unsub.findbyPk(req.params.id);

    if(!unsubData) {
      res.status(404).json({message: "No subscriptions with this id"});
      return;
    }

    // Serialize unsub data
    const unsub = unsubData.get({ plain: true })
    // render serialized "unsub" data to "subscription" handlebars page
    res.render('subscription', unsub);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;