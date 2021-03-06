﻿(function () {
    'use strict';

    angular.module('app').controller('UserController', userController);

    userController.$inject = ['$scope', 'HubService'];

    function userController($scope, hubService) {

        var vm = this;

        hubService.receiveMessage($scope, 'test-display-update', function (event, args) {
            $scope.model = args;
            $scope.$apply();
        });
    }

}());