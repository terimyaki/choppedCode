app.factory('DataFactory', function($http){
	var getApiType = function(){
		return $http.get('/apis').then(function(response){
			return response.data;
		}).catch(function(e){
			throw new Error(e);
		});
	};

	var getLibraryType = function(){
		return $http.get('/libraries').then(function(response){
			return response.data;
		}).catch(function(e){
			throw new Error(e);
		});
	};

	var getTheme = function(){
		return $http.get('/themes').then(function(response){
			return response.data;
		}).catch(function(e){
			throw new Error(e);
		});
	};

	var getLibraryOne = function(name){
		return $http.get('/library/' + name).then(function(response){
			return response.data;
		});
	};

	var getApiOne = function(name){
		return $http.get('/api/' + name).then(function(response){
			return response.data;
		});
	};

	var getLibraryList = function(type){
		var config = {
			params : {
				type : type
			}
		};

		return $http.get('/library', config).then(function(response){
			return response.data;
		});
	};

	var getApiList = function(type){
		var config = {
			params : {
				type : type
			}
		};

		return $http.get('/api', config).then(function(response){
			return response.data;
		});
	};

	return {
		getApiType: getApiType,
		getLibraryType: getLibraryType,
		getTheme: getTheme,
		getLibraryList : getLibraryList,
		getApiList : getApiList,
		getLibraryOne : getLibraryOne,
		getApiOne: getApiOne
	};
});