angular.module('LookieDontTouchie').controller('UserController', ['$rootScope', '$scope', '$state','$stateParams', 'DataService', function($rootScope, $scope, $state, $stateParams, DataService) {

    $scope.username= $stateParams.username;
    
    $scope.requests = DataService.getFileRequests('robtompkins');

    $scope.deliveries = DataService.getFileDeliveries('robtompkins');

}]);