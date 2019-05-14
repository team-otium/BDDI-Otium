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
                        console.log(this.time)
                        requestAnimationFrame(this.animationMobile)
                    } else {
                        this.touch = false
                        this.height = 0
                        this.width = 0
                        document.querySelector(".circle").style.height = 0+ "px"
                        document.querySelector(".circle").style.width = 0+ "px"
                        document.querySelector(".circle2").style.height = 0+ "px"
                        document.querySelector(".circle2").style.width = 0+ "px"
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
                document.querySelector(".circle2").style.height = 0+ "px"
                document.querySelector(".circle2").style.width = 0+ "px"
                document.querySelector(".circle3").style.animation = "full 2s reverse"
                this.deltaTime = 0
                this.last = this.now
                this.time = 0
                socket.emit("validationCancel", 0)
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
            
            
            if (ValidationBtn.time >= 60) {
                ValidationBtn.height = ValidationBtn.easeInQuad(ValidationBtn.time - 60, 0, 100, 2000)
                ValidationBtn.width = ValidationBtn.easeInQuad(ValidationBtn.time - 60, 0, 100, 2000)

                document.querySelector(".circle").style.height = (ValidationBtn.height*7) + "px"
                document.querySelector(".circle").style.width = (ValidationBtn.width*7) + "px"
                document.querySelector(".circle2").style.height = (ValidationBtn.height*7) + "px"
                document.querySelector(".circle2").style.width = (ValidationBtn.width*7) + "px"
                document.querySelector(".circle3").style.animation = "full 3s forwards"


                socket.emit("validationWait", {height:ValidationBtn.height, width:ValidationBtn.width})
                if (ValidationBtn.time >= 2000) {
                    ValidationBtn.height = 0
                    ValidationBtn.width = 0
                    document.querySelector(".buttonAnim").style.display = "block"
                    ValidationBtn.deltaTime = 0
                    ValidationBtn.last = ValidationBtn.now
                    ValidationBtn.time = 0
                    ValidationBtn.touch = false
                    ValidationBtn.canValidate = false
                    setTimeout(() => {
                        document.querySelector(".buttonAnim").style.display = "none"
                        ValidationBtn.actualPage.transitionTo("mobile", ValidationBtn.nextPage)
                        socket.emit("validationCancel", 0)
                        socket.emit("validationQuestion", {from: ValidationBtn.actualQ, to: ValidationBtn.nextQ})
                        window.resultats.getResult(ValidationBtn.actualQ)
                    }, 1000);
                }
            }

            requestAnimationFrame(ValidationBtn.animationMobile)
        }
    }
}

let ValidationBtn = new Validation("mobile")