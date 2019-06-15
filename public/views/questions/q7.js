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
    <div class="circleQ7"></div>
    <div id="selected1">
        <svg height="20" width="20">
            <circle class="selectedObjFinal" cx="8" cy="10" r="8" stroke="#000000" stroke-width="1" fill="transparent" fill-opacity="1" />
        </svg>
    </div>
 `

 var selectObjFinal = 0;

// All listeners, one variable per listener
mobile_listener1 = [".circleQ7", "click", () => {
    socket.emit("q7", "selectObjFinal")
    document.querySelector('.selectedObjFinal').style.fill = "#000000"

    document.querySelector(".circleQ7").style.display = "none"
    document.querySelector(".circle1").style.display = "block"
    document.querySelector(".circle2").style.display = "block"

}]

mobile_listener2 = ["selector", "type", () => {

}]

// Socket on

// Script to be executed when the page is displayed
mobile_script = () => {

    document.querySelector(".circle1").style.display = "none"
    document.querySelector(".circle2").style.display = "none"

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
    <div class="text_center">
        <h1 class="question_desktop">Choisissez l'objet qui vous attire le plus</h1>
    </div>

    <div class="contain">
        <div id="ball"></div>
        <div class="all_object">
        <div id="hoverFinal">
            <div class="blocHover"><div id="hoverFinalObj1"></div></div>
            <div class="blocHover"><div id="hoverFinalObj2"></div></div>
            <div class="blocHover"><div id="hoverFinalObj3"></div></div>
        </div>
            <div id="finalObject1" class="FinalObject"><div id="border1"></div></div>
            <div id="finalObject2" class="FinalObject"><div id="border2"></div></div>
            <div id="finalObject3" class="FinalObject"><div id="border3"></div></div>
        </div>
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

    if (eventData === "selectObjFinal" && ball.position.x <= window.innerWidth / 3 && ball.position.y <= window.innerHeight) {
        document.getElementById("hoverFinalObj1").style.opacity = "1"
    }

    if (eventData === "selectObjFinal" && ball.position.x > window.innerWidth / 3 && ball.position.x <= (window.innerWidth / 3) * 2 &&
        ball.position.y <= window.innerHeight) {
        document.getElementById("hoverFinalObj2").style.opacity = "1"
    } 

    if (eventData === "selectObjFinal" && ball.position.x > (window.innerWidth / 3) * 2 && ball.position.x <= (window.innerWidth / 3) * 3 &&
        ball.position.y <= window.innerHeight) {
        document.getElementById("hoverFinalObj3").style.opacity = "1"
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

    var keyLightFinalObj1 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 1);
    keyLightFinalObj1.position.set(-100, 0, 100);

    var fillLightFinalObj1 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.9);
    fillLightFinalObj1.position.set(100, 0, -100).normalize();

    var backLightFinalObj1 = new THREE.DirectionalLight(0xffffff, 0.3);
    backLightFinalObj1.position.set(100, 0, -100).normalize();

    sceneFinalObj1.add(keyLightFinalObj1);
    sceneFinalObj1.add(fillLightFinalObj1);
    sceneFinalObj1.add(backLightFinalObj1);

    // manager
    function loadModelFinalObj1() {
        finalObject1.traverse( function ( child ) {
            if ( child.isMesh ) child.material.map = textureFinalObj1;
    } );
        finalObject1.position.y = 0;
        finalObject1.position.x = 0;
        finalObject1.position.z = 0;
        sceneFinalObj1.add( finalObject1 );
    }
    var managerFinalObj1 = new THREE.LoadingManager( loadModelFinalObj1 );
    managerFinalObj1.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    // texture
    var textureLoaderFinalObj1 = new THREE.TextureLoader( managerFinalObj1 );
    var textureFinalObj1 = textureLoaderFinalObj1.load( '/both/assets/img/q5/texture_drap-6_NORMALES.jpg' );

    var objLoaderFinalObj1 = new THREE.OBJLoader(managerFinalObj1);
    objLoaderFinalObj1.load('/both/assets/img/q7/organiques/tore_2.obj', function (obj) {
        finalObject1 = obj;

        var animateFinalObj1 = function () {
            requestAnimationFrame(animateFinalObj1);
    
            if (window.getComputedStyle(document.getElementById("hoverFinalObj1")).getPropertyValue('opacity') == 1) {
                sceneFinalObj1.rotation.y += 0.01;
            } else {
                finalObject1.position.y = (Math.cos((Date.now()) * 0.001) * 0.01) + finalObject1.position.y;
            }
            
            rendererFinalObj1.render(sceneFinalObj1, cameraFinalObj1);
        };
    
        animateFinalObj1();
    })


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

    var keyLightFinalObj2 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 1);
    keyLightFinalObj2.position.set(-100, 0, 100);

    var fillLightFinalObj2 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 1);
    fillLightFinalObj2.position.set(100, 0, -100).normalize();

    var backLightFinalObj2 = new THREE.DirectionalLight(0xffffff, 0.3);
    backLightFinalObj2.position.set(100, 0, -100).normalize();

    sceneFinalObj2.add(keyLightFinalObj2);
    sceneFinalObj2.add(fillLightFinalObj2);
    sceneFinalObj2.add(backLightFinalObj2);

    // manager
    function loadModelFinalObj2() {
        finalObject2.traverse( function ( child ) {
            if ( child.isMesh ) child.material.map = textureFinalObj2;
        } );
        finalObject2.position.y = 0;
        finalObject2.position.x = 0;
        finalObject2.position.z = 0;
        sceneFinalObj2.add( finalObject2 );
    }

    var managerFinalObj2 = new THREE.LoadingManager( loadModelFinalObj2 );
    managerFinalObj2.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };
 
    // texture
    var textureLoaderFinalObj2 = new THREE.TextureLoader( managerFinalObj2 );
    var textureFinalObj2 = textureLoaderFinalObj2.load( '/both/assets/img/q5/texture_drap-9.jpg' );

    var objLoaderFinalObj2 = new THREE.OBJLoader(managerFinalObj2);
    objLoaderFinalObj2.load('/both/assets/img/q7/organiques/sphere_1.obj', function (obj) {
        finalObject2 = obj;
        
        var animateFinalObj2 = function () {
            requestAnimationFrame(animateFinalObj2);
    
            if (window.getComputedStyle(document.getElementById("hoverFinalObj2")).getPropertyValue('opacity') == 1) {
                sceneFinalObj2.rotation.y += 0.01;
            } else {
                finalObject2.position.y = (Math.cos((Date.now()) * 0.001) * 0.01) + finalObject2.position.y;
            }
            
            rendererFinalObj2.render(sceneFinalObj2, cameraFinalObj2);
        };
    
        animateFinalObj2();
    })


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

    var keyLightFinalObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 1);
    keyLightFinalObj3.position.set(-100, 0, 100);

    var fillLightFinalObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 1);
    fillLightFinalObj3.position.set(100, 0, -100).normalize();

    var backLightFinalObj3 = new THREE.DirectionalLight(0xffffff, 0.3);
    backLightFinalObj3.position.set(100, 0, -100).normalize();

    sceneFinalObj3.add(keyLightFinalObj3);
    sceneFinalObj3.add(fillLightFinalObj3);
    sceneFinalObj3.add(backLightFinalObj3);


    // manager
    function loadModelFinalObj3() {
        finalObject3.traverse( function ( child ) {
            if ( child.isMesh ) child.material.map = textureFinalObj3;
        } );

        finalObject3.position.y = 0;
        finalObject3.position.x = 0;
        finalObject3.position.z = 0;
        sceneFinalObj3.add( finalObject3 );
    }
    var managerFinalObj3 = new THREE.LoadingManager( loadModelFinalObj3 );
    managerFinalObj3.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    // texture
    var textureLoaderFinalObj3 = new THREE.TextureLoader( managerFinalObj3 );
    var textureFinalObj3 = textureLoaderFinalObj3.load( '/both/assets/img/q5/texture_drap-6.jpg' );


    var objLoaderFinalObj3 = new THREE.OBJLoader(managerFinalObj3);
    objLoaderFinalObj3.load('/both/assets/img/q7/organiques/isocaedre_2.obj', function (obj) {
        finalObject3 = obj;
        
        var animateFinalObj3 = function () {
            requestAnimationFrame(animateFinalObj3);
    
            if (window.getComputedStyle(document.getElementById("hoverFinalObj3")).getPropertyValue('opacity') == 1) {
                sceneFinalObj3.rotation.y += 0.01;
            } else {
                finalObject3.position.y = (Math.cos((Date.now()) * 0.001) * 0.01) + finalObject3.position.y;
            }
            
            rendererFinalObj3.render(sceneFinalObj3, cameraFinalObj3);
        };
    
        animateFinalObj3();
    })
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q7_mobile = {
    html: mobile_html,
    listeners: [mobile_listener1],
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