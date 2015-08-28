/*
 * authentication controller 
 */
app.controller('AuthController', ['AuthService', '$scope','$http','$location','$rootScope', 
	function(AuthService, $scope, $http, $location, $rootScope) {
	
	this.postForm = function() {
		$rootScope.IsLoggedIn = false;
		
		var promise = AuthService.Login(this.email, this.password);
		promise.then(function(data){
			if ( data != "" ) {
				AuthService.setAuthData(data);		
				AuthService.setCookie();
						
				$rootScope.userInfo = AuthService.getAuthData();
				$rootScope.IsLoggedIn = true;
				$location.path('/dash');
			} else {
				$scope.errorMsg = "Login not correct";
			}	
		});		
	}
	
	 this.logout = function(){
		$rootScope.userInfo = {};
		$rootScope.IsLoggedIn = false;
		AuthService.removeCookie();
	 };
	 
}]);