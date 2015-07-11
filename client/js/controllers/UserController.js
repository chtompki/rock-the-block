angular.module('LookieDontTouchie').controller('UserController', ['$rootScope', '$scope', '$state','LoginService', function($rootScope, $scope, $state, LoginService) {

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
        var promise = LoginService.login($scope.loginPage.username, $scope.loginPage.password);
        promise.success(function(data) {
            if (data.status == "success") {
                $scope.loginPage.yay = true;
            }
            else {
                $scope.loginPage.badAuthentication = true;
            }
        }).error(function() {
            $state.go('error');
        });
    }

}]);