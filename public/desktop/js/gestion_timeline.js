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
        TweenMax.to(window.timeline, 6, {
            lineWidth1: 300,
            onUpdate: () => {
                document.querySelector('.svgLine1').setAttribute('x2', window.timeline.lineWidth1);
            }
        })
    }
    if (data.actualQuestion == "2") {
        TweenMax.to(window.timeline, 6, {
            lineWidth2: 300,
            onUpdate: () => {
                document.querySelector('.svgLine2').setAttribute('x2', window.timeline.lineWidth2);
            }
        })
    }
    if (data.actualQuestion == "3") {
        TweenMax.to(window.timeline, 6, {
            lineWidth3: 300,
            onUpdate: () => {
                document.querySelector('.svgLine3').setAttribute('x2', window.timeline.lineWidth3);
            }
        })
    }
    if (data.actualQuestion == "4") {
        TweenMax.to(window.timeline, 6, {
            lineWidth4: 300,
            onUpdate: () => {
                document.querySelector('.svgLine4').setAttribute('x2', window.timeline.lineWidth4);
            }
        })
    }
    if (data.actualQuestion == "5") {
        TweenMax.to(window.timeline, 6, {
            lineWidth5: 300,
            onUpdate: () => {
                document.querySelector('.svgLine5').setAttribute('x2', window.timeline.lineWidth5);
            }
        })
    }
    if (data.actualQuestion == "6") {
        TweenMax.to(window.timeline, 6, {
            lineWidth6: 300,
            onUpdate: () => {
                document.querySelector('.svgLine6').setAttribute('x2', window.timeline.lineWidth6);
            }
        })
    }
    if (data.actualQuestion == "7") {
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
        TweenMax.to(window.timeline, 6, {
            lineWidth1: 0,
            onUpdate: () => {
                document.querySelector('.svgLine1').setAttribute('x2', window.timeline.lineWidth1);
            }
        })
    }
    if (data.actualQuestion == "2") {
        TweenMax.to(window.timeline, 6, {
            lineWidth2: 0,
            onUpdate: () => {
                document.querySelector('.svgLine2').setAttribute('x2', window.timeline.lineWidth2);
            }
        })
    }
    if (data.actualQuestion == "3") {
        TweenMax.to(window.timeline, 6, {
            lineWidth3: 0,
            onUpdate: () => {
                document.querySelector('.svgLine3').setAttribute('x2', window.timeline.lineWidth3);
            }
        })
    }
    if (data.actualQuestion == "4") {
        TweenMax.to(window.timeline, 6, {
            lineWidth4: 0,
            onUpdate: () => {
                document.querySelector('.svgLine4').setAttribute('x2', window.timeline.lineWidth4);
            }
        })
    }
    if (data.actualQuestion == "5") {
        TweenMax.to(window.timeline, 6, {
            lineWidth5: 0,
            onUpdate: () => {
                document.querySelector('.svgLine5').setAttribute('x2', window.timeline.lineWidth5);
            }
        })
    }
    if (data.actualQuestion == "6") {
        TweenMax.to(window.timeline, 6, {
            lineWidth6: 0,
            onUpdate: () => {
                document.querySelector('.svgLine6').setAttribute('x2', window.timeline.lineWidth6);
            }
        })
    }
    if (data.actualQuestion == "7") {
        TweenMax.to(window.timeline, 6, {
            lineWidth7: 0,
            onUpdate: () => {
                document.querySelector('.svgLine7').setAttribute('x2', window.timeline.lineWidth7);
            }
        })
    }
})

socket.on("validationQuestion", (data) => {
    if (data.to == 2) {
        TweenMax.to(window.timeline, 6, {
            lineWidth1: 300,
            onUpdate: () => {
                document.querySelector('.svgLine1').setAttribute('x2', 300);
            }
        })
    }
    if (data.to == 3) {
        TweenMax.to(window.timeline, 6, {
            lineWidth2: 300,
            onUpdate: () => {
                document.querySelector('.svgLine2').setAttribute('x2', 300);
            }
        })
    }
    if (data.to == 4) {
        TweenMax.to(window.timeline, 6, {
            lineWidth3: 300,
            onUpdate: () => {
                document.querySelector('.svgLine3').setAttribute('x2', 300);
            }
        })
    }
    if (data.to == 5) {
        TweenMax.to(window.timeline, 6, {
            lineWidth4: 300,
            onUpdate: () => {
                document.querySelector('.svgLine4').setAttribute('x2', 300);
            }
        })
    }
    if (data.to == 6) {
        TweenMax.to(window.timeline, 6, {
            lineWidth5: 300,
            onUpdate: () => {
                document.querySelector('.svgLine5').setAttribute('x2', 300);
            }
        })
    }
    if (data.to == 7) {
        TweenMax.to(window.timeline, 6, {
            lineWidth6: 300,
            onUpdate: () => {
                document.querySelector('.svgLine6').setAttribute('x2', 300);
            }
        })
    }
    if (data.to == 8) {
        TweenMax.to(window.timeline, 6, {
            lineWidth7: 300,
            onUpdate: () => {
                document.querySelector('.svgLine7').setAttribute('x2', 300);
            }
        })
    }
})