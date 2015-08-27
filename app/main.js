/*
* Main AngularJS Web Application
*/
var app = angular.module('mexsalApp', ['ngRoute']);

/*
* Configure the Routes
*/
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	// Home
	.when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
	// Pages
	.when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
	.when("/tools", {templateUrl: "partials/toolset.html", controller: "PageCtrl"})
	.when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
	.when("/dash", {templateUrl: "partials/pmdash.html", controller: "PageCtrl"})
	// else 404
	.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
	}
]);


// ------------------------------------------- SERVICES ----------------------------------------------------------

app.factory('AuthService', ['$rootScope', '$http', '$location', '$q',
  function ($rootScope, $http, $location, $q) {
	var authFactory = {
        user : {
			email : undefined,
			firstName : 'guest',
			lastName : 'user',
			position : "",
			company : ""                                              
    	},
    };

	authFactory.getAuthData = function() {
		return authFactory.user;
	};
	
	authFactory.setAuthData = function (authData) {
		this.authFactory.user = {
			firstName : authData.firstName,
			lastName : authData.lastName,
			position : authData.position,
			company : authData.company
		}
	};
	
	authFactory.isAuthenticated = function () {
		return !angular.isUndefined(this.getAuthData().email);
    };
	
	authFactory.Login = function($email, $password){
		var def = $q.defer();
		
		$http({
			method: 'POST',
			url: 'dal/userRepo.php',
			data: { "Func": "AuthUser", "Data": [{"email": $email , "password": $password }] }
		})
		.success(function(data, status, headers, config) {
			def.resolve({"auth": data});
		})
		.error(function() {
                    def.reject("Failed to authenticate user");
                });
				
		return def.promise;
	};
	
	return authFactory;	
  }]);
  
// ------------------------------------------- CONTROLLERS ----------------------------------------------------------
/*
 * add controller to all the partial pages 
 */
app.controller('PageCtrl', function ($scope, $location, $http) {
 // to be determine
 // somthing commong to all partials
});

/*
 * authentication controller 
 */
app.controller('SigninController', ['AuthService', '$scope','$http','$location','$rootScope', function(AuthService, $scope, $http, $location, $rootScope) {
	this.postForm = function() {
		
		var promise = AuthService.Login(this.email, this.password);
		promise.then(function(data){
			if ( data.auth == 1 ) {
				$location.path('#/dash');
			} else {
				//TODO: error message should not be global
				$scope.errorMsg = "Login not correct";
			}	
		});		
	}
}]);//end of controller


app.controller('UserInfo',  ['$scope', '$http', function($scope,$http){
	
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
