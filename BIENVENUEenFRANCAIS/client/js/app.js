'use strict'
var Sprachen = ["Deutsch","Englisch","Französisch","Portugiesisch","Spanisch","Italienisch","Ungarisch"];	
   
var app=angular.module('bienvenueenfrancaisApp', []);
 
  
if(false)//es funktionniert nicht
app.config(function($routeProvider, $locationProvider, $httpProvider) {
			$locationProvider.html5Mode(false);

			// this is the main navigation
			
			$routeProvider.when('/asdas', {
				templateUrl : '/partials/home.html',
			}).when('/pagasdasdasde1', {
				templateUrl : '/partials/page1.html' 
			}).when('/test6', {
				templateUrl : '/partials/page2.html' 
			}).when('/pagasdasde2', {
				templateUrl : '/partials/page2.html' 
			}) ; 
		});
app
 .controller('ArticlesCtrl', function($scope, $http){ 
		$scope.articles =[
			  {"id": "1", "name": "Pizza Vegetaria", "price": 500 },
			  {"id": "2", "name": "Pizza Salami",    "price": 5.5 },
			  {"id": "3", "name": "Pizza Thunfisch", "price": 6 },
			  {"id": "4", "name": "Aktueller Flyer", "price": 0 }
			]

 })  

  .controller('SprachenCtrl',function($scope){
    $scope.Sprachen =  Sprachen;	
  })  
   
app.controller('SlicedsprachenCtrl',function($scope, $http){   
		$http.get('JSON_Uebersetzungen').then(function(Antwort) {
		
		$scope.Uebersetzungen = Antwort.data; 
		$scope.slicedsprachen =[]; 
		for( var i=0;i<Sprachen.length;i++){
			var Paar={};
			Paar.Sprache=Sprachen[i];
			Paar.geschnitten=Sprachen[i].slice(0,5);
			$scope.slicedsprachen.push( Paar );  
		}   
		
		$scope.je_nachdem=function(){ 
		//aalert("inside");
			var Uebersetzungen=$scope.Uebersetzungen; 
			var Uebersetzung=["keine"]; 
			for(var i=0;i<Uebersetzungen.length;i++){
					Uebersetzung=Uebersetzungen[i].Uebersetzung;
					var j=i
					//	alert( "#"+"linkausgewaehlt"+Uebersetzungen[j].auf+"  ---"+Uebersetzung[j] ); 
						$( "#"+"linkausgewaehlt"+ Uebersetzungen[j].auf).html(Uebersetzung[j] )  
					} 
					
		//aalert("going out");
			}   
		$scope.ueber_die_Sprache_wanken =function (Sprache){  
			if(Sprache==="je nachdem")
				return $scope.je_nachdem();
			var Uebersetzungen=$scope.Uebersetzungen; 
			var Uebersetzung=["keine"];
			for(var i=0;i<Uebersetzungen.length;i++)
				if(Uebersetzungen[i].auf===Sprache){
					Uebersetzung=Uebersetzungen[i].Uebersetzung;
					break;
				}    
			for(var j=0;j<Uebersetzung.length;j++)
				$( "#"+"linkausgewaehlt"+ Uebersetzungen[j].auf).html(Uebersetzung[j] )  
		} 
		$scope.Sprachenauswahl =function (Sprache){   //transferedde into GET
			$scope.ueber_die_Sprache_wanken(Sprache); 
			var text; 
				$http.get('ausgewaehlt'+Sprache.slice(0,5)).then(function(Antwort) {
					$("#Hauptkoerper").html(Antwort.data+"");
				})  
		}  
		  }).then(function(){  
			$scope.je_nachdem() 
			
		  }
		  ).then()//.done()
})	  
	 
  .controller('PreistabelleCtrl',function($scope, $http){  
		//$http.get('JSON_Uebersetzungen').then(function(Antwort) { : if i change server.js conformly instead of:
    $http.get('js/databases/Preistabelle.json').then(function(Antwort) {
      $scope.Preistabelle = Antwort.data;
    });
  })  
  
  .controller('UEtabelleCtrl',function($scope, $http){  
   $http.get('js/databases/Unterrichteinheit.json').then(function(Antwort) {
      $scope.Unterrichteinheitstabelle = Antwort.data;
    });
  })   

 
  
 
   
   