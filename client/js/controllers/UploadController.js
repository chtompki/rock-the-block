angular.module('LookieDontTouchie').controller('UploadController', ['$rootScope', '$scope', '$state','$stateParams', 'DataService', function($rootScope, $scope, $state, $stateParams, DataService) {

    var username = $stateParams.username;
    var id = $stateParams.id;

    $scope.upload = {
        file: '',
        url: ''
    };
    
    $scope.upload = function() {
        var promise = DataService.uploadFileRequestData(username, id, $scope.upload.url, $scope.upload.file);
        //function(username, request, url, data);
        promise.success(function () {
            
        }).error(function () {
            $state.go('error');
        });
    }

    $scope.cancel = function() {
        $state.go('user', {username: username});
    }
    
    
}]);