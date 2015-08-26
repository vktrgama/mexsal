angular.module('mexsalApp', [])
.controller('UserInfo',  ['$scope', '$http', function($scope,$http){
	
	// post if made as json content type (default)
	$http({
		method: 'POST',
		url: 'dal/userRepo.php',
		//TODO: user email should come from the session object
		data: { "Func": "GetUserInfo", "Data": [{"email": "renesanchez@mexsal.com" }] }
	})
	.success(function(response){
		$scope.userInfo = response;
	})

}]);
