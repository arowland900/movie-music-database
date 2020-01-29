var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
    new: newMovie,
    create
};


function newMovie(req, res) {
    res.render('movies/new', { title: "Add Movie" })
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
