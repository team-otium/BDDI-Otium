/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div id="q2_target"></div>
    <div class="text_center_mobile">
        <h1 class="question_mobile">Choisissez un aspect</h1>
    </div>
    <div class="buttonTexture">
        <button class="q5btn" id="q5Moins"></button>
        <p><span class="incrementNumber"></span>/15</p>
        <button class="q5btn" id="q5Plus"></button>
    </div>
 `

// All listeners, one variable per listener
mobile_listener1 = ["#q5Plus", "click", (e) => {
    socket.emit("q5", "haut")
}]
mobile_listener2 = ["#q5Moins", "click", (e) => {
    socket.emit("q5", "bas")
}]

mobile_socketOn1 = ["q5-2", (data) => {
    console.log(data)
    document.querySelector('.incrementNumber').innerHTML = data
}]

/*mobile_listener1 = ["#q2_target", "touchstart", (e) => {
    if (e.touches.length === 1) {
        scaling = true;
        //pinchStart(e);
        start_move = { x: e.touches[0].pageX, y: e.touches[0].pageY }
    }
}]

mobile_listener2 = ["#q2_target", "touchmove", (e) => {
    if (scaling) {
        //pinchMove(e);
        act_move = { x: e.touches[0].pageX, y: e.touches[0].pageY }
    }
}]

mobile_listener3 = ["#q2_target", "touchend", (e) => {
    if (scaling) {
        //pinchEnd(e);
        console.log(act_move.y - start_move.y)
        if (act_move.y - start_move.y < 0) {
            console.log("haut")
            socket.emit("q5_doigt", "haut")
        } else if (act_move.y - start_move.y > 0) {
            console.log("bas")
            socket.emit("q5_doigt", "bas")
        }
        scaling = false;
    }
}]*/
/** And more... */

// Socket on

// Script to be executed when the page is displayed
mobile_script = () => {
    document.querySelector(".circle1").style.display = "block"
    document.querySelector(".circle2").style.display = "block"
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q5
    ValidationBtn.nextPage = questions.q6
    ValidationBtn.actualQ = "5"
    ValidationBtn.nextQ = "6"

    let scaling = false
    let start_move = []
    let act_move = []
}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
    <div class="text_center">
        <h1 class="question_desktop">Choisissez un aspect</h1>
    </div>

    <div id="textureMap"></div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["q5", (data) => {
    if (data === "haut") {
        window.q5_actual_texture++
        if (window.q5_actual_texture > window.q5_textures.length - 1) window.q5_actual_texture = 0
    } else if (data === "bas") {
        window.q5_actual_texture--
        if (window.q5_actual_texture < 0) window.q5_actual_texture = window.q5_textures.length - 1
    }
    window.sceneq5.remove(window.planeq5);
    createPlane()
}]

desktop_script = () => {
    window.q5animate = true

    window.q5_actual_texture = 0
    window.q5_textures = [

    ]
    for (let i = 1; i <= 15; i++) {
        window.q5_textures.push(new THREE.TextureLoader().load('/both/assets/img/q5/final_texture/texture_drap-'+i+'.jpg'))
    }

    socket.emit("q5-2", window.q5_actual_texture);
    
    window.sceneq5 = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var simplex = new SimplexNoise()

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.getElementById('textureMap')
    renderer.domElement.style.position = "absolute"
    container.appendChild(renderer.domElement);

    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 15);
    window.sceneq5.add(light);

    var geometry, material, plane
    window.createPlane = ()=>{
        window.geometryq5 = new THREE.PlaneGeometry( 200, 200, 200, 200 );
        window.materialq5 = new THREE.MeshLambertMaterial({ map: q5_textures[window.q5_actual_texture], side: THREE.DoubleSide, wireframe: false });
        window.planeq5 = new THREE.Mesh(window.geometryq5, window.materialq5);
        window.sceneq5.add(window.planeq5);
        window.planeq5.rotation.z = Math.PI / 6
        window.planeq5.rotation.x = - Math.PI / 12
      }

      window.createPlane()

    camera.position.z = 5;

    var animate = function () {
        if (window.q5animate) {
            requestAnimationFrame(animate);
        }

        for (var i = 0; i < window.geometryq5.vertices.length; i++) {
            var z = (i + Date.now() * 1/100000)
            window.geometryq5.vertices[i].z = simplex.noise4D(z,z,z,z) * 2
            window.planeq5.geometry.verticesNeedUpdate = true;
          }

        renderer.render(window.sceneq5, camera);
    };

    animate();

}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q5_mobile = {
    html: mobile_html,
    listeners: [mobile_listener1, mobile_listener2],
    socketOn: [mobile_socketOn1],
    script: mobile_script,
    transitions: mobile_transition,
}

q5_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}
