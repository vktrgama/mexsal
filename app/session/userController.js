angular.module('myApp', [])
.controller('UserInfo',  ['$scope', '$http', function($scope,$http){
	
	// pick userId from session	
	var encodedString = 'email=' + encodeURIComponent(this.email);
			
	$http({
		method: 'POST',
		url: 'dal/userinfo.php',
		data: encodedString,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(response){
		$scope.userInfo = response;
})}]);
