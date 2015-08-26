angular.module('myApp', [])
	.controller('SigninController', ['$scope', '$http', function($scope, $http) {
		this.postForm = function() {
			
			var encodedString = 'email=' + encodeURIComponent(this.email) +
				'&password=' + encodeURIComponent(this.password);
		
			$http({
				method: 'POST',
				url: 'dal/login.php',
				data: encodedString,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data, status, headers, config) {
				console.log(data);
				if ( data === true) {
					window.location.href = 'pmdash.html';
				} else {
					$scope.errorMsg = "Login not correct";
				}
			})
			.error(function(data, status, headers, config) {
				$scope.errorMsg = 'Unable to submit form';
			})
		}
	}])//end of controller
//end of app	
		