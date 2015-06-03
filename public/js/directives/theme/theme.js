app.directive('theme', function(){
	return {
		restrict : 'E',
		scope: {
			theme : '='
		},
		templateUrl : 'js/directives/theme/theme.html'
	};
});