var mongoose = require('mongoose');
var Posicion = mongoose.model('Posicion');

//GET Retorna todas las posiciones
exports.findAllPositions = function(req,res){
    Posicion.find(function(error,posiciones){
        if(error) return res.send(500,error.message);
        console.log('GET /posiciones/');
        res.status(200).jsonp(posiciones);
    });
}

//GET retorna una sola posiciones
exports.findPositionById = function(req,res){
    Posicion.findById(req.params.id, function(error,posicion){
        if(error) return res.send(500,error.message);
        console.log('GET /posicion/'+ req.params.id);
        res.status(200).jsonp(posicion);
    })
}

//POST agrega una nueva posicion
exports.addPosition = function(req,res){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    var hh = hoy.getHours();
    var min = hoy.getMinutes();
    var sec = hoy.getSeconds();

    if(dd<=10){
        dd='0'+dd
    }

    if(mm<=10){
        mm='0'+mm
    }

    var fechaservidor =(hoy = mm+'/'+dd+'/'+yyyy+" "+hh+":"+min+":"+sec);
    
    console.log('POST');
    var position = new Posicion({
        cliente: req.body.cliente,
        frecuencia: req.body.frecuencia,
        posicion: {
            lat:req.body.posicion.lat,
            lon:req.body.posicion.lon
        },
        fechalocal: req.body.fechalocal,
        fechaservidor: fechaservidor
    });
    position.save(function(error){
        if(error) return res.send(500,error.message);
        res.status(200).jsonp(position);
    });
    console.log(position);
}

//UPDATE modifica una posicion en especifico por id
exports.updatePosition = function(req,res){
    Posicion.findById(req.params.id,function(error,posicion){
        posicion.cliente = req.params.cliente;
        posicion.frecuencia = req.params.frecuencia;
        posicion.posicion.lat = req.params.posicion.lat;
        posicion.posicion.lon = req.params.posicion.lon;

        posicion.save(function(error){
            if(error) return res.send(500,error.message);
            res.status(200).jsonp(posicion);
        });
    });
}

//DELETE elimina una de las posiciones
exports.deletePosition = function(req,res){
    Posicion.findById(req.params.id,function(error,posicion){
        posicion.remove(function(error){
            if(error) return res.send(500,error.message);
            res.status(200).jsonp(posicion);
        });

    });
}
