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
        <div id="object4" class="object"><div id="border4">

        </div></div>
        <div id="object5" class="object"></div>
    </div>

    <div class="text_center">
        <h1 class="question_desktop">Choisissez les éléments qui vous apaisent</h1>
    </div>

    <div class="tuto"><img src="/both/assets/img/tuto-q4.gif"></div>
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

     var sceneObj1 = new THREE.Scene();
     var cameraObj1 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
     var containerObj1 = document.getElementById('object1');

     var rendererObj1 = new THREE.WebGLRenderer({
        alpha: true
    });

     rendererObj1.setSize(window.innerWidth / 3, window.innerHeight / 2);
     containerObj1.appendChild(rendererObj1.domElement);

     cameraObj1.position.z = 500;
     cameraObj1.position.x = 0;
     cameraObj1.position.y = 0;

     var keyLightObj1 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.5);
     keyLightObj1.position.set(-100,0,100);
 
     var fillLightObj1 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.5);
     fillLightObj1.position.set(100, 0, -100).normalize();

     var backLightObj1 = new THREE.DirectionalLight(0xffffff, 1.0);
     backLightObj1.position.set(100,0,-100).normalize();

     sceneObj1.add(keyLightObj1);
     sceneObj1.add(fillLightObj1);
     sceneObj1.add(backLightObj1);

     var mtlLoaderObj1 = new THREE.MTLLoader();
     mtlLoaderObj1.load('/both/assets/img/q4/bulles_eau_2.mtl', function(materials) {
         materials.preload();

         var objLoaderObj1 = new THREE.OBJLoader();
         objLoaderObj1.setMaterials(materials);
         objLoaderObj1.load('/both/assets/img/q4/bulles_eau_2.obj', function(object){
             object.position.y = -10;
             object.position.x = 20;
             object.position.z = 0;

             sceneObj1.add(object);
         })
     })

     var animateObj1 = function () {
         requestAnimationFrame(animateObj1);

         rendererObj1.render(sceneObj1, cameraObj1);
     };

     animateObj1();

    /******************* 
     ****** OBJET 2 ****
     ********************/

    var sceneObj2 = new THREE.Scene();
    var cameraObj2 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
        containerObj2 = document.getElementById('object2');

    var rendererObj2 = new THREE.WebGLRenderer({
       alpha: true
   });
   
    rendererObj2.setSize(window.innerWidth / 3, window.innerHeight / 2);
    containerObj2.appendChild(rendererObj2.domElement);

    cameraObj2.position.z = 500;
    cameraObj2.position.x = 0;
    cameraObj2.position.y = 0;

    var keyLightObj2 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    keyLightObj2.position.set(-100,0,100);

    var fillLightObj2 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    fillLightObj2.position.set(100, 0, -100).normalize();

    var backLightObj2 = new THREE.DirectionalLight(0xffffff, 1.0);
    backLightObj2.position.set(100,0,-100).normalize();

    sceneObj2.add(keyLightObj2);
    sceneObj2.add(fillLightObj2);
    sceneObj2.add(backLightObj2);

    var mtlLoaderObj2 = new THREE.MTLLoader();
    mtlLoaderObj2.load('/both/assets/img/q4/feuilles.mtl', function(materials) {
        materials.preload();

        var objLoaderObj2 = new THREE.OBJLoader();
        objLoaderObj2.setMaterials(materials);
        objLoaderObj2.load('/both/assets/img/q4/feuilles.obj', function(object){
            object.position.y = -180;
            object.position.x = -50;
            object.position.z = 20;

            sceneObj2.add(object);
        })
    })

    var animateObj2 = function () {
        requestAnimationFrame(animateObj2);

        rendererObj2.render(sceneObj2, cameraObj2);
    };

    animateObj2();

    /******************** 
     ****** OBJET 3 *****
     ********************/

    var sceneObj3 = new THREE.Scene();
    var cameraObj3 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
        containerObj3 = document.getElementById('object3');

    var rendererObj3 = new THREE.WebGLRenderer({
       alpha: true
   });
   
    rendererObj3.setSize(window.innerWidth / 3, window.innerHeight / 2);
    containerObj3.appendChild(rendererObj3.domElement);

    cameraObj3.position.z = 500;
    cameraObj3.position.x = 0;
    cameraObj3.position.y = 0;

    var keyLightObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    keyLightObj3.position.set(-100,0,100);

    var fillLightObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    fillLightObj3.position.set(100, 0, -100).normalize();

    var backLightObj3 = new THREE.DirectionalLight(0xffffff, 1.0);
    backLightObj3.position.set(100,0,-100).normalize();

    sceneObj3.add(keyLightObj3);
    sceneObj3.add(fillLightObj3);
    sceneObj3.add(backLightObj3);

    var mtlLoaderObj3 = new THREE.MTLLoader();
    mtlLoaderObj3.load('/both/assets/img/q4/goutte.mtl', function(materials) {
        materials.preload();

        var objLoaderObj3 = new THREE.OBJLoader();
        objLoaderObj3.setMaterials(materials);
        objLoaderObj3.load('/both/assets/img/q4/goutte.obj', function(object){
            object.position.y = 0;
            object.position.x = 0;
            object.position.z = 100;

            sceneObj3.add(object);
        })
    })

    var animateObj3 = function () {
        requestAnimationFrame(animateObj3);

        rendererObj3.render(sceneObj3, cameraObj3);
    };

    animateObj3();

    /******************** 
     ****** OBJET 4 *****
     ********************/

    var sceneObj4 = new THREE.Scene();
    var cameraObj4 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
        containerObj4 = document.getElementById('object4');


    var rendererObj4 = new THREE.WebGLRenderer({
       alpha: true
   });



    var geometrytest = new THREE.PlaneGeometry( 200, 50, 2 );
    var texturetest = new THREE.TextureLoader().load( '/both/assets/img/q4/nuage2.png' );
    texturetest.repeat.set( 1, 1 );
    var materialtest = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.99,
        map: texturetest,
        transparent: true,
        side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh( geometrytest, materialtest );

    plane.position.y = -50;
    plane.position.x = 0;
    plane.position.z = 250;

    


    rendererObj4.setSize(window.innerWidth / 3, window.innerHeight / 2);
    containerObj4.appendChild(rendererObj4.domElement);

    cameraObj4.position.z = 400;
    cameraObj4.position.x = 0;
    cameraObj4.position.y = 0;

    var keyLightObj4 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    keyLightObj4.position.set(-100,0,100);

    var fillLightObj4 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    fillLightObj4.position.set(100, 0, -100).normalize();

    var backLightObj4 = new THREE.DirectionalLight(0xffffff, 1.0);
    backLightObj4.position.set(100,0,-100).normalize();

    sceneObj4.add(keyLightObj4);
    sceneObj4.add(fillLightObj4);
    sceneObj4.add(backLightObj4);

    var mtlLoaderObj4 = new THREE.MTLLoader();
    mtlLoaderObj4.load('/both/assets/img/q4/montagnes_seules.mtl', function(materials) {
        materials.preload();

        var objLoaderObj4 = new THREE.OBJLoader();
        objLoaderObj4.setMaterials(materials);
        objLoaderObj4.load('/both/assets/img/q4/montagnes_s300.obj', function(object){
            object.position.y = -20;
            object.position.x = 150;
            object.position.z = -100;

            object.rotation.y = 1;
            object.rotation.x = 0.1;

            sceneObj4.add(object);
        })
    })

    sceneObj4.add(plane);

    var animateObj4 = function () {
        requestAnimationFrame(animateObj4);

        rendererObj4.render(sceneObj4, cameraObj4);
    };

    animateObj4();




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