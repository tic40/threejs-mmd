'use strict';

var app = angular.module('mmdLoader', []);

/*
 * mainController
 */
app.controller('mainController', function($scope) {

  var container, stats;

  var mesh, camera, scene, renderer, controls;
  var helper;

  $scope.models = [
    {
      'name': 'Miku(lat)',
      'path': 'mmd/models/miku_lat/mikuVer2.31_Normal.pmd',
      'selected': true,
      'sourceUrl': 'http://seiga.nicovideo.jp/seiga/im3688289',
    },
    {
      'name': 'Amatsukaze',
      'path': 'mmd/models/amatsukaze/amatsukaze_noweapon.pmx',
      'selected': false,
      'sourceUrl': 'http://www.nicovideo.jp/watch/sm23614407',
    },
    {
      'name': 'Remilia',
      'path': 'mmd/models/remilia/remilia1.pmx',
      'selected': false,
      'sourceUrl': 'https://bowlroll.net/file/19618',
    },
    {
      'name': 'Ruby-chan',
      'path': 'mmd/models/ruby-chan/Ruby-chan.pmd',
      'selected': false,
      'sourceUrl': 'https://codeiq.jp/q/2809',
    },
  ];

  $scope.vmds = [
    {
      'name': 'schrodingeiger no koneko',
      'path': 'mmd/motions/schrodingeiger_no_koneko/Schrodingeiger_no_Koneko2.vmd',
      'selected': true,
      'sourceUrl': 'http://www.nicovideo.jp/watch/sm20114513',
    },
    {
      'name': 'nekomimi switch',
      'path': 'mmd/motions/nekomimi_switch/nekomimi_mikuv2.vmd',
      'selected': false,
      'sourceUrl': 'http://www.nicovideo.jp/watch/sm14365789',
    },
    {
      'name': 'Masked BitcH',
      'path': 'mmd/motions/masked_bitch/maskedBitch.vmd',
      'selected': false,
      'sourceUrl': 'http://www.nicovideo.jp/watch/sm20093796',
    }
  ];

  // default model
  $scope.modelFile = $scope.models[0]['path'];
  // default dance
  $scope.vmdFiles = [$scope.vmds[0]['path']];

  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  var clock = new THREE.Clock();

  function init() {
    $scope.isLoading = true;

    container = document.createElement('div');
    container.setAttribute("id", "mmd");
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 25;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener( 'change', render );

    // scene

    scene = new THREE.Scene();

    // ambient light
    var ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // directional light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, -1, 0).normalize();
    scene.add(directionalLight);

    // spot light
/*
    var spotLight = new THREE.SpotLight(0xffffff, 0.2);
    spotLight.position.set(0, 0, 0).normalize();
    scene.add(spotLight);
*/

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff));
    container.appendChild(renderer.domElement);

    // model

    var onProgress = function onProgress(xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        $scope.loadingMsg = Math.round(percentComplete, 2) + '% downloaded';
        console.log(Math.round(percentComplete, 2) + '% downloaded');
        $scope.$apply();
      }
    };

    var onError = function onError(xhr) { console.log('load error'); };

    helper = new THREE.MMDHelper(renderer);

    var loader = new THREE.MMDLoader();
    loader.setDefaultTexturePath('./mmd/default/');

    loader.load($scope.modelFile, $scope.vmdFiles, function (object) {

      mesh = object;
      mesh.position.y = -10;

      helper.add(mesh);
      helper.setAnimation(mesh);

      /*
      * Note: You must set Physics
      *       before you add mesh to scene or any other 3D object.
      * Note: Physics calculation is pretty heavy.
      *       It may not be acceptable for most mobile devices yet.
        */
      if (!isMobileDevice()) {

        helper.setPhysics(mesh);
      }

      helper.unifyAnimationDuration({ afterglow: 2.0 });

      scene.add(mesh);
      $scope.isLoading = false;
      $scope.$apply();
    }, onProgress, onError);

    //document.addEventListener('mousemove', onDocumentMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);

    animate();
  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
  }

  function animate() {

    requestAnimationFrame(animate);
    render();
    controls.update();
  }

  function render() {

    if (mesh) {

      helper.animate(clock.getDelta());
      helper.render(scene, camera);
    } else {

      renderer.clear();
      renderer.render(scene, camera);
    }
  }

  // easy mobile device detection
  function isMobileDevice() {

    if (navigator === undefined || navigator.userAgent === undefined) {

      return true;
    }

    var s = navigator.userAgent;

    if (s.match(/iPhone/i)
    //             || s.match( /iPad/i )
    || s.match(/iPod/i) || s.match(/webOS/i) || s.match(/BlackBerry/i) || s.match(/Windows/i) && s.match(/Phone/i) || s.match(/Android/i) && s.match(/Mobile/i)) {

      return true;
    }

    return false;
  }

  init();

  $scope.relender = function() {

    scene.remove(mesh);
    var mmd = document.getElementById("mmd");
    document.body.removeChild(mmd);

    // set model
    angular.forEach($scope.models, function(value, key) {
      if (value.selected == true) $scope.modelFile = value.path;
    });
    // set dance
    angular.forEach($scope.vmds, function(value, key) {
      if (value.selected == true) $scope.vmdFiles.push(value.path);
    });

    init();
  }

  $scope.modelSelected = function(index) {
    angular.forEach($scope.models, function(value, key) {
      value.selected = false;
    });
    $scope.models[index].selected = true;
  }

  $scope.danceSelected = function(index) {
    angular.forEach($scope.vmds, function(value, key) {
      value.selected = false;
    });
    $scope.vmds[index].selected = true;
  }

});
