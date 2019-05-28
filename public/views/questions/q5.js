/**************************  
**************************  QUESTION 5
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
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
    document.querySelector(".circle1").style.display = "block"
    document.querySelector(".circle2").style.display = "block"
    document.querySelector(".circle-menu").style.display = "block"
    document.querySelector(".firstMenu").style.display = "none"
    
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
    <div id="drap" style="position: absolute; z-index:"></div>
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


    var container = document.getElementById('drap')

	var vertexHeight = 15000,
		planeDefinition = 100,
		planeSize = 120000,
		totalObjects = 1,
		meshColor = "#005e97"; 

	var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
	camera.position.z = 11000;
	camera.position.y = 11000;

	var scene = new THREE.Scene();
    

	var texture = new THREE.TextureLoader().load( "/both/assets/textures/q5/texture_drap-7_NORMALES.jpg" );

    var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);

	var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
        map: texture
    }));
    

	plane.rotation.x -= Math.PI * .4;

	scene.add(plane);

	var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
	renderer.setSize(window.innerWidth, window.innerHeight);

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
    // camera.position.z -= 150;
    // var x = camera.position.x;
    // var z = camera.position.z;
    // camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
    // camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
    camera.lookAt(new THREE.Vector3(0, 5000, 0))

    for (var i = 0; i < planeGeo.vertices.length; i++) {
      var z = +planeGeo.vertices[i].z;
      planeGeo.vertices[i].z = Math.sin(( i + count * 0.00003)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ* 0.94))
      plane.geometry.verticesNeedUpdate = true;

      count += 0.15
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
    document.querySelector('.q5').style.fill = "#ffffff"

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
