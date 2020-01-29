var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies')

/* GET home page. */

router.post('/', moviesCtrl.create)
router.get('/new', moviesCtrl.new);
router.get('/:id', moviesCtrl.show);

module.exports = router;
