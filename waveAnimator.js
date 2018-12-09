console.clear();

function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 1, 5);

  return camera;
}

function getRenderer() {
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function addTexture() {
  var shape = new THREE.Shape();
  shape.moveTo(108.5, 0.5);
  shape.bezierCurveTo(87.5, 0.5, -10.5, 160.5, 1.5, 176.5);
  shape.bezierCurveTo(13.5, 192.5, 196.5, 197.5, 206.5, 179.5);
  shape.bezierCurveTo(216.5, 161.5, 129.5, 0.5, 108.5, 0.5);
  
  var extrudeSettings = {
    steps: 2,
    depth: 16,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };
  var geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  var material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: false
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  mesh.scale.set(0.008, 0.008, 0.008);
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.castShadow = true;

  geometricObj = mesh;

  gridHelper();
  scene.add(mesh);
  addLight();
}

function gridHelper() {

  var gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);
}

function addLight() {
  const light = new THREE.DirectionalLight();
  light.position.set(200, 100, 200);
  light.castShadow = true;
  light.shadow.camera.left = -100;
  light.shadow.camera.right = 100;
  light.shadow.camera.top = 100;
  light.shadow.camera.bottom = -100;
  scene.add(light);
}

function mouseMove(e){
    if (e.clientX>200 && camera.position.x<=1) { 
      camera.position.x += 0.01; 
      geometricObj.rotation.y -= 0.02;
    }  else if (e.clientX<210 && e.clientX>0 &&camera.position.x>=-1 || camera.position.x>=1 && e.clientX>0&&e.clientX<210) {
      camera.position.x -= 0.01; 
      geometricObj.rotation.y += 0.02;
    }
}
window.addEventListener('mousemove', mouseMove);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

function rotate() {
  geometricObj.rotation.y += 0.02;
}

var scene = getScene();
var camera = getCamera();
var renderer = getRenderer();
// var controls = getControls(camera, renderer);
var cube;
var geometricObj;
var a = 0;
var center = new THREE.Vector2(100, 100);
var edges;

addTexture();
render();
