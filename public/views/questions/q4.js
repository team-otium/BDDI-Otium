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
    <div class="object object2">Objet 2</div>
    <div class="object object3">Objet 3</div>
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
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var object;
    init();
    animate();

    function init() {
        container = document.getElementById('object1');
        camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 250;
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
            object.position.y = - 5;
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
        renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth / 3, window.innerHeight /3 );
    }
    function onDocumentMouseMove( event ) {
        mouseX = ( event.clientX - windowHalfX ) / 2;
        mouseY = ( event.clientY - windowHalfY ) / 2;
    }
    //
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;
        camera.lookAt( scene.position );
        renderer.render( scene, camera );
    }
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