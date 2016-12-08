exports.addAccount = function(req,res){
var stormpath = require('stormpath');


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


        /*var xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.open("POST", "http://192.168.1.88:8080/pacientes");
        xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlhttp2.send(JSON.stringify(datos));
        xmlhttp2.close();*/

    console.log('Datos enviados a mongo: ',datos);

    console.log('Cuenta armada: ',account);

    application.createAccount(account,function(err,createdAccount){

        if(err){
            console.log('Hay un error: ',err.userMessage);
            res.status(200).send('Error: ' + err.userMessage);
        }else{
        res.status(200).send(createdAccount);
        console.log('Cuenta creada: ',createdAccount);
        }

});


});
    }
