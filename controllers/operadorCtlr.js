var mongoose = require('mongoose');
var Operador = mongoose.model('Operador');

//Retorna todos los operadores
exports.findAllOperador = function(req,res){
    Operador.find(function(error,operadores){
        if(error) res.send(500,error.message);
        console.log('GET /operadores/');
        res.status(200).jsonp(operadores);
    });
}

//Retorna un solo operador de ambulancia
exports.findOperadorById = function(req,res){
    Operador.find(req.params.id,function(error, operador){
        if(error) return res.send(500,error.message);
        console.log('/GET /operador/'+ req.params.id);
        res.status(200).jsonp(operador);
    });
}

//Agrega un operador de ambulancia
exports.addOperador = function(req,res){
    console.log('POST');
    console.log(req.body);
    
    var operador = new Operador({
        curp: req.body.curp,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        rol: req.body.rol
    });
    operador.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(operador);
    });
}
//Actualiza la información de un operador de ambulancia
    exports.updateOperador = function(req,res){
        Operador.findById(req.params.id,function(error,operador){
            operador.curp = req.params.curp;
            operador.nombre = req.params.nombre;
            operador.apellidos = req.params.apellidos;
            operador.edad = req.params.edad;
            operador.rol = req.params.rol;
            
            operador.save(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(operador);
            });
        });
        
    }
    
    //Elimina a un operador de ambulancia
    exports.deleteOperador = function(req,res){
        Operador.findById(req.params.id,function(error,operador){
            operador.remove(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(operador);
            });
        });
    }
    