(function () {
    'use strict';

    angular.module('app').controller('HomeController', homeController);

    homeController.$inject = ['$scope'];

    function homeController($scope) {

        var vm = this;

        //hubService.receiveMessage($scope, 'test-display-update', function (event, args) {
        //    vm.time = args.Time
        //    $scope.$apply();
        //});

        //vm.reset = function () {
        //    hubService.sendMessage({
        //        name: "reset",
        //    });
        //};
    }

}());