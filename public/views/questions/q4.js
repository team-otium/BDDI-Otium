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

    function init() {
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

    init()
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
 <div class="text_center">
    <h1>Question 4</h1>
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
    function init() {
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

    init()
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