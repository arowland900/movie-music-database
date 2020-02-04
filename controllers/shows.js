var Show = require('../models/show');
var Episode = require('../models/episode');

module.exports = {
    new: newShow,
    create,
    show,
    find,
    newEpisode,
    createEpisode
};

function createEpisode(req,res){
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var episode = new Episode(req.body);

    // movie.songs.push('5e3202ffadc67606612ac7c2')
    episode.save(function (err) {
        if (err) return res.redirect(`back`);

        Show.findById(req.params.id)
        .exec(function(err, show){
            show.episodes.push(episode._id)
            show.save(function(err, s){
                if(err) return res.redirect(`back`)
                res.redirect(`/shows/${s._id}`);
            })
        })
    });
}

function newEpisode(req, res) {
    Show.findById(req.params.id)
        .exec(function (err, show) {
            res.render('episodes/new', { show, shows: null })
        })

}

function find(req, res) {
    console.log("HITTING SHOW FIND FUNCTION")
    console.log("REQ BODY: ", req.body.title)
    Show.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, shows) {
        console.log("SHOWS: ", shows)
        shows.sort((a, b) => {
            let aFirstWord, bFirstWord
            let x = a.title.toLowerCase()
            let y = b.title.toLowerCase()
            aFirstWord = a.title.split(' ')[0]
            bFirstWord = b.title.split(' ')[0]

            if (aFirstWord.toLowerCase() == "the" || aFirstWord.toLowerCase() == "a") {
                x = x.split(' ')[1]
            }
            if (bFirstWord.toLowerCase() == "the" || bFirstWord.toLowerCase() == "a") {
                y = y.split(' ')[1]
            }
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            if (x == y) {
                if (a.year < b.year) { return -1; }
                if (a.year > b.year) { return 1; }
                return 0
            }
            return 0;
        })
        res.render('episodes/new', { title: "Add Episode", shows, show: null })
    })
}


function newShow(req, res) {
    res.render('shows/new', { title: "Add Show" })
}

function show(req, res) {
    Show
        .findById(req.params.id)
        .populate('episodes')
        .exec(function (err, show) {
            console.log("SHOW: ", show)
            console.log("ERR: ", err)
            if (err) return res.redirect('/')
            res.render('shows/detail', { show })
        });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    req.body.creators = req.body.creators.split(',')
    var show = new Show(req.body);

    // movie.songs.push('5e3202ffadc67606612ac7c2')
    show.save(function (err) {
        if (err) return res.redirect('/shows/new');
        res.redirect(`/shows/${show._id}`);
    });
}
