var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DispoModel = new Schema({
    _id: {
        type : Object
    },
    prix: {
        type : Number
    },
    nombre: {
        type : Number
    },
    date_start: {
        type : Date
    }
    }
);
module.exports = mongoose.model('dispo', DispoModel);  