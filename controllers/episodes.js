var Episode = require('../models/episode');
var Show = require('../models/show');

module.exports = {
    new: newEpisode,
    show,
    create
};


function newEpisode(req, res) {
    console.log("HIT newEpisode, id?: ", req.params.id)
    if(!req.params.id){
        res.render('episodes/new', { title: "Add Episode", shows: null, show: null })
    } else {
        Show.findById(req.params.id)
        .exec(function(err, show){
            if(err) return res.redirect(`back`)
            res.render('episodes/new', show)
        })
    }
}

function show(req, res) {
    Episode
        .findById(req.params.id)
        .exec(function (err, episode) {
            if (err) return res.redirect('/')
            res.render('episodes/detail', { episode })
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
