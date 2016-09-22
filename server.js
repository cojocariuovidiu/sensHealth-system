var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
stormpathClient = require('stormpath');

var app = express();

app.get('/',function(req,res){
    res.send('Hello, Welcome to Express');

});

app.listen(8080,function(){
    console.log('sensHealth listening on port 8080');
})