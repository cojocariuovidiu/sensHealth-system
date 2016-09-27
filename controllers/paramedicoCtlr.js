var mongoose = require('mongoose');
var Paramedico = mongoose.model('Paramedico');

//Retorna todo el personal médico
exports.findAllParamedics = function(req,res){
    Paramedico.find(function(error,paramedicos){
        if(error) res.send(500,error.message);
        console.log('GET /paramedicos/');
        res.status(200).jsonp(paramedicos);
    });
}

//Retorna un solo personal médico
exports.findParamedicById = function(req,res){
    Paramedico.find(req.params.id,function(error, paramedico){
        if(error) return res.send(500,error.message);
        console.log('/GET /paramedico/'+ req.params.id);
        res.status(200).jsonp(paramedico);
    });
}

//Agrega un personal médico
exports.addParamedic = function(req,res){
    console.log('POST');
    console.log(req.body);
    
    var paramedico = new Paramedico({
        curp: req.body.curp,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        domicilio: req.body.domicilio,
        rol: req.body.rol
    });
    paramedico.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(paramedico);
    });
}
//Actualiza la información de un personal médico
    exports.updateParamedic = function(req,res){
        Paramedico.findById(req.params.id,function(error,paramedico){
            paramedico.curp = req.params.curp;
            paramedico.nombre = req.params.nombre;
            paramedico.apellidos = req.params.apellidos;
            paramedico.edad = req.params.edad;
            paramedico.domicilio = req.params.domicilio;
            paramedico.rol = req.paramas.rol;
            
            paramedico.save(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(paramedico);
            });
        });
        
    }
    
    //Elimina a un persona médico
    exports.deleteParamedic = function(req,res){
        Paramedico.findById(req.params.id,function(error,paramedico){
            paramedico.remove(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(paramedico);
            });
        });
    }
    