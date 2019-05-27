/**************************  
**************************  QUESTION 3
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
   <div class="text_center_mobile">
      <h1 class="question_mobile">Modulez la ligne qui vous apaise</h1>
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
    document.querySelector(".circle1").style.display = "block"
    document.querySelector(".circle2").style.display = "block"
    
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q3
    ValidationBtn.nextPage = questions.q4
    ValidationBtn.actualQ = "3"
    ValidationBtn.nextQ = "4"

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (eventData) {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha;

            if (ValidationBtn.touch === true) {
            } else {
                socket.emit("q3", { tiltFB: eventData.beta, tiltLR: eventData.gamma, dir: eventData.alpha });
            }
        })
    } else {
        alert("Sorry, your browser doesn't support Device Orientation");
    };
}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
 <table class="table table-striped table-bordered" style="position: absolute; z-index:50">
 <tr>
     <td>Tilt Left/Right [gamma]</td>
     <td id="doTiltLR"></td>
 </tr>
 <tr>
     <td>Tilt Front/Back [beta]</td>
     <td id="doTiltFB"></td>
 </tr>
 <tr>
     <td>Direction [alpha]</td>
     <td id="doDirection"></td>
 </tr>
 </table>
 <div class="text_center">
    <h1 class="question_desktop">Modulez la ligne qui vous apaise</h1>
 </div>

 <div id="line" style="position: absolute; z-index: 100"></div>

 <div class="tuto"><img src="/both/assets/img/tuto-q3.gif"></div>
 `

desktop_socketOn1 = ["q3", (eventData) => {

    document.getElementById("doTiltLR").innerHTML = Math.round(eventData.tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(eventData.tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(eventData.dir);


    window.move = Math.round(eventData.tiltFB)/1000;


}]

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_script = () => {

function line(){
		
    function Wave(opt) {
    
        opt = opt || {};
            
        this.phase = 0;
        this.run = false;
        
        this.ratio = opt.ratio || window.devicePixelRatio || 1;
        
        this.width = this.ratio * ( opt.width || window.innerWidth || 1280);
        this.width_2 = this.width / 2;
        this.width_4 = this.width / 4;
        
        this.height = this.ratio * (opt.height || window.innerHeight || 720);
        this.height_2 = this.height / 2;
        
        this.MAX = (this.height_2) - 4;
        
        this.amplitude = opt.amplitude || 0.1;
        this.speed = opt.speed || 0.01;
        this.frequency = opt.frequency || 2;			
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.container = document.getElementById("line")
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.start();

    }
    
    Wave.prototype._GATF_cache = {};

    Wave.prototype._globAttFunc = function(x) {
        if (Wave.prototype._GATF_cache[x] == null) {
            Wave.prototype._GATF_cache[x] =	Math.pow(4/(4+Math.pow(x,4)), 4);
        }
        return Wave.prototype._GATF_cache[x];
    }

    Wave.prototype._color = function(opacity){
        opacity = opacity || 1;

        var gradient = this.ctx.createLinearGradient(0,0, this.width, 0);
             gradient.addColorStop(0, 'rgba(255,255,255,' + opacity + ')');
            gradient.addColorStop(1, 'rgba(255,255,255,' + opacity + ')');

        return gradient;
    }

    Wave.prototype._xpos = function(i){
        return this.width_2 + i * this.width_4;
    }

    Wave.prototype._ypos = function(i, attenuation) {
        var att = (this.MAX * this.amplitude) / attenuation;
        return this.height_2 + this._globAttFunc(i) * att * Math.sin(this.frequency * i - this.phase);
    }

    Wave.prototype._drawLine = function(attenuation, color, thickness){

        this.ctx.moveTo(0,0);
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = thickness || 1;

        var i = -2;
        while ((i += 0.01) <= 2 ) {
            var y = this._ypos(i, attenuation);
            if ( Math.abs(i) >= 1.90) y = this.height_2;
            
            this.ctx.lineTo(this._xpos(i), y);

        }

        this.ctx.stroke();

    }

    Wave.prototype._clear = function(){
        
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillRect(0,0, this.width, this.height);
        this.ctx.globalCompositeOperation = 'source-over';
    }

    Wave.prototype._draw = function() {
        if ( this.run === false ) return;

        this.phase = (this.phase + Math.PI * this.speed) % (2*Math.PI);

        this._clear();

        this._drawLine(-2, this._color(0.4));
        this._drawLine(-6, this._color(1));
        this._drawLine(0.4, this._color(0.3));
        this._drawLine(2, this._color(0.2));
        this._drawLine(0.8, this._color(), 1.5);

        if ( window.requestAnimationFrame ){
            requestAnimationFrame(this._draw.bind(this));
            return;
        }

        setTimeout(this._draw.bind( this ), 20);

    }

    Wave.prototype.resize = function(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.width_2 = window.innerWidth / 2;
        this.width_4 = window.innerWidth / 4;
        this.height_2 = window.innerHeight / 2;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    Wave.prototype.start = function(){
        this.phase = 0;
        this.run = true;
        this._draw();
    }

    Wave.prototype.changeNoise = function(e){

        // console.log( Math.abs(this.width/2 - e.offsetX) * 0.001);

        if ( e.offsetY < this.width/2 - this.width * 0.1  && e.offsetY < this.width/2 + this.width * 0.1){
            this.amplitude = Math.abs(this.height/2 - e.offsetY) * window.move || 0;
            console.log(window.move)
        }

    }

    var wave = new Wave({frequency: 4});
    
    
    window.addEventListener('resize', function(){ wave.resize() }, false);

    window.addEventListener('mousemove', function(e){ wave.changeNoise(e) }, false);
    
}

line();

    /**************** 
     *** TIMELINE ***
     ****************/
    //document.querySelector('.q3').style.fill = "#ffffff"
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
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}
