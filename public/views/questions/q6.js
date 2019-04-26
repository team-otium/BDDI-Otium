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
<div class="text_center">
 <h1>Question 6</h1>
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
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q6
    ValidationBtn.nextPage = questions.q7
    ValidationBtn.actualQ = "6"
    ValidationBtn.nextQ = "7"

    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    }

    function deviceOrientationHandler(eventData) {
        var tiltLR = eventData.gamma;
        var tiltFB = eventData.beta;
        var dir = eventData.alpha;

        document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
        document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
        document.getElementById("doDirection").innerHTML = Math.round(dir);

        socket.emit("q6", {tiltFB:eventData.beta, tiltLR:eventData.gamma, dir:eventData.alpha});
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
    <h1>Quel est le moment de la journée le plus agréable visuellement ?</h1>
    <button id="leverSoleil">Lever du soleil</button>
    <button id="matin">Petit matin</button>
    <button id="journée">Journée</button>
    <button id="coucherSoleil">Coucher du soleil</button>
    <button id="nuit">Nuit</button>
</div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]

 desktop_socketOn1 = ["q6", (eventData) => {

}]
 
 desktop_script = () => {
    let backgroundleverSoleil;
    let backgroundmatin;
    let backgroundjournée;
    let backgroundcoucherSoleil;
    let backgroundnuit;

    document.getElementById("leverSoleil").onclick = function (){

        backgroundleverSoleil = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0xc6c8f8,
            midtoneColor: 0xf1a9b4,
            lowlightColor: 0xf7d0d6,
            baseColor: 0x9198c7,
            blurFactor: 0.70,
            speed: 1.50,
            zoom: 0.40
          })
    }
    document.getElementById("matin").onclick = function (){

        backgroundmatin = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0xe6aaaf,
            midtoneColor: 0xbee1f7,
            lowlightColor: 0x606289,
            baseColor: 0xffffff,
            blurFactor: 0.70,
            speed: 1.50,
            zoom: 0.40
          })
    }
    document.getElementById("journée").onclick = function (){

        backgroundjournée = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0xffffff,
            midtoneColor: 0xa5e0fa,
            lowlightColor: 0xbadaf5,
            baseColor: 0x94bfe0,
            blurFactor: 0.70,
            speed: 1.50,
            zoom: 0.40
          })
    }
    document.getElementById("coucherSoleil").onclick = function (){

        backgroundcoucherSoleil = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0xeb4a3e,
            midtoneColor: 0xfcb83b,
            lowlightColor: 0xf9cf72,
            baseColor: 0xf27e38,
            blurFactor: 0.70,
            speed: 1.50,
            zoom: 1.00
          })
    }
    document.getElementById("nuit").onclick = function (){

        backgroundnuit = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0x055ca4,
            midtoneColor: 0x9198c7,
            lowlightColor: 0x024391,
            baseColor: 0x000041,
            blurFactor: 0.70,
            speed: 1.50,
            zoom: 0.30
          })
    }
 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 q6_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
q6_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [desktop_socketOn1],
     script: desktop_script,
     transitions: desktop_transition,
 }
 