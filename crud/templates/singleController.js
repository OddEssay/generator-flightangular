<%= crudSingle %>Controller = angular.module('<%= crudSingle %>.controller',['<%= crudSingle %>.service']);
<%= crudSingle %>Controller.controller('<%= crudSingle %>Ctrl', ['$scope', '$routeParams','<%= crudSingle %>Storage', function($scope,$routeParams,<%= crudSingle %>Storage) {
	// If loaded with an id, load that model.
	if($routeParams.id){
		$scope.<%= crudSingle %> = <%= crudSingle %>Storage.get({id:$routeParams.id},function(){});
	} else {
		$scope.<%= crudSingle %> = new <%= crudSingle %>Storage;
	}
	$scope.doSave = function() {
		$scope.saving = true;
		$scope.<%= crudSingle %>.$save(function(){$scope.saving = false;});
	}
}]);
