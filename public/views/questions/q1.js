/**************************  
**************************  QUESTION 1
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div class="text_center_mobile">
        <h1 class="question_mobile">Êtes-vous de nature rêveur ?</h1>
    </div>
 `

// All listeners, one variable per listener
mobile_listener1 = ["selector", "type", () => {

}]

mobile_listener2 = ["selector", "type", () => {

}]

// Socket on

// Script to be executed when the page is displayed
mobile_script = () => {
    document.querySelector(".circle1").style.display = "block"
    document.querySelector(".circle2").style.display = "block"
    document.querySelector(".gifValidation").style.display = "block"

    document.querySelector(".firstMenu").style.display = "block"
    document.querySelector(".firstMenu2").style.display = "block"
    document.querySelector(".firstMenu3").style.display = "block"
    document.querySelector(".firstMenu4").style.display = "block"

    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q1
    ValidationBtn.nextPage = questions.q2
    ValidationBtn.actualQ = "1"
    ValidationBtn.nextQ = "2"

    document.getElementById('background_anim').innerHTML = ""
    document.getElementById('background_anim').classList.add('bgSmartphone')

    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    }

    function deviceOrientationHandler(eventData) {
        if (ValidationBtn.touch === false && window.getComputedStyle(document.querySelector(".gifValidation")).getPropertyValue('opacity') == 0) {
            socket.emit("q1", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
        }
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
        <h1 class="question_desktop">Êtes-vous de nature rêveur ?</h1>
    </div>

    <div class="contain">
        <div id="forme-net"></div>
        <div id="forme-abstraite"></div>
    </div>

    <div class="tuto1"><img src="/both/assets/img/tuto/tuto_3.gif"></div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["q1", (eventData) => {

    if (eventData.tiltLR >= -50 && eventData.tiltLR <= 50) {
        document.getElementById("forme-net").style.width = 50 + eventData.tiltLR + '%';
        document.getElementById("forme-abstraite").style.width = 50 - eventData.tiltLR + '%';

        document.getElementById("forme-net").style.transition = '1.5s';
        document.getElementById("forme-abstraite").style.transition = '1.5s';

        window.resultats.setResult("q1", { res: eventData.tiltLR })
    }
}]

desktop_script = () => {

    window.q1animate = true

    /************************** 
    ****** FORME NET ****
    ***************************/


    var sceneFormeNet = new THREE.Scene();
    var cameraFormeNet = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 1000);

    var formeNet = document.getElementById('forme-net');

    var rendererFormeNet = new THREE.WebGLRenderer({
        alpha: true
    });
    rendererFormeNet.setSize(window.innerWidth, window.innerHeight);
    formeNet.appendChild(rendererFormeNet.domElement);

    var radiusFormeNet = 40;
    var segmentsFormeNet = 50;
    var ringsFormeNet = 30;

    var keyLightN = new THREE.DirectionalLight(0xf9f5d1, 1.0);
    keyLightN.position.set(0,0,100);

    var fillLightN = new THREE.DirectionalLight(0xf9f5d1, 1);
    fillLightN.position.set(0, 0, 0);

    sceneFormeNet.add(keyLightN);
    sceneFormeNet.add(fillLightN);


    var geometryFormeNet = new THREE.SphereGeometry(radiusFormeNet, segmentsFormeNet, ringsFormeNet);

    var materialFormeNet = new THREE.MeshLambertMaterial();

    var cubeFormeNet = new THREE.Mesh(geometryFormeNet, materialFormeNet);
    sceneFormeNet.add(cubeFormeNet);

    cameraFormeNet.position.z = 150;

    var renderFormeNet = function () {
        if (window.q1animate) {
            requestAnimationFrame(renderFormeNet);
        }
        rendererFormeNet.render(sceneFormeNet, cameraFormeNet);
    };
    renderFormeNet();


    /************************** 
    ****** FORME ABSTRAITE ****
    ***************************/

    var sceneFormeAbstraite = new THREE.Scene();
    var cameraFormeAbstraite = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var formeAbstraite = document.getElementById('forme-abstraite');

    var rendererFormeAbstraite = new THREE.WebGLRenderer({
        alpha: true
    });

    rendererFormeAbstraite.setSize(window.innerWidth, window.innerHeight);
    formeAbstraite.appendChild(rendererFormeAbstraite.domElement);
    cameraFormeAbstraite.position.z = 5;

    var keyLightA =  new THREE.DirectionalLight(0xf9f5d1, 1.0);
     keyLightA.position.set(0,0,100);
 
     var fillLightA =  new THREE.DirectionalLight(0xf9f5d1, 1.0);
     fillLightA.position.set(100, 0, -100).normalize();

     var backLightA =  new THREE.DirectionalLight(0xf9f5d1, 1.0);
     backLightA.position.set(100,0,-100).normalize();

     sceneFormeAbstraite.add(keyLightA);
     sceneFormeAbstraite.add(fillLightA);
     sceneFormeAbstraite.add(backLightA);

    var sphere_geometry = new THREE.SphereGeometry(1, 150, 150);
    var materialA = new THREE.MeshPhongMaterial();

    var sphere = new THREE.Mesh(sphere_geometry, materialA);
    sceneFormeAbstraite.add(sphere);

    var update = function () {
        var time = performance.now() * 0.001;
        var k = 3;
        for (var i = 0; i < sphere.geometry.vertices.length; i++) {
            var p = sphere.geometry.vertices[i];
            p.normalize().multiplyScalar(1 + 0.3 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
        }
        sphere.geometry.computeVertexNormals();
        sphere.geometry.normalsNeedUpdate = true;
        sphere.geometry.verticesNeedUpdate = true;
    }

    var animateq1 = () => {
        update();
        /* render scene and camera */
        rendererFormeAbstraite.render(sceneFormeAbstraite, cameraFormeAbstraite);
        if (window.q1animate){
            requestAnimationFrame(animateq1);
        }
    }

    requestAnimationFrame(animateq1);
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
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}
