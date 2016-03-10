(function () {
    'use strict';

    angular.module('app').factory('HubService', hubService);

    hubService.$inject = ['$rootScope'];

    function hubService($rootScope) {
        
        var initialised = false;

        var hub = $.connection.displayHub;

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
            receiveMessage: receiveMessage,
            sendMessage: sendMessage,            
        };

        return service;

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