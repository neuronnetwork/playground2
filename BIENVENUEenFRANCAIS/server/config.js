'use strict';

var path = require('path');

module.exports = {
        server : {
                listenPort : 1338,  
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

