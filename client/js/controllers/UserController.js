angular.module('LookieDontTouchie').controller('UserController', ['$rootScope', '$scope', '$state','$stateParams', 'DataService', function($rootScope, $scope, $state, $stateParams, DataService) {

    var username = $stateParams.username

    if (username == null || username == '') {
        $state.go('error');
    }

    $scope.username= username;
    
    DataService.getFileRequests(username).success(function(data){
        $scope.requests = data;
        
        //ugh this is embarrassing
        angular.forEach(data, function(value) {
            value.to = JSON.parse(value.to);
        })
    });

    DataService.getFileDeliveries(username).success(function(data){
        $scope.deliveries = data;
    });
    
    $scope.requestDocumentTransfer = function(username) {
        $state.go('transfer', {username: username});
    }
    
    $scope.uploadDocuments = function(id) {
        $state.go('upload', {id: id, username: username});
    }

}]);