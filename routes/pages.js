/*const express= require('express');

const router = express.Router();

router.get('/',(req, res)=> {
    res.render('index');
});

router.get('/register',(req, res)=> {
    res.render('register');
});

router.get('/login',(req, res)=> {
    res.render('login');
});*/

/*router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Do login validation here...

  // On success, redirect to home
  res.redirect('/');
});

router.post('/register', async (req, res) => {
  const { name, email, phone, password, occupation } = req.body;
  // Add user saving logic here...

  // Show alert and redirect using query param
  res.redirect('/?registered=success');
});*/


//module.exports = router


const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  res.render('index', {
    user: req.session.user
  });
});


router.get('/register', (req, res) => {
  res.render('register'); // ✅ make sure this just renders the page
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/portfolio', (req, res) => {
  res.render('portfolio'); // ✅ make sure this just renders the page
});




module.exports = router;
