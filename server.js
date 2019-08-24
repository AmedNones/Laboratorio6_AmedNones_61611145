var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var app = express();
var Usuario = require('./models/user'); 
var middleware = require('./middleware');
var service = require('./service');
var config=require('./config');

// Connection to DB and configurations
//var connection = mongoose.createConnection('mongodb://localhost:27017/test');
//var User = connection.model('Usuario', Usuario);

 mongoose.connect('mongodb://localhost:27017/test', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
   });

 app.set('superSecret', config.secret); // secret variable

// Middlewares
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(methodOverride());

 // =======================
 // routes ================
 // =======================


// API routes


 app.get('/', function(req, res) {
    res.send('Hola! API: http://localhost:3000/api');
 });
 
 app.get('/setup', function(req, res) {
    // create a sample user
    var nick = new Usuario({ 
        name: 'Rodrigo', 
        password: 'pro',
        admin: true 
    });
 //   User.save(nick)
    nick.save(function(err) {
        if (err) {
            res.send("..")
            throw err;
        }else{
            console.log('User saved successfully');
            res.json({ success: true });}
        });
   });
 

 app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
 });