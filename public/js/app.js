var app = angular.module('ChoppedCode', ['ui.router']);

// app.config(function($locationProvider){ //config with Angular native providers
// 	$locationProvider.html5Mode(true);
// });

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){ //config with UI Router providers
	// $locationProvider.html5Mode(true);

	$stateProvider
		.state('random', {
			url : '/',
			abstract: true,
			templateUrl: '/templates/showRandom.html'
		})
		.state('random.search', {
			url : '',
			templateUrl: '/templates/partials/randomizeMatchBox.html',
			controller: 'RandomMatchController'
		})
		.state('random.search.results', {
			templateUrl:'/templates/partials/randomMatchResults.html'
		})
		.state('random.create',{
			templateUrl: '/templates/partials/createMatch.html',
			controller: 'CreateMatchController'
		})
		.state('match', {
			url : 'match/:id',
			templateUrl : '/templates/match.html',
			controller: 'MatchController',
			resolve: {
				matchDataResolve : function(MatchFactory, $stateParams){
					$('#loaderModal').openModal();
					return MatchFactory.getMatch($stateParams.id);
				}
			}
		});

	$urlRouterProvider.otherwise('/');

});