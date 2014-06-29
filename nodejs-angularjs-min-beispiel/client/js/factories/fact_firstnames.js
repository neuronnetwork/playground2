'use strict'; 

app.factory('factFirstnames', function($http, $q) {
	
	var factFirstnames = {}; 

	factFirstnames.getAll = function( ) {
			
		var deferred = $q.defer();
 			
		$http({method: 'GET', url: '/allfirstnames'}).
	    	success(function(data, status, headers, config) {
	    		console.log('factory GET allfirstnames  return success data: ' + JSON.stringify(data));  
	    		deferred.resolve(data);
	    	}).
		    error(function(data, status, headers, config) { 
		    	deferred.reject('factory GET allfirstnames error!!'); 		    

		    	console.log('factory GET allfirstnames error!! data  ' + data); 		    
				console.log('factory GET allfirstnames error!!! status ' + status);
		    }); 
				
		
		return deferred.promise;   
	};  
	 
	return factFirstnames;  
});
