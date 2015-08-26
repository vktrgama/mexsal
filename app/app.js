angular.module('myApp', [])
	.controller('SigninController', ['$scope', '$http', function($scope, $http) {
		this.postForm = function() {
			
			// post if made as json content type (default)
			$http({
				method: 'POST',
				url: 'dal/userRepo.php',
				data: { "Func": "AuthUser", "Data": [{"email": this.email , "password": this.password }] }
			})
			.success(function(data, status, headers, config) {
				if ( data ) {
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
		