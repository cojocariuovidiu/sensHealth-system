var mongoose = require('mongoose');

exports = module.exports = function(server,mongoose){
    var paramedicoSchema = new mongoose.Schema({
        curp:{type:String},
        nombre:{type:String},
        apellidos:{type:String},
        edad:{type:Number},
        domicilio:{type:String},
        rol:{type:String}
    });
    
    mongoose.model("Paramedico",paramedicoSchema);
};