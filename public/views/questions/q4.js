/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
 <div id="ball"></div>
 <table class="table table-striped table-bordered">
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
 <h1>Question 4</h1>
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

    var ball;
    var w;
    var h;

    function start() {
        ball = document.getElementById("ball");
        w = window.innerWidth;
        h = window.innerHeight;

        ball.style.left = (w / 2) - 50 + "px";
        ball.style.top = (h / 2) - 50 + "px";
        ball.velocity = { x: 0, y: 0 }
        ball.position = { x: 0, y: 0 }

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function (eventData) {
                var tiltLR = eventData.gamma;
                var tiltFB = eventData.beta;
                var dir = eventData.alpha;

                ball.velocity.y = Math.round(-tiltFB)/2;
                ball.velocity.x = Math.round(tiltLR)/2;

                document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
                document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
                document.getElementById("doDirection").innerHTML = Math.round(dir);

                socket.emit("q4", {tiltFB:eventData.beta, tiltLR:eventData.gamma, dir:eventData.alpha});
            })
        }
        else {
            alert("Sorry, your browser doesn't support Device Orientation");
        };

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

        requestAnimationFrame(update);//KEEP ANIMATING
    }

    start()
}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
 <div id="ball"></div>
 <table class="table table-striped table-bordered">
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
 <div id="all_object">
    <div id="object1" class="object object1"></div>
    <div id="object2" class="object object2"></div>
    <div id="object3" class="object object3">Objet 3</div>
    <div class="object object4">Objet 4</div>
    <div class="object object5">Objet 5</div>
    <div class="object object6">Objet 6</div>
 </div>
 <div class="text_center">
    <h1>Choisissez les éléments qui vous apaisent</h1>
 </div>
 `

desktop_socketOn1 = ["q4", (eventData) => {

    ball.velocity.y = Math.round(-eventData.tiltFB)/2;
    ball.velocity.x = Math.round(eventData.tiltLR)/2;

    document.getElementById("doTiltLR").innerHTML = Math.round(eventData.tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(eventData.tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(eventData.dir);
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

        requestAnimationFrame(update);//KEEP ANIMATING
    }

    start()

    /**************** OBJECT1 3D ****************/
    var container;
    var camera, scene, renderer;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = 450;
    var windowHalfY = 400;
    var object;
    init();
    animate();

    function init() {
        container = document.getElementById('object1');
        camera = new THREE.PerspectiveCamera( 80, 450 / 400, 10, 2000 );
        camera.position.z = 240;
        // scene
        scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.6 );
        scene.add( ambientLight );
        var pointLight = new THREE.PointLight( 0xffffff, 0.6 );
        camera.add( pointLight );
        scene.add( camera );
        // manager
        function loadModel() {
            object.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = texture;
            } );
            object.position.y = - 3;
            scene.add( object );
        }
        var manager = new THREE.LoadingManager( loadModel );
        manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        // texture
        var textureLoader = new THREE.TextureLoader( manager );
        var texture = textureLoader.load( '/both/assets/img/q4/fond_bleu.png' );
        // model
        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }
        function onError() {}
        var loader = new THREE.OBJLoader( manager );
        loader.load( '/both/assets/img/q4/bulles_eau_2.obj', function ( obj ) {
            object = obj;
        }, onProgress, onError );
        //
        renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( 450, 400 );
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        windowHalfX = 450;
        windowHalfY = 400;
        camera.aspect = 450 / 400;
        camera.updateProjectionMatrix();
        renderer.setSize( 450, 400 );
    }
    function onDocumentMouseMove( event ) {
        mouseX = ( event.clientX - windowHalfX ) / 10;
        mouseY = ( event.clientY - windowHalfY ) / 6;
    }
    //
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
        camera.position.x += ( mouseX - camera.position.x ) * .03;
        camera.position.y += ( - mouseY - camera.position.y ) * .03;
        camera.lookAt( scene.position );
        renderer.render( scene, camera );
    }
    /**************** FIN OBJECT1 3D ****************/


    
    /**************** OBJECT2 3D ****************/
    var containerObj2;
    var cameraObj2, sceneObj2, rendererObj2;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = 450;
    var windowHalfY = 400;
    var objectObj2;
    initObj2();
    animateObj2();

    function initObj2() {
        containerObj2 = document.getElementById('object2');
        cameraObj2 = new THREE.PerspectiveCamera( 90, 300 / 450, 10, 2000 );
        cameraObj2.position.z = 240;
        // scene
        sceneObj2 = new THREE.Scene();
        var ambientLightObj2 = new THREE.AmbientLight( 0xcccccc, 0.6 );
        sceneObj2.add( ambientLightObj2 );
        var pointLightobj2 = new THREE.PointLight( 0xffffff, 0.6 );
        cameraObj2.add( pointLightobj2 );
        sceneObj2.add( cameraObj2 );
        // manager
        function loadModelObj2() {
            objectObj2.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = textureObj2;
            } );
            objectObj2.position.y = - 190;
            objectObj2.position.x = - 25;
            sceneObj2.add( objectObj2 );
        }
        var managerObj2 = new THREE.LoadingManager( loadModelObj2 );
        managerObj2.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        // texture
        var textureLoaderObj2 = new THREE.TextureLoader( managerObj2 );
        var textureObj2 = textureLoaderObj2.load( '/both/assets/img/q4/fond_vert.png' );
        // model
        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }
        function onError() {}
        var loaderObj2 = new THREE.OBJLoader( managerObj2 );
        loaderObj2.load( '/both/assets/img/q4/feuilles.obj', function ( obj ) {
            objectObj2 = obj;
        }, onProgress, onError );
        //
        rendererObj2 = new THREE.WebGLRenderer({
            alpha: true
        });
        rendererObj2.setPixelRatio( window.devicePixelRatio );
        rendererObj2.setSize( 300, 450 );
        containerObj2.appendChild( rendererObj2.domElement );

        //
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        windowHalfX = 300;
        windowHalfY = 450;
        cameraObj2.aspect = 300 / 450;
        cameraObj2.updateProjectionMatrix();
        rendererObj2.setSize( 300, 420 );
    }

    //
    function animateObj2() {
        requestAnimationFrame( animateObj2 );
        renderObj2();
    }
    function renderObj2() {
        cameraObj2.position.x += ( ball.position.y - cameraObj2.position.x ) * .03;
        cameraObj2.position.y += ( - ball.position.x - cameraObj2.position.y ) * .03;
        cameraObj2.lookAt( sceneObj2.position );
        rendererObj2.render( sceneObj2, cameraObj2 );
    }
        /**************** FIN OBJECT2 3D ****************/

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