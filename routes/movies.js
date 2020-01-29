var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies')

/* GET home page. */
router.get('/', moviesCtrl.index);
router.post('/', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
router.post('/movies', moviesCtrl.create)

module.exports = router;
