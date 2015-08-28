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

// create a service to manage cache
app.factory('superCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('super-cache');
  }]);

/*
 * add controller to all the partial pages 
 */
app.controller('PageCtrl', function ($scope, $location, $http) {
	//TBD: something common to all partials
});