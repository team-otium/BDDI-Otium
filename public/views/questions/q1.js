/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
    <div class="interaction1">Question 1</div>
 `
 
  // All listeners, one variable per listener
 mobile_listener1 = ["selector", "type", () => {
 
 }]
 
 mobile_listener2 = ["selector", "type", () => {
 
 }]
 /** And more... */
 
 // Socket on
 
 // Script to be executed when the page is displayed
 mobile_script = () => {
     
 }
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
    <div class="text_center">
        <h1>Êtes-vous de nature rêveur/imaginatif ?</h1>
    </div>
    <div class="divBleu"></div>
    <div class="divRouge"></div>
    <canvas id="canvas"></canvas>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {
 
 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 q1_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
q1_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
 

 /***********************************  ************************************/

 
var renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('canvas'), antialias:true});
// default bg canvas color //
renderer.setClearColor(0x7b7b7b);
//  use device aspect ratio //
renderer.setPixelRatio(window.devicePixelRatio);
// set size of canvas within window //
renderer.setSize(window.innerWidth, window.innerHeight);




var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;


var sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
var material = new THREE.MeshNormalMaterial();

var sphere = new THREE.Mesh(sphere_geometry, material);
scene.add(sphere);


var update = function() {

  // change '0.003' for more aggressive animation
  var time = performance.now() * 0.003;
  //console.log(time)

  //go through vertices here and reposition them
  
  // change 'k' value for more spikes
  var k = 3;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
      var p = sphere.geometry.vertices[i];
      p.normalize().multiplyScalar(1 + 0.3 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
  }
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
sphere.geometry.verticesNeedUpdate = true;


}

function animate() {
  //sphere.rotation.x += 0.01;
  //sphere.rotation.y += 0.01;

  update();
  /* render scene and camera */
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}


requestAnimationFrame(animate);