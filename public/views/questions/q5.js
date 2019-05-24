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
    let q5_actual_texture
    let q5_textures = [

    ]
    for (let i = 1; i <= 15; i++) {
        q5_textures.push(new THREE.TextureLoader().load('/both/assets/textures/q5/texture_drap-'+i+'.jpg'))
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 1000);

    var container = document.getElementById('drap');

	var vertexHeight = 15000,
		planeDefinition = 100,
		planeSize = 300000,
		totalObjects = 1,
        background = "#ffffff",
		meshColor = "#005e97"; 

	var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
	camera.position.z = 100000;
	camera.position.y = 10000;

	var scene = new THREE.Scene();
	scene.fog = new THREE.Fog(background, 1, 300000);

    var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
	var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
		color: meshColor,
	
	}));
	plane.rotation.x -= Math.PI * .1;
	plane.rotation.z -= Math.PI * .4;

	scene.add(plane);

	var renderer = new THREE.WebGLRenderer({alpha: false});
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
    var x = camera.position.x;
    var z = camera.position.z;
    camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
    camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
    camera.lookAt(new THREE.Vector3(0, 8000, 0))

    for (var i = 0; i < planeGeo.vertices.length; i++) {
        var z = +planeGeo.vertices[i].z;
        planeGeo.vertices[i].z = Math.sin(( i + count * 0.00002)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ* 0.6))
        plane.geometry.verticesNeedUpdate = true;
  
        count += 0.2
    }

		renderer.render(scene, camera);
	}




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
