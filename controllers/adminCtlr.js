var mongoose = require('mongoose');
var Administrador = mongoose.model('Administrador');

//GET Retorna todos los administradores
exports.findAllAdmins = function(req,res){
    Administrador.find(function(error,admins){
        if(error) return res.send(500,error.message);
        console.log('GET /admins/');
        res.status(200).jsonp(admins);

    });
}

//GET Retorna un administrador por id
exports.findAdminsById = function(req,res){
    Administrador.find(req.params.id,function(error,admin){
        if(error) return res.send(500,error.message);
        console.log('GET /admins/'+req.params.id);
        res.status(200).jsonp(admin);
    });
}

//POST Agrega un administrador
exports.addAdmin = function(req,res){
    console.log('POST');
    console.log(req.body);

    var admin = new Administrador({
        curp: req.body.curp,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        rol: req.body.rol
    });

    admin.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(admin);
    });
}

//UPDATE Modifica un administrador
exports.updateAdmin = function(req,res){
    Administrador.find(req.params.id,function(error,admin){
        admin.curp = req.params.curp;
        admin.nombre = req.params.nombre;
        admin.apellidos = req.params.apellidos;
        admin.edad = req.params.edad;
        admin.rol = req.params.rol;

        admin.save(function(error){
            if(error) return res.send(500,error.message);
            res.status(200).jsonp(admin);
        });
    });
}

//DELETE Elimina un administrador
exports.deleteAdmin = function(req,res){
    Administrador.find(req.params.id,function(error,admin){
        admin.remove(function(error){
            if(error) res.send(500,error.message);
            res.status(200).jsonp(admin);

        });
    });
}