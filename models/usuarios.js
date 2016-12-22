var mongoose = require('mongoose');
exports = module.exports = function(server, mongoose){
    var usuarioSchema = new mongoose.Schema({
        curp:{type:String},
        nombre:{type:String},
        apellidos:{type:String},
        edad:{type:Number},
        peso:{type:Number},
        estatura:{type:Number},
        domicilio:{type:String},
        historial:{type:String},
        rol:{type:String}
    });

    mongoose.model("Usuario",usuarioSchema);

}
