angular.module('LookieDontTouchie').controller('LoginController', ['$rootScope', '$scope','LoginService', function($rootScope, $scope, LoginService) {

    $scope.loginPage = {
        heading: "Login",
        badAuthentication: false,
        username: "",
        password: "",
        yay: false
    };
    
    
    $scope.login = function() {
        $scope.loginPage.badAuthentication = false;
        $scope.loginPage.yay = false;
        LoginService.login($scope.loginPage.username, $scope.loginPage.password);
        if (LoginService.wasLoginSuccessful()) {
            $scope.loginPage.yay = true;
        }
        else {
            $scope.loginPage.badAuthentication = true;
        }
    }
    
}]);