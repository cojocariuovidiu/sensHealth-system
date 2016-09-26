var mongoose = require('mongoose');

exports = module.exports = function(server,mongoose){
    var doctorSchema = mongoose.Schema({
        curp:{type:String},
        nombre:{type:String},
        apellidos:{type:String},
        edad:{type:Number},
        especialidad:{type:String},
        domicilio:{type:String},
        rol:{type:Number}
    });
mongoose.model('Doctor',doctorSchema);
}
