var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
    index,
    new: newMovie,
    search,
    create
};

function index(req, res) {
    let movies = null
    let songs = null
    res.render('movies/index', { title: 'All Movies', movies, songs });
}

function newMovie(req, res) {
    res.render('movies/new', { title: "Add Movie" })
}

function search(req, res) {
    Movie.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, movies) {
        Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, songs) {
            // let all = [...songs, movies].sort()
            res.render('movies/index', { title: "Add Movie", movies, songs })
        })
    });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var movie = new Movie(req.body);
    movie.save(function (err) {
        if (err) return res.redirect('/new');
        res.redirect(`/`);
    });
}
