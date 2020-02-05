var express = require('express');
var router = express.Router();
var showsCtrl = require('../controllers/shows')
var episodesCtrl = require('../controllers/episodes')

/* GET home page. */

router.post('/', showsCtrl.create)
router.post('/find', showsCtrl.find)
router.get('/new', showsCtrl.new);
router.get('/:id', showsCtrl.show);
router.post('/:id', showsCtrl.createEpisode);
router.get('/:id/episodes/new', showsCtrl.newEpisode);
router.get('/:sid/episodes/:eid', episodesCtrl.show);
router.get('/:sid/episodes/:eid/edit', episodesCtrl.edit);
router.put('/:sid/episodes/:eid', episodesCtrl.update);

module.exports = router;
