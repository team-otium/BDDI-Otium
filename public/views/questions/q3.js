/**************************  
**************************  QUESTION 3
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
   <div class="text_center_mobile">
      <h1 class="question_mobile">Modulez la ligne qui vous apaise</h1>
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
    ValidationBtn.actualPage = questions.q3
    ValidationBtn.nextPage = questions.q4
    ValidationBtn.actualQ = "3"
    ValidationBtn.nextQ = "4"

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

            if (ValidationBtn.touch === false) {
                socket.emit("q3", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
            }            
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
 <!--<table class="table table-striped table-bordered" style="position: absolute; z-index:50">
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
 </table>-->
 <div class="text_center">
    <h1 class="question_desktop">Modulez la ligne qui vous apaise</h1>
 </div>

 <canvas id="canvas" style="position: absolute; z-index: 100; height: 100%"></canvas>

 <div class="tuto"><img src="/both/assets/img/tuto-q3.gif"></div>
 `

desktop_socketOn1 = ["q3", (eventData) => {

    // document.getElementById("doTiltLR").innerHTML = Math.round(eventData.tiltLR);
    // document.getElementById("doTiltFB").innerHTML = Math.round(eventData.tiltFB);
    // document.getElementById("doDirection").innerHTML = Math.round(eventData.dir);

    if (eventData.tiltFB >= 0 && eventData.tiltFB <= 90) {
        window.amp = Math.round(eventData.tiltFB);
    }
    //window.freq = Math.round(eventData.tiltLR)/100;
}]

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_script = () => {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    
    var MAX_LINES = 6;
    window.amp = 0;
    var freq = 0.025;
    var rate = 0;
    
    var ctr = 0;
    function draw() {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = 400;
      ctx.moveTo(0, h/2); //start at left center
      ctr++;
      for (var i = 1; i < MAX_LINES; i++) {
        ctr++;
        rate = ctr/2250;
        ctx.beginPath();
        for (var x = 0; x < w; x++) {
          y = Math.sin(x * freq * (i/3) + rate) * window.amp / i;
          ctx.lineTo(x, y + h/2);
        }//for
        ctx.strokeStyle = "white";
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }//for
      
    }
    
    setInterval(draw, 1);

    /**************** 
     *** TIMELINE ***
     ****************/
    //document.querySelector('.q3').style.fill = "#ffffff"
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q3_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

q3_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}
