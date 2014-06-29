'use strict';

var path = require('path');

module.exports = {
	server : {
		listenPort : 1338, // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
	},
	directories : {
		htmlFiles : '/templates/',
		jsFiles : '/js/',
		cssFiles : '/css/',
		fontFiles : '/fonts/',
		imgFiles : '/img/',
		clientDir : path.resolve(__dirname, '../client'),
		downloadDir : path.resolve(path.resolve(__dirname, '../client'), 'download/')
	} 
};
