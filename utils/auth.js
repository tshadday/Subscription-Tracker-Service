const auth = (req, res, next) => {
    // if not logged in, redirect to login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      // once login is completed, move to next step of code
      next();
    }
  };
  
  module.exports = auth;
  