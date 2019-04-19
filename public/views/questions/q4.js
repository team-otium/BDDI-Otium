/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
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
 <div id="ball"></div>
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
    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    } else {
        document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
    }

    function deviceOrientationHandler(eventData) {
        var tiltLR = eventData.gamma;
        var tiltFB = eventData.beta;
        var dir = eventData.alpha;

        document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
        document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
        document.getElementById("doDirection").innerHTML = Math.round(dir);

        socket.emit("q4", {tiltFB:eventData.beta, tiltLR:eventData.gamma, dir:eventData.alpha});
    }
}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
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
<div id="ball"></div>
 <div class="text_center">
    <h1>Ceci est la question 4</h1>
</div>
 `

desktop_socketOn1 = ["q4", (data) => {
        document.getElementById("doTiltLR").innerHTML = Math.round(data.beta);
        document.getElementById("doTiltFB").innerHTML = Math.round(data.gamma);
        document.getElementById("doDirection").innerHTML = Math.round(data.alpha);
}]

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_script = () => {

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
