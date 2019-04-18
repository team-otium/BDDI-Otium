/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
 <div class="center_div">
    
    <div id="curseur_frequence"><img class="text_element" src="/both/assets/img/cursor.png" alt=""></div>
    <div id="curseur_amplitude"><img class="text_element" src="/both/assets/img/cursor.png" alt=""></div>
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
     
    function startDrag(e) {
        this.ontouchmove = this.onmspointermove = moveDrag;
      
        this.ontouchend = this.onmspointerup = function () {
          this.ontouchmove = this.onmspointermove = null;
          this.ontouchend = this.onmspointerup = null;
        }
      
        var pos = [this.offsetLeft, this.offsetTop];
        var that = this;
        var origin = getCoors(e);
      
        function moveDrag(e) {
          var currentPos = getCoors(e);
          var deltaX = currentPos[0] - origin[0];
          var deltaY = currentPos[1] - origin[1];
          this.style.left = (pos[0] + deltaX) + 'px';
          this.style.top = (pos[1] + deltaY) + 'px';
          return false; // cancels scrolling
        }
      
        function getCoors(e) {
          var coors = [];
          if (e.targetTouches && e.targetTouches.length) {
            var thisTouch = e.targetTouches[0];
            coors[0] = thisTouch.clientX;
            coors[1] = thisTouch.clientY;
          } else {
            coors[0] = e.clientX;
            coors[1] = e.clientY;
          }
          return coors;
        }
      }
      
      var elements = document.querySelectorAll('.text_element');
      [].forEach.call(elements, function (element) {
        element.ontouchstart = element.onmspointerdown = startDrag;
      });
      
      document.ongesturechange = function () {
        return false;
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
