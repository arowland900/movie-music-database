var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
    new: newMovie,
    create,
    show,
    findSong,
    addSong
};

function findSong(req, res) {
    Movie
        .findById(req.params.id)
        .populate('songs')
        .exec(function (err, movie) {
            console.log("OUTER HIT")
            // Song.find({ "title": { "$regex": req.body.title, "$options": "i" }, "_id": { $nin: episode.songs } }, function (err, searchedSongs) {
            Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, searchedSongs) {
                if (err) return res.redirect('/')
                res.render('movies/detail', { movie, searchedSongs })
            })
        })
}

function addSong(req, res) {
    Movie
        .findById(req.params.mid)
        .populate('songs')
        .exec(function (err, movie) {
            // Song.find({ "title": { "$regex": req.body.title, "$options": "i" }, "_id": { $nin: episode.songs } }, function (err, searchedSongs) {
            Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, searchedSongs) {
                Song.findById(req.params.sid)
                    .exec(function (err, song) {
                        if (!movie.songs.includes(song)) {
                            movie.songs.push(song)
                        }
                        // TO QUICKLY DELETE ALL SONGS FROM AN MOVIE, RUN CODE DIRECTLY BELOW
                        // movie.songs.splice(0,movie.songs.length)
                        movie.save(function (err) {
                            if (err) return res.redirect('/')
                            // res.render('episodes/detail', { episode, show, searchedSongs })
                            res.redirect(`/movies/${movie._id}`)
                        });
                    })
            })
        });
}


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
