const express = require('express'),
router = express.Router(),
index_controller = require('../controllers/indexController');

router
.get('/', index_controller.content_get)
.get('/oppas-en-beheer', index_controller.content_get)

router.get('/404', index_controller.not_found_get);

module.exports = router;