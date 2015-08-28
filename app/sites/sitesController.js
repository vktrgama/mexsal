app.controller('SitesController', ['$scope','$http','$rootScope', 'superCache',
	function ($scope, $http, $rootScope, superCache) {	
		
		var cachedSites = superCache.get('mySites');
		if (cachedSites != null){
			// get sites from cache
			$scope.mySites = cachedSites;
		} else {
			// get sites from database
			if (!angular.isUndefined($rootScope.userInfo.email)){
				$http({
					method: 'POST',
					url: 'dal/sitesRepo.php',
					data: { "Func": "GetSites", "Data": [{"email": $rootScope.userInfo.email }] }
				})
				.success(function(data, status, headers, config) {
					if (data.length){
						superCache.put('mySites', data);
						$scope.mySites = data;
					}
				})
				.error(function() {
					$scope.errorMsg = "No sites found";
				});
			}
		}
		
		$scope.openSiteModal = function (site) {
			alert(site.Site_Name);
		};
	}
]);