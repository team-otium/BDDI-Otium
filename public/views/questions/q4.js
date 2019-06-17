/**************************  
**************************  QUESTION 4
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div class="text_center_mobile">
        <h1 class="question_mobile">Choisissez les éléments qui vous apaisent</h1>
    </div>

    <div class="circleQ4 circleQ4-1"></div>
    <div id="selected1">
        <svg height="20" width="20">
            <circle class="selected1" cx="8" cy="10" r="8" stroke="#000000" stroke-width="1" fill="transparent" fill-opacity="1" />
        </svg>
        <svg height="20" width="20">
            <circle class="selected2" cx="8" cy="10" r="8" stroke="#000000" stroke-width="1" fill="transparent" fill-opacity="1" />
         </svg>
    </div>
 `
var canValide = false;
var select = 0;

// All listeners, one variable per listener
mobile_listener1 = [".circleQ4-1", "click", () => {
    socket.emit("q4-2", "selectObj")
    document.querySelector('.selected1').style.fill = "#000000"
    document.querySelector('.circleQ4').classList.remove("circleQ4-1")
    document.querySelector('.circleQ4').classList.add("circleQ4-2")
    select = 1;

    if (select == 1) {
        document.querySelector('.circleQ4-2').onclick = function () {
            document.querySelector('.selected2').style.fill = "#000000"

            // 2 obj are selected 
            canValide = true;
            if (canValide === true) {
                document.querySelector(".circleQ4").style.display = "none"
                document.querySelector(".circle1").style.display = "block"
                document.querySelector(".circle2").style.display = "block"
            }
        };
    }
}]

// Script to be executed when the page is displayed
mobile_script = () => {

    document.querySelector(".circle1").style.display = "none"
    document.querySelector(".circle2").style.display = "none"

    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q4
    ValidationBtn.nextPage = questions.q5
    ValidationBtn.actualQ = "4"
    ValidationBtn.nextQ = "5"

    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    }
    function deviceOrientationHandler(eventData) {
        if (ValidationBtn.touch === false && window.getComputedStyle(document.querySelector(".gifValidation")).getPropertyValue('opacity') == 0) {
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
    <div class="text_center">
        <h1 class="question_desktop">Choisissez les éléments qui vous apaisent</h1>
    </div>

    <div class="contain">
        <div id="ball"></div>
        <div id="all_object">
            <div id="hoverTop">
                <div class="blocHover"><div id="hover1"></div><div id="hover1-2"></div></div>
                <div class="blocHover"><div id="hover2"></div><div id="hover2-2"></div></div>
                <div class="blocHover"><div id="hover3"></div><div id="hover3-2"></div></div>
            </div>

            <div id="hoverBottom">
                <div class="blocHover"><div id="hover4"></div><div id="hover4-2"></div></div>
                <div class="blocHover"><div id="hover5"></div><div id="hover5-2"></div></div>
                <div class="blocHover"><div id="hover6"></div><div id="hover6-2"></div></div>
            </div>

            <div id="objTop">
                <div id="object1" class="object"></div>
                <div id="object2" class="object"></div>
                <div id="object3" class="object"></div>
            </div>

            <div id="objBottom">
                <div id="object4" class="object"></div>
                <div id="object5" class="object"></div>
                <div id="object6" class="object"></div>
            </div>
        </div>
    </div>

    <div class="tuto"><img src="/both/assets/img/tuto-q4.gif"></div>
 `

desktop_socketOn1 = ["q4", (eventData) => {

    ball.velocity.y = Math.round(-eventData.tiltFB + 20) / 3;
    ball.velocity.x = Math.round(eventData.tiltLR + 20) / 2;

    // hover on obj 1 //
    if (ball.position.x <= window.innerWidth / 3 && ball.position.y <= window.innerHeight / 2) {
        document.getElementById("hover1").style.opacity = "1"
    } else {
        document.getElementById("hover1").style.opacity = "0"
    }
    // hover on obj 2 //
    if (ball.position.x > window.innerWidth / 3 && ball.position.x <= (window.innerWidth / 3) * 2 && ball.position.y <= window.innerHeight / 2) {
        document.getElementById("hover2").style.opacity = "1"
    }  else {
        document.getElementById("hover2").style.opacity = "0"
    }
    // hover on obj 3 //
    if (ball.position.x > (window.innerWidth / 3) * 2 && ball.position.x <= (window.innerWidth / 3) * 3 && ball.position.y <= window.innerHeight / 2) {
        document.getElementById("hover3").style.opacity = "1"
    } else {
        document.getElementById("hover3").style.opacity = "0"
    }
    // hover on obj 4 //
    if (ball.position.x <= window.innerWidth / 3 && ball.position.y > window.innerHeight / 2) {
        document.getElementById("hover4").style.opacity = "1"
    } else {
        document.getElementById("hover4").style.opacity = "0"
    }
    // hover on obj 5 //
    if (ball.position.x > window.innerWidth / 3 && ball.position.x <= (window.innerWidth / 3) * 2 && ball.position.y > window.innerHeight / 2) {
        document.getElementById("hover5").style.opacity = "1"
    } else {
        document.getElementById("hover5").style.opacity = "0"
    }
    // hover on obj 6 //
    if (ball.position.x > (window.innerWidth / 3) * 2 && ball.position.x <= (window.innerWidth / 3) * 3 && ball.position.y > window.innerHeight / 2) {
        document.getElementById("hover6").style.opacity = "1"
    } else {
        document.getElementById("hover6").style.opacity = "0"
    }
}]


/***
 * WHEN CLICK ON MOBILE TO SELECT OBJ
 ***/
