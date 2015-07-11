angular.module('LookieDontTouchie').controller('QRCodeController', ['$rootScope', '$scope', '$state','$stateParams', 'DataService', function($rootScope, $scope, $state, $stateParams, DataService) {
    
    var username = $stateParams.username;
    var requestId = $stateParams.id;
    $scope.username = username;

    $scope.qrCodeUrl = DataService.getFileRequestPrivateKeyQrCode(username, requestId);

    DataService.getFileRequestDetails(username, requestId).then(function(data){
        console.log(data);
    });

}]);