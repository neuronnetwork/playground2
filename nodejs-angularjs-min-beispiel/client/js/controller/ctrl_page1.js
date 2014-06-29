'use strict';

// controller for page1
app.controller('Page1Ctrl', function($scope) {
	
	$scope.allTowns = [];  
	$scope.allTowns.push({'name' : 'Wien'}); 
	$scope.allTowns.push({'name' : 'Zürich'}); 
	$scope.allTowns.push({'name' : 'Paris'}); 
	$scope.allTowns.push({'name' : 'London'}); 
	$scope.allTowns.push({'name' : 'New York'}); 
});
 
  
