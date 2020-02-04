var express = require('express');
var router = express.Router();
var showsCtrl = require('../controllers/shows')

/* GET home page. */

router.get('/', showsCtrl.find)
router.post('/', showsCtrl.create)
router.get('/new', showsCtrl.new);
router.get('/:id', showsCtrl.show);

module.exports = router;
