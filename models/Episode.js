var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var episodeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    season: Number,
    epNum: Number,
    airDate: Date,
    songs: [{type: Schema.Types.ObjectId, ref: 'Song'}],
    type: { type: String, default: 'episode' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Episode', episodeSchema);