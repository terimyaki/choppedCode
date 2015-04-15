app.factory('MatchFactory', function($http){
	var theme = null;
	var criterias = [];

	var setFactors = function(theme, criterias){
		theme = theme;
		criterias = criterias;
	};
	
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
		setFactors : setFactors,
		getMatch : getMatch,
		createMatch : createMatch
	};
});