var Show = require('../models/show');

module.exports = {
    new: newShow,
    create,
    show,
    find,
    newEpisode
};

function newEpisode(req,res){
    Show.findById(req.params.id)
    .exec(function(err, show){
        res.render('episodes/new', {show, shows: null})
    })

}

function find(req, res) {
    console.log("HITTING SHOW FIND FUNCTION")
    console.log("REQ BODY: ", req.body.title)
    Show.find({ "title": { "$regex": req.body.title, "$options": "i" } }, function (err, shows) {
        console.log("SHOWS: ", shows)
        // shows.sort((a, b) => {
        //     if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
        //     if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
        //     if (a.title.toLowerCase() == b.title.toLowerCase()) {
        //         if (a.year < b.year) { return -1; }
        //         if (a.year > b.year) { return 1; }
        //         return 0
        //     }
        //     return 0;
        // })
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
        res.redirect(`/`);
    });
}
