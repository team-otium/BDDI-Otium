class Validation{
    constructor(device){
        this.touch = false
        this.height = 0
        this.width = 0

        this.canValidate = false

        this.now = 0
        this.last = 0
        this.time = 0
        this.deltaTime = 0



        if (device === "mobile") {
            document.body.addEventListener("touchstart", (e) => {
                if (this.canValidate) {
                    if (e.touches.length == 1) {
                        this.now = Date.now()
                        this.last = this.now
                        this.touch = true
                        socket.emit("validationWait", {height:ValidationBtn.height, width:ValidationBtn.width, actualQuestion:ValidationBtn.actualQ})
                        console.log(this.time)
                        requestAnimationFrame(this.animationMobile)
                    } else {
                        this.touch = false
                        this.height = 0
                        this.width = 0
                        document.querySelector(".circle").style.height = 0+ "px"
                        document.querySelector(".circle").style.width = 0+ "px"
                        this.deltaTime = 0
                        this.last = this.now
                        this.time = 0
                    }
                }
            })

            document.body.addEventListener("touchend", () => {
                this.touch = false
                this.height = 0
                this.width = 0
                document.querySelector(".circle").style.height = 0+ "px"
                document.querySelector(".circle").style.width = 0+ "px"
                document.querySelector(".circleIn").style.animation = "full 2s reverse"
                this.deltaTime = 0
                this.last = this.now
                this.time = 0
                socket.emit("validationCancel", {actualQuestion:ValidationBtn.actualQ})
            })
        }
    }

    easeInQuad(t, b, c, d) {
        return c*(t/=d)*t + b;
    }

    animationMobile() {
        if(ValidationBtn.touch) {
            ValidationBtn.now = Date.now()
            ValidationBtn.deltaTime = ValidationBtn.now - ValidationBtn.last
            ValidationBtn.last = ValidationBtn.now
            ValidationBtn.time += ValidationBtn.deltaTime
            
            
            if (ValidationBtn.time >= 100) {
                ValidationBtn.height = ValidationBtn.easeInQuad(ValidationBtn.time - 100, 0, 100, 2000)
                ValidationBtn.width = ValidationBtn.easeInQuad(ValidationBtn.time - 100, 0, 100, 2000)

                document.querySelector(".circle").style.height = (ValidationBtn.height*6) + "px"
                document.querySelector(".circle").style.width = (ValidationBtn.width*6) + "px"
                document.querySelector(".circleIn").style.animation = "full 3s forwards"

                if (ValidationBtn.time >= 3000) {
                    ValidationBtn.height = 0
                    ValidationBtn.width = 0
                    document.querySelector(".buttonAnim").style.display = "block"
                    ValidationBtn.deltaTime = 0
                    ValidationBtn.last = ValidationBtn.now
                    ValidationBtn.time = 0
                    ValidationBtn.touch = false
                    ValidationBtn.canValidate = false
                    setTimeout(() => {
                        ValidationBtn.actualPage.transitionTo("mobile", ValidationBtn.nextPage)
                        socket.emit("validationQuestion", {from: ValidationBtn.actualQ, to: ValidationBtn.nextQ})
                        document.querySelector(".buttonAnim").style.display = "none"
                        document.querySelector(".circle").style.display = "none"
                        document.querySelector(".circleIn").style.display = "none"
                    }, 1000);
                }
            }
            requestAnimationFrame(ValidationBtn.animationMobile)
        }
    }
}

let ValidationBtn = new Validation("mobile")