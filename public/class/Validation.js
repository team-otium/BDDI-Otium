// Gestion question validation

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
            document.querySelector("#buttons").addEventListener("touchstart", (e) => {
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
                        document.querySelector(".gifValidation").style.opacity = "0"
                        document.querySelector(".circle2").classList.add("test1")
                        document.querySelector(".circle2").classList.add("test2")
                        this.deltaTime = 0
                        this.last = this.now
                        this.time = 0
                    }
                }
            })

            document.querySelector("#buttons").addEventListener("touchend", () => {
                this.touch = false
                this.height = 0
                this.width = 0
                document.querySelector(".circle2").classList.remove("test1")
                document.querySelector(".circle2").classList.remove("test2")
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

                document.querySelector(".circle2").classList.add("test1")
                document.querySelector(".circle2").classList.add("test2")

                if (ValidationBtn.time >= 3000) {
                    ValidationBtn.height = 0
                    ValidationBtn.width = 0
                    document.querySelector(".gifValidation").style.opacity = "1"
                    ValidationBtn.deltaTime = 0
                    ValidationBtn.last = ValidationBtn.now
                    ValidationBtn.time = 0
                    ValidationBtn.touch = true
                    ValidationBtn.canValidate = false
                    setTimeout(() => {
                        /** button go to left **/
                        document.querySelector(".circle1").style.opacity = "0"
                        document.querySelector(".circle1").style.right = "100%"
                        document.querySelector(".circle1").style.transition = "1.5s"
                        document.querySelector(".circle2").style.right = "100%"
                        document.querySelector(".circle2").style.transition = "1.5s"
                        document.querySelector(".gifValidation").style.right = "100%"
                        document.querySelector(".gifValidation").style.transition = "1.5s"
                        document.querySelector(".gifValidation").style.opacity = "0"
                        document.querySelector(".circle2").style.opacity = "0"

                        ValidationBtn.actualPage.transitionTo("mobile", ValidationBtn.nextPage)
                        socket.emit("validationQuestion", {from: ValidationBtn.actualQ, to: ValidationBtn.nextQ})
                    }, 1400);

                    setTimeout(() => {
                        /** button go to right **/
                        document.querySelector(".circle1").style.right = "-50%"
                        document.querySelector(".circle1").style.left = "100%"
                        document.querySelector(".circle2").style.right = "-50%"
                        document.querySelector(".circle2").style.left = "100%"
                        document.querySelector(".gifValidation").style.right = "-50%"
                        document.querySelector(".gifValidation").style.left = "100%"
                    }, 2800)

                    setTimeout(() => {
                        /** button come from right **/
                        document.querySelector(".circle1").style.right = "-50%"
                        document.querySelector(".circle1").style.left = "-50%"
                        document.querySelector(".circle2").style.right = "-50%"
                        document.querySelector(".circle2").style.left = "-50%"
                        document.querySelector(".gifValidation").style.right = "-50%"
                        document.querySelector(".gifValidation").style.left = "-50%"
                        document.querySelector(".circle1").style.opacity = "1"
                        document.querySelector(".circle2").style.opacity = "1"
                        document.querySelector(".circle2").classList.remove("test1")
                        document.querySelector(".circle2").classList.remove("test2")
                    }, 4500)

                }
            }
            requestAnimationFrame(ValidationBtn.animationMobile)
        }
    }
}

let ValidationBtn = new Validation("mobile")