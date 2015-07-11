angular.module('LookieDontTouchie').controller('TransferController', ['$rootScope', '$scope', '$state','$stateParams', 'DataService', function($rootScope, $scope, $state, $stateParams, DataService) {
    var username = $stateParams.username;
    
    $scope.username = username;
    
    $scope.request = {
        from: '',
        to: [],
        description: ''
    };
    
    var allUsersExceptMainUser = [];
    
    $scope.toggleUser = function(user) {
        if($scope.request.to.indexOf(user)==-1)
        {
            $scope.request.to.push(user);
        } else {
            $scope.request.to.splice($scope.request.to.indexOf(user),1);
        }
    }
    
    var allUsersPromse = DataService.getListOfUsers();
    allUsersPromse.success(function(data) {
        data.forEach(function(entity) {
            if (entity != username) {
                allUsersExceptMainUser.push(entity);
            }
        });
        $scope.users = allUsersExceptMainUser;
    }).error(function() {
        $state.go('error');
    });
    
    $scope.transferDocs = function() {
        var promise = DataService.createFileRequest(username,$scope.request.from, $scope.request.to, $scope.request.description);
        promise.success(function (data) {
            $state.go('qrcode', {username: username, id: data.id});
        }).error(function () {
            $state.go('error');
        });
    }

    $scope.cancel = function() {
        $state.go('user', {username: username});
    }
    
    
}]);