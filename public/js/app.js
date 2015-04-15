var app = angular.module('ChoppedCode', ['ui.router']);

// app.config(function($locationProvider){ //config with Angular native providers
// 	$locationProvider.html5Mode(true);
// });

app.config(function($stateProvider, $urlRouterProvider){ //config with UI Router providers
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('random', {
			url: '/',
			templateUrl: '/templates/showRandom.html',
			controller: 'RandomMatchController'
		})
		.state('random.results', {
			templateUrl:'/templates/partials/randomMatchResults.html',
			controller: 'ConfirmMatchController'
		});

});