var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number
  }, 
  rating: String,
  songs: [{type: Schema.Types.ObjectId, ref: 'Song'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);