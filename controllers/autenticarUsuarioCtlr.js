exports.authenticateUser = function(req,res){
    console.log('Entre')

    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var stormpath = require('stormpath');
    var xhr = new XMLHttpRequest();

var apiKey = new stormpath.ApiKey(
process.env['STORMPATH_CLIENT_APIKEY_ID'],
process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

var client = new stormpath.Client({apiKey:apiKey});

var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];

client.getApplication(applicationHref,function(error,application){
    console.log('Application Found: '+application.name);



//Authenticate an account
var authRequest = {
    username: req.body.username,
    password: req.body.password
};
application.authenticateAccount(authRequest,function(err,result){
    //If successful, the authentication result will have a method
    //If getAccount(), for getting the authenticated account
    if(err) {console.log('Error over authenticate: ',err.userMessage)}
    else{

    result.getAccount(function(err,account){
        res.status(200).send(account.givenName);
        console.log('Authentication successful for: ',account.givenName);
        //var nombre = {account.email};


        console.log('session: ',account.email);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/sesiones");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.send(JSON.stringify({sesion:account.username}));


    });
    }
});

   /* application.getAccounts({username:authRequest.username},function(err,accounts){
        accounts.each(function(account,callback){
            console.log('Found Account: ',account.givenName);
            callback();
        },function(err){
            console.log('Finished iterating over accounts')
        });
    });  */
});
    }
