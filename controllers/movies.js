var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
  index,
};

function index(req, res) {
  Movie.find({}, function(err, movies) { 
    res.render('movies/index', { title: 'All Movies', movies });
  });
}
