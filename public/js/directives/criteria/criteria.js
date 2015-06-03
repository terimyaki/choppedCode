app.directive('criteria', function(){
	return {
		restrict : 'E',
		transclude: true,
		scope: {
			criteria : '='
		},
		templateUrl : 'js/directives/criteria/criteria.html'
	};
});