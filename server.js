var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
stormpathClient = require('stormpath');

//Inicialización de Express
var app = express();
var router = express.Router();
var nombre;

app.use(cookieParser());
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


app.use(function(req, res, next) {
 /*   if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.sendStatus(200)
    }*/

        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')


    next()
})


    // Use the session middleware
app.use(session({ cookieName:'session',secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

var crearSesion = function(){
    console.log('Entre a crear')


}

//a que elimina las sesiones y redirige
    app.get("/removeSesion", function(req, res){
        //eliminamos las sesiones y redirigimos
        req.session.destroy();
    	res.redirect("/sesiones");
    });

    //cargamos la vista sesiones y le enviamos un titulo y la
    //sesion con clave nuevaSesion si existe
    app.get("/sesiones", function(req, res){
    	console.log('sessiooooon: '+req.session.nuevaSesion);

    });

    //creamos la sesion
    app.post("/sesiones", function(req,res){
    	//req.session.nuevaSesion quiere decir que nuestra sesion tendrá como clave nuevaSesion
    	//con req.body.sesion capturamos la sesion que hemos enviado por post desde el formulario
    	req.session.nuevaSesion = req.body.sesion;
    	res.redirect("/sesiones");
    });


app.post('/',function(req,res){
   // res.send('Hello, Welcome to Express');
    req.session.nombre = req.body.nombre;
    console.log('nombre: ',req.session.nombre);
     //req.session.nombre = nombre;
    console.log('Session recibida',nombre);


});
// Access the session as req.session
/*app.get('/', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});*/
app.get('/',function(req,res){
    res.send('Bienvenido '+req.session.nombre);

});

app.get('/paciente',function(req,res){
     console.log('req.session.nombre: ',req.session.nombre);

   if(req.session.nombre){
       console.log('Hola: ',req.session.nombre);
      res.status(200).send('Hola ' + req.session.nombre);
   }else{
       res.send('Favor de iniciar session');
   }
    res.status(200).send('Bienvenido: '+nombre);
});

app.get('/logout', function(req, res){

    req.session.destroy(function(err) {
  // cannot access session here
        if(err){
            res.send('Error: '+err);
        }else{
        res.send('session destroyed');
        }
})



});

app.listen(8080,function(){
    console.log('sensHealth listening on port 8080');
});
// Inicialización de base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/senshealth',function(error,res){
    if(error) throw error;
    console.log("Conected to Database senshealth");
})


//Importacion de modelos de base de datos
var models = require('./models/posiciones')(app,mongoose);
var administradorModel = require('./models/administradores')(app,mongoose);
var administrativoModel = require('./models/administrativos')(app,mongoose);
var operadorModel = require('./models/operadores')(app,mongoose);
var secretariaModel = require('./models/secretarias')(app,mongoose);
var doctorModel = require('./models/doctores')(app,mongoose);
var pacienteModel = require('./models/pacientes')(app,mongoose);
var personalModel = require('./models/paramedicos')(app,mongoose);
var usuarioModel = require('./models/usuarios')(app,mongoose);
//Importacion de los controladores
var positionController = require('./controllers/posicionCtlr');
var usuariosController = require('./controllers/usuariosCtlr');
var doctoresController = require('./controllers/doctoresCtlr');
var paramedicoController = require('./controllers/paramedicoCtlr');
var administradorController = require('./controllers/adminCtlr');
var administrativoController = require('./controllers/administrativoCtlr');
var operadorController = require('./controllers/operadorCtlr');
var secretariaController = require('./controllers/secretariaCtlr');
var autenticacionController = require('./controllers/autenticarUsuarioCtlr');
var pacienteController = require('./controllers/pacientesCtlr');

//importación de controlador para crear usuario
var crearCuentaController = require('./controllers/crearCuentaCtlr');

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

            //Ruta para obtener todos los usuarios
            router.route('/pacientes')
            .get(pacienteController.findAllPatients)
            .post(pacienteController.addPatient);

            //Ruta para obtener los usuarios por id
            router.route('/paciente/:id')
            .get(pacienteController.findPatientsById)
            .put(pacienteController.updatePatient)
            .delete(pacienteController.deletePatient);

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

                            //Ruta para obtener todos los usuarios
                            router.route('/usuarios')
                            .get(usuariosController.findAllUsers)
                            .post(usuariosController.addUser);

                            //Ruta para obtener usuarios por id
                            router.route('/usuario/:id')
                            .get(usuariosController.findUsersById)
                            .put(usuariosController.updateUsuario)
                            .delete(usuariosController.deleteUsuario);

                            //Ruta para obtener usuarios por nombre
                            router.route('/usuarios/:nombre')
                            .get(usuariosController.findUsersByName);

router.route('/create-user')
.post(crearCuentaController.addAccount);

router.route('/login')
.post(autenticacionController.authenticateUser);

app.use(router);





