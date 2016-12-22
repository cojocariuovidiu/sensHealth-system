var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

//Retorna todos los usuarios
exports.findAllUsers = function(req,res){
    Usuario.find(function(error,usuarios){
        if(error) res.send(500,error.message);
        console.log('GET /usuarios/');
        res.status(200).jsonp(usuarios);
    });
}

//GET por ID de usuarios
exports.findUsersById = function(req,res){
    Usuario.find(req.params.id,function(error, usuario){
        if(error) return res.send(500,error.message);
        console.log('/GET Id /usuario/'+ req.params.id);
        res.status(200).jsonp(usuario);
    });
}
//GET por nombre de usuarios
/*exports.findUsersByName = function(req,res){
    Usuario.find(req.params.nombre,function(error, usuario){
        if(error) return res.send(500,error.message);
        console.log('/GET Name /usuario/'+ req.params.nombre);
        res.status(200).jsonp(usuario);

    });
}*/

//POST agrega un usuario
exports.addUser = function(req,res){
    console.log('POST USUARIOS');
    console.log(req.body);

    var usuario = new Usuario({
        curp: req.body.curp,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        peso: req.body.peso,
        estatura: req.body.estatura,
        domicilio: req.body.domicilio,
        historial: req.body.historial,
        rol : req.body.rol
    });
    usuario.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(usuario);
    });
}
// UPDATE modifica un usuario
    exports.updateUsuario = function(req,res){
        Usuario.findById(req.params.id,function(error,usuario){
            usuario.curp = req.params.curp;
            usuario.nombre = req.params.nombre;
            usuario.apellidos = req.params.apellidos;
            usuario.edad = req.params.edad;
            usuario.peso = req.params.peso;
            usuario.estatura = req.params.estatura;
            usuario.domicilio = req.params.domicilio;
            usuario.historial = req.params.historial;
            usuario.rol = req.params.rol;
            usuario.save(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(usuario);
            });
        });

    }

    //DELETE elimina un usuario
    exports.deleteUsuario = function(req,res){
        Usuario.findById(req.params.id,function(error,usuario){
            usuario.remove(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(usuario);
            });
        });
    }



