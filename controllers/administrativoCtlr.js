var mongoose = require('mongoose');
var Administrador = mongoose.model('Administrativo');

//GET Retorna todos los administrativos
exports.findAllAdministrativos = function(req,res){
    Paciente.find(function(error,administrativos){
        if(error) res.send(500,error.message);
        console.log('GET /administrativos/');
        res.status(200).jsonp(administrativos);
    });
}

//Retorna un solo administrativo
exports.findAdministrativoById = function(req,res){
    Administrativo.find(req.params.id,function(error,administrativo){
        if(error) return res.send(500,error.message);
        console.log('/GET /administrativo/'+ req.params.id);
        res.status(200).jsonp(administrativo);
    });
}

//Agrega un administrativo
exports.addAdministrativo = function(req,res){
    console.log('POST');
    console.log(req.body);
    
    var administrativo = new Administrativo({
        curp: req.body.curp,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        rol: req.body.rol
    });
    administrativo.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(administrativo);
    });
}
//Actualiza la información de un administrativo
    exports.updateAdministrativo = function(req,res){
        Personal.findById(req.params.id,function(error,administrativo){
            personal.nombre = req.params.nombre;
            personal.apellidos = req.params.apellidos;
            personal.edad = req.params.edad;
            personal.domicilio = req.params.domicilio;
            
            administrativo.save(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(administrativo);
            });
        });
        
    }
    
    //Elimina a un administrativo
    exports.deleteAdministrativo = function(req,res){
        Administrativo.findById(req.params.id,function(error,administrativo){
            administrativo.remove(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(administrativo);
            });
        });
    }