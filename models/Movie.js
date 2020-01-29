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
  rating: {
    type: String,
    enum : ['G','PG', 'PG-13', 'R', 'Not Rated', 'NC-17']
  },
  songs: [{type: Schema.Types.ObjectId, ref: 'Song'}],
  type: { type: String, default: 'movie' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);