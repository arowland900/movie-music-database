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
                    // let all = [...movies, ...songs].sort((a,b) =>{
                    //     console.log(a.title[0], b.title[0])
                    //     return a.title[0] - b.title[0]
                    // })
                    let all = [...movies, ...songs].sort((a, b) => {
                        if (a.title < b.title) { return -1; }
                        if (a.title > b.title) { return 1; }
                        return 0;
                    })
                    // console.log(all)
                    res.render('index', { title: "Add Movie", movies, songs, all })
                })
            });
        }
    } else {
        Movie.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, movies) {
            Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, songs) {
                // let all = [...songs, movies].sort()
                res.render('index', { title: "Add Movie", movies, songs })
            })
        });
    }
}
