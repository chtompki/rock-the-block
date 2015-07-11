angular.module('LookieDontTouchie').service('LoginService', ['$http', function($http) {
    
    var successfulLogin = false;
    
    var LoginEndpoint = 'https://bithack-crazyatlantaguy.c9.io/api/user/'
    
    this.login = function(username, password) {
        $http.post(LoginEndpoint, {username: username, password: password})
            .success(function(data){
                if (data.status == "success") {
                    successfulLogin = true;
                }
                else {
                    successfulLogin = false
                }
                
            })
            .error(function(data, status){
                successfulLogin = false;
            });
    }
    
    this.wasLoginSuccessful = function() {
        return successfulLogin;
    }
    
}]);