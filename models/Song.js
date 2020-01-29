var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
  title: {type: String, required: true},
  artist: {type: String, required: true},
  year: Number,
  type: { type: String, default: 'song' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', songSchema);