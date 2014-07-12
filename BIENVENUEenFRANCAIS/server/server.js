'use strict';

var express = require("express");
var http = require("http");
var exp = express();
var fs = require('fs'); 
var config = require('./config');
var querystring = require('querystring');

//persistent login sessions (recommended).
exp.use(express.cookieParser());
exp.use(express.session({ secret : 'Bienvenue!' }));

//serve static files (like HTML, JS, CSS, IMG) from these 2 directories
exp.use(express.static(config.directories.clientDir));
exp.use(express.static(__dirname + '/../client/templates'));

exp.configure(function() {
        exp.use(express.static(__dirname + '/../client/templates'));
}) 

exp.get('/test1', function(req, res) {   
         var firstnames;
		 console.log('Serving a json...'); 
         firstnames =[];
         firstnames.push({'name' : 'Simon'});
         firstnames.push({'name' : 'Herbert'});
         firstnames.push({'name' : 'Martin'});
         firstnames.push({'name' : 'jean-michel'});
 
         res.json(firstnames);
}); 
exp.get('/JSON_Uebersetzungen', function(req, res) {  
	console.log('serving JSON_Uebersetzungen');
	var Uebersetzungen=JSON.parse(fs.readFileSync("../databases/Uebersetzungen"+".json","utf-8"));   
    res.json(Uebersetzungen);
});
exp.get('/ausgewaehltFranz', function(req, res) {  
	console.log('/ausgewaehltFranz     ...');    
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("<html><body><p>Bonjour!</p> "); 
	res.write(" <p> "); 
	res.write("  Je m'appelle jean-michel lorenzi.<br>"); 
	res.write("  Je donne des cours de Fran&ccedil;ais.");  
	res.write(" <p> "); 
	res.write("</body></html>");
	res.end()
	
})
  
exp.get('/ausgewaehltEngli', function(req, res) {   
	var Name='/ausgewaehltEngli';
	Name=Name.slice("/ausgewaehlt".length); 
	res.writeHead(200, {"Content-Type": "text/html"}); 
	res.write("<html><body><p>Hello!</p> "); 
	res.write(" <p> "); 
	res.write("  I am jean-michel lorenzi.<br>"); 
	res.write("  I teach French.");  
	res.write(" <p> "); 
	res.write("</body></html>");
	res.end() 
})
  
exp.get('/ausgewaehltDeuts', function(req, res) {  
	var Name='/ausgewaehltDeuts';    
	Name=Name.slice("/ausgewaehlt".length); 
	var data = fs.readFileSync("../client/templates/partials/Heim_auf_"+Name+".html","utf-8")
	res.write(data);   
	res.end()	 
}) 

exp.get('/ausgewaehltItali', function(req, res) {  
	console.log('/ausgewaehltItali     ...');    
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("<html><body><p><p>Buon Giorno!</p> ");  
	res.write(" <p> "); 
	res.write("  Mi chiamo Jean-Michel Lorenzi. <br>"); 
	res.write("  Insegno il francese.");  
	res.write(" <p> "); 
	res.write("</body></html>");
	res.end()
	
})
exp.get('/ausgewaehltPortu', function(req, res) {  
	console.log('/ausgewaehltPortu     ...');    
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("<html><body><p><p>Bom dia!</p> ");  
	res.write(" <p> "); 
	res.write("  Eu chamo-me Jean-Michel Lorenzi. <br>"); 
	res.write("  Eu dou li&ccedil;&otilde;es de Franc&ecirc;s.");  
	res.write(" <p> "); 
	res.write("</body></html>");
	res.end()
	
})
  
   
exp.get('/ausgewaehltSpani', function(req, res) {  
	console.log('/ausgewaehltSpani     ...');    
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("<html><body><p><p>Hola!</p> ");  
	res.write(" <p> "); 
	res.write("  Me llamo Jean-Michel Lorenzi. <br>"); 
	res.write("  Doy lecciones de Franc&egrave;s.");  
	res.write(" <p> "); 
	res.write("</body></html>");
	res.end()
	
})
exp.get('/ausgewaehltUngar', function(req, res) {  
	console.log('/ausgewaehltUngar     ...');    
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("<html><body><p><p>Szia!</p> ");  
	res.write(" <p> "); 
	res.write("  Lorenzi Jean-Michelnek h&iacute;vnak. <br>"); 
	res.write("  Tanitok franci&aacute;ul.");  
	res.write(" <p> "); 
	res.write("</body></html>");
	res.end()
	
})
  
exp.get('/test2', function(req, res) {   
         var firstnames;
		 console.log('Serving a json...'); 
         firstnames =[];
         firstnames.push({'name' : 'a'});
         firstnames.push({'name' : 'b'});
		firstnames.push({'name' : 'c'});
		firstnames.push({'name' : 'd'});
         firstnames.push({'name' : 'e'});
 
         res.json(firstnames);
});
exp.get('/test3', function(req, res) {   
         var firstnames;
		 console.log('Serving a page...');  
 
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("<html><body>Szia!"); 
	res.write("</body></html>");
	res.end();
});
 
var url = require('url');
 //var router = require('./router.js'); 
 var router = require("./router"); 
 function callback(request, response) {	
		console.log("About to route without 'express' : "+request.url);
		var the_url=url.parse(request.url); 
		if(   /aa/.test(the_url.pathname)
			||/bb/.test(the_url.pathname)
			||/\/js\//.test(the_url.pathname)
			||/\/databases\//.test(the_url.pathname)
			||/bb/.test(the_url.pathname)
			||/bb/.test(the_url.pathname)
			||/bb/.test(the_url.pathname)
	  
			){
				console.log("router.route(\""+request.url+"\","+response+")");
				router.route(request.url,response); 
				return;
			}
		console.log( the_url);
		router.route(request.url,response); 
		return;
		if(the_url.search===null)
			console.log("no query");
		else
			console.log("  query=  "+the_url.search);
		var action=	querystring.parse(the_url.query)["action"]; 
		var fileName=querystring.parse(url.parse(request.url).query)["fileName"];
		var shorter_query="action="+action+"&fileName="+fileName;		 
		if((action===undefined)||(fileName===undefined))
			shorter_query="actttttttttttttttt_shorterquery_is_wrong";
		router.route("/?"+shorter_query,response); 

 }    
exp.get('/zeigen', callback  );
if(true)
exp.get('/', function(request, response){ request.url="/index2.html"; return callback(request, response) }  ); 
exp.get('/js/app.js', callback  );
exp.get('/databases/Preistabelle.json', callback  ); 

function start(routing){ 
	console.log('__dirname=' +__dirname); 
	http.createServer(exp).listen(config.server.listenPort); 
	console.log("Der neue Httpdiener fing am "+config.server.listenPort+" an.");
	
}

exports.start = start; 