(function () {
    'use strict';

    angular.module('app').directive('dashboard', dashboardDirective);

    dashboardDirective.$inject = ['dashboardService'];

    function dashboardDirective(dashboardService) {
        return {            
            templateUrl: 'app/directives/dashboard/dashboard.template.html',
            link: function (scope, el, attrs) {
                
                scope.gridsterOpts = {
                    colWidth: '200',
                    rowHeight: '200',
                    resizable: {
                        enabled: false,
                    },
                };

                scope.widgets = null;

                dashboardService.getWidgets().success(function (response) {
                    scope.widgets = response;
                }).error(function (err, status) {
                    alert(err);
                });
                
            }
        }
    }

}())