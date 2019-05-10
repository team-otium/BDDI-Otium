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
    <div class="text_center_mobile">
        <h1 class="question_mobile">Quel est le moment de la journée le plus agréable visuellement ?</h1>
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
        <h1 class="question_desktop">Quel est le moment de la journée le plus agréable visuellement ?</h1>
    </div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]

 desktop_socketOn1 = ["q6", (eventData) => {

    if (eventData.tiltFB > -50 && eventData.tiltFB < -80){
        let moment = 0
        if (window.moment != moment) {
            window.moment = 0

            document.getElementById('background_anim').style.opacity = "1";
            document.getElementById('background_anim').style.transition = "2s";
            
            setTimeout(() => {
            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('background_anim').style.opacity = "0.5";
            }, 2000)

            VANTA.FOG({
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
    }
    if (eventData.tiltFB >= -80 && eventData.tiltFB < 10){
        let moment = 1
        if (window.moment != moment) {
            window.moment = 1
            
            document.getElementById('background_anim').style.opacity = "1";
            document.getElementById('background_anim').style.transition = "2s";
            
            setTimeout(() => {
            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('background_anim').style.opacity = "0.5";
            }, 2000)

            VANTA.FOG({
                el: "#background_anim",
                highlightColor: 0xf7d0d6,
                midtoneColor: 0xc6c8f8,
                lowlightColor: 0xdebeb5,
                baseColor: 0xffffe0,
                blurFactor: 0.70,
                speed: 1.50,
                zoom: 0.40
              })
        }
    }
    if (eventData.tiltFB >= 10 && eventData.tiltFB < 40){
        let moment = 2
        if (window.moment != moment) {
            window.moment = 2
            
            document.getElementById('background_anim').style.opacity = "1";
            document.getElementById('background_anim').style.transition = "2s";
            
            setTimeout(() => {
            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('background_anim').style.opacity = "0.5";
            }, 2000)

            VANTA.FOG({
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
    }
    if (eventData.tiltFB >= 40 && eventData.tiltFB < 70){
        let moment = 3
        if (window.moment != moment) {
            window.moment = 3
            
            document.getElementById('background_anim').style.opacity = "1";
            document.getElementById('background_anim').style.transition = "2s";
            
            setTimeout(() => {
            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('background_anim').style.opacity = "0.5";
            }, 2000)

            VANTA.FOG({
                el: "#background_anim",
                highlightColor: 0xeb4a3e,
                midtoneColor: 0xf7e0b0,
                lowlightColor: 0xfcb83b,
                baseColor: 0xf0b1b1,
                blurFactor: 0.70,
                speed: 1.50,
                zoom: 0.40
              })
        }   
    }
    if (eventData.tiltFB >= 70 && eventData.tiltFB < 100){
        let moment = 4
        if (window.moment != moment) {
            window.moment = 4
            
            document.getElementById('background_anim').style.opacity = "1";
            document.getElementById('background_anim').style.transition = "2s";
            
            setTimeout(() => {
            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('background_anim').style.opacity = "0.5";
            }, 2000)

            VANTA.FOG({
                el: "#background_anim",
                highlightColor: 0x055ca4,
                midtoneColor: 0x9198c7,
                lowlightColor: 0x024391,
                baseColor: 0x000041,
                blurFactor: 0.70,
                speed: 1.50,
                zoom: 0.40
              })
        }   
    }
}]
 
 desktop_script = () => {

    /**
     * 0 = leverSoleil
     * 1 = matin
     * 2 = journée
     * 3 = coucher de soleil
     * 4 = nuit
     */
    window.moment = 0

    document.getElementById('background_anim').innerHTML = ""
    VANTA.FOG({
        el: "#background_anim",
        highlightColor: 0xc6c8f8,
        midtoneColor: 0xf1a9b4,
        lowlightColor: 0xf7d0d6,
        baseColor: 0x9198c7,
        blurFactor: 0.70,
        speed: 1.50,
        zoom: 0.40
      })

          /**************** TIMELINE ****************/

    //document.querySelector('.q6').style.fill = "#ffffff"
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
 