(function () {
    'use strict';

    angular.module('app').factory('registerModalService', registerModalService);

    registerModalService.inject = ['$uibModal'];

    function registerModalService($uibModal) {
        return function (data) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'app/modals/registerModal/registerModal.template.html',
                controller: 'RegisterModalController',
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'md',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });
        }
    }

}());