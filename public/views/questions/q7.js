/**************************  
**************************  QUESTION 7
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div class="text_center_mobile">
        <h1 class="question_mobile">Quel objet vous attire le plus ?</h1>
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
    document.querySelector(".circle1").style.display = "block"
    document.querySelector(".circle2").style.display = "block"
    
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q7
    ValidationBtn.nextPage = questions.q8
    ValidationBtn.actualQ = "7"
    ValidationBtn.nextQ = "8"

    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    } else {
        document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
    }

    function deviceOrientationHandler(eventData) {
        var tiltLR = eventData.gamma;
        var tiltFB = eventData.beta;
        var dir = eventData.alpha;

        socket.emit("q7", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
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
        <h1 class="question_desktop">Quel objet vous attire le plus ?</h1>
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
    document.getElementById("cursor").style.top = map(eventData.tiltFB, 0, 80, 0, window.innerHeight) + 'px';
    document.getElementById("cursor").style.left = y + 'px';

    window.renderers.forEach(
        el => { el.obj.position.y = 0 }
    );
    // RESULT
    if (y > 0 && y <= (window.innerWidth / 4)) window.renderers[0].obj.position.y = 2;
    if (y > (window.innerWidth / 4) && y <= (window.innerWidth / 4) * 2) window.renderers[1].obj.position.y = 2;
    if (y > (window.innerWidth / 4) * 2 && y <= (window.innerWidth / 4) * 3) window.renderers[2].obj.position.y = 2;
    if (y > (window.innerWidth / 4) * 3 && y <= (window.innerWidth / 4) * 4) window.renderers[3].obj.position.y = 2;

    window.resultats.setResult("q7", { res: eventData })
}]

desktop_script = () => {

    // INITIAL BACKGROUND
    document.getElementById('background_anim').innerHTML = ""

    VANTA.FOG({
        el: "#background_anim",
        highlightColor: 0xbbe9fd,
        midtoneColor: 0xbed2fe,
        lowlightColor: 0xfdeefd,
        baseColor: 0xfae9fe,
        blurFactor: 1.00,
        speed: 2.00,
        zoom: 0.20
    })


    window.renderers = []
    for (let i = 0; i < 4; i++) {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 4) / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth / 4, window.innerHeight);
        renderer.domElement.classList.add('q7_canvas')
        renderer.domElement.style.left = (25 * i) + "%"
        document.getElementById("q7").appendChild(renderer.domElement);
        let cube;

        new THREE.OBJLoader().load(
            // resource URL
            '/both/assets/3d/q7/forme3o.obj',
            // called when resource is loaded
            function(object) {
                cube = object
                cube.scale.x = 0.9
                cube.scale.y = 0.9
                cube.scale.z = 0.9
                scene.add(cube);
            },
            // called when loading is in progresses
            function(xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function(error) {

                console.log('An error happened');

            }
        );

        camera.position.z = 5;

        window.renderers.push({ scene: scene, camera: camera, renderer: renderer, obj: cube })
    }

    var animate = function() {
        requestAnimationFrame(animate);

        for (let i = 0; i < window.renderers.length; i++) {
            //window.renderers[i].obj.rotation.x += 0.01;
            // window.renderers[i].obj.rotation.y += 0.01;

            window.renderers[i].renderer.render(window.renderers[i].scene, window.renderers[i].camera);
        }
    };

    animate()

    /**************** 
     *** TIMELINE ***
     ****************/
    document.querySelector('.q7').style.fill = "#ffffff"
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