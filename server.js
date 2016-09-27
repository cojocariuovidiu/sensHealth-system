var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
stormpathClient = require('stormpath');

var app = express();
// Inicialización de base de datos
mongoose.connect('mongodb://localhost/senshealth',function(error,res){
    if(error) throw error;
    console.log("Conected to Database senshealth");
})

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Inicialización de Express
app.get('/',function(req,res){
    res.send('Hello, Welcome to Express');

});

app.listen(8080,function(){
    console.log('sensHealth listening on port 8080');
});