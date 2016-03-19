(function () {
    'use strict';

    angular.module('app').directive('dashboardWidget', dashboardWidgetDirective);

    dashboardWidgetDirective.$inject = ['$compile'];

    function dashboardWidgetDirective($compile) {
        return {            
            templateUrl: 'app/directives/dashboard/dashboardWidget.template.html',
            link: function (scope, el, attrs) {

                var newElement = angular.element(scope.item.template);
                el.append(newElement);
                newElement.addClass('dashboard-widget-directive');
                $compile(newElement)(scope);

            }
        }
    }

}())