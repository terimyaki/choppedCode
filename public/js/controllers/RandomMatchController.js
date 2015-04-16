app.controller('RandomMatchController', function($scope, $q, $state, $rootScope, DataFactory, MatchFactory){
	$scope.themeType = 'Random Reddit Theme';
	$scope.requirements = null;
	$scope.criterias = [];
	$scope.theme = '';

	$scope.response ='';

	$scope.themeOptions = ['No Theme', 'Random Reddit Theme'];

	var randomCats = function(){
		var categories = ['Library', 'API'];
		var random = categories[Math.floor(Math.random() * categories.length)];
		return random;
	};

	var randomCatFunc = function(){
		if (randomCats() == 'Library'){
			return DataFactory.getLibraryOne('random');
		} else {
			return DataFactory.getApiOne('random');
		}
	};

	$scope.generateMatch = function(){
		$('#loaderModal').openModal();
		var arr = [];
		if($scope.themeType === 'Random Reddit Theme'){
			arr.push(DataFactory.getTheme());
		}
		
		var criteriasArr = [];
		
		for(var i = 0; i < $scope.requirements; i++){
			criteriasArr.push(randomCatFunc());
		}
		arr.push($q.all(criteriasArr));

		$q.all(arr).then(function(data){
			if(data.length > 1){
				$scope.theme = data[0];
				$scope.criterias = data[1];
			} else {
				$scope.theme = null;
				$scope.criterias = data[0];
			}

			$scope.$emit('factorsChange', {
				theme : $scope.theme,
				criterias : $scope.criterias
			});

			$state.go('random.search.results');
			$('#loaderModal').closeModal();
		}).catch(function(err){
			throw new Error(err);
		});
	};
});