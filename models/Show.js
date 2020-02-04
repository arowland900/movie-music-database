var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var showSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  network: {
    type: String
  },
  creators: [{
    type: String
  }],
  year: Number,
  episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }],
  type: { type: String, default: 'show' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Show', showSchema);