var Show = require('../models/show');

module.exports = {
    new: newShow,
    create,
    show
};


function newShow(req, res) {
    res.render('shows/new', { title: "Add Show" })
}

function show(req, res) {
    Show
        .findById(req.params.id)
        .populate('songs episodes')
        .exec(function (err, show) {
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
        res.redirect(`/`);
    });
}
