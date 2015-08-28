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
			email : undefined,
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
			email : authData.Email,
			active : authData.Active
		}
	};
	
	authFactory.isAuthenticated = function () {
		return !angular.isUndefined(this.user.email);
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