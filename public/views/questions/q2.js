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
        } else if (start_move > act_move) {
            console.log("zoom")
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

 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {
    for(let i=0; i < 20; i++){
        let div = document.createElement("div")
        div.classList.add("bulle")
        document.getElementById("q2").appendChild(div)
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
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
 