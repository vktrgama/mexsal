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
app.controller('SigninController', ['$scope', '$http', function($scope, $http) {
	this.postForm = function() {
		
		// post if made as json content type (default)
		$http({
			method: 'POST',
			url: 'dal/userRepo.php',
			data: { "Func": "AuthUser", "Data": [{"email": this.email , "password": this.password }] }
		})
		.success(function(data, status, headers, config) {
			if ( data ) {
				window.location.href = '#/dash';
			} else {
				$scope.errorMsg = "Login not correct";
			}
		})
		.error(function(data, status, headers, config) {
			$scope.errorMsg = 'Unable to submit form';
		})
		
	}
}])//end of controller


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