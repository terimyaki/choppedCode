app.directive('loader', function(){
	return {
		restrict : 'E',
		transclude: true,
		replace:true,
		templateUrl : 'js/directives/loader/loader.html'
	};
});