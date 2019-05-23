/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <div class="text_center_mobile">
        <h1 class="question_mobile">Question 8</h1>
    </div> 
 `

// All listeners, one variable per listener
mobile_listener1 = ["selector", "type", () => {

}]

mobile_listener2 = ["selector", "type", () => {

    }]
    /** And more... */

// Socket on
mobile_socketOn1 = ["name", () => {

}]

// Script to be executed when the page is displayed
mobile_script = () => {
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q3
    ValidationBtn.nextPage = univers.univers
    ValidationBtn.actualQ = "8"
    ValidationBtn.nextQ = "univers"
}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
    <div class="text_center">
        <h1 class="question_desktop">QUESTION 8</h1>
    </div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["name", () => {

}]

desktop_script = () => {
    /**************** 
     *** TIMELINE ***
     ****************/
    document.querySelector('.q8').style.fill = "#ffffff"
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

q8_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

q8_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [],
    script: desktop_script,
    transitions: desktop_transition,
}