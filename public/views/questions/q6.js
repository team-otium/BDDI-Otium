/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
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
    document.querySelector(".circle").style.display = "block"
    document.querySelector(".circleIn").style.display = "block"
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

        if (ValidationBtn.touch === true) {
        } else {
            socket.emit("q6", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
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
        <h1 class="question_desktop">Quel est le moment de la journée le plus agréable visuellement ?</h1>
    </div>
    <div class="nav">
        <ul>
            <li id="leverSoleil">Lever de soleil</li>
            <li id="matin">Petit matin</li>
            <li id="journee">Journée</li>
            <li id="coucherDeSoleil">Coucher de soleil</li>
            <li id="nuit">Nuit</li>
        </ul>
    </div>

    <div class="tuto"><img src="/both/assets/img/tuto-q6.gif"></div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["q6", (eventData) => {

    /**
     * 0 = leverSoleil
     * 1 = matin
     * 2 = journée
     * 3 = coucher de soleil
     * 4 = nuit
     */

    if (eventData.tiltFB >= 0 && eventData.tiltFB < 20) {
        let moment = 0
        if (window.moment != moment) {
            window.moment = 0
            
            document.getElementById('leverSoleil').classList.add("animNav");

            document.getElementById('matin').classList.remove("animNav");
            document.getElementById('journee').classList.remove("animNav");
            document.getElementById('coucherDeSoleil').classList.remove("animNav");
            document.getElementById('nuit').classList.remove("animNav");

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
    if (eventData.tiltFB >= 20 && eventData.tiltFB < 40) {
        let moment = 1
        if (window.moment != moment) {
            window.moment = 1

            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('matin').classList.add("animNav");

            document.getElementById('leverSoleil').classList.remove("animNav");
            document.getElementById('journee').classList.remove("animNav");
            document.getElementById('coucherDeSoleil').classList.remove("animNav");
            document.getElementById('nuit').classList.remove("animNav");

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
    if (eventData.tiltFB >= 40 && eventData.tiltFB < 60) {
        let moment = 2
        if (window.moment != moment) {
            window.moment = 2

            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('journee').classList.add("animNav");

            document.getElementById('leverSoleil').classList.remove("animNav");
            document.getElementById('matin').classList.remove("animNav");
            document.getElementById('coucherDeSoleil').classList.remove("animNav");
            document.getElementById('nuit').classList.remove("animNav");

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
    if (eventData.tiltFB >= 60 && eventData.tiltFB < 80) {
        let moment = 3
        if (window.moment != moment) {
            window.moment = 3

            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('coucherDeSoleil').classList.add("animNav");

            document.getElementById('leverSoleil').classList.remove("animNav");
            document.getElementById('matin').classList.remove("animNav");
            document.getElementById('journee').classList.remove("animNav");
            document.getElementById('nuit').classList.remove("animNav");

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
    if (eventData.tiltFB >= 80 && eventData.tiltFB < 100) {
        let moment = 4
        if (window.moment != moment) {
            window.moment = 4

            document.getElementById('background_anim').innerHTML = ""
            document.getElementById('nuit').classList.add("animNav");

            document.getElementById('leverSoleil').classList.remove("animNav");
            document.getElementById('matin').classList.remove("animNav");
            document.getElementById('journee').classList.remove("animNav");
            document.getElementById('nuit').classList.remove("animNav");

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

    /**************** 
     *** TIMELINE ***
     ****************/
    document.querySelector('.q6').style.fill = "#ffffff"
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
