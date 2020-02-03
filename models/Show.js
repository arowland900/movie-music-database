var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var showSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    season: String,
    episode: {
        epTitle: String,
        num: Number
    },
    type: { type: String, default: 'show' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Show', showSchema);