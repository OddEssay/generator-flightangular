<%= crudSingle %>Service = angular.module('<%=crudSingle %>.service', ['ngResource']);
<%= crudSingle %>Service.factory('<%= crudSingle %>Storage',
	[
		'$resource',
		function($resource) {
			return $resource('/<%= crudSingle %>/:id', {id:'@_id.$id'}, {
				'get':  {method:'GET'},
				'save': {method:'PUT'}
			});
		}
	]
);
<%= crudSingle %>Service.factory('<%= crudSingle %>List',
	[
		'$resource',
		function($resource) {
			return $resource('/<%= crudPlural %>');
		}
	]
);
