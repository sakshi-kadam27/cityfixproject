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

router.get('/service_provider_dashboard', (req, res) => {
  res.render('dashboard_sp'); // ✅ make sure this just renders the page
});

router.get('/customerDetailsUpdate', (req, res) => {
  res.render('customerDetailsUpdate'); // ✅ make sure this just renders the page
});

router.get('/searchService', (req, res) => {
  res.render('searchService'); // ✅ make sure this just renders the page
});


router.get('/customerOrders', (req, res) => {
  res.render('customerOrders'); // ✅ make sure this just renders the page
});

router.get('/serviceProviderOrders', (req, res) => {
  res.render('serviceProviderOrders'); // ✅ make sure this just renders the page
});

module.exports = router;
