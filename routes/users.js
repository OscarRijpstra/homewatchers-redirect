const express = require('express'),
router = express.Router(),
user_controller = require('../controllers/userController');

// router.use((req, res, next) => {
//     if(req.isAuthenticated()) return res.redirect('/admin');
//     next();
// });

router
.get('/registreren',  user_controller.create_get)
.post('/registreren', user_controller.create_post);

router
.get('/login', user_controller.login_get)
.post('/login', user_controller.login_post);

module.exports = router;