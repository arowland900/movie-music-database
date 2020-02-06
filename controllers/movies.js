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
            // Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, searchedSongs) {
                if (err) return res.redirect('/')
                res.render('movies/detail', { movie, searchedSongs: null })
            // });
        })
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var movie = new Movie(req.body);
    // movie.songs.push('5e3202ffadc67606612ac7c2')
    movie.save(function (err) {
        if (err) return res.redirect('/movies/new');
        res.redirect(`/movies/${movie._id}`);
    });
}
