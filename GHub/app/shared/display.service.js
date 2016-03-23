(function () {
    'use strict';

    angular.module('app').factory('displayService', displayService);

    displayService.inject = ['$http'];

    function displayService($http) {

        var service = {
            getModels: getModels,
        };

        return service;

        function getModels() {
            var req = {
                method: 'GET',
                url: '/api/display/models',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            return $http(req);
        }
    };
}());