var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var episodeSchema = new Schema({
    showTitle: {
        type: String,
        required: true
    },
    season: String,
    epTitle: String,
    episodeNum: Number,
    type: { type: String, default: 'episode' },
    songs: [{type: Schema.Types.ObjectId, ref: 'Song'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Episode', episodeSchema);