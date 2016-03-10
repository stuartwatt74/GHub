(function () {
    'use strict';

    angular.module('app').controller('RegisterModalController', registerModalController);

    registerModalController.inject = ['$uibModalInstance', 'authenticationService'];

    function registerModalController($uibModalInstance, authenticationService, data) {

        var vm = this;

        //vm.emailError = "A user already exists with this email address.";
        //vm.passwordError = "A user already exists with this email address.";
        //vm.confirmPasswordError = "A user already exists with this email address.";

        vm.submit = function () {
            vm.usernameError = "";
            vm.emailError = "";
            vm.passwordError = "";
            vm.confirmPasswordError = "";

            authenticationService.register(vm.username, vm.password, vm.confirmPassword)
            .success(function (result) {
                $uibModalInstance.close({
                    email: vm.email
                });
            }).error(function (err) {
                //if (err.modelState['userModel.Email'])
                //    vm.emailError = err.modelState['userModel.Email'][0];
                if (err.modelState['userModel.Password'])
                    vm.passwordError = err.modelState['userModel.Password'][0];
                if (err.modelState['userModel.ConfirmPassword'])
                    vm.confirmPasswordError = err.modelState['userModel.ConfirmPassword'][0];
            });
            
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };

}())