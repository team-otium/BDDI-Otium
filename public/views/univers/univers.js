/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div class="text_center_mobile">
    <h1 class="question_mobile">Univers 3D</h1>
 </div>
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

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (eventData) {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha;

            socket.emit("univers", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
        })
    } else {
        alert("Sorry, your browser doesn't support Device Orientation");
    };
}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
    <canvas id="univers"></canvas>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["univers", (eventData) => {
    document.getElementById("doTiltLR").innerHTML = Math.round(eventData.tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(eventData.tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(eventData.dir);


}]

desktop_script = () => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var can = document.querySelector('#univers')
    var renderer = new THREE.WebGLRenderer({canvas: can, antialias: true, physicallyCorrectLights: true})
    renderer.setSize(window.innerWidth, window.innerHeight)

    var animate = function () {
        requestAnimationFrame( animate );

        animateq1()
        animateq3()
        animateq5()
        animateq6()

        renderer.render( scene, camera );
    };

    let params = {
        q1: {
            rep: 2
        },
        q2: {
            rep: 2
        },
        q3: {
            amp: 15,
            freq: 60
        },
        q4: {
            rep1: 0,
            rep2: 0
        },
        q5: {
            rep: 1
        },
        q6: {
            rep: 2
        },
        q7: {
            rep: 0
        },
    }

    let gui = new dat.GUI()
    var q1 = gui.addFolder('Question 1')
    var q2 = gui.addFolder('Question 2')
    var q3 = gui.addFolder('Question 3')
    var q4 = gui.addFolder('Question 4')
    var q5 = gui.addFolder('Question 5')
    var q6 = gui.addFolder('Question 6')
    var q7 = gui.addFolder('Question 7')
    q1.open()
    q2.open()
    q3.open()
    q4.open()
    q5.open()
    q6.open()
    q7.open()
    let controllerq1 = q1.add(params.q1, 'rep', 1, 15).step(1);
    let controllerq2 = q2.add(params.q2, 'rep', 2, 15).step(1);
    let controllerq31 = q3.add(params.q3, 'amp', 0, 100)
    let controllerq32 = q3.add(params.q3, 'freq', 1, 100)
    q4.add(params.q4, 'rep1', 0, 10)
    q4.add(params.q4, 'rep2', 0, 10)
    let controllerq5 = q5.add(params.q5, 'rep', 1, 15)
    let controllerq6 = q6.add(params.q6, 'rep', 0, 4).step(1)
    q7.add(params.q7, 'rep', 0, 10)

    function rand(min, max) {
        min = min;
        max = max;
        return Math.random() * (max - min +1) + min;
    }

    /********* Q1 */

    class FloatingObj {
        constructor(){
          let random = Math.floor(Math.random() * 2)
          switch(random){
            case 0:
              var geometry = new THREE.SphereGeometry(1, params.q1.rep, params.q1.rep)
              break
            case 1:
              var geometry = new THREE.ConeGeometry( 1, 3, params.q1.rep );
              break
          }
          
          var material = new THREE.MeshPhongMaterial( {color: 0xd4c2f2} );
          var sphere = new THREE.Mesh(geometry, material);
      
          this.y = rand(15, 20)
          sphere.position.y = this.y
          sphere.position.x = rand(-10, 10 )
          sphere.position.z = rand(-20, -5)
          this.obj = sphere
        }
      }
      
      let spheres = []
      
      for (let i = 0; i < params.q2.rep; i++) {
        let s = new FloatingObj()
        spheres.push(s)
        scene.add(s.obj)
      }
      
      controllerq1.onChange(function(value) {
          updateq1(value)
        });
        controllerq2.onChange(function(value) {
          updateq1(value)
        });
      
      
      function updateq1(){
          spheres.forEach(s => {
            scene.remove(s.obj)
          })
          spheres = []
          for (let i = 0; i < params.q2.rep; i++) {
            let s = new FloatingObj()
            spheres.push(s)
            scene.add(s.obj)
          }
      }
      
      var animateq1 = function () {
        for (let i = 0; i < spheres.length; i++) {
          spheres[i].obj.rotation.y += 0.01;
          spheres[i].obj.position.y = (Math.cos((Date.now()+i*500)*0.001)*1)+spheres[i].y;
          
        }
      };

      /********** Q3 */

      var geometryPlane = new THREE.PlaneGeometry( 500, 500, params.q3.freq, params.q3.freq );
var material = new THREE.MeshLambertMaterial( {color: 0xf2d4c2, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometryPlane, material );
plane.rotation.x = Math.PI/2
plane.position.y = 0
scene.add( plane );
let count = 0

for (var i = 0; i < geometryPlane.vertices.length; i++) {
  geometryPlane.vertices[i].z += Math.random() * params.q3.amp - params.q3.amp;
  geometryPlane.vertices[i]._myZ = geometryPlane.vertices[i].z
    plane.geometry.verticesNeedUpdate = true;
}

/*var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, 5, -100 );
scene.add( light );*/

camera.position.z = 5;
camera.position.y = 15;
camera.rotation.x = Math.PI / 16

controllerq31.onChange(function(value) {
    updateq3(value)
  });

  controllerq32.onChange(function(value) {
    updateq3(value)
  });

  function updateq3(val){
    scene.remove(plane)
    geometryPlane = new THREE.PlaneGeometry( 500, 500, params.q3.freq, params.q3.freq );
    material = new THREE.MeshLambertMaterial( {color: 0xf2d4c2, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometryPlane, material );
    plane.rotation.x = Math.PI/2
    plane.position.y = 0
    scene.add( plane );
    count = 0
    for (var i = 0; i < geometryPlane.vertices.length; i++) {
      geometryPlane.vertices[i].z += Math.random() * params.q3.amp - params.q3.amp;
      geometryPlane.vertices[i]._myZ = geometryPlane.vertices[i].z
        plane.geometry.verticesNeedUpdate = true;
    }
  }
var animateq3 = function () {
    for (var i = 0; i < geometryPlane.vertices.length; i++) {
        var z = +geometryPlane.vertices[i].z;
        geometryPlane.vertices[i].z = Math.sin(( i + count * 0.00002)) * (geometryPlane.vertices[i]._myZ - (geometryPlane.vertices[i]._myZ* 0.6))
        plane.geometry.verticesNeedUpdate = true;
  
        count += 1
      }
};

/***** Q5 */

controllerq5.onChange(function(value) {
    updateq5(value)
  });

  function updateq5(val){

  }
var animateq5 = function () {

}

/********* Q6 */

class Box {
    constructor(mom){
    this.obj = new THREE.Object3D()
    var geometryBox = new THREE.SphereGeometry(500, 64, 64, 2);

    switch (mom) {
      case 0:
        var materialBox = new THREE.MeshLambertMaterial( {color: 0x9198c7, side: THREE.BackSide} );
        var light = new THREE.PointLight( 0xc6c8f8, 0.5, 2000, 2 );
        var ambientLight = new THREE.AmbientLight( 0x444444 ) // soft white light
        break;

      case 1:
        var materialBox = new THREE.MeshLambertMaterial( {color: 0xffffe0, side: THREE.BackSide} );
        var light = new THREE.PointLight( 0xf7d0d6, 0.5, 2000, 2 );
        var ambientLight = new THREE.AmbientLight( 0xaaaaaa ) // soft white light
        break;

      case 2:
        var materialBox = new THREE.MeshLambertMaterial( {color: 0x94bfe0, side: THREE.BackSide} );
        var light = new THREE.PointLight( 0xffffff, 0.5, 2000, 2 );
        var ambientLight = new THREE.AmbientLight( 0xcccccc ) // soft white light
        break;

      case 3:
        var materialBox = new THREE.MeshLambertMaterial( {color: 0xf0b1b1, side: THREE.BackSide} );
        var light = new THREE.PointLight( 0xeb4a3e, 0.5, 2000, 2 );
        var ambientLight = new THREE.AmbientLight( 0x999999 ) // soft white light
        break;

      case 4:
        var materialBox = new THREE.MeshLambertMaterial( {color: 0x000041, side: THREE.BackSide} );
        var light = new THREE.PointLight( 0xc6c8f8, 0.5, 2000, 2 );
        var ambientLight = new THREE.AmbientLight( 0x444444 ) // soft white light
        break;
    
      default:
        console.log(mom)
        break;
    }

    var sphere = new THREE.Mesh(geometryBox, materialBox);

    
    light.position.set( 0, 100, -420 );
    this.obj.add( light );
    this.obj.add(ambientLight)

    var pointLightHelper = new THREE.PointLightHelper( light, 3 );
    //this.obj.add( pointLightHelper );

      this.obj.add(sphere)
    }
  }

  let box = new Box(params.q6.rep)
  scene.add(box.obj)
  controllerq6.onChange(function(value) {
    updateq6(value)
  });

  function updateq6(val){
    scene.remove(box.obj)
    box = new Box(params.q6.rep)
    scene.add(box.obj)
  }
var animateq6 = function () {

};

/********* Scene */

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00, emissive: 0x2a2a2a } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

/*var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 2, 2, 2 );
scene.add( light );*/

camera.position.z = 5;

var animateUniv = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animateUniv();
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
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}