angular.module('LookieDontTouchie').service('DataService', ['$http', '$state', '$q', function($http, $state, $q) {

    this.authenticateUser = function(username, password) {
        var defer = $q.defer()
        $http.post('https://bithack-crazyatlantaguy.c9.io/api/user/',
        {
            'username': username,
            'password': password
        }).success(function(data) {
            if(data.status==='success') {
                defer.resolve('success');
            } else {
                defer.reject('invalid');
            }
        });
        return defer.promise;
    }

    this.createFileRequest = function(username, from, to, description) {
        var defer = $q.defer()
        return $http.post('https://bithack-crazyatlantaguy.c9.io/api/user/'+username+'/request/', {
            'to': JSON.stringify(to),
            'from': from,
            'description': description
        }).success(function(data) {
            defer.success(data.id);
        }).error(function(data,status) {
            defer.reject(status);
        });
        return defer.promise;
    }


    this.getFileRequests = function(username) {
        return $http.get('https://bithack-crazyatlantaguy.c9.io/api/user/'+username+'/request');
    }

    this.getFileRequestDetails = function(username, request) {
        return $http.get('https://bithack-crazyatlantaguy.c9.io/api/user/'+username+'/request/'+request);
    }

    this.getFileRequestPrivateKeyQrCode = function(username, request) {
        return 'https://bithack-crazyatlantaguy.c9.io/api/user/'+username+'/request/'+request+'/qrcode';
    }

    this.uploadFileRequestData = function(username, requestId, url, data) {
        return $http.post('https://bithack-crazyatlantaguy.c9.io/api/user/'+username+'/request/'+requestId, {
            'file': data,
            'url': url
        });
    }


    this.getFileDeliveries = function(username, delivery) {
        return $http.get('https://bithack-crazyatlantaguy.c9.io/api/user/'+username+'/delivery');
    }

    this.getFileDeliveriesDetails = function(username, delivery) {
        return $http.get('https://bithack-crazyatlantaguy.c9.io/api/user/'+username+'/delivery/'+delivery);
    }
    
    this.getListOfUsers = function() {
        return $http.get('https://bithack-crazyatlantaguy.c9.io/api/user/');
    }
        

}]);