var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
    index
};


function index(req, res) {

    if (!req.body.title) {
        if (req.method == "GET") {
            res.render('index', { title: "Search", movies: null, songs: null })
        } else {
            Movie.find({}, function (err, movies) {
                Song.find({}, function (err, songs) {
                    res.render('index', { title: "Add Movie", movies, songs })
                })
            });
        }
    }
    Movie.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, movies) {
        Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, songs) {
            // let all = [...songs, movies].sort()
            res.render('index', { title: "Add Movie", movies, songs })
        })
    });
}
