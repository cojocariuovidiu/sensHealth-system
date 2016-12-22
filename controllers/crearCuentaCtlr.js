exports.addAccount = function(req,res){
var stormpath = require('stormpath');
var XMLHttpRequest = require("xmlhttprequest");


console.log('Entree')
var apiKey = new stormpath.ApiKey(
process.env['STORMPATH_CLIENT_APIKEY_ID'],
process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);


var client = new stormpath.Client({apiKey:apiKey});

var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];


client.getApplication(applicationHref,function(error,application){
    console.log('Application Found: '+application.name);

     //Create a json data user
    var account = {
        givenName:  req.body.givenName,
        surname:    req.body.surname,
        username:   req.body.email,
        email:      req.body.email,
        password:   req.body.password

    }
    var curp      =req.body.curp;
        var edad      =req.body.edad;
        var peso      =req.body.peso;
        var estatura  =req.body.estatura;
        var domicilio =req.body.domicilio;
        var historial =req.body.historial;
        var rol       =req.body.rol;

        var datos = {curp: curp, edad: edad, peso: peso, estatura: estatura,
                                      domicilio: domicilio, historial: historial, rol: rol}


        /*var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.23.125:8080/usuarios");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.send(JSON.stringify(datos));
        xhr.close();*/

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

    console.log('Datos enviados a mongo: ',datos);
    console.log('Fecha: ',fechaservidor)
    console.log('Cuenta armada: ',account);

    application.createAccount(account,function(err,createdAccount){

        if(err){
            console.log('Hay un error: ',err.userMessage);
            res.status(res.statusCode).send('Error: ' + err.userMessage);
        }else{
        res.status(200).send(createdAccount);
        console.log('Cuenta creada: ',createdAccount);
        }

});


});
    }
