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
    var container;
    var camera, scene, renderer;
    var mouseX = 0,
        mouseY = 0;
    var windowHalfX = window.innerWidth / 3;
    var windowHalfY = window.innerHeight / 2;
    var object;
    init();
    animate();

    function init() {
        container = document.getElementById('object1');
        camera = new THREE.PerspectiveCamera(80, (window.innerWidth / 3) / (window.innerHeight / 2), 10, 2000);
        camera.position.z = 330;
        // scene
        scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
        scene.add(ambientLight);
        var pointLight = new THREE.PointLight(0xffffff, 0.6);
        camera.add(pointLight);
        scene.add(camera);
        // manager
        function loadModel() {
            object.position.y = -3;
            scene.add(object);
        }
        var manager = new THREE.LoadingManager(loadModel);
        manager.onProgress = function(item, loaded, total) {
            console.log(item, loaded, total);
        };
        // model
        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        // MTL
        var mtlLoader = new THREE.MTLLoader();
        var url = "/both/assets/img/q4/bulles_eau_2.mtl";
        mtlLoader.load(url, function(materials) {

            materials.preload();

            var loader = new THREE.OBJLoader(manager);
            loader.setMaterials(materials);
            loader.load('/both/assets/img/q4/bulles_eau_2.obj', function(obj) {

                object = obj;

            }, onProgress, onError);

        });
        //
        function onError() {}
        //
        renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth / 3, window.innerHeight / 2);
        container.appendChild(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        window.addEventListener('resize', onWindowResize, false);
    }
    //
    function onWindowResize() {
        windowHalfX = window.innerWidth / 3;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(450, 400);
    }
    //
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 3;
        mouseY = (event.clientY - windowHalfY) / 2;
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    //
    function render() {
        camera.position.x += (mouseX - camera.position.x) * .02;
        camera.position.y += (-mouseY - camera.position.y) * .02;
        camera.position.y += (ball.position.y - camera.position.y) * .03;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }


    /******************* 
     ****** OBJET 2 ****
     ********************/
    var containerObj2;
    var cameraObj2, sceneObj2, rendererObj2;
    var mouseX = 0,
        mouseY = 0;
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
            objectObj2.position.y = -190;
            objectObj2.position.x = -25;
            sceneObj2.add(objectObj2);
        }
        var managerObj2 = new THREE.LoadingManager(loadModelObj2);
        managerObj2.onProgress = function(item, loaded, total) {
            console.log(item, loaded, total);
        };
        // model
        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        // MTL
        var mtlLoaderObj2 = new THREE.MTLLoader();
        var urlObj2 = "/both/assets/img/q4/feuilles.mtl";
        mtlLoaderObj2.load(urlObj2, function(materialsObj2) {

            materialsObj2.preload();

            var loaderObj2 = new THREE.OBJLoader(managerObj2);
            loaderObj2.setMaterials(materialsObj2);
            loaderObj2.load('/both/assets/img/q4/feuilles.obj', function(obj) {

                objectObj2 = obj;

            }, onProgress, onError);
        });
        //
        function onError() {}

        rendererObj2 = new THREE.WebGLRenderer({
            alpha: true
        });
        rendererObj2.setPixelRatio(window.devicePixelRatio);
        rendererObj2.setSize(window.innerWidth / 3, window.innerHeight / 2);
        containerObj2.appendChild(rendererObj2.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        window.addEventListener('resize', onWindowResize, false);
    }
    //
    function onWindowResize() {
        windowHalfX = window.innerWidth / 3;
        windowHalfY = window.innerHeight / 2;
        cameraObj2.aspect = window.innerWidth / window.innerHeight;
        cameraObj2.updateProjectionMatrix();
        rendererObj2.setSize(300, 420);
    }
    //
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }
    //
    function animateObj2() {
        requestAnimationFrame(animateObj2);
        renderObj2();
    }
    //
    function renderObj2() {
        cameraObj2.position.x += (mouseX - cameraObj2.position.x) * .02;
        cameraObj2.position.y += (-mouseY - cameraObj2.position.y) * .02;
        cameraObj2.position.y += (ball.position.y - cameraObj2.position.y) * .03;
        cameraObj2.lookAt(sceneObj2.position);
        rendererObj2.render(sceneObj2, cameraObj2);
    }



    /******************* 
     ****** OBJET 3 ****
     ********************/
    var containerObj3;
    var cameraObj3, sceneObj3, rendererObj3;
    var mouseX = 0,
        mouseY = 0;
    var windowHalfX = window.innerWidth / 3;
    var windowHalfY = window.innerHeight / 2;
    var objectObj3;
    initObj3();
    animateObj3();
    //
    function initObj3() {
        containerObj3 = document.getElementById('object3');
        cameraObj3 = new THREE.PerspectiveCamera(80, (window.innerWidth / 3) / (window.innerHeight / 2), 10, 2000);
        cameraObj3.position.z = 240;
        // scene
        sceneObj3 = new THREE.Scene();
        var ambientLightObj3 = new THREE.AmbientLight(0xcccccc, 0.7);
        sceneObj3.add(ambientLightObj3);
        var pointLightobj3 = new THREE.PointLight(0xffffff, 0.6);
        cameraObj3.add(pointLightobj3);
        sceneObj3.add(cameraObj3);
        // manager
        function loadModelObj3() {
            objectObj3.position.y = -3;
            sceneObj3.add(objectObj3);
        }
        var managerObj3 = new THREE.LoadingManager(loadModelObj3);
        managerObj3.onProgress = function(item, loaded, total) {
            console.log(item, loaded, total);
        };
        // model
        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        // MTL
        var mtlLoaderObj3 = new THREE.MTLLoader();
        var urlObj3 = "/both/assets/img/q4/goutte.mtl";
        mtlLoaderObj3.load(urlObj3, function(materialsObj3) {

            materialsObj3.preload();

            var loaderObj3 = new THREE.OBJLoader(managerObj3);
            loaderObj3.setMaterials(materialsObj3);
            loaderObj3.load('/both/assets/img/q4/goutte.obj', function(obj) {

                objectObj3 = obj;

            }, onProgress, onError);
        });


        //
        function onError() {}
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
        cameraObj3.position.x += (mouseX - cameraObj3.position.x) * .02;
        cameraObj3.position.y += (-mouseY - cameraObj3.position.y) * .02;
        cameraObj3.position.y += (ball.position.y - cameraObj3.position.y) * .03;
        cameraObj3.lookAt(sceneObj3.position);
        rendererObj3.render(sceneObj3, cameraObj3);
    }

    /******************* 
     ****** OBJET 4 ****
     ********************/

    var containerObj4;
    var cameraObj4, sceneObj4, rendererObj4;
    var mouseX = 0,
        mouseY = 0;
    var windowHalfX = window.innerWidth / 3;
    var windowHalfY = window.innerHeight / 2;
    var objectObj4;
    initObj4();
    animateObj4();

    function initObj4() {
        containerObj4 = document.getElementById('object4');
        cameraObj4 = new THREE.PerspectiveCamera(80, (window.innerWidth / 3) / (window.innerHeight / 2), 10, 2000);
        cameraObj4.position.z = 290;
        cameraObj4.position.x = 0;
        cameraObj4.position.y = 20;
        // scene
        sceneObj4 = new THREE.Scene();
        var ambientLightObj4 = new THREE.AmbientLight(0xcccccc, 0.3);
        sceneObj4.add(ambientLightObj4);
        var pointLightobj4 = new THREE.PointLight(0xffffff, 0.6);
        cameraObj4.add(pointLightobj4);
        sceneObj4.add(cameraObj4);
        // manager
        function loadModelObj4() {
            objectObj4.position.y = -60;
            objectObj4.position.x = 250;
            sceneObj4.add(objectObj4);
        }
        var managerObj4 = new THREE.LoadingManager(loadModelObj4);
        managerObj4.onProgress = function(item, loaded, total) {
            console.log(item, loaded, total);
        };
        // model
        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        // MTL
        var mtlLoaderObj4 = new THREE.MTLLoader();
        var urlObj4 = "/both/assets/img/q4/montagnes_seules.mtl";
        mtlLoaderObj4.load(urlObj4, function(materialsObj4) {

            materialsObj4.preload();

            var loaderObj4 = new THREE.OBJLoader(managerObj4);
            loaderObj4.setMaterials(materialsObj4);
            loaderObj4.load('/both/assets/img/q4/montagnes_s300.obj', function(obj) {

                objectObj4 = obj;

            }, onProgress, onError);
        });
        //
        function onError() {}

        rendererObj4 = new THREE.WebGLRenderer({
            alpha: true
        });
        rendererObj4.setPixelRatio(window.devicePixelRatio);
        rendererObj4.setSize(window.innerWidth / 3, window.innerHeight / 2);
        containerObj4.appendChild(rendererObj4.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        window.addEventListener('resize', onWindowResize, false);
    }
    //
    function onWindowResize() {
        windowHalfX = window.innerWidth / 3;
        windowHalfY = window.innerHeight / 2;
        cameraObj4.aspect = window.innerWidth / window.innerHeight;
        cameraObj4.updateProjectionMatrix();
        rendererObj4.setSize(300, 420);
    }
    //
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }
    //
    function animateObj4() {
        requestAnimationFrame(animateObj4);
        renderObj4();
    }
    //
    function renderObj4() {
        cameraObj4.position.x += (mouseX - cameraObj4.position.x) * .02;
        cameraObj4.lookAt(sceneObj4.position);
        rendererObj4.render(sceneObj4, cameraObj4);
    }


    /**************** 
     *** TIMELINE ***
     ****************/
    document.querySelector('.q4').style.fill = "#ffffff"
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