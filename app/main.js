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

/*
 * Authentication service 
 */
app.factory('AuthService', ['$rootScope', '$http', '$location', '$q',
  function ($rootScope, $http, $location, $q) {
	var authFactory = {
        user : {
			firstName : 'guest',
			lastName : 'user',
			position : "",
			company : "",
			userName : undefined,
			active : ""                                             
    	},
    };

	authFactory.getAuthData = function() {
		return this.user;
	};
	
	authFactory.setAuthData = function (authData) {
		this.user = {
			firstName : authData.First_Name,
			lastName : authData.Last_Name,
			position : authData.Position,
			company : authData.Company,
			userName : authData.Email,
			active : authData.Active
		}
	};
	
	authFactory.isAuthenticated = function () {
		return !angular.isUndefined(this.user.userName);
    };
	
	authFactory.isActive = function () {
		return this.user.active == "1";
    };
	
	authFactory.Login = function($email, $password){
		var def = $q.defer();
		
		$http({
			method: 'POST',
			url: 'dal/userRepo.php',
			data: { "Func": "AuthUser", "Data": [{"email": $email , "password": $password }] }
		})
		.success(function(data, status, headers, config) {
			if (data.length){
				def.resolve(data[0]);
			} else {
				def.resolve({});
			}
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
	//TBD: somthing common to all partials
});

/*
 * authentication controller 
 */
app.controller('SigninController', ['AuthService', '$scope','$http','$location','$rootScope', function(AuthService, $scope, $http, $location, $rootScope) {
	$scope.IsLoggedIn = false;
	
	this.postForm = function() {
		var promise = AuthService.Login(this.email, this.password);
		promise.then(function(data){
			if ( data != "" ) {
				AuthService.setAuthData(data);				
				$scope.userInfo = AuthService.getAuthData();
				$scope.IsLoggedIn = true;
				$location.path('/dash');
			} else {
				//TODO: error message should not be global
				$scope.errorMsg = "Login not correct";
			}	
		});		
	}
}]);//end of controller
