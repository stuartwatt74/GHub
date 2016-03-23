(function () {
    'use strict';

    angular.module('app').directive('periscope', periscopeDirective);

    periscopeDirective.$inject = ['displayService'];

    function periscopeDirective(displayService) {
        return {
            restrict: 'EAC',
            replace: true,
            link: function (scope, el, attrs) {

                var w = 390;
                var h = 190;
                var scene = new THREE.Scene();
                var modelData = null;
                var models = new Array();

                var renderer = new THREE.WebGLRenderer();
                renderer.setSize(w, h);
                el[0].appendChild(renderer.domElement);

                var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

                // Preload Models
                displayService.getModels().success(function (response) {
                    modelData = response;

                    initialise();

                }).error(function (err, status) {
                    //alert(err);
                });

                function initialise() {                    
                    
                    AddModels();

                    AddLights();

                    SetupCamera()
                    
                    render();
                }

                function AddModels() {

                    for (var i = 0; i < modelData.length; i++) {
                        var geometry = new THREE.BoxGeometry(modelData[i].sizeX, modelData[i].sizeY, modelData[i].sizeZ);
                        var material = new THREE.MeshPhongMaterial({
                            color: 0x336699,
                            specular: 0x6699CC,
                            shininess: 50
                        });
                        var model = new THREE.Mesh(geometry, material);
                        model.position.set(modelData[i].x, modelData[i].y, modelData[i].z);
                        model.rotation.set(modelData[i].rotationX, modelData[i].rotationY, modelData[i].rotationZ);
                        model.castShadow = true;
                        model.receiveShadow = true;
                        models.push(model);
                        scene.add(model);
                    }

                }

                function AddLights() {
                    var light = new THREE.PointLight(0x404040, 10, 100);
                    light.position.set(-1, 1, 3);
                    light.castShadow = true;
                    scene.add(light);

                    var light2 = new THREE.PointLight(0x404040, 10, 100);
                    light2.position.set(2, 3, 1);
                    light.castShadow = true;
                    scene.add(light2);
                }

                function SetupCamera() {                    
                    camera.position.y = 2;
                    camera.position.z = 5;
                }

                var render = function () {
                    requestAnimationFrame(render);

                    if (scope.model != null) {
                        for (var i = 0; i < scope.model.Models.length; i++) {

                            models[i].position.set(scope.model.Models[i].X, scope.model.Models[i].Y, scope.model.Models[i].Z);
                            models[i].rotation.set(scope.model.Models[i].RotationX, scope.model.Models[i].RotationY, scope.model.Models[i].RotationZ);
                        }
                    }

                    renderer.render(scene, camera);
                };

                
            }
        }
    }

}())