var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
    new: newMovie,
    create,
    show
};


function newMovie(req, res) {
    res.render('movies/new', { title: "Add Movie" })
}

function show(req, res) {
    Movie
        .findById(req.params.id)
        .populate('songs')
        .exec(function (err, movie) {
            if (err) return res.redirect('/')
            res.render('movies/detail', { movie })
        });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var movie = new Movie(req.body);
    movie.save(function (err) {
        if (err) return res.redirect('/movies/new');
        res.redirect(`/`);
    });
}
