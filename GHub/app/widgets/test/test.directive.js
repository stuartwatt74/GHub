(function () {
    'use strict';

    angular.module('app').directive('test', testDirective);

    testDirective.$inject = ['HubService'];

    function testDirective(hubService) {
        return {
            restrict: 'EAC',
            replace: true,
            template: '<canvas width="200px" height="200px" style=""></canvas>',

            link: function (scope, el, attrs) {

                draw();

                function draw() {

                    scope.stage = new createjs.Stage(el[0]);

                    var w = el[0].width;
                    var h = el[0].height;

                    var size = w;
                    if (h < w)
                        size = h;
                    size = size - 5;

                    var radius = size / 2;

                    var cx = w / 2;
                    var cy = h / 2;

                    var button = new createjs.Shape();
                    button.graphics.beginFill("#808080").drawCircle(0, 0, radius).endFill();
                    button.x = cx;
                    button.y = cy;

                    scope.stage.addChild(button);

                    scope.stage.update();

                    button.addEventListener("click", handleClick);
                }

                function handleClick(event) {
                    hubService.sendMessage({
                        EventName: 'reset'
                    });
                }
            }
        }
    }   

}())