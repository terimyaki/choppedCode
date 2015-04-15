app.controller('MainController', function($scope, DataFactory){
	$scope.answer = "";

	$scope.getApiTypes = function(){
		DataFactory.getApiType().then(function(data){
			$scope.answer = data;
		});
	};

	$scope.getLibraryTypes = function(){
		DataFactory.getLibraryType().then(function(data){
			$scope.answer = data;
		});
	};

	$scope.getThemes = function(){
		DataFactory.getTheme().then(function(data){
			$scope.answer = data;
		});
	};

	$scope.getLibraryList = function(list){
		DataFactory.getLibraryList(list).then(function(data){
			$scope.answer = data;
		});
	};

	$scope.getApiList = function(list){
		DataFactory.getApiList(list).then(function(data){
			$scope.answer = data;
		});
	};

	$scope.getLibraryOne = function(name){
		DataFactory.getLibraryOne(name).then(function(data){
			$scope.answer = data;
		});
	};

	$scope.getApiOne = function(name){
		DataFactory.getApiOne(name).then(function(data){
			$scope.answer = data;
		});
	};
});

app.controller('GenerateNumSubController', function($scope, AttributeFactory, DataFactory){
	$scope.min = 2;
	$scope.max = 6;

	$scope.generateNumItems = function(){
		AttributeFactory.numberItems = Math.floor(Math.random() * ($scope.max - $scope.min)) + $scope.min;
	};


});