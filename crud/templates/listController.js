<%= crudSingle %>ListController = angular.module('<%= crudSingle %>List.controller',['<%= crudSingle %>.service']);
<%= crudSingle %>ListController.controller('<%= crudSingle %>ListCtrl', ['$scope', '$routeParams','<%= crudSingle %>List', function($scope,$routeParams,<%= crudSingle %>List) {
		$scope.<%= crudPlural %> = <%= crudSingle %>List.query({},function(){});
}]);
