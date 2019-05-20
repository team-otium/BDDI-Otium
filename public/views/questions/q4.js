/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div class="text_center_mobile">
        <h1 class="question_mobile">Choisissez les éléments qui vous apaisent</h1>
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
    ValidationBtn.actualPage = questions.q4
    ValidationBtn.nextPage = questions.q5
    ValidationBtn.actualQ = "4"
    ValidationBtn.nextQ = "5"

    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    }

    function deviceOrientationHandler(eventData) {
        if (ValidationBtn.touch === true) {} else {
            socket.emit("q4", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
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
    <div id="ball"></div>

    <div id="all_object">
        <div id="object1" class="object"><div id="border1"></div></div>
        <div id="object2" class="object"><div id="border2"></div></div>
        <div id="object3" class="object"><div id="border3"></div></div>
        <div id="object4" class="object"></div>
        <div id="object5" class="object"></div>
    </div>

    <div class="text_center">
        <h1 class="question_desktop">Choisissez les éléments qui vous apaisent</h1>
    </div>
 `

desktop_socketOn1 = ["q4", (eventData) => {

    ball.velocity.y = Math.round(-eventData.tiltFB) / 2;
    ball.velocity.x = Math.round(eventData.tiltLR) / 2;

    if (ball.position.x <= window.innerWidth / 3 && ball.position.y <= window.innerHeight / 2) {
        document.getElementById("border1").classList.add("border1")
    } else {
        document.getElementById("border1").classList.remove("border1")
    }

    if (ball.position.x > window.innerWidth / 3 && ball.position.x <= (window.innerWidth / 3) * 2 &&
        ball.position.y <= window.innerHeight / 2) {
        document.getElementById("border2").classList.add("border2")
    } else {
        document.getElementById("border2").classList.remove("border2")
    }

    if (ball.position.x > (window.innerWidth / 3) * 2 && ball.position.x <= (window.innerWidth / 3) * 3 &&
        ball.position.y <= window.innerHeight / 2) {
        document.getElementById("border3").classList.add("border3")
    } else {
        document.getElementById("border3").classList.remove("border3")
    }
}]

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_script = () => {

    function start() {
        ball = document.getElementById("ball");
        w = window.innerWidth;
        h = window.innerHeight;
        ball.style.left = (w / 2) - 50 + "px";
        ball.style.top = (h / 2) - 50 + "px";
        ball.velocity = { x: 0, y: 0 }
        ball.position = { x: 0, y: 0 }
        update();
    }

    function update() {
        ball.position.x += ball.velocity.x;
        ball.position.y += ball.velocity.y;
        if (ball.position.x > (w - 100) && ball.velocity.x > 0) {
            ball.position.x = w - 100;
        }
        if (ball.position.x < 0 && ball.velocity.x < 0) {
            ball.position.x = 0;
        }
        if (ball.position.y > (h - 100) && ball.velocity.y > 0) {
            ball.position.y = h - 100;
        }
        if (ball.position.y < 0 && ball.velocity.y < 0) {
            ball.position.y = 0;
        }
        ball.style.top = ball.position.y + "px"
        ball.style.left = ball.position.x + "px"
        requestAnimationFrame(update);
    }

    start()

    /******************* 
     ****** OBJET 1 ****
     ********************/

     var scene = new THREE.Scene();
     var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
     var container = document.getElementById('all_object');

     var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
     renderer.setSize(window.innerWidth, window.innerHeight);
     container.appendChild(renderer.domElement);

     var geometry = new THREE.BoxGeometry(1,1,1);
     var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

     camera.position.z = 500;
     camera.position.x = 220;
     camera.position.y = -100;


     var controls = new THREE.OrbitControls(camera, renderer.domElement);
     controls.enableDamping = true;
     controls.campingFactor = 0.25;
     controls.enableZoom = true;

     var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
     keyLight.position.set(-100,0,100);

     var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
     fillLight.position.set(100, 0, -100).normalize();

     var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
     backLight.position.set(100,0,-100).normalize();

     scene.add(keyLight);
     scene.add(fillLight);
     scene.add(backLight);

     var mtlLoaderObj1 = new THREE.MTLLoader();
     mtlLoaderObj1.setTexturePath('/both/assets/img/q4/');
     mtlLoaderObj1.setPath('/both/assets/img/q4/');
     mtlLoaderObj1.load('bulles_eau_2.mtl', function(materials) {
         materials.preload();

         var objLoaderObj1 = new THREE.OBJLoader();
         objLoaderObj1.setMaterials(materials);
         objLoaderObj1.setPath('/both/assets/img/q4/');
         objLoaderObj1.load('bulles_eau_2.obj', function(object){
             object.position.y = 60;
             object.position.x = 0;
             object.position.z = 0;

             scene.add(object);
         })
     })

     var mtlLoaderObj4 = new THREE.MTLLoader();
     mtlLoaderObj4.setTexturePath('/both/assets/img/q4/');
     mtlLoaderObj4.setPath('/both/assets/img/q4/');
     mtlLoaderObj4.load('montagnes_seules.mtl', function(materials) {
         materials.preload();

         var objLoaderObj4 = new THREE.OBJLoader();
         objLoaderObj4.setMaterials(materials);
         objLoaderObj4.setPath('/both/assets/img/q4/');
         objLoaderObj4.load('montagnes_s300.obj', function(object){
             object.position.y = -250;
             object.position.x = -100;
             object.position.z = 10;

             scene.add(object);
         })
     })

     var animate = function () {
         requestAnimationFrame(animate);

         controls.update();

         renderer.render(scene, camera);
     };

     animate();



    /**************** 
     *** TIMELINE ***
     ****************/
    //document.querySelector('.q4').style.fill = "#ffffff"
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q4_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

q4_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}