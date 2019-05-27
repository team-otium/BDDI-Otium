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
 `

// All listeners, one variable per listener
mobile_listener1 = ["#q2_target", "touchstart", (e) => {
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
}]
/** And more... */

// Socket on

// Script to be executed when the page is displayed
mobile_script = () => {
    document.querySelector(".circle").style.display = "block"
    document.querySelector(".circleIn").style.display = "block"
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
    <div id="drap" style="position: absolute; z-index: 50"></div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["q5_doigt", (data) => {
    if (data === "haut") {
        q5_actual_texture++
        if (q5_actual_texture > q5_textures.length - 1) q5_actual_texture = 0
    } else if (data === "bas") {
        q5_actual_texture--
        if (q5_actual_texture < 0) q5_actual_texture = q5_textures.length - 1
    }
}]

desktop_script = () => {
    // let q5_actual_texture
    // let q5_textures = [

    // ]
    // for (let i = 1; i <= 15; i++) {
    //     q5_textures.push(new THREE.TextureLoader().load('/both/assets/textures/q5/texture_drap-'+i+'.jpg'))
    // }

    var scene = new THREE.Scene();

    var W = window.innerWidth;
    var H = window.innerHeight;
    
    var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(W, H);
    
    var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 10000);

    var planeGeometry = new THREE.PlaneGeometry(600, 200, 200, 100);
    var texture = new THREE.TextureLoader().load( '/both/assets/textures/q5/texture_drap-10_NORMALES.jpg' );
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });

    
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );

    plane.rotation.x = -0.01 * Math.PI;
    
    plane.position.set(0, 0, 0);
    
    scene.add(plane);


    planeGeometry.computeFaceNormals();
    planeGeometry.computeVertexNormals();


    camera.position.set(0, 0, 150);
    camera.lookAt(scene.position);

    var container = document.getElementById('drap');
    
    container.appendChild(renderer.domElement);
    
    (function drawFrame(ts){
      var center = new THREE.Vector2(0,0);
      window.requestAnimationFrame(drawFrame);
      var vLength = plane.geometry.vertices.length;
      for (var i = 0; i < vLength; i++) {
        var v = plane.geometry.vertices[i];
        var dist = new THREE.Vector2(v.x, v.y);
        var size = 4.0;
        var magnitude = 6;
        v.z = Math.random(dist.length()/-size + (ts/200)) * magnitude;
      }
      plane.geometry.verticesNeedUpdate = true;
      renderer.render(scene, camera);
    }());


    /**************** 
     *** TIMELINE ***
     ****************/
    //document.querySelector('.q5').style.fill = "#ffffff"

}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q5_mobile = {
    html: mobile_html,
    listeners: [mobile_listener1, mobile_listener2, mobile_listener3],
    socketOn: [],
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