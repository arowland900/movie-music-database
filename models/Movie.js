var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number
  }, 
  mpaaRating: String,
  songs: [{type: Schema.Types.ObjectId, ref: 'Song'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);