var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
stormpathClient = require('stormpath');

//Inicialización de Express
var app = express();
app.get('/',function(req,res){
    res.send('Hello, Welcome to Express');

});
app.listen(8080,function(){
    console.log('sensHealth listening on port 8080');
});
// Inicialización de base de datos
mongoose.connect('mongodb://localhost/senshealth',function(error,res){
    if(error) throw error;
    console.log("Conected to Database senshealth");
})

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Importacion de modelos de base de datos
var models = require('./models/posiciones')(app,mongoose);
var administradorModel = require('./models/administradores')(app,mongoose);
var administrativoModel = require('./models/administrativos')(app,mongoose);
var operadorModel = require('./models/operadores')(app,mongoose);
var secretariaModel = require('./models/secretarias')(app,mongoose);
var doctorModel = require('./models/doctores')(app,mongoose);
var pacienteModel = require('./models/pacientes')(app,mongoose);
var personalModel = require('./models/paramedicos')(app,mongoose);
//Importacion de los controladores
var positionController = require('./controllers/posicionCtlr');
var pacientesController = require('./controllers/pacientesCtlr');
var doctoresController = require('./controllers/doctoresCtlr');
var personalController = require('./controllers/paramedicoCtlr');
var administradorController = require('./controllers/adminCtlr');
var administrativoController = require('./controllers/administrativoCtlr');
var operadorController = require('./controllers/operadorCtlr');
var secretariaController = require('./controllers/secretariaCtlr');

