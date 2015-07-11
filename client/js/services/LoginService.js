angular.module('LookieDontTouchie').service('LoginService', ['$http', function($http) {
    
    var successfulLogin = false;
    
    var LoginEndpoint = 'https://bithack-crazyatlantaguy.c9.io/api/user/'
    
    this.login = function(username, password) {
        this.successfulLogin = false;
        return $http.post(LoginEndpoint, {username: username, password: password})
    }
    
}]);