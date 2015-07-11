angular.module('LookieDontTouchie').controller('LoginController', ['$rootScope', '$scope', '$state','LoginService', 'UserService', function($rootScope, $scope, $state, LoginService, UserService) {

    $scope.loginPage = {
        heading: "Login",
        badAuthentication: false,
        username: "",
        password: ""
    };
    
    
    $scope.login = function() {
        $scope.loginPage.badAuthentication = false;
        $scope.loginPage.yay = false;
        var promise = LoginService.login($scope.loginPage.username, $scope.loginPage.password);
        promise.success(function(data) {
            if (data.status == "success") {
                $state.go('user', {username: $scope.loginPage.username});
            }
            else {
                $scope.loginPage.badAuthentication = true;
            }
        }).error(function() {
             $state.go('error');
        });
    }
    
}]);