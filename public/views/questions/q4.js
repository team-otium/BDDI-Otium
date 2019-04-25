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

                ball.velocity.y = Math.round(-tiltFB) / 2;
                ball.velocity.x = Math.round(tiltLR) / 2;

                document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
                document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
                document.getElementById("doDirection").innerHTML = Math.round(dir);

                socket.emit("q4", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
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
    <div id="object1" class="object"></div>
    <div id="object2" class="object"></div>
    <div id="object3" class="object"></div>
    <canvas id="object4" class="object"></canvas>
    <div class="object object5">Objet 5</div>
    <div class="object object6">Objet 6</div>
 </div>
 <div class="text_center">
    <h1>Choisissez les éléments qui vous apaisent</h1>
 </div>
 `

desktop_socketOn1 = ["q4", (eventData) => {

    ball.velocity.y = Math.round(-eventData.tiltFB) / 2;
    ball.velocity.x = Math.round(eventData.tiltLR) / 2;

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
    var windowHalfX = window.innerWidth / 3;
    var windowHalfY = window.innerHeight / 2;
    var object;
    init();
    animate();

    function init() {
        container = document.getElementById('object1');
        camera = new THREE.PerspectiveCamera(80, (window.innerWidth / 3) / (window.innerHeight / 2), 10, 2000);
        camera.position.z = 350;


        // scene
        scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
        scene.add(ambientLight);
        var pointLight = new THREE.PointLight(0xffffff, 0.6);
        camera.add(pointLight);
        scene.add(camera);


        // manager
        function loadModel() {
            object.traverse(function (child) {
                if (child.isMesh) child.material.map = texture;
            });
            object.position.y = - 3;
            scene.add(object);
        }
        var manager = new THREE.LoadingManager(loadModel);
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };


        // model
        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }


        // texture
        var textureLoader = new THREE.TextureLoader(manager);
        var texture = textureLoader.load('/both/assets/img/q4/fond_bleu.png');


        function onError() { }


        var loader = new THREE.OBJLoader(manager);
        loader.load('/both/assets/img/q4/bulles_eau_2.obj', function (obj) {
            object = obj;
        }, onProgress, onError);


        renderer = new THREE.WebGLRenderer({
            alpha: true
        });


        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth / 3, window.innerHeight / 2);
        container.appendChild(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        window.addEventListener('resize', onWindowResize, false);
    }


    function onWindowResize() {
        windowHalfX = window.innerWidth / 3;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(450, 400);
    }


    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 3;
        mouseY = (event.clientY - windowHalfY) / 2;
    }



    function animate() {
        requestAnimationFrame(animate);
        render();
    }


    function render() {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (- mouseY - camera.position.y) * .05;
        camera.position.y += (ball.position.y - camera.position.y) * .03;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    /**************** FIN OBJECT1 3D ****************/



    /**************** OBJECT2 3D ****************/
    var containerObj2;
    var cameraObj2, sceneObj2, rendererObj2;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 3;
    var windowHalfY = window.innerHeight / 2;
    var objectObj2;
    initObj2();
    animateObj2();

    function initObj2() {
        containerObj2 = document.getElementById('object2');
        cameraObj2 = new THREE.PerspectiveCamera(90, (window.innerWidth / 3) / (window.innerHeight / 2), 10, 2000);
        cameraObj2.position.z = 350;


        // scene
        sceneObj2 = new THREE.Scene();
        var ambientLightObj2 = new THREE.AmbientLight(0xcccccc, 0.6);
        sceneObj2.add(ambientLightObj2);
        var pointLightobj2 = new THREE.PointLight(0xffffff, 0.6);
        cameraObj2.add(pointLightobj2);
        sceneObj2.add(cameraObj2);


        // manager
        function loadModelObj2() {
            objectObj2.traverse(function (child) {
                if (child.isMesh) child.material.map = textureObj2;
            });
            objectObj2.position.y = - 190;
            objectObj2.position.x = - 25;
            sceneObj2.add(objectObj2);
        }
        var managerObj2 = new THREE.LoadingManager(loadModelObj2);
        managerObj2.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };


        // texture
        var textureLoaderObj2 = new THREE.TextureLoader(managerObj2);
        var textureObj2 = textureLoaderObj2.load('/both/assets/img/q4/fond_vert.png');


        // model
        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }


        function onError() { }


        var loaderObj2 = new THREE.OBJLoader(managerObj2);
        loaderObj2.load('/both/assets/img/q4/feuilles.obj', function (obj) {
            objectObj2 = obj;
        }, onProgress, onError);

        rendererObj2 = new THREE.WebGLRenderer({
            alpha: true
        });
        rendererObj2.setPixelRatio(window.devicePixelRatio);
        rendererObj2.setSize(window.innerWidth / 3, window.innerHeight / 2);
        containerObj2.appendChild(rendererObj2.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        window.addEventListener('resize', onWindowResize, false);
    }


    function onWindowResize() {
        windowHalfX = window.innerWidth / 3;
        windowHalfY = window.innerHeight / 2;
        cameraObj2.aspect = window.innerWidth / window.innerHeight;
        cameraObj2.updateProjectionMatrix();
        rendererObj2.setSize(300, 420);
    }


    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }



    function animateObj2() {
        requestAnimationFrame(animateObj2);
        renderObj2();
    }


    function renderObj2() {
        cameraObj2.position.x += (mouseX - cameraObj2.position.x) * .05;
        cameraObj2.position.y += (- mouseY - cameraObj2.position.y) * .05;
        cameraObj2.position.y += (ball.position.y - cameraObj2.position.y) * .03;
        cameraObj2.lookAt(sceneObj2.position);
        rendererObj2.render(sceneObj2, cameraObj2);
    }
    /**************** FIN OBJECT2 3D ****************/


    /**************** OBJECT3 3D ****************/
    var containerObj3;
    var cameraObj3, sceneObj3, rendererObj3;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 3;
    var windowHalfY = window.innerHeight / 2;
    var objectObj3;
    initObj3();
    animateObj3();

    function initObj3() {
        containerObj3 = document.getElementById('object3');
        cameraObj3 = new THREE.PerspectiveCamera(80, (window.innerWidth / 3) / (window.innerHeight / 2), 10, 2000);
        cameraObj3.position.z = 240;
        // scene
        sceneObj3 = new THREE.Scene();
        var ambientLightObj3 = new THREE.AmbientLight(0xcccccc, 0.6);
        sceneObj3.add(ambientLightObj3);
        var pointLightobj3 = new THREE.PointLight(0xffffff, 0.6);
        cameraObj3.add(pointLightobj3);
        sceneObj3.add(cameraObj3);
        // manager
        function loadModelObj3() {
            objectObj3.traverse(function (child) {
                if (child.isMesh) child.material.map = textureObj3;
            });
            objectObj3.position.y = - 3;
            sceneObj3.add(objectObj3);
        }
        var managerObj3 = new THREE.LoadingManager(loadModelObj3);
        managerObj3.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };
        // texture
        var textureLoaderObj3 = new THREE.TextureLoader(managerObj3);
        var textureObj3 = textureLoaderObj3.load('/both/assets/img/q4/fond_bleu.png');
        // model
        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        function onError() { }
        var loaderObj3 = new THREE.OBJLoader(managerObj3);
        loaderObj3.load('/both/assets/img/q4/goutte.obj', function (obj) {
            objectObj3 = obj;
        }, onProgress, onError);
        //
        rendererObj3 = new THREE.WebGLRenderer({
            alpha: true
        });
        rendererObj3.setPixelRatio(window.devicePixelRatio);
        rendererObj3.setSize(window.innerWidth / 3, window.innerHeight / 2);
        containerObj3.appendChild(rendererObj3.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 3;
        windowHalfY = window.innerHeight / 2;
        cameraObj3.aspect = window.innerWidth / window.innerHeight;
        cameraObj3.updateProjectionMatrix();
        rendererObj3.setSize(450, 400);
    }
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 3;
        mouseY = (event.clientY - windowHalfY) / 2;
    }
    //
    function animateObj3() {
        requestAnimationFrame(animateObj3);
        renderObj3();
    }
    function renderObj3() {
        cameraObj3.position.x += (mouseX - cameraObj3.position.x) * .05;
        cameraObj3.position.y += (- mouseY - cameraObj3.position.y) * .05;
        cameraObj3.position.y += (ball.position.y - cameraObj3.position.y) * .03;
        cameraObj3.lookAt(sceneObj3.position);
        rendererObj3.render(sceneObj3, cameraObj3);
    }
    /**************** FIN OBJECT3 3D ****************/

    /**************** OBJECT4 3D ****************/
    window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    var canvas = document.getElementById('object4');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth / 3;
    canvas.height = window.innerHeight / 2;

    var settings = {

        'abstract': {

            'emission_rate': 1200,
            'min_life': 1,
            'life_range': 1,
            'min_angle': 0,
            'angle_range': 360,
            'min_speed': 10,
            'speed_range': 100,
            'min_size': 1,
            'size_range': 1,
            'gravity': {
                x: 0,
                y: 0
            },
            'min_position': {
                x: -30,
                y: -30
            },
            'position_range': {
                x: 60,
                y: 60
            }
        },

        'blood': {

            'emission_rate': 1000,
            'min_life': 1,
            'life_range': 1,
            'min_angle': 85,
            'angle_range': 10,
            'min_speed': 10,
            'speed_range': 100,
            'min_size': 1,
            'size_range': 1,
            'gravity': {
                x: 0,
                y: 100
            }
        },
    };

    var Particle = function (x, y, angle, speed, life, size, start_colour, colour_step) {

        /* the particle's position */
        this.pos = {
            x: x || 0,
            y: y || 0
        };

        /* set specified or default values */
        this.speed = speed || 5;
        this.life = life || 1;
        this.size = size || 3;
        this.lived = 0;

        /* the particle's velocity */
        var radians = angle * Math.PI / 180;

        this.vel = {

            x: Math.cos(radians) * speed,
            y: -Math.sin(radians) * speed
        };

        /* the particle's colour values */
        this.colour = start_colour;
        this.colour_step = colour_step;
    };

    var Emitter = function (x, y, settings) {

        /* the emitter's position */
        this.pos = {

            x: x,
            y: y
        };

        /* set specified values */
        this.settings = settings;

        /* How often the emitter needs to create a particle in milliseconds */
        this.emission_delay = 1000 / settings.emission_rate;

        /* we'll get to these later */
        this.last_update = 0;
        this.last_emission = 0;

        /* the emitter's particle objects */
        this.particles = [];

        /* particle position settings */
        this.position_vary = this.settings.position_range || false;
        this.min_position = this.settings.min_position || { x: 0, y: 0 };
    };

    Emitter.prototype.update = function () {

        /* set the last_update variable to now if it's the first update */

        if (!this.last_update) {

            this.last_update = Date.now();

            return;
        }

        /* get the current time */
        var time = Date.now();

        /* work out the milliseconds since the last update */
        var dt = time - this.last_update;

        /* add them to the milliseconds since the last particle emission */
        this.last_emission += dt;

        /* set last_update to now */
        this.last_update = time;

        /* check if we need to emit a new particle */
        if (this.last_emission > this.emission_delay) {

            /* find out how many particles we need to emit */
            var i = Math.floor(this.last_emission / this.emission_delay);

            /* subtract the appropriate amount of milliseconds from last_emission */
            this.last_emission -= i * this.emission_delay;

            while (i--) {

                var life = this.settings.min_life + Math.random() * this.settings.life_range;

                this.particles.push(
                    new Particle(
                        this.min_position.x + (this.position_vary ? Math.random() * this.position_vary.x : 0),
                        this.min_position.y + (this.position_vary ? Math.random() * this.position_vary.y : 0),
                        this.settings.min_angle + Math.random() * this.settings.angle_range,
                        this.settings.min_speed + Math.random() * this.settings.speed_range,
                        life,
                        this.settings.min_size + Math.random() * this.settings.size_range,
                    )
                );
            }
        }

        /* convert dt to seconds */
        dt /= 1000;

        /* loop through the existing particles */
        var i = this.particles.length;

        while (i--) {
            var particle = this.particles[i];

            /* skip if the particle is dead */
            if (particle.dead) {
                /* remove the particle from the array */
                this.particles.splice(i, 1);
                continue;
            }

            /* add the seconds passed to the particle's life */
            particle.lived += dt;

            /* check if the particle should be dead */
            if (particle.lived >= particle.life) {
                particle.dead = true;
                continue;
            }

            /* calculate the particle's new position based on the forces multiplied by seconds passed */
            particle.vel.x += this.settings.gravity.x * dt;
            particle.vel.y += this.settings.gravity.y * dt;

            particle.pos.x += particle.vel.x * dt;
            particle.pos.y += particle.vel.y * dt;


            ctx.fillStyle = '#b07230';

            var x = this.pos.x + particle.pos.x;
            var y = this.pos.y + particle.pos.y;

            ctx.beginPath();
            ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    var emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.abstract);

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        emitter.update();
        requestAnimFrame(loop);
    }

    loop();
    /**************** FIN OBJECT4 3D ****************/

    /**************** OBJECT5 3D ****************/
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