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
    }

    function deviceOrientationHandler(eventData) {
        if (ValidationBtn.touch === false) {
            socket.emit("q7", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
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

    <div class="all_object">
        <div id="finalObject1" class="FinalObject"><div id="border1"></div></div>
        <div id="finalObject2" class="FinalObject"><div id="border2"></div></div>
        <div id="finalObject3" class="FinalObject"><div id="border3"></div></div>
    </div>

    <div class="text_center">
        <h1 class="question_desktop">Choisissez l'objet qui vous attire le plus</h1>
    </div>

    <div class="tuto"><img src="/both/assets/img/tuto-q4.gif"></div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["q7", (eventData) => {
    ball.velocity.y = Math.round(-eventData.tiltFB) / 2;
    ball.velocity.x = Math.round(eventData.tiltLR) / 2;

    if (ball.position.x <= window.innerWidth / 3 && ball.position.y <= window.innerHeight) {
        document.getElementById("border1").classList.add("border1")
    } else {
        document.getElementById("border1").classList.remove("border1")
    }

    if (ball.position.x > window.innerWidth / 3 && ball.position.x <= (window.innerWidth / 3) * 2 &&
        ball.position.y <= window.innerHeight) {
        document.getElementById("border2").classList.add("border2")
    } else {
        document.getElementById("border2").classList.remove("border2")
    }

    if (ball.position.x > (window.innerWidth / 3) * 2 && ball.position.x <= (window.innerWidth / 3) * 3 &&
        ball.position.y <= window.innerHeight) {
        document.getElementById("border3").classList.add("border3")
    } else {
        document.getElementById("border3").classList.remove("border3")
    }
}]

desktop_script = () => {

    /******************* 
     ****** BALL *******
     ********************/

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

    var sceneFinalObj1 = new THREE.Scene();
    var cameraFinalObj1 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / window.innerHeight, 0.1, 1000);
    var containerFinalObj1 = document.getElementById('finalObject1');

    var rendererFinalObj1 = new THREE.WebGLRenderer({
        alpha: true
    });

    rendererFinalObj1.setSize(window.innerWidth / 3, window.innerHeight);
    containerFinalObj1.appendChild(rendererFinalObj1.domElement);

    cameraFinalObj1.position.z = 10;
    cameraFinalObj1.position.x = 0;
    cameraFinalObj1.position.y = -0.5;

    var keyLightFinalObj1 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.9);
    keyLightFinalObj1.position.set(-100, 0, 100);

    var fillLightFinalObj1 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.1);
    fillLightFinalObj1.position.set(100, 0, -100).normalize();

    var backLightFinalObj1 = new THREE.DirectionalLight(0xffffff, 0.3);
    backLightFinalObj1.position.set(100, 0, -100).normalize();

    sceneFinalObj1.add(keyLightFinalObj1);
    sceneFinalObj1.add(fillLightFinalObj1);
    sceneFinalObj1.add(backLightFinalObj1);

    var objLoaderFinalObj1 = new THREE.OBJLoader();
    objLoaderFinalObj1.load('/both/assets/img/q7/organiques/tore_2.obj', function (finalObject1) {
        finalObject1.position.y = 0;
        finalObject1.position.x = 0;
        finalObject1.position.z = 0;

        sceneFinalObj1.add(finalObject1);
    })

    var animateFinalObj1 = function () {
        requestAnimationFrame(animateFinalObj1);

        sceneFinalObj1.rotation.y += 0.01;
        rendererFinalObj1.render(sceneFinalObj1, cameraFinalObj1);
    };

    animateFinalObj1();

    /******************* 
     ****** OBJET 2 ****
     ********************/

    var sceneFinalObj2 = new THREE.Scene();
    var cameraFinalObj2 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / window.innerHeight, 0.1, 1000);
    containerFinalObj2 = document.getElementById('finalObject2');

    var rendererFinalObj2 = new THREE.WebGLRenderer({
        alpha: true
    });

    rendererFinalObj2.setSize(window.innerWidth / 3, window.innerHeight);
    containerFinalObj2.appendChild(rendererFinalObj2.domElement);

    cameraFinalObj2.position.z = 20;
    cameraFinalObj2.position.x = 0;
    cameraFinalObj2.position.y = -1;

    var keyLightFinalObj2 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    keyLightFinalObj2.position.set(-100, 0, 100);

    var fillLightFinalObj2 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    fillLightFinalObj2.position.set(100, 0, -100).normalize();

    var backLightFinalObj2 = new THREE.DirectionalLight(0xffffff, 0.3);
    backLightFinalObj2.position.set(100, 0, -100).normalize();

    sceneFinalObj2.add(keyLightFinalObj2);
    sceneFinalObj2.add(fillLightFinalObj2);
    sceneFinalObj2.add(backLightFinalObj2);

    var objLoaderFinalObj2 = new THREE.OBJLoader();
    objLoaderFinalObj2.load('/both/assets/img/q7/organiques/sphere_1.obj', function (finalObject2) {
        finalObject2.position.y = 0;
        finalObject2.position.x = 0;
        finalObject2.position.z = 0;

        sceneFinalObj2.add(finalObject2);
    })

    var animateFinalObj2 = function () {
        requestAnimationFrame(animateFinalObj2);

        sceneFinalObj2.rotation.y += 0.01;

        rendererFinalObj2.render(sceneFinalObj2, cameraFinalObj2);
    };

    animateFinalObj2();

    /******************** 
     ****** OBJET 3 *****
     ********************/

    var sceneFinalObj3 = new THREE.Scene();
    var cameraFinalObj3 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / window.innerHeight, 0.1, 1000);
    containerFinalObj3 = document.getElementById('finalObject3');

    var rendererFinalObj3 = new THREE.WebGLRenderer({
        alpha: true
    });

    rendererFinalObj3.setSize(window.innerWidth / 3, window.innerHeight);
    containerFinalObj3.appendChild(rendererFinalObj3.domElement);

    cameraFinalObj3.position.z = 20;
    cameraFinalObj3.position.x = 0;
    cameraFinalObj3.position.y = -1;

    var keyLightFinalObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    keyLightFinalObj3.position.set(-100, 0, 100);

    var fillLightFinalObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    fillLightFinalObj3.position.set(100, 0, -100).normalize();

    var backLightFinalObj3 = new THREE.DirectionalLight(0xffffff, 0.3);
    backLightFinalObj3.position.set(100, 0, -100).normalize();

    sceneFinalObj3.add(keyLightFinalObj3);
    sceneFinalObj3.add(fillLightFinalObj3);
    sceneFinalObj3.add(backLightFinalObj3);

    var mtlLoaderFinalObj3 = new THREE.MTLLoader();
    mtlLoaderFinalObj3.load('/both/assets/img/q4/goutte.mtl', function (materials) {
        materials.preload();

        var objLoaderFinalObj3 = new THREE.OBJLoader();
        objLoaderFinalObj3.setMaterials(materials);
        objLoaderFinalObj3.load('/both/assets/img/q7/organiques/isocaedre_2.obj', function (finalObject3) {
            finalObject3.position.y = 0;
            finalObject3.position.x = 0;
            finalObject3.position.z = 0;

            sceneFinalObj3.add(finalObject3);
        })
    })

    var animateFinalObj3 = function () {
        requestAnimationFrame(animateFinalObj3);

        sceneFinalObj3.rotation.y += 0.01;

        rendererFinalObj3.render(sceneFinalObj3, cameraFinalObj3);
    };

    animateFinalObj3();

    /**************** 
     *** TIMELINE ***
     ****************/
    //document.querySelector('.q7').style.fill = "#ffffff"
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