const express = require('express'),
router = express.Router(),
admin_controller = require('../controllers/adminController');

router.use((req, res, next) => {
    if(req.isUnauthenticated()) return res.redirect('/login');
    next();
});

router
.get('/', admin_controller.dashboard_get);

router
.get('/:url', admin_controller.content_get)

module.exports = router;