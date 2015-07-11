angular.module('LookieDontTouchie').controller('LoginController', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.page = {heading: "Login"};
    
    $scope.loginuser.username = fred;
    $scope.loginuser.password=jonze;
    
    
    $scope.login = function() {
        
    }
    
}]);