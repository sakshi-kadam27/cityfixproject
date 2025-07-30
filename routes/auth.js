const express= require('express');
const router = express.Router();
const authcontroller = require('../controller/auth');


router.post('/register' , authcontroller.register);
router.post('/login' ,    authcontroller.login);
router.post('/portfolio' ,authcontroller.updatePortfolio);
router.post('/updateCustomerDetails' ,authcontroller.updateCustomerDetails);
router.get('/getAllServiceProviders' ,authcontroller.getAllServiceProviders);


// router.post('/dashboard' ,authcontroller.updatePortfolio);

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});



module.exports= router;