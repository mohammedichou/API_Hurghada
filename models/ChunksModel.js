var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChunksModel = new Schema({
  files_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  n: {
    type: Number,
  },
  data: {
    type: Buffer,
  },
}
);
module.exports = mongoose.model('photos.chunks', ChunksModel);  
