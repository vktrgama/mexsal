app.controller('SitesController', ['$scope','$http','$rootScope', 
	function ($scope, $http, $rootScope) {	
		
		if (!angular.isUndefined($rootScope.userInfo.email)){
			$http({
				method: 'POST',
				url: 'dal/sitesRepo.php',
				data: { "Func": "GetSites", "Data": [{"email": $rootScope.userInfo.email }] }
			})
			.success(function(data, status, headers, config) {
				if (data.length){
					$scope.mySites = data;
				}
			})
			.error(function() {
				$scope.errorMsg = "No sites found";
			});
		}
		
	}
]);
