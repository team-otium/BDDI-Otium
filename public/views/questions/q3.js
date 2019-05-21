/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
   <div class="text_center_mobile">
      <h1 class="question_mobile">Modulez la ligne qui vous apaise</h1>
   </div>
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
    document.querySelector(".circle").style.display = "block"
    document.querySelector(".circleIn").style.display = "block"
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q3
    ValidationBtn.nextPage = questions.q4
    ValidationBtn.actualQ = "3"
    ValidationBtn.nextQ = "4"

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (eventData) {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha;

            if (ValidationBtn.touch === true) {
            } else {
                socket.emit("q3", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
            }
        })
    } else {
        alert("Sorry, your browser doesn't support Device Orientation");
    };
}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
 <table class="table table-striped table-bordered" style="position: absolute; z-index:50">
 <tr>
     <td>Tilt Left/Right [gamma]</td>
     <td id="doTiltLR"></td>
 </tr>
 <tr>
     <td>Tilt Front/Back [beta]</td>
     <td id="doTiltFB"></td>
 </tr>
 <tr>
     <td>Direction [alpha]</td>
     <td id="doDirection"></td>
 </tr>
 </table>
 <div class="text_center">
    <h1 class="question_desktop">Modulez la ligne qui vous apaise</h1>
 </div>

 <div id="line"></div>

 <div class="tuto"><img src="/both/assets/img/tuto-q3.gif"></div>
 `

desktop_socketOn1 = ["q3", (eventData) => {

    document.getElementById("doTiltLR").innerHTML = Math.round(eventData.tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(eventData.tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(eventData.dir);

    if (eventData.tiltFB >= 0 && eventData.tiltFB <= 75) {
        window.move = Math.round(eventData.tiltFB) / 75;
    }

}]

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_script = () => {

    var container = document.getElementById('line')

    var vertexHeight = 17000,
        planeDefinition = 190,
        planeSize = 700000,
        background = "#bed2fe",
        meshColor = "#ffffff";

    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 400000)
    camera.position.z = 15000;
    camera.position.y = 10000;

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(background, 1, 50000);

    var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
    var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
        color: meshColor,
    }));
    plane.rotation.x -= Math.PI * .45;

    scene.add(plane);

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(background, 1);

    container.appendChild(renderer.domElement);


    updatePlane();

    function updatePlane() {
        for (var i = 0; i < planeGeo.vertices.length; i++) {
            planeGeo.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
            planeGeo.vertices[i]._myZ = planeGeo.vertices[i].z
        }
    };

    render();

    var count = 0
    function render() {
        requestAnimationFrame(render);

        for (var i = 0; i < planeGeo.vertices.length; i++) {
            var z = +planeGeo.vertices[i].z;
            planeGeo.vertices[i].z = Math.sin((i + count * 0.00001)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ * window.move))
            plane.geometry.verticesNeedUpdate = true;

            count += 0.02
        }

        renderer.render(scene, camera);
    }


    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        //changes the size of the canavs and updates it
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**************** 
     *** TIMELINE ***
     ****************/
    document.querySelector('.q3').style.fill = "#ffffff"
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q3_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

q3_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}
