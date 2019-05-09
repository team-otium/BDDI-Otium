/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
    <div class="fondu_valider">
        <img src="/both/assets/img/valider.png" alt="">
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
    setTimeout(() => {
        intro.button_valider.transitionTo("mobile", questions.q1)
    }, 2000)


    // FULL SCREEN
    function launchIntoFullscreen(element) {
        if(element.requestFullscreen) {
        element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
        }
    }

  launchIntoFullscreen(document.documentElement);

}
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
    <div class="fondu_valider">
        <img src="/both/assets/img/valider.png" alt="">
    </div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
desktop_script = () => {
    setTimeout(() => {
        intro.button_valider.transitionTo("desktop", questions.q1)
        intro.timeline.displayPage("desktop")
    }, 2000)
}
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
button_valider_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
 button_valider_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
 