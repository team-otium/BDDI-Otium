/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
 <div class="center_div">
    
    <div id="curseur_frequence"><img class="cursor_frequence" src="/both/assets/img/cursor.png" alt=""></div>
    <div id="curseur_amplitude"><img class="cursor_amplitude" src="/both/assets/img/cursor.png" alt=""></div>
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
     
    /************* FREQUENCE ************/
    function startDragFrequence(e) {
        this.ontouchmove = this.onmspointermove = moveDragFrequence;
      
        this.ontouchend = this.onmspointerupFrequence = function () {
          this.ontouchmove = this.onmspointermove = null;
          this.ontouchend = this.onmspointerupFrequence = null;
        }
      
        var pos = [this.offsetLeft];
        var origin = getCoorsFrequence(e);
      
        function moveDragFrequence(e) {
          var currentPos = getCoorsFrequence(e);
          var deltaX = currentPos[0] - origin[0];
          this.style.left = (pos[0] + deltaX) + 'px';
          return false; // cancels scrolling
        }
      
        function getCoorsFrequence(e) {
          var coors = [];
          if (e.targetTouches && e.targetTouches.length) {
            var thisTouch = e.targetTouches[0];
            coors[0] = thisTouch.clientX;
          } else {
            coors[0] = e.clientX;
          }
          return coors;
        }
      }
      
      var elements = document.querySelectorAll('.cursor_frequence');
      [].forEach.call(elements, function (element) {
        element.ontouchstart = element.onmspointerdown = startDragFrequence;
      });

    /************* AMPLITUDE ************/
    function startDrag(e) {
        this.ontouchmove = this.onmspointermove = moveDrag;
      
        this.ontouchend = this.onmspointerup = function () {
          this.ontouchmove = this.onmspointermove = null;
          this.ontouchend = this.onmspointerup = null;
        }
      
        var pos = [this.offsetLeft, this.offsetTop];
        var origin = getCoors(e);
      
        function moveDrag(e) {
          var currentPos = getCoors(e);
          var deltaY = currentPos[1] - origin[1];
          this.style.top = (pos[1] + deltaY) + 'px';
          return false; // cancels scrolling
        }
      
        function getCoors(e) {
          var coors = [];
          if (e.targetTouches && e.targetTouches.length) {
            var thisTouch = e.targetTouches[0];
            coors[1] = thisTouch.clientY;
          } else {
            coors[1] = e.clientY;
          }
          return coors;
        }
      }
      
      var elements = document.querySelectorAll('.cursor_amplitude');
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
 <canvas id="line"></canvas>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {
    var thecanvas = document.getElementById("line");
    var ctx = thecanvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.bezierCurveTo(300,200,300,100,800,100);
    ctx.stroke();
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
