'use strict';

var express = require("express");
var http = require("http");
var app = express();
var fs = require('fs');
 
// our project includes
var config = require('./config');


//serve static files (like HTML, JS, CSS, IMG) from these 2 directories 
app.use(express.static(config.directories.clientDir));
app.use(express.static(__dirname + '/../client/templates'));

// this is expressjs
app.get('/allfirstnames', function(req, res) {
	 var firstnames = []; 
	 
	 console.log('client send a HTTP GET request with the url /allfirstnames.');
	 console.log('sending back a json with some names .');

	 firstnames.push({'name' : 'Simon'}); 
	 firstnames.push({'name' : 'Herbert'}); 
	 firstnames.push({'name' : 'Martin'}); 
	 firstnames.push({'name' : 'Gerald'});  
	 
	 // send response to the client
	 res.json(firstnames);
}); 

console.log('__dirname ' +__dirname);
console.log('blabla test'); 
http.createServer(app).listen(config.server.listenPort);
