(function () {
    'use strict';

    angular.module('app').directive('view3d', view3dDirective);

    view3dDirective.$inject = [];

    function view3dDirective() {
        return {
            restrict: 'EAC',
            replace: true,
            scope: {
                width: '=width',
                height: '=height',
                model: '=model'
            },            

            link: function (scope, el, attrs) {

                var w = scope.width;
                var h = scope.height;

                var scene = new THREE.Scene();
                var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

                var renderer = new THREE.WebGLRenderer();
                renderer.setSize(w, h);
                el[0].appendChild(renderer.domElement);

                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshPhongMaterial({
                    color: 0x996633,
                    specular: 0x050505,
                    shininess: 100
                });
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                var light = new THREE.PointLight(0x404040, 10, 100);
                
                //var lg = new THREE.BoxGeometry(1, 1, 1);
                //var lm = new THREE.MeshBasicMaterial({ color: 0x222222 });
                //var light = new THREE.Mesh(lg, lm);
                light.position.set(-1, 1, 1);

                
                scene.add(light);

                camera.position.z = 5;

                var render = function () {
                    requestAnimationFrame(render);

                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;

                    renderer.render(scene, camera);
                };

                render();
            }
        }
    }

}())