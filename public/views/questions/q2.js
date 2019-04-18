/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
 <div id="q2_target"></div>
 `
 
  // All listeners, one variable per listener
 mobile_listener1 = ["#q2_target", "touchstart", (e) => {
    if (e.touches.length === 2) {
        scaling = true;
        //pinchStart(e);
        start_move = Math.sqrt( Math.pow(e.touches[1].pageX - e.touches[0].pageX,2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY,2) )
    }
 }]
 
 mobile_listener2 = ["#q2_target", "touchmove", (e) => {
    if (scaling) {
        //pinchMove(e);
        let act_move = Math.sqrt( Math.pow(e.touches[1].pageX - e.touches[0].pageX,2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY,2) )

        if (start_move < act_move) {
            console.log("dezoom")
            socket.emit("q2_doigt", "zoom")
        } else if (start_move > act_move) {
            console.log("zoom")
            socket.emit("q2_doigt", "dezoom")
        }
        start_move = Math.sqrt( Math.pow(e.touches[1].pageX - e.touches[0].pageX,2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY,2) )
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
 <h1 class="text_center">Avez-vous l'impression de manquer d'air ?</h1>
<div id="bulles"></div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]

 desktop_socketOn1 = ["q2_doigt", (data) => {
    if (data === "dezoom") {
        window.actBulles -= 3
        if(window.actBulles < 0){
            window.actBulles = 0
        }
    } else if (data === "zoom") {
        window.actBulles += 3
        if(window.actBulles > window.maxBulles){
            window.actBulles = window.maxBulles
        }
    }
}]
 
 desktop_script = () => {
     let bulles = []
    for(let i=0; i < (window.innerWidth/180) * ((window.innerHeight/140)+1); i++){
        let minPx = Math.ceil(-50);
        let maxPx = Math.floor(50);
        let scale = Math.random()
        let div = document.createElement("div")
        div.style.left = Math.random() * (maxPx - minPx +1) + minPx + "px"
        div.style.top = Math.random() * (maxPx - minPx +1) + minPx + "px"
        div.style.transform = "scale(" + scale + ")"
        div.style.opacity =  0.5 * scale
        
        div.classList.add("bulle")
        document.getElementById("bulles").appendChild(div)

        bulles.push({el: div, speed: scale * 10, opacity: div.style.opacity, offset: parseInt(div.offsetTop)})
    }

    window.maxBulles = bulles.length
    window.actBulles = window.maxBulles
    requestAnimationFrame(bullesAnimation)
    function bullesAnimation() {
        for (let i = 0; i < window.actBulles; i++) {
            bulles[i].el.classList.remove("none")
            bulles[i].el.style.top = (parseInt(bulles[i].el.style.top) + bulles[i].speed) + "px"
            if (bulles[i].el.offsetTop >= window.innerHeight + 200) {
                bulles[i].el.style.top = 0 - bulles[i].offset - 200 + "px"
            }
        }
        for(let i = bulles.length - 1; i >= window.actBulles; i--) {
            bulles[i].el.classList.add("none")
        }
        requestAnimationFrame(bullesAnimation)
    }
 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 q2_mobile = {
     html: mobile_html,
     listeners: [ mobile_listener1,  mobile_listener2,  mobile_listener3],
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