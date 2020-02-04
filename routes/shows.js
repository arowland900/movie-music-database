var express = require('express');
var router = express.Router();
var showsCtrl = require('../controllers/shows')

/* GET home page. */

router.post('/', showsCtrl.create)
router.post('/find', showsCtrl.find)
router.get('/new', showsCtrl.new);
router.get('/:id', showsCtrl.show);
// router.post('/:id', showsCtrl.createEpisode);
router.get('/:id/episodes/new', showsCtrl.newEpisode);

module.exports = router;
