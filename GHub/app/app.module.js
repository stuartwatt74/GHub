(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'LocalStorageModule',
    ]);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', '$httpProvider'];

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider) {
        
        $httpProvider.interceptors.push('authInterceptorService');

        localStorageServiceProvider
        .setPrefix('GHub')
        .setStorageType('sessionStorage');

        $urlRouterProvider.otherwise("/home");

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/home/home.template.html',
            controller: 'HomeController as home',
        })
        .state('user', {
            url: '/user',
            templateUrl: 'app/user/user.template.html',
            controller: 'UserController as user',
            data: {
                permissions: {
                    only: ['admin']
                }
            }
        })
    }

    angular.module('app').config(config);

    run.$inject = ['$rootScope', 'authenticationService', '$state'];

    function run($rootScope, authenticationService, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            
            if (!authenticationService.isStateAllowed(toState.name)) {
                if (toState.name != 'home') {
                    event.preventDefault();
                    $state.go('home');
                }
            }
            
        });
    }

    angular.module('app').run(run);

}());