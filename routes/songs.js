var express = require('express');
var router = express.Router();
var songsCtrl = require('../controllers/songs')

/* GET home page. */

router.post('/', songsCtrl.create)
router.get('/new', songsCtrl.new);
router.get('/:id', moviesCtrl.show);

module.exports = router;
