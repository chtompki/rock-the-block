angular.module('LookieDontTouchie').service('UserService', ['$http', '$state', function($http, $state) {

    var username = '';
    var userList = [];
    var requestList = [];
    var isUserListPopulated = false;

    var UserEndpoint = 'https://bithack-crazyatlantaguy.c9.io/api/user/';
    var RequestUserEndpointSuffix = '/request';

    this.setMyUserName = function(username) {
        this.username = username;
    }

    this.getMyUserName = function() {
        return this.username;
    }

    this.getListOfUsers = function () {
        if (isUserListPopulated) {
            return userList;
        }
        else {
            this.loadAllUsers()
            return userList;
        }
    }

    this.loadAllRequests = function(username) {
        var endpoint = UserEndpoint + username + RequestUserEndpointSuffix;
        $http.get(endpoint, {})
            .success(function(data) {
            this.userlist = data;
            this.isUserListPopulated = true
        }).error(function() {
            $state.go('error');
        });
    }

    this.loadAllUsers = function() {
        $http.get(UserEndpoint, {})
            .success(function(data) {
                this.userlist = data;
                this.isUserListPopulated = true
            }).error(function() {
                $state.go('error');
            });
    }



}]);