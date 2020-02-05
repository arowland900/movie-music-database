var Episode = require('../models/episode');
var Show = require('../models/show');
var Song = require('../models/song');

module.exports = {
    new: newEpisode,
    show,
    create,
    update,
    edit,
    findSong,
    addSong
};

function addSong(req, res) {
    Episode
        .findById(req.params.eid)
        .populate('songs')
        .exec(function (err, episode) {
            console.log("OUTER HIT")
            Show.findById(req.params.sid)
                .exec(function (err, show) {
                    // Song.find({ "title": { "$regex": req.body.title, "$options": "i" }, "_id": { $nin: episode.songs } }, function (err, searchedSongs) {
                    Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, searchedSongs) {
                        Song.findById(req.params.soid)
                            .exec(function (err, song) {
                                if(!episode.songs.includes(song)){
                                    episode.songs.push(song)
                                }
                                // episode.songs.splice(0,episode.songs.length)
                                episode.save(function (err) {
                                    if (err) return res.redirect('/')
                                    // res.render('episodes/detail', { episode, show, searchedSongs })
                                    res.redirect(`/shows/${show._id}/episodes/${episode._id}`)
                                });
                            })
                    })
                })
        });
}

function findSong(req, res) {
    Episode
        .findById(req.params.eid)
        .populate('songs')
        .exec(function (err, episode) {
            console.log("OUTER HIT")
            Show.findById(req.params.sid)
                .exec(function (err, show) {
                    // Song.find({ "title": { "$regex": req.body.title, "$options": "i" }, "_id": { $nin: episode.songs } }, function (err, searchedSongs) {
                    Song.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, searchedSongs) {
                        if (err) return res.redirect('/')
                        res.render('episodes/detail', { episode, show, searchedSongs })
                    })
                })
        });
}

function edit(req, res) {
    Episode.findById(req.params.eid)
        .exec(function (e, episode) {
            Show.findById(req.params.sid)
                .exec(function (e, show) {
                    if (e) return res.redirect(`back`)
                    res.render('episodes/edit', { episode, show })
                })
        })
}

function update(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    Episode.findByIdAndUpdate(req.params.eid, req.body)
        .exec(function (err, episode) {
            Show.findById(req.params.sid)
                .exec(function (err, show) {
                    if (err) return res.redirect(`back`)
                    res.redirect(`/shows/${show._id}/episodes/${episode._id}`)
                })
            // res.render('episodes/detail', { episode })
        })
}


function newEpisode(req, res) {
    console.log("HIT newEpisode, id?: ", req.params.id)
    if (!req.params.id) {
        res.render('episodes/new', { title: "Add Episode", shows: null, show: null })
    } else {
        Show.findById(req.params.id)
            .exec(function (err, show) {
                if (err) return res.redirect(`back`)
                res.render('episodes/new', show)
            })
    }
}

function show(req, res) {
    Episode
        .findById(req.params.eid)
        .populate('songs')
        .exec(function (err, episode) {
            console.log("OUTER HIT")
            Show.findById(req.params.sid)
                .exec(function (err, show) {
                    console.log("INNER HIT")
                    if (err) return res.redirect('/')
                    res.render('episodes/detail', { episode, show, searchedSongs: null })
                })
        });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var episode = new Episode(req.body);
    episode.save(function (err) {
        if (err) return res.redirect('/episodes/new');
        res.redirect(`/`);
    });
}
