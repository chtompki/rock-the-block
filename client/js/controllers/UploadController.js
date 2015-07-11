angular.module('LookieDontTouchie').controller('UploadController', ['$rootScope', '$scope', '$state','$stateParams', 'DataService', function($rootScope, $scope, $state, $stateParams, DataService) {

    var username = $stateParams.username;
    var id = $stateParams.id;
    var blob = '';
    $scope.showFileToDownload = false;

    $scope.upload = {
        file: '',
        url: ''
    };

    $scope.upload = function() {
        var promise = DataService.uploadFileRequestData(username, id, $scope.upload.url, $scope.upload.file);
        promise.success(function (data) {
            blob = new Blob([ data ], { type : 'text/plain' });
            var url = (window.URL || window.webkitURL).createObjectURL( blob );
            downloadURI(url, 'encryptedFile.txt');
        }).error(function () {
            $state.go('error');
        });
    }

    $scope.cancel = function() {
        $state.go('user', {username: username});
    }
    
    function downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      link.click();
    }   
    
    
}]);