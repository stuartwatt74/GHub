(function () {
    'use strict';

    angular.module('app').factory('HubService', hubService);

    hubService.$inject = ['$rootScope', 'localStorageService'];

    function hubService($rootScope, localStorageService) {
        
        var initialised = false;

        var hub = $.connection.displayHub;

        // Authorize SignalR connection
        var authData = localStorageService.get('authorisationData');
        if (authData) {
            $.connection.hub.qs = { 'access_token': authData.token };
        }

        hub.client.broadcastMessage = function (message) {
            $rootScope.$emit(message.EventName, message);
        };

        $.connection.hub.start()
            .done(function () {
                initialised = true;
            })
            .fail(function (data) {
                alert(data);
            }
        );

        var service = {
            authoriseHub: authoriseHub,
            receiveMessage: receiveMessage,
            sendMessage: sendMessage,            
        };

        return service;

        function authoriseHub(token) {
            // Authorize SignalR connection
            //var authData = localStorageService.get('authorisationData');
            //if (authData) {
                //$.connection.hub.qs = { 'access_token': authData.token };
                $.connection.hub.qs = { 'access_token': token };
            //}
        }

        function receiveMessage(scope, eventName, callback) {
            var handler = $rootScope.$on(eventName, callback);
            scope.$on('$destroy', handler);
        }

        function sendMessage(message) {
            if (initialised) {
                hub.server.receiveMessage(message);
            }
        };

    }

}());