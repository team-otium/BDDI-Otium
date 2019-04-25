/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
 
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
    <button id="test1">Nuit</button>
    <button id="test2">Lever du soleil/button>
    <button id="test3">Petit matin</button>
    <button id="test4">Journée</button>
</div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {
    let backgroundTest1;
    let backgroundTest2;
    let backgroundTest3;
    let backgroundTest4;

    document.getElementById("test1").onclick = function (){
        background.destroy()
        backgroundTest1 = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0x055ca4,
            midtoneColor: 0x9198c7,
            baseColor: 0x000041,
            blurFactor: 0.70,
            speed: 0.70,
            zoom: 0.40
          })
    }
    document.getElementById("test2").onclick = function (){
        backgroundTest1.destroy()
        backgroundTest2 = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0xc6c8f8,
            midtoneColor: 0xf1a9b4,
            lowlightColor: 0xf7d0d6,
            baseColor: 0x9198c7,
            blurFactor: 0.70,
            speed: 0.70,
            zoom: 0.40
          })
    }
    document.getElementById("test3").onclick = function (){
        backgroundTest2.destroy()
        backgroundTest3 = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0xe6aaaf,
            midtoneColor: 0xbee1f7,
            lowlightColor: 0x606289,
            baseColor: 0xffffff,
            blurFactor: 0.70,
            speed: 0.70,
            zoom: 0.40
          })
    }
    document.getElementById("test4").onclick = function (){
        backgroundTest3.destroy()
        backgroundTest4 = VANTA.FOG({
            el: "#background_anim",
            highlightColor: 0xffffff,
            midtoneColor: 0xa5e0fa,
            lowlightColor: 0xbadaf5,
            baseColor: 0x94bfe0,
            blurFactor: 0.70,
            speed: 0.70,
            zoom: 0.40
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
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
 