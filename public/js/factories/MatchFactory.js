app.factory('MatchFactory', function($http, $rootScope){
	var theme = null;
	var criterias = [];

	$rootScope.$on('factorsChange', function(err, data){
		theme = data.theme;
		criterias = data.criterias;
	});

	var getMatch = function(){
		return $http.get('/match').then(function(response){
			return response.data;
		}).catch(function(err){
			throw new Error(err);
		});
	};

	var createMatch = function(matchObj){

		return $http.post('/match', matchObj).then(function(response){
			return response.data;
		}).catch(function(err){
			throw new Error(err);
		});
	};

	return {
		getMatch : getMatch,
		createMatch : createMatch
	};
});