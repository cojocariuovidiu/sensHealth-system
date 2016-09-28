var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
stormpathClient = require('stormpath');

//Inicialización de Express
var app = express();
var router = express.Router();

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
var paramedicoController = require('./controllers/paramedicoCtlr');
var administradorController = require('./controllers/adminCtlr');
var administrativoController = require('./controllers/administrativoCtlr');
var operadorController = require('./controllers/operadorCtlr');
var secretariaController = require('./controllers/secretariaCtlr');

//Ruta para obetener todas las posiciones


router.route('/posiciones')
.get(positionController.findAllPositions)
.post(positionController.addPosition);

// Ruta para obtener las posiciones por id
router.route('/posiciones/:id')
.get(positionController.findPositionById)
.put(positionController.updatePosition)
.delete(positionController.deletePosition);

    //Ruta para obtener todos los administradores
    router.route('/admins')
    .get(administradorController.findAllAdmins)
    .post(administradorController.addAdmin);
    
    //Ruta para obtener los administradores por id
    router.route('/admin/:id')
    .get(administradorController.findAdminsById)
    .put(administradorController.updateAdmin)
    .delete(administradorController.deleteAdmin);
      
        //Ruta para  obtener todos los doctores
        router.route('/doctores')
        .get(doctoresController.findAllDoctors)
        .post(doctoresController.addDoctor);

        //Ruta para obtener los doctores por id
        router.route('/doctor/:id')
        .get(doctoresController.findDoctorsById)
        .put(doctoresController.updateDoctor)
        .delete(doctoresController.deleteDoctor);

            //Ruta para obtener todos los pacientes
            router.route('/pacientes')
            .get(pacientesController.findAllPatients)
            .post(pacientesController.addPatient);

            //Ruta para obtener los pacientes por id
            router.route('/paciente/:id')
            .get(pacientesController.findPatientsById)
            .put(pacientesController.updatePatient)
            .delete(pacientesController.deletePatient);

                //Ruta para obtener todos los paramedicos
                router.route('/paramedicos')
                .get(paramedicoController.findAllParamedics)
                .post(paramedicoController.addParamedic);

                //Ruta para obtener el personal por id
                router.route('/paramedico/:id')
                .get(paramedicoController.findParamedicById)
                .put(paramedicoController.updateParamedic)
                .delete(paramedicoController.deleteParamedic);
                    
                    //Ruta para obtener todos los administrativos
                    router.route('/administrativos')
                    .get(administrativoController.findAllAdministrativos)
                    .post(administrativoController.addAdministrativo);

                    //Ruta para obtener administrativo por id
                    router.route('/administrativo/:id')
                    .get(administrativoController.findAdministrativoById)
                    .put(administrativoController.updateAdministrativo)
                    .delete(administrativoController.deleteAdministrativo);

                        //Ruta para obtener todos los operadores
                        router.route('/operadores')
                        .get(operadorController.findAllOperador)
                        .post(operadorController.addOperador);

                        //Ruta para obtener un operador por id
                        router.route('/operador/:id')
                        .get(operadorController.findOperadorById)
                        .put(operadorController.updateOperador)
                        .delete(operadorController.deleteOperador);

                            //Ruta para obtener todas las secretarias
                            router.route('/secretarias')
                            .get(secretariaController.findAllSecretaria)
                            .post(secretariaController.addSecretaria);
    
                            //Ruta para obtener secretaria por id
                            router.route('/secretaria/:id')
                            .get(secretariaController.findSecretariaById)
                            .put(secretariaController.updateSecretaria)
                            .delete(secretariaController.deleteSecretaria);

app.use(router);



