'use strict';

var app = angular.module('minexampleApp', ['ngRoute', 'minexampleApp.directives' ])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
			$locationProvider.html5Mode(false);

			// this is the main navigation
			
			$routeProvider.when('/', {
				templateUrl : '/partials/home.html',
			}).when('/page1', {
				templateUrl : '/partials/page1.html' 
			}).when('/page2', {
				templateUrl : '/partials/page2.html' 
			}).otherwise({
				redirectTo : '/'
			}); 
		});


app.controller('HomeCtrl', function($scope) {
	console.log('"HomeCtrl" ');
});
