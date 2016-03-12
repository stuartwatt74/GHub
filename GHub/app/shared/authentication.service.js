(function () {
    'use strict';

    angular.module('app').factory('authenticationService', authenticationService);

    authenticationService.inject = ['$http', '$cookies', '$state', '$q', 'localStorageService'];

    function authenticationService($http, $cookies, $state, $q, localStorageService) {

        var authentication = clearAuthentication();

        var service = {
            isStateAllowed: isStateAllowed,
            isApiAuthorised: isApiAuthorised,
            login: login,
            logout: logout,
            register: register,
        };

        return service;

        function clearAuthentication() {
            return {
                isAuth: false,
                username: '',
                authLevel: 'anonymous',
            };
        }

        function isStateAllowed(stateName) {
            var states = $state.get();

            for (var i = 0; i < states.length; i++) {
                var state = states[i];
                if (state.name == stateName) {
                    if (state.data && state.data.permissions && state.data.permissions.only) {
                        var only = state.data.permissions.only;
                        var allowed = false;
                        for (var j = 0; j < only.length; j++) {
                            if (only[j] == authentication.authLevel)
                                allowed = true;
                        }
                        if (!allowed)
                            return false;
                    }
                }
            }

            return authentication.isAuth;
            
        }

        function login(username, password) {
            var data = 'grant_type=password&username=' + username + '&password=' + password;

            var deferred = $q.defer();

            var req = {
                method: 'POST',
                url: 'token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: data,
            };

            $http(req).success(function (response) {
                localStorageService.set('authorisationData', { token: response.access_token, username: username });

                authentication = {
                    isAuth: true,
                    username: username,
                    authLevel: "admin"
                }

                deferred.resolve(response);

            }).error(function (err, status) {
                logout();
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function isApiAuthorised() {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: '/api/account/authorised',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            };

            authentication = clearAuthentication();

            $http(req).success(function (response) {
                var authData = localStorageService.get('authorisationData');

                authentication = {
                    isAuth: true,
                    username: authData.username,
                    authLevel: 'admin',
                }

                deferred.resolve(authentication);

            }).error(function (err, status) {
                logout();
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function logout() {
            
            localStorageService.remove('authorisationData');

            authentication = clearAuthentication();
        }

        function register(username, password, confirmPassword) {
            logout();

            var req = {
                method: 'POST',
                url: '/api/account/register',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                data: {
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword
                }
            };

            return $http(req);
        }

    };
}());