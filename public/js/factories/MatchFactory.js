app.factory('MatchFactory', function($http, $rootScope){
	var match = {
		theme : null,
		criterias :[],
		name : null,
		description : null,
		dateStart : null,
		dateDue : null
	};

	function linkParams(link, id){
		return link + id;
	}

	$rootScope.$on('factorsChange', function(err, data){
		for(var key in data){
			match[key] = data[key];
		}
	});

	var getMatch = function(matchId){
		var id = '';
		if (matchId){
			id = matchId;
		}
		return $http.get(linkParams('/match/', id)).then(function(response){
			return response.data;
		}).catch(function(err){
			throw new Error(err);
		});
	};

	var createMatch = function(){
		return $http.post('/match', match).then(function(response){
			match = {
				theme : null,
				criterias :[],
				name : null,
				description : null,
				dateStart : null,
				dateDue : null
			};
			return response.data;
		}).catch(function(err){
			throw new Error(err);
		});
	};

	var deleteMatch = function(match){
		return $http.delete(linkParams('/match/', match._id)).then(function(response){
			return response.data;
		})
		.catch(function(err){
			throw new Error(err);
		});
	};

	var editMatch = function(match){
		return $http.put(linkParams('/match/', match._id)).then(function(response){
			return response.data;
		})
		.catch(function(err){
			throw new Error(err);
		});
	};

	return {
		getMatch : getMatch,
		createMatch : createMatch,
		deleteMatch : deleteMatch,
		editMatch : editMatch
	};
});