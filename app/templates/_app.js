var <%= _.camelize(appName) %>App = angular.module(
	'<%= _.camelize(appName) %>',
	[
		//ModuleInsertReference
	]
);
<%= _.camelize(appName) %>App.config([
	'$routeProvider',
	function($routeProvider) {
        $routeProvider.
        	when("/", {templateUrl: '/partials/index.html'}); //RouteInsertReference
	}
]);
