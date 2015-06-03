app.controller('MatchController', function($scope, $state, matchDataResolve, MatchFactory){
	$scope.match = matchDataResolve;
	
	$('#loaderModal').closeModal();

	$scope.deleteMatch = function(){
		MatchFactory.deleteMatch($scope.match).then(function(data){
			$state.go('random.search');
		});
	};
});