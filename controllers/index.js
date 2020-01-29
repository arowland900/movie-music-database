var Movie = require('../models/movie');
var Song = require('../models/song');

module.exports = {
    index,
};


function index(req, res) {
    if(!req.body.title) res.render('index', {title: "Search", movies: null, songs: null})
    Movie.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, movies) {
        Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, songs) {
            // let all = [...songs, movies].sort()
            res.render('index', { title: "Add Movie", movies, songs })
        })
    });
}
