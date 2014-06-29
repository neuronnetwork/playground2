'use strict';

// Declare app level module which depends on filters, and services
   
app.controller('Page2Ctrl', function($scope, factFirstnames) {
	
	$scope.allFirstnames = [];  
	
	console.log('loading first names from server');
	
	factFirstnames.getAll().then(function (allFirstnames) {
		$scope.allFirstnames = allFirstnames; 
	});
	
});
 
  
