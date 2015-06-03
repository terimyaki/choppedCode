app.controller('CreateMatchController', function($scope, $state, MatchFactory){
	$scope.name = null;
	$scope.description = null;
	$scope.dateStart = null;
	$scope.dateEnded = null;

	$scope.submitMatch = function(){
		$scope.$emit('factorsChange', {
			name : $scope.name,
			description : $scope.description,
			dateStart : $scope.dateStart,
			dateEnded : $scope.dateEnded
		});

		MatchFactory.createMatch().then(function(data){
			$scope.name = null;
			$scope.description = null;
			$scope.dateStart = null;
			$scope.dateEnded = null;
			
			$state.go('match', {id: data._id});
		});
	};
});