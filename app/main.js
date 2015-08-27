/*
* Main AngularJS Web Application
*/
var app = angular.module('mexsalApp', ['ngRoute', 'ngCookies']);

/*
* Configure the Routes
*/
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	// Home
	.when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
	// Pages
	.when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
	.when("/tools", {templateUrl: "partials/tools.html", controller: "PageCtrl"})
	.when("/site", {templateUrl: "partials/site.html", controller: "PageCtrl"})
	.when("/addsite", {templateUrl: "partials/addsite.html", controller: "PageCtrl"})
	.when("/updsite", {templateUrl: "partials/updsite.html", controller: "PageCtrl"})
	.when("/dash", {templateUrl: "partials/pmdash.html", controller: "PageCtrl"})
	// else 404
	.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
	}
]);

// persisted authentication with cookies
app.run(['AuthService', '$rootScope',function run(AuthService, $rootScope){
	AuthService.getCookie();
	if (AuthService.isAuthenticated()){
		$rootScope.userInfo = AuthService.getAuthData();
		$rootScope.IsLoggedIn = true;
	}
}]);

// ------------------------------------------- SERVICES ----------------------------------------------------------

/*
 * Authentication service 
 */
app.factory('AuthService', ['$rootScope', '$http', '$location', '$q', '$cookieStore',
  function ($rootScope, $http, $location, $q, $cookieStore) {
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
	
	authFactory.getCookie =  function(){
		var cookie = $cookieStore.get('current.user');	
		if (cookie){
			this.user = cookie;
		}
	};
	
	authFactory.setCookie = function () {
		$cookieStore.put('current.user', this.user);
    };
	
	authFactory.removeCookie = function () {
		$cookieStore.remove('current.user', this.user);
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
				//TODO: make sure user is active (valid)
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
app.controller('SigninController', ['AuthService', '$scope','$http','$location','$rootScope', 
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
}]);//end of controller
