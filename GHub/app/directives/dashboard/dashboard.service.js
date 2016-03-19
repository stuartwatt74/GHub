(function () {
    'use strict';

    angular.module('app').factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$http'];

    function dashboardService($http) {

        var service = {
            getWidgets: getWidgets
        };

        return service;

        function getWidgets() {
            var req = {
                method: 'GET',
                url: '/api/dashboard/widgets',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            return $http(req);
        }

    }

}());