/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
 
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
    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    } else {
        document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
    }

    function deviceOrientationHandler(eventData) {
        var tiltLR = eventData.gamma;
        var tiltFB = eventData.beta;
        var dir = eventData.alpha;

        //document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
        //document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
        //document.getElementById("doDirection").innerHTML = Math.round(dir);

        socket.emit("q7", {tiltFB:eventData.beta, tiltLR:eventData.gamma, dir:eventData.alpha});
    }
 }
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
 <div class="text_center">
    <h1>Quel objet vous attire le plus ?</h1>
</div>
<div id="cursor"></div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]

 desktop_socketOn1 = ["q7", (eventData) => {
    function map(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
    // CURSOR POSITION
    if (eventData.tiltFB > 80) eventData.tiltFB = 80
    if (eventData.tiltFB < 0) eventData.tiltFB = 0
    if (eventData.tiltLR > 35) eventData.tiltFB = 35
    if (eventData.tiltLR < -35) eventData.tiltFB = -35

    let y = map(eventData.tiltLR, -35, 35, 0, window.innerWidth)
    document.getElementById("cursor").style.top =  map(eventData.tiltFB, 0, 80, 0, window.innerHeight) + 'px';
    document.getElementById("cursor").style.left = y + 'px';

    window.renderers.forEach(
        el => {el.obj.position.y = 0}
    );
    // RESULT
    if (y > 0 && y <= (window.innerWidth/4)) window.renderers[0].obj.position.y = 2;
    if (y > (window.innerWidth/4) && y <= (window.innerWidth/4)*2) window.renderers[1].obj.position.y = 2;
    if (y > (window.innerWidth/4)*2 && y <= (window.innerWidth/4)*3) window.renderers[2].obj.position.y = 2;
    if (y > (window.innerWidth/4)*3 && y <= (window.innerWidth/4)*4) window.renderers[3].obj.position.y = 2;

    window.resultats.setResult("q7", {res: eventData})
}]
 
 desktop_script = () => {
     window.renderers = []
     for (let i = 0; i < 4; i++) {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth/4)/window.innerHeight, 0.1, 1000 );
    
        var renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize( window.innerWidth/4, window.innerHeight );
        renderer.domElement.classList.add('q7_canvas')
        renderer.domElement.style.left = (25 * i )+ "%"
        document.getElementById("q7").appendChild( renderer.domElement );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
    
        camera.position.z = 5;

        window.renderers.push({scene: scene, camera: camera, renderer: renderer, obj: cube})
     }

     var animate = function () {
        requestAnimationFrame( animate );

        for (let i = 0; i < window.renderers.length; i++) {
            window.renderers[i].obj.rotation.x += 0.01;
            window.renderers[i].obj.rotation.y += 0.01;

            window.renderers[i].renderer.render( window.renderers[i].scene, window.renderers[i].camera );
        }
    };

    animate()

 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 q7_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
q7_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [desktop_socketOn1],
     script: desktop_script,
     transitions: desktop_transition,
 }
 