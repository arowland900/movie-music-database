var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
  index,
  new: newMovie
};

function index(req, res) {
  Movie.find({}, function(err, movies) { 
    res.render('movies/index', { title: 'All Movies', movies });
  });
}

function newMovie(req,res) {
    res.render('movies/new', {title: "Add Movie"})
}
