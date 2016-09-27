var mongoose = require('mongoose');
var Secretaria = mongoose.model('Secretaria');

//Retorna todas las secretarias
exports.findAllSecretaria = function(req,res){
    Secretaria.find(function(error,secretarias){
        if(error) res.send(500,error.message);
        console.log('GET /secretarias/');
        res.status(200).jsonp(secretarias);
    });
}

//Retorna una sola secretaria
exports.findSecretariaById = function(req,res){
    Secretaria.find(req.params.id,function(error, secretaria){
        if(error) return res.send(500,error.message);
        console.log('/GET /secretaria/'+ req.params.id);
        res.status(200).jsonp(secretaria);
    });
}

//Agrega una secretaria
exports.addSecretaria = function(req,res){
    console.log('POST');
    console.log(req.body);
    
    var secretaria = new Secretaria({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        domicilio: req.body.domicilio
    });
    secretaria.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(secretaria);
    });
}
//Actualiza la información de una secretaria 
    exports.updateSecretaria = function(req,res){
        Secretaria.findById(req.params.id,function(error,secretaria){
            secretaria.nombre = req.params.nombre;
            secretaria.apellidos = req.params.apellidos;
            secretaria.edad = req.params.edad;
            secretaria.domicilio = req.params.domicilio;
            
            secretaria.save(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(secretaria);
            });
        });
        
    }
    
    //Elimina a una secretaria
    exports.deleteSecretaria = function(req,res){
        Secretaria.findById(req.params.id,function(error,secretaria){
            secretaria.remove(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(secretaria);
            });
        });
    }
    