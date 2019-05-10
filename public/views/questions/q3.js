/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
   <div class="controls">
      <input type="range" id="length" min="10" max="100" value="30" class="input input-length">
      <input type="range" id="amplitude" min="0" max="90" value="45" class="input input-amplitude">
   </div>

   <div class="text_center_mobile">
      <h1 class="question_mobile">Modulez la ligne qui vous apaise</h1>
   </div>
 `
 
  // All listeners, one variable per listener
 mobile_listener1 = ["input.input-amplitude", "input", (event) => {
    waveAmplitude = event.currentTarget.value
    socket.emit("q3", {amplitude:waveAmplitude, length:waveLength});
 }]
 
 mobile_listener2 = ["input.input-length", "input", (event) => {
    waveLength = event.currentTarget.value
    socket.emit("q3", {amplitude:waveAmplitude, length:waveLength});
 }]

 /** And more... */
 
 // Socket on
 
 // Script to be executed when the page is displayed
 mobile_script = () => {
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q3
    ValidationBtn.nextPage = questions.q4
    ValidationBtn.actualQ = "3"
    ValidationBtn.nextQ = "4"

    // Get control input values
    let waveLength = document.querySelector('input.input-length').value
    let waveAmplitude = document.querySelector('input.input-amplitude').value
 }
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
 <div class="text_center">
    <h1 class="question_desktop">Modulez la ligne qui vous apaise</h1>
 </div>

 <div id="line">
    <svg class="svg_line">
        <path></path>
    </svg>


 </div>
 `

 desktop_socketOn1 = ["q3", (data) => {
    // Get control input values
    window.waveLength = parseInt(data.length)
    window.waveAmplitude = parseInt(data.amplitude)
}]
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {

    // Get control input values
    window.waveLength = 30
    window.waveAmplitude = 45
        
    // ***********

    var width = window.innerWidth

    let xs = []

    for (let i = 5; i <= width; i++) {
        xs.push(i)
    }

    const animate = () => {
        let points = xs.map( x => {
            let y = 100 + window.waveAmplitude * Math.sin( (x) / window.waveLength )
            return [x, y]
        })
        
        let path = 'M' + points.map( p => {
            return p[0] + ',' + p[1]
        }).join(' L')
        
        document.querySelector('path').setAttribute('d', path)
        
        requestAnimationFrame(animate)
    }

    animate()

        /**************** TIMELINE ****************/

        document.querySelector('.q3').style.fill = "#ffffff"
 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 q3_mobile = {
     html: mobile_html,
     listeners: [mobile_listener1, mobile_listener2],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
q3_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [desktop_socketOn1],
     script: desktop_script,
     transitions: desktop_transition,
 }
