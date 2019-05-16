/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    
 `

// All listeners, one variable per listener
mobile_listener1 = ["selector", "type", () => {

}]

mobile_listener2 = ["selector", "type", () => {

    }]
    /** And more... */

// Socket on
mobile_socketOn1 = ["name", () => {

}]

// Script to be executed when the page is displayed
mobile_script = () => {

}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
    <div class="text_center">
        <h1 class="question_desktop">UNIVERS 3D</h1>
    </div>
    <div id="univers"></div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["name", () => {

}]

desktop_script = () => {
    var camera, scene, renderer,
        geometry, material, mesh;

    init();
    animate();

    function init() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        container = document.getElementById('univers');
        document.body.appendChild(stats.domElement);

        clock = new THREE.Clock();

        renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        scene.add(camera);

        geometry = new THREE.CubeGeometry(200, 200, 200);
        material = new THREE.MeshLambertMaterial({ color: 0xc6c8f8, wireframe: false });
        mesh = new THREE.Mesh(geometry, material);
        //scene.add( mesh );
        cubeSineDriver = 0;

        THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS

        light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(-1, 0, 10);
        scene.add(light);

        smokeTexture = THREE.ImageUtils.loadTexture('/both/assets/img/univers/smoke.png');
        smokeMaterial = new THREE.MeshLambertMaterial({ color: 0xc6c8f8, map: smokeTexture, transparent: true });
        smokeGeo = new THREE.PlaneGeometry(300, 300);
        smokeParticles = [];


        for (p = 0; p < 150; p++) {
            var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
            particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
            particle.rotation.z = Math.random() * 360;
            scene.add(particle);
            smokeParticles.push(particle);
        }

        container.appendChild(renderer.domElement);

    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        stats.begin();
        delta = clock.getDelta();
        requestAnimationFrame(animate);
        evolveSmoke();
        render();
        stats.end();
    }

    function evolveSmoke() {
        var sp = smokeParticles.length;
        while (sp--) {
            smokeParticles[sp].rotation.z += (delta * 0.2);
        }
    }

    function render() {

        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        cubeSineDriver += .01;
        mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
        renderer.render(scene, camera);

    }
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

univers_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

univers_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [],
    script: desktop_script,
    transitions: desktop_transition,
}