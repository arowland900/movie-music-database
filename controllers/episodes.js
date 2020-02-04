var Episode = require('../models/movie');

module.exports = {
    new: newEpisode,
    show,
    create
};


function newEpisode(req, res) {
    res.render('episodes/new', { title: "Add Episode" })
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