desktop_socketOn2 = ["q4-2", (eventData) => {
    // click on obj 1 //
    if (eventData === "selectObj" && ball.position.x <= window.innerWidth / 3 && ball.position.y <= window.innerHeight / 2) {
        document.getElementById("hover1-2").style.display = "block"
    }
    // click on obj 2 //
    if (eventData === "selectObj" && ball.position.x > window.innerWidth / 3 && ball.position.x <= (window.innerWidth / 3) * 2 && ball.position.y <= window.innerHeight / 2) {
        document.getElementById("hover2-2").style.display = "block"
    }
    // click on obj 3 //
    if (eventData === "selectObj" && ball.position.x > (window.innerWidth / 3) * 2 && ball.position.x <= (window.innerWidth / 3) * 3 && ball.position.y <= window.innerHeight / 2) {
        document.getElementById("hover3-2").style.display = "block"
    }
    // click on obj 4 //
    if (eventData === "selectObj" && ball.position.x <= window.innerWidth / 3 && ball.position.y > window.innerHeight / 2) {
        document.getElementById("hover4-2").style.display = "block"
    }
    // click on obj 5 //
    if (eventData === "selectObj" && ball.position.x > window.innerWidth / 3 && ball.position.x <= (window.innerWidth / 3) * 2 && ball.position.y > window.innerHeight / 2) {
        document.getElementById("hover5-2").style.display = "block"
    }
    // click on obj 6 //
    if (eventData === "selectObj" && ball.position.x > (window.innerWidth / 3) * 2 && ball.position.x <= (window.innerWidth / 3) * 3 && ball.position.y > window.innerHeight / 2) {
        document.getElementById("hover6-2").style.display = "block"
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

    var containerObj1;
    var cameraObj1, sceneObj1, rendererObj1;
    var objectObj1;

        containerObj1 = document.getElementById('object1');
        cameraObj1 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
        cameraObj1.position.z = 400;

        rendererObj1 = new THREE.WebGLRenderer({
            alpha: true
        });

        rendererObj1.setSize( window.innerWidth/3, window.innerHeight/2 );
        containerObj1.appendChild( rendererObj1.domElement );
        
        // scene
        sceneObj1 = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.6 );
        sceneObj1.add( ambientLight );
        var pointLight = new THREE.PointLight( 0xffffff, 0.6 );
        cameraObj1.add( pointLight );
        sceneObj1.add( cameraObj1 );

        // manager
        function loadModelObj1() {
            objectObj1.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = textureObj1;
            } );
            objectObj1.position.y = -30;
            objectObj1.position.x = 20;
            objectObj1.position.z = 0;
            sceneObj1.add( objectObj1 );
        }
        var managerObj1 = new THREE.LoadingManager( loadModelObj1 );
        managerObj1.onProgress = function ( item, loaded, total ) {

        };

        // texture
        var textureLoaderObj1 = new THREE.TextureLoader( managerObj1 );
        var textureObj1 = textureLoaderObj1.load( '/both/assets/img/q4/fond_bleu.png' );

        var loaderObj1 = new THREE.OBJLoader( managerObj1 );
        loaderObj1.load( '/both/assets/img/q4/bulles_eau_2.obj', function ( obj ) {
            objectObj1 = obj;

            if (window.getComputedStyle(document.getElementById("hover1")).getPropertyValue('opacity') == "block") {
                objectObj1.rotation.y += 0.01;
            } else {
                objectObj1.position.y = (Math.cos((Date.now()) * 0.001) * 0.2) + objectObj1.position.y;
            }

            function animateObj1() {
                requestAnimationFrame(animateObj1);
        
                rendererObj1.render(sceneObj1, cameraObj1);
            }
            
            animateObj1()

        } );


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
    keyLightObj2.position.set(-100, 0, 100);

    var fillLightObj2 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    fillLightObj2.position.set(100, 0, -100).normalize();

    var backLightObj2 = new THREE.DirectionalLight(0xffffff, 1.0);
    backLightObj2.position.set(100, 0, -100).normalize();

    sceneObj2.add(keyLightObj2);
    sceneObj2.add(fillLightObj2);
    sceneObj2.add(backLightObj2);

    var mtlLoaderObj2 = new THREE.MTLLoader();
    mtlLoaderObj2.load('/both/assets/img/q4/feuilles.mtl', function (materials) {
        materials.preload();

        var objLoaderObj2 = new THREE.OBJLoader();
        objLoaderObj2.setMaterials(materials);
        objLoaderObj2.load('/both/assets/img/q4/feuilles.obj', function (object2) {
            object2.position.y = -300;
            object2.position.x = -50;
            object2.position.z = 20;

            sceneObj2.add(object2);

            if (window.getComputedStyle(document.getElementById("hover2")).getPropertyValue('opacity') == "block") {
                sceneObj2.rotation.y += 0.01;
            } else {
                object2.position.y = (Math.cos((Date.now()) * 0.001) * 0.2) + object2.position.y;
            }

            var animateObj2 = function () {
                requestAnimationFrame(animateObj2);

                rendererObj2.render(sceneObj2, cameraObj2);
            };
            animateObj2();
        })
    })


    /******************** 
     ****** OBJET 3 *****
     ********************/

    var sceneObj3 = new THREE.Scene();
    var cameraObj3 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
    containerObj3 = document.getElementById('object3');


    var rendererObj3 = new THREE.WebGLRenderer({
        alpha: true
    });

    var geometryCloud = new THREE.PlaneGeometry(180, 130, 2);
    var geometryCloud3 = new THREE.PlaneGeometry(190, 120, 2);
    var textureCloud = new THREE.TextureLoader().load('/both/assets/img/q4/nuage2.png');
    textureCloud.repeat.set(1, 1);
    var materialCloud = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.99,
        map: textureCloud,
        transparent: true,
        side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(geometryCloud, materialCloud);
    var plane2 = new THREE.Mesh(geometryCloud, materialCloud);
    var plane3 = new THREE.Mesh(geometryCloud3, materialCloud);

    plane.position.y = -53;
    plane.position.x = -100;
    plane.position.z = 210;
    plane.rotation.y = -10;

    plane2.position.y = -60;
    plane2.position.x = -20;
    plane2.position.z = 270;
    plane2.rotation.y = -9.7;

    plane3.position.y = -32;
    plane3.position.x = 60;
    plane3.position.z = 304;
    plane3.rotation.y = -40;
    plane3.rotation.x = 0.17;


    sceneObj3.add(plane, plane2, plane3);


    rendererObj3.setSize(window.innerWidth / 3, window.innerHeight / 2);
    containerObj3.appendChild(rendererObj3.domElement);

    cameraObj3.position.z = 460;
    cameraObj3.position.x = 0;
    cameraObj3.position.y = 0;

    var keyLightObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    keyLightObj3.position.set(-100, 0, 100);

    var fillLightObj3 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
    fillLightObj3.position.set(100, 0, -100).normalize();

    var backLightObj3 = new THREE.DirectionalLight(0xffffff, 1.0);
    backLightObj3.position.set(100, 0, -100).normalize();

    sceneObj3.add(keyLightObj3);
    sceneObj3.add(fillLightObj3);
    sceneObj3.add(backLightObj3);

    var mtlLoaderObj3 = new THREE.MTLLoader();
    mtlLoaderObj3.load('/both/assets/img/q4/montagnes_seules.mtl', function (materials) {
        materials.preload();

        var objLoaderObj3 = new THREE.OBJLoader();
        objLoaderObj3.setMaterials(materials);
        objLoaderObj3.load('/both/assets/img/q4/montagnes_s300.obj', function (object3) {
            object3.position.y = -20;
            object3.position.x = 150;
            object3.position.z = -100;

            object3.rotation.y = 1;
            object3.rotation.x = 0.1;

            sceneObj3.add(object3);

            if (window.getComputedStyle(document.getElementById("hover3")).getPropertyValue('opacity') == "block") {
                //sceneObj3.rotation.y += 0.001;
            } else {
                cameraObj3.position.y = (Math.cos((Date.now()) * 0.001) * 0.1) + cameraObj3.position.y;
            }

            var animateObj3 = function () {
                requestAnimationFrame(animateObj3);

                rendererObj3.render(sceneObj3, cameraObj3);
            };

            animateObj3();
        })
    })

    /******************** 
     ****** OBJET 4 *****
     ********************/
    var containerObj4;
    var cameraObj4, sceneObj4, rendererObj4;
    var objectObj4;

        containerObj4 = document.getElementById('object4');
        cameraObj4 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
        cameraObj4.position.z = 100;

        rendererObj4 = new THREE.WebGLRenderer({
            alpha: true
        });

        rendererObj4.setSize( window.innerWidth/3, window.innerHeight/2 );
        containerObj4.appendChild( rendererObj4.domElement );
        
        // scene
        sceneObj4 = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.6 );
        sceneObj4.add( ambientLight );
        var pointLight = new THREE.PointLight( 0xffffff, 0.6 );
        cameraObj4.add( pointLight );
        sceneObj4.add( cameraObj4 );

        // manager
        function loadModelObj4() {
            objectObj4.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = textureObj4;
            } );
            objectObj4.position.y = 0;
            objectObj4.position.x = 300;
            objectObj4.position.z = 0;
            sceneObj4.add( objectObj4 );
        }
        var managerObj4 = new THREE.LoadingManager( loadModelObj4 );
        managerObj4.onProgress = function ( item, loaded, total ) {

        };

        // texture
        var textureLoaderObj4 = new THREE.TextureLoader( managerObj4 );
        var textureObj4 = textureLoaderObj4.load( '/both/assets/img/q4/Sand_001_COLOR.png' );

        var loaderObj4 = new THREE.OBJLoader( managerObj4 );
        loaderObj4.load( '/both/assets/img/q4/sable_R.obj', function ( obj ) {
            objectObj4 = obj;

            if (window.getComputedStyle(document.getElementById("hover4")).getPropertyValue('opacity') == "block") {
                sceneObj4.rotation.y += 0.01;
            } else {
                objectObj4.position.y = (Math.cos((Date.now()) * 0.001) * 0.2) + objectObj4.position.y;
            }

            function animateObj4() {
                requestAnimationFrame(animateObj4);
        
                rendererObj4.render(sceneObj4, cameraObj4);
            }
            
            animateObj4()

        } );

    
    
    /******************** 
    ****** OBJET 5 *****
    ********************/

   var containerObj5;
   var cameraObj5, sceneObj5, rendererObj5;
   var objectObj5;

       containerObj5 = document.getElementById('object5');
       cameraObj5 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
       cameraObj5.position.z = 350;

       rendererObj5 = new THREE.WebGLRenderer({
           alpha: true
       });

       rendererObj5.setSize( window.innerWidth/3, window.innerHeight/2 );
       containerObj5.appendChild( rendererObj5.domElement );
       
       // scene
       sceneObj5 = new THREE.Scene();
       var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.6 );
       sceneObj5.add( ambientLight );
       var pointLight = new THREE.PointLight( 0xffffff, 0.6 );
       cameraObj5.add( pointLight );
       sceneObj5.add( cameraObj5 );

       // manager
       function loadModelObj5() {
           objectObj5.traverse( function ( child ) {
               if ( child.isMesh )
               child.material.color.setHex(0xa3c9f7);
           } );
           objectObj5.position.y = 0;
           objectObj5.position.x = 0;
           objectObj5.position.z = 0;
           sceneObj5.add( objectObj5 );
       }
       var managerObj5 = new THREE.LoadingManager( loadModelObj5 );
       managerObj5.onProgress = function ( item, loaded, total ) {

       };

       // texture
    //    var textureLoaderObj5 = new THREE.TextureLoader( managerObj5 );
    //    var textureObj5 = textureLoaderObj5.load( '/both/assets/img/q4/fond_goutte.png' );

       var loaderObj5 = new THREE.OBJLoader( managerObj5 );
       loaderObj5.load( '/both/assets/img/q4/goutte.obj', function ( obj ) {
           objectObj5 = obj;

           if (window.getComputedStyle(document.getElementById("hover5")).getPropertyValue('display') == "block") {
            sceneObj5.rotation.y += 0.01;
       } else {
           objectObj5.position.y = (Math.cos((Date.now()) * 0.001) * 0.2) + objectObj5.position.y;
       }

           function animateObj5() {
               requestAnimationFrame(animateObj5);
       
               rendererObj5.render(sceneObj5, cameraObj5);
           }
           
           animateObj5()

       } );

    /******************** 
    ****** OBJET 6 *****
    ********************/

   var sceneObj6 = new THREE.Scene();
   var cameraObj6 = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
   containerObj6 = document.getElementById('object6');

   var rendererObj6 = new THREE.WebGLRenderer({
       alpha: true
   });

   rendererObj6.setSize(window.innerWidth / 3, window.innerHeight / 2);
   containerObj6.appendChild(rendererObj6.domElement);

   cameraObj6.position.z = 20;
   cameraObj6.position.x = 0;
   cameraObj6.position.y = 0;

   var keyLightObj6 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
   keyLightObj6.position.set(-100, 0, 100);

   var fillLightObj6 = new THREE.DirectionalLight(new THREE.Color("rgb(255, 255, 255)"), 0.75);
   fillLightObj6.position.set(100, 0, -100).normalize();

   var backLightObj6 = new THREE.DirectionalLight(0xffffff, 1.0);
   backLightObj6.position.set(100, 0, -100).normalize();

   sceneObj6.add(keyLightObj6);
   sceneObj6.add(fillLightObj6);
   sceneObj6.add(backLightObj6);

   var mtlLoaderObj6 = new THREE.MTLLoader();
   mtlLoaderObj6.load('/both/assets/img/q4/coton.mtl', function (material6) {
       material6.preload();

       var objLoaderObj6 = new THREE.OBJLoader();
       objLoaderObj6.setMaterials(material6);
       objLoaderObj6.load('/both/assets/img/q4/coton.obj', function (object6) {
           object6.position.y = 0;
           object6.position.x = 0;
           object6.position.z = 0;

           sceneObj6.add(object6);

           if (window.getComputedStyle(document.getElementById("hover6")).getPropertyValue('opacity') == "block") {
               //sceneObj3.rotation.y += 0.001;
           } else {
               cameraObj6.position.y = (Math.cos((Date.now()) * 0.001) * 0.1) + cameraObj6.position.y;
           }

           var animateObj6 = function () {
               requestAnimationFrame(animateObj6);

               rendererObj6.render(sceneObj6, cameraObj6);
           };

           animateObj6();
       })
   })
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q4_mobile = {
    html: mobile_html,
    listeners: [mobile_listener1],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

q4_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [desktop_socketOn1, desktop_socketOn2],
    script: desktop_script,
    transitions: desktop_transition,
}