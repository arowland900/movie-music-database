var express = require('express');
var router = express.Router();
var episodesCtrl = require('../controllers/episodes')

/* GET home page. */

router.post('/', episodesCtrl.create)
router.get('/new', episodesCtrl.new);
router.get('/:id', episodesCtrl.show);
router.get('/:id/edit', episodesCtrl.edit);
router.put('/:id', episodesCtrl.update);

module.exports = router;
