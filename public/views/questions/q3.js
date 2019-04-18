/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
 <div class="controls">
 <label for="length">Fréquence</label>
 <input type="range" id="length" min="10" max="100" value="30" class="input input-length">
 
 <label for="amplitute">Amplitute</label>
 <input type="range" id="amplitute" min="0" max="90" value="45" class="input input-amplitute">
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
 }
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
 <div class="text_center">
    <h1>Modulez la ligne qui vous apaise</h1>
 </div>

 <div id="line">
    <svg class="svg_line">
        <path></path>
    </svg>

    <div class="controls">
        <label for="length">Fréquence</label>
        <input type="range" id="length" min="10" max="100" value="30" class="input input-length">
        
        <label for="amplitute">Amplitute</label>
        <input type="range" id="amplitute" min="0" max="90" value="45" class="input input-amplitute">
    </div>
 </div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {
    // Get input tags
    const waveLengthInput = document.querySelector('input.input-length')
    const waveAmplituteInput = document.querySelector('input.input-amplitute')

    // Get control input values
    let waveLength = waveLengthInput.value
    let waveAmplitute = waveAmplituteInput.value


    var width = window.innerWidth

    // Listen to inputs and assign their values to the control variables
    waveLengthInput.addEventListener('input', event => {
        waveLength = event.currentTarget.value
    })

    waveAmplituteInput.addEventListener('input', event => {
        waveAmplitute = event.currentTarget.value
    })


    // ***********

    let xs = []

    for (let i = 5; i <= width; i++) {
        xs.push(i)
    }

    const animate = () => {
        let points = xs.map( x => {
            let y = 100 + waveAmplitute * Math.sin( (x) / waveLength )
            return [x, y]
        })
        
        let path = 'M' + points.map( p => {
            return p[0] + ',' + p[1]
        }).join(' L')
        
        document.querySelector('path').setAttribute('d', path)
        
        requestAnimationFrame(animate)
    }

    animate()
 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 q3_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
q3_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
