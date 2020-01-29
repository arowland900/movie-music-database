var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
    new: newSong,
    show,
    create
};


function newSong(req, res) {
    res.render('songs/new', { title: "Add Movie" })
}

function show(req, res) {
    Song
        .findById(req.params.id)
        .exec(function (err, song) {
            if (err) return res.redirect('/')
            res.render('songs/detail', { song })
        });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var movie = new Song(req.body);
    movie.save(function (err) {
        if (err) return res.redirect('/songs/new');
        res.redirect(`/`);
    });
}
