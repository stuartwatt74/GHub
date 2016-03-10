(function () {
    'use strict';

    angular.module('app').controller('NavController', navController);

    navController.inject = ['authenticationService', '$state', 'registerModalService'];

    function navController(authenticationService, $state, registerModalService) {

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        var vm = this;

        authenticationService.isApiAuthorised().then(function (response) {
            vm.admin = true;
            vm.anonymous = false;
        }, function (err, status) {
            vm.admin = false;
            vm.anonymous = true;
        });

        vm.login = function () {                        
            authenticationService.login(vm.username, vm.password)
            .then(function (response) {
                vm.admin = true;
                vm.anonymous = false;
                toastr["success"]("Login was successful!");
            }, function (err, status) {                
                vm.logout();
                toastr["error"]("Invalid login.");
            });
        }

        vm.logout = function () {
            vm.admin = false;
            vm.anonymous = true;
            authenticationService.logout();
            $state.go('home');
        }

        vm.register = function () {
            var registerModalInstance = registerModalService();
            registerModalInstance.result.then(function (data) {
                toastr["success"]("Registration was successful!");
            });
        }

    }

}());