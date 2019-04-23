class Validation{
    constructor(device){
        this.touch = false
        this.height = 0

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
                        document.getElementById("validation").style.height = 0+ "%"
                        this.deltaTime = 0
                        this.last = this.now
                        this.time = 0
                    }
                }
            })

            document.body.addEventListener("touchend", () => {
                this.touch = false
                this.height = 0
                document.getElementById("validation").style.height = 0+ "%"
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
            
            
            if (ValidationBtn.time >= 1000) {
                ValidationBtn.height = ValidationBtn.easeInQuad(ValidationBtn.time - 1000, 0, 100, 3000)
                document.getElementById("validation").style.height = ValidationBtn.height + "%"
                socket.emit("validationWait", ValidationBtn.height)
                if (ValidationBtn.time >= 4000) {
                    ValidationBtn.height = 0
                    document.getElementById("validation").style.height = 0+ "%"
                    ValidationBtn.deltaTime = 0
                    ValidationBtn.last = ValidationBtn.now
                    ValidationBtn.time = 0
                    ValidationBtn.touch = false
                    ValidationBtn.canValidate = false
                    ValidationBtn.actualPage.transitionTo("mobile", ValidationBtn.nextPage)
                    socket.emit("validationCancel", 0)
                    socket.emit("validationQuestion", {from: ValidationBtn.actualQ, to: ValidationBtn.nextQ})
                    window.resultats.getResult(ValidationBtn.actualQ)
                }
            }

            requestAnimationFrame(ValidationBtn.animationMobile)
        }
    }
}

let ValidationBtn = new Validation("mobile")