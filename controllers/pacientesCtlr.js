var mongoose = require('mongoose');
var Paciente = mongoose.model('Paciente');

//Retorna todos los pacientes
exports.findAllPatients = function(req,res){
    Paciente.find(function(error,pacientes){
        if(error) res.send(500,error.message);
        console.log('GET /pacientes/');
        res.status(200).jsonp(pacientes);
    });
}

//GET por ID de pacientes
exports.findPatientsById = function(req,res){
    Paciente.find(req.params.id,function(error, pacientes){
        if(error) return res.send(500,error.message);
        console.log('/GET /pacientes/'+ req.params.id);
        res.status(200).jsonp(pacientes);
    });
}

//POST agrega un paciente
exports.addPatient = function(req,res){
    console.log('POST');
    console.log(req.body);
    
    var paciente = new Paciente({
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
    paciente.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(paciente);
    });
}
// UPDATE modifica un paciente
    exports.updatePatient = function(req,res){
        Paciente.findById(req.params.id,function(error,paciente){
            paciente.curp = req.params.curp;
            paciente.nombre = req.params.nombre;
            paciente.apellidos = req.params.apellidos;
            paciente.edad = req.params.edad;
            paciente.peso = req.params.peso;
            paciente.estatura = req.params.estatura;
            paciente.domicilio = req.params.domicilio;
            paciente.historial = req.params.historial;
            paciente.rol = req.params.rol;

            paciente.save(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(paciente);
            });
        });
        
    }
    
    //DELETE elimina un paciente
    exports.deletePatient = function(req,res){
        Paciente.findById(req.params.id,function(error,paciente){
            paciente.remove(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(paciente);
            });
        });
    }
    
    
    
