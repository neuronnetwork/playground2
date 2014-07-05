'use strict';

var server;
if(true) 
		server = require("./server");
  else{
	if(true)
		server= require("./einfacherhttpserver");
	 else
		server = require("./server0");
	}
	
 var router = require("./router"); 


server.start(router.route);

 
