var mongoose = require('mongoose');
exports = module.exports = function(server,mongoose){
    var posSchema = new mongoose.Schema({
        cliente:{type:String},
        frecuencia:{type:Number},
        posicion:{
            lat:{type:Number},
            lon:{type:Number}
        },
        fechalocal:{type:String},
        fechaservidor:{type:String}
    });

    mongoose.model('Posicion',posSchema);
}