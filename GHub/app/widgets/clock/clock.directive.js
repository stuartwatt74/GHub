(function () {
    'use strict';

    angular.module('app').directive('clock', clockDirective);

    clockDirective.$inject = [];

    function clockDirective() {
        return {
            restrict: 'EAC',
            replace: true,            
            template: '<canvas width="200px" height="200px" style=""></canvas>',
            
            link: function (scope, el, attrs) {
                
                var mcClock = new createjs.MovieClip();
                var hourHand = new createjs.Shape();
                var minuteHand = new createjs.Shape();
                var secondHand = new createjs.Shape();

                drawClock();
                
                function drawClock() {

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

                    scope.stage = new createjs.Stage(el[0]);

                    // dial
                    var dial = new createjs.Shape();
                    dial.graphics.beginFill("white").setStrokeStyle(2).beginStroke("black").drawCircle(0, 0, radius).endStroke().endFill();
                    dial.x = cx;
                    dial.y = cy;
                    dial.shadow = new createjs.Shadow("#000000", 2, 2, 4);
                    mcClock.addChild(dial);
                    //scope.stage.addChild(dial);

                    // rings
                    var rings = new createjs.Shape();
                    rings.graphics.setStrokeStyle(.5).beginStroke("black").drawCircle(0, 0, radius * 0.9).endStroke();
                    rings.graphics.setStrokeStyle(.5).beginStroke("black").drawCircle(0, 0, radius * 0.85).endStroke();
                    rings.x = cx;
                    rings.y = cy;
                    mcClock.addChild(rings);
                    //scope.stage.addChild(rings);

                    // smallticks
                    for (var i = 0; i < 60; i++) {
                        var smallticks = new createjs.Shape();
                        smallticks.graphics.setStrokeStyle(.5).beginStroke("black").mt(0, 0 - radius * 0.85).lt(0, 0 - radius * 0.9).endStroke();
                        smallticks.x = cx;
                        smallticks.y = cy;
                        smallticks.rotation = i * 6;
                        mcClock.addChild(smallticks);
                        //scope.stage.addChild(smallticks);
                    }

                    // largeticks
                    for (var i = 0; i < 12; i++) {
                        var largeticks = new createjs.Shape();
                        largeticks.graphics.setStrokeStyle(1).beginStroke("black").mt(0, 0 - radius * 0.85).lt(0, 0 - radius * 0.9).endStroke();
                        largeticks.x = cx;
                        largeticks.y = cy;
                        largeticks.rotation = i * 30;
                        mcClock.addChild(largeticks);
                        //scope.stage.addChild(largeticks);
                    }
                    
                    for (var i = 1; i < 13; i++) {
                        var text = new createjs.Text(i, "16px Arial", "black");

                        var textBounds = text.getBounds();
                        var xoffset = textBounds.width / 2;
                        var yoffset = textBounds.height / 2;
                        
                        text.regX = xoffset;
                        text.regY = yoffset;

                        text.rotation = i * 330;

                        text.y -= (radius * 0.73);

                        var container = new createjs.Container();
                        container.x = cx;
                        container.y = cy + 1;
                        container.rotation = i * 30;
                        container.addChild(text);

                        mcClock.addChild(container);
                        //scope.stage.addChild(container);
                    }

                    // hour hand
                    hourHand.graphics.setStrokeStyle(3).beginStroke("#111111").mt(0, 0).lt(0, 0 - radius * 0.75).endStroke();
                    hourHand.x = cx;
                    hourHand.y = cy;
                    hourHand.shadow = new createjs.Shadow("#000000", 2, 2, 4);
                    mcClock.addChild(hourHand);
                    //scope.stage.addChild(hourHand);

                    // minute hand
                    minuteHand.graphics.setStrokeStyle(2).beginStroke("#111111").mt(0, 0).lt(0, 0 - radius * 0.90).endStroke();
                    minuteHand.x = cx;
                    minuteHand.y = cy;
                    minuteHand.shadow = new createjs.Shadow("#000000", 2, 2, 4);
                    mcClock.addChild(minuteHand);
                    //scope.stage.addChild(minuteHand);

                    // second hand
                    secondHand.graphics.setStrokeStyle(1).beginStroke("#111111").mt(0, 0).lt(0, 0 - radius * 0.90).endStroke();
                    secondHand.graphics.beginFill("black").drawCircle(0, 0, 5).endFill();
                    secondHand.x = cx;
                    secondHand.y = cy;
                    secondHand.shadow = new createjs.Shadow("#000000", 2, 2, 4);
                    mcClock.addChild(secondHand);
                    //scope.stage.addChild(secondHand);

                    scope.stage.addChild(mcClock);

                    scope.stage.update();
                    createjs.Ticker.timingMode = createjs.Ticker.RAF;
                    createjs.Ticker.addEventListener("tick", tick);
                }

                function tick(event) {
                    if (scope.model != null) {
                        
                        mcClock.scaleX = el[0].x / 200;
                        mcClock.scaleY = el[0].y / 200;

                        //mcClock.scaleX += 0.001;
                        //mcClock.scaleY += 0.001;

                        hourHand.rotation = (30 * scope.model.Time.Hour) + (0.5 * scope.model.Time.Minute);
                        minuteHand.rotation = (6 * scope.model.Time.Minute) + (0.1 * scope.model.Time.Second);
                        secondHand.rotation = (6 * scope.model.Time.Second) + (0.006 * scope.model.Time.Millisecond);
                    }
                    scope.stage.update();
                }

            }
        }
    }

}())