const router = require('express').Router();   
const { User } = require('../../models');
const { Subscription } = require('../../models');
const { Unsub } = require('../../models');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
    try {
        const newSub = await Subscription.create({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newSub);
      } catch (err) {
        res.status(400).json(err);
      }
});

router.delete('/:id', auth, async (req, res) => {
    try {
      const subData = await Subscription.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!subData) {
        res.status(404).json({ message: 'No subscription found with this id' });
        return;
      }
  
      res.status(200).json(projectData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET all subscriptions
  router.get('/:user_id', (req, res) => {
    Subscription.findAll().then((subData) => {
      res.json(subData);
    });
  });
  
  // UPDATE a subscription
  router.put('/:id', (req, res) => {
    Subscription.update(
      {
        sub_name: req.body.sub_name,
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
  
  // POST how to unsubscribe links
  router.get('/:id', async (req, res) => {
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