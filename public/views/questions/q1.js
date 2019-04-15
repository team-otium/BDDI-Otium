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
    <div id="forme-net"></div>

    <div id="forme-abstraite"></div>

    <div class="text_center">
        <h1>Êtes-vous de nature rêveur/imaginatif ?</h1>
    </div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {

    /**************** FORME NET ****************/

    var sceneN = new THREE.Scene();
    var cameraN = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var formeN = document.getElementById('forme-net');

    var rendererN = new THREE.WebGLRenderer({alpha: true});
    rendererN.setSize(window.innerWidth, window.innerHeight);
    formeN.appendChild(rendererN.domElement);
    
    var radiusN = 40;
    var segmentsN = 50;
    var ringsN = 30;
    
    var geometryN = new THREE.SphereGeometry(radiusN, segmentsN, ringsN);

    var materialN = new THREE.MeshBasicMaterial({
      color: 'blue',
      wireframe: true
    });
    
    var cubeN = new THREE.Mesh(geometryN, materialN);
    sceneN.add(cubeN);
    
    cameraN.position.z = 150;
    
    var renderN = function() {
      requestAnimationFrame(renderN);
      cubeN.rotation.x += 0.01;
      cubeN.rotation.y += 0.01;
      rendererN.render(sceneN, cameraN);
    };
    renderN();

    /**************** FORME ABSTRAITE ****************/

    var sceneA = new THREE.Scene();
    var cameraA = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var formeA = document.getElementById('forme-abstraite');

    var rendererA = new THREE.WebGLRenderer({alpha: true});
    rendererA.setSize(window.innerWidth, window.innerHeight);
    formeA.appendChild(rendererA.domElement);
    
    var radiusA = 40;
    var segmentsA = 50;
    var ringsA = 30;
    
    var geometryA = new THREE.SphereGeometry(radiusA, segmentsA, ringsA);

    var materialA = new THREE.MeshBasicMaterial({
        color: 0xF3A2B0,
        wireframe: true
    });
    
    var cubeA = new THREE.Mesh(geometryA, materialA);
    sceneA.add(cubeA);
    
    cameraA.position.z = 150;
    
    var renderA = function() {
      requestAnimationFrame(renderA);
      cubeA.rotation.x += 0.01;
      cubeA.rotation.y += 0.01;
      rendererA.render(sceneA, cameraA);
    };
    renderA();


    /**************** SEPARATION CANVAS ****************/

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

