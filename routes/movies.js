var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies')

/* GET home page. */
router.get('/', moviesCtrl.index);

module.exports = router;
