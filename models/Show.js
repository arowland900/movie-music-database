var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var showSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  writer: {
    type: String
  },
  director: {
    type: String
  },
  year: Number,
  episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }],
  type: { type: String, default: 'show' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Show', showSchema);