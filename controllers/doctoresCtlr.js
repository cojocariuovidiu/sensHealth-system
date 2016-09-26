var mongoose = require('mongoose');
var Doctor = mongoose.model('Doctor');

//Retorna todos los doctores
exports.findAllDoctors = function(req,res){
    Paciente.find(function(error,doctores){
        if(error) res.send(500,error.message);
        console.log('GET /doctores/');
        res.status(200).jsonp(doctores);
    });
}

//GET por ID de pacientes
exports.findDoctorsById = function(req,res){
    Paciente.find(req.params.id,function(error, doctor){
        if(error) return res.send(500,error.message);
        console.log('/GET /doctores/'+ req.params.id);
        res.status(200).jsonp(doctor);
    });
}

//POST Agrega un nuevo doctor
exports.addDoctor = function(req,res){
    console.log('POST');
    console.log(req.body);
    
    var doctor = new Doctor({
        curp: req.body.curp,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        especialidad: req.body.especialidad,
        domicilio: req.body.domicilio,
        rol: req.body.rol
    });
    doctor.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(doctor);
    });
}
// UPDATE modifica un doctor
    exports.updateDoctor = function(req,res){
        Doctor.findById(req.params.id,function(error,doctor){
            doctor.curp = req.params.curp;
            doctor.nombre = req.params.nombre;
            doctor.apellidos = req.params.apellidos;
            doctor.edad = req.params.edad;
            doctor.especialidad = req.params.especialidad;
            doctor.domicilio = req.params.domicilio;
            doctor.rol = req.params.rol;
            
            doctor.save(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(doctor);
            });
        });
        
    }
    
    //DELETE elimina un doctor
    exports.deleteDoctor = function(req,res){
        Doctor.findById(req.params.id,function(error,doctor){
            doctor.remove(function(error){
                if(error) return res.send(500,error.message);
                res.status(200).jsonp(doctor);
            });
        });
    }
    