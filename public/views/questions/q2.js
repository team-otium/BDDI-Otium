/**************************  
**************************  QUESTION 2
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div class="text_center_mobile">
        <h1 class="question_mobile">Avez-vous l'impression de manquer d'air ?</h1>
    </div>
 `

// All listeners, one variable per listener
mobile_listener1 = ["#q2_target", "touchstart", (e) => {
    if (e.touches.length === 2) {
        scaling = true;
        //pinchStart(e);
        start_move = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2))
    }
}]

mobile_listener2 = ["#q2_target", "touchmove", (e) => {
    if (scaling) {
        //pinchMove(e);
        let act_move = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2))

        if (start_move < act_move) {
            console.log("dezoom")
            socket.emit("q2_doigt", "zoom")
        } else if (start_move > act_move) {
            console.log("zoom")
            socket.emit("q2_doigt", "dezoom")
        }
        start_move = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2))
    }
}]

mobile_listener3 = ["#q2_target", "touchend", (e) => {
        if (scaling) {
            //pinchEnd(e);
            scaling = false;
        }
    }]
    /** And more... */

// Socket on

// Script to be executed when the page is displayed
mobile_script = () => {
    document.querySelector(".circle1").style.display = "block"
    document.querySelector(".circle2").style.display = "block"

    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q2
    ValidationBtn.nextPage = questions.q3
    ValidationBtn.actualQ = "2"
    ValidationBtn.nextQ = "3"

    let scaling = false
    let start_move = []

}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
 <div class="text_center">
    <h1 class="question_desktop">Avez-vous l'impression de manquer d'air ?</h1>
 </div>
 
 <div class="contain">
    <div id="bulles"></div>
 </div>

 <div class="tuto2"><img src="/both/assets/img/tuto/tuto_2.gif"></div>

 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["q2_doigt", (data) => {
    if (data === "dezoom") {
        window.actBulles += 30
    } else if (data === "zoom") {
        window.actBulles -= 30
    }
    for (let i = 0; i < window.bulles.length; i++) {
        console.log(data, window.actBulles)
        /*if (window.bulles[i].x == "left") {
            window.bulles[i].el.style.left = window.bulles[i].left + window.actBulles + "px"
        } else {
            window.bulles[i].el.style.left = window.bulles[i].left - window.actBulles + "px"
        }

        if (window.bulles[i].y == "top") {
           // window.bulles[i].el.style.top = window.bulles[i].top + window.actBulles + "px"
        } else {
           // window.bulles[i].el.style.top = window.bulles[i].top - window.actBulles + "px"
        }*/
    }
}]

desktop_script = () => {
    window.q2animate = true
    window.bulles = []
    for (let i = 0; i < (window.innerWidth / 180) * ((window.innerHeight / 140) + 1); i++) {
        let minPx = Math.ceil(-50);
        let maxPx = Math.floor(50);
        let scale = Math.random()
        let div = document.createElement("div")
        let left, top
        left = Math.random() * (maxPx - minPx + 1) + minPx
        top = Math.random() * (maxPx - minPx + 1) + minPx
        div.style.left = left + "px"
        div.style.top = top + "px"
        div.style.transform = "scale(" + scale + ")"
        div.style.opacity = 0.5 * scale

        div.classList.add("bulle")
        document.getElementById("bulles").appendChild(div)

        var x,y
        var bound = div.getBoundingClientRect()
        console.log(parseInt(bound.left))
        if (parseInt(div.offsetLeft) < (window.innerWidth/2)) {
            x = "left"
        } else {
            x = "right"
        }

        if (parseInt(bound.top) > window.innerHeight/2) {
            y = "bottom"
        } else {
            y = "top"
        }

        window.bulles.push({ el: div, speed: scale * 10, opacity: div.style.opacity, offset: parseInt(div.offsetTop), x:x, y:y, top: top, left: left})
    }

    window.maxBulles = window.bulles.length
    window.actBulles = 0
    requestAnimationFrame(bullesAnimation)

    function bullesAnimation() {
        for (let i = 0; i < window.bulles.length; i++) {
            window.bulles[i].el.classList.remove("none")
            if (window.bulles[i].x == "left") {
                window.bulles[i].el.style.left = window.bulles[i].left + window.actBulles * (window.bulles[i].speed/10) + "px"
            } else {
                window.bulles[i].el.style.left = window.bulles[i].left + (- window.actBulles) * (window.bulles[i].speed/10) + "px"
            }
    
            if (window.bulles[i].y == "top") {
                let top = parseInt(window.bulles[i].el.style.top) + window.bulles[i].speed
               window.bulles[i].el.style.top = top + "px"
            } else {
                let top = parseInt(window.bulles[i].el.style.top) + window.bulles[i].speed
               window.bulles[i].el.style.top = top + "px"
            }

            if (window.bulles[i].el.offsetTop >= window.innerHeight + 200) {
                window.bulles[i].el.style.top = 0 - window.bulles[i].offset - 200 + "px"
            }
        }
        if (window.q2animate) {
            requestAnimationFrame(bullesAnimation)
        }
    }
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q2_mobile = {
    html: mobile_html,
    listeners: [mobile_listener1, mobile_listener2, mobile_listener3],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

q2_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}
