var Movie = require('../models/movie');
var Song = require('../models/song');
var Show = require('../models/show');

module.exports = {
    index
};


function index(req, res) {

    if (!req.body.title) {
        if (req.method == "GET") {
            res.render('index', { title: "Search", movies: null, songs: null, shows: null })
        } else {
            Movie.find({}, function (err, movies) {
                Song.find({}, function (err, songs) {
                    Show.find({}, function (err, shows) {

                        // let all = [...movies, ...songs].sort((a,b) =>{
                        //     console.log(a.title[0], b.title[0])
                        //     return a.title[0] - b.title[0]
                        // })
                        let all = [...movies, ...songs, ...shows].sort((a, b) => {
                            if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
                            if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
                            if (a.title.toLowerCase() == b.title.toLowerCase()) {
                                if (a.year < b.year) { return -1; }
                                if (a.year > b.year) { return 1; }
                                return 0
                            }
                            return 0;
                        })
                        res.render('index', { title: "Add Movie", movies, songs, shows, all })
                    })
                })
            });
        }
    } else {
        Movie.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, movies) {
            Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, songs) {
                Show.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, shows) {
                    let all = [...movies, ...songs, ...shows].sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
                        if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
                        if (a.title.toLowerCase() == b.title.toLowerCase()) {
                            if (a.year < b.year) { return -1; }
                            if (a.year > b.year) { return 1; }
                            return 0
                        }
                        return 0;
                    })
                    res.render('index', { title: "Add Movie", movies, songs, shows, all })
                })
            })
        });
    }
}
