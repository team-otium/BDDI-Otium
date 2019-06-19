window.timeline = {
    lineWidth1: 0,
    lineWidth2: 0,
    lineWidth3: 0,
    lineWidth4: 0,
    lineWidth5: 0,
    lineWidth6: 0,
    lineWidth7: 0,
}

socket.on("validationWait", (data) => {
    if (data.actualQuestion == "1") {
        document.querySelector('.q1').style.fill = "#ffffff"
        TweenMax.to(window.timeline, 6, {
            lineWidth1: 300,
            onUpdate: () => {
                document.querySelector('.svgLine1').setAttribute('x2', window.timeline.lineWidth1);
            }
        })
    }
    if (data.actualQuestion == "2") {
        document.querySelector('.q2').style.fill = "#ffffff"
        TweenMax.to(window.timeline, 6, {
            lineWidth2: 300,
            onUpdate: () => {
                document.querySelector('.svgLine2').setAttribute('x2', window.timeline.lineWidth2);
            }
        })
    }
    if (data.actualQuestion == "3") {
        document.querySelector('.q3').style.fill = "#ffffff"
        TweenMax.to(window.timeline, 6, {
            lineWidth3: 300,
            onUpdate: () => {
                document.querySelector('.svgLine3').setAttribute('x2', window.timeline.lineWidth3);
            }
        })
    }
    if (data.actualQuestion == "4") {
        document.querySelector('.q4').style.fill = "#ffffff"
        TweenMax.to(window.timeline, 6, {
            lineWidth4: 300,
            onUpdate: () => {
                document.querySelector('.svgLine4').setAttribute('x2', window.timeline.lineWidth4);
            }
        })
    }
    if (data.actualQuestion == "5") {
        document.querySelector('.q5').style.fill = "#ffffff"
        TweenMax.to(window.timeline, 6, {
            lineWidth5: 300,
            onUpdate: () => {
                document.querySelector('.svgLine5').setAttribute('x2', window.timeline.lineWidth5);
            }
        })
    }
    if (data.actualQuestion == "6") {
        document.querySelector('.q6').style.fill = "#ffffff"
        TweenMax.to(window.timeline, 6, {
            lineWidth6: 300,
            onUpdate: () => {
                document.querySelector('.svgLine6').setAttribute('x2', window.timeline.lineWidth6);
            }
        })
    }
    if (data.actualQuestion == "7") {
        document.querySelector('.q7').style.fill = "#ffffff"
        TweenMax.to(window.timeline, 6, {
            lineWidth7: 300,
            onUpdate: () => {
                document.querySelector('.svgLine7').setAttribute('x2', window.timeline.lineWidth7);
            }
        })
    }
})

socket.on("validationCancel", (data) => {
    if (data.actualQuestion == "1") {
        window.timeline.lineWidth1 = 0
        document.querySelector('.svgLine1').setAttribute('x2', window.timeline.lineWidth1)
    }
    if (data.actualQuestion == "2") {
        window.timeline.lineWidth2 = 0
        document.querySelector('.svgLine2').setAttribute('x2', window.timeline.lineWidth2)
    }
    if (data.actualQuestion == "3") {
        window.timeline.lineWidth3 = 0
        document.querySelector('.svgLine3').setAttribute('x2', window.timeline.lineWidth3)
    }
    if (data.actualQuestion == "4") {
        window.timeline.lineWidth4 = 0
        document.querySelector('.svgLine4').setAttribute('x2', window.timeline.lineWidth4)
    }
    if (data.actualQuestion == "5") {
        window.timeline.lineWidth5 = 0
        document.querySelector('.svgLine5').setAttribute('x2', window.timeline.lineWidth5)
    }
    if (data.actualQuestion == "6") {
        document.querySelector('.q6').style.fill = "#ffffff"
        window.timeline.lineWidth6 = 0
        document.querySelector('.svgLine6').setAttribute('x2', window.timeline.lineWidth6)
    }
    if (data.actualQuestion == "7") {
        window.timeline.lineWidth7 = 0
        document.querySelector('.svgLine7').setAttribute('x2', window.timeline.lineWidth7)
    }
})

socket.on("validationQuestion", (data) => {
    if (data.to == 2) {
        window.timeline.lineWidth1 = 300
        document.querySelector('.svgLine1').setAttribute('x2', window.timeline.lineWidth1);
    }
    if (data.to == 3) {
        window.timeline.lineWidth2 = 300
        document.querySelector('.svgLine2').setAttribute('x2', window.timeline.lineWidth2);
    }
    if (data.to == 4) {
        window.timeline.lineWidth3 = 300
        document.querySelector('.svgLine3').setAttribute('x2', window.timeline.lineWidth3);
    }
    if (data.to == 5) {
        window.timeline.lineWidth4 = 300
        document.querySelector('.svgLine4').setAttribute('x2', window.timeline.lineWidth4);
    }
    if (data.to == 6) {
        window.timeline.lineWidth5 = 300
        document.querySelector('.svgLine5').setAttribute('x2', window.timeline.lineWidth5);
    }
    if (data.to == 7) {
        window.timeline.lineWidth6 = 300
        document.querySelector('.svgLine6').setAttribute('x2', window.timeline.lineWidth6);
    }
    if (data.to == 8) {
        window.timeline.lineWidth2 = 300
        document.querySelector('.svgLine7').setAttribute('x2', window.timeline.lineWidth7);
    }
})