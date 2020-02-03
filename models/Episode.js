var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var episodeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    season: String,
    episodeTitle: String,
    episodeNum: Number,
    type: { type: String, default: 'episode' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Episode', episodeSchema);