const express= require('express');
const router = express.Router();
const authcontroller = require('../controller/auth');


router.post('/register' , authcontroller.register);
router.post('/login' ,    authcontroller.login);

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});


module.exports= router;