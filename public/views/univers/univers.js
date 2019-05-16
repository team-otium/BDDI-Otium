/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    
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

}

// Name of the transitions classes [when he leave, when he arrive]
mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html =
    `
    <div class="text_center">
        <h1 class="question_desktop">UNIVERS 3D</h1>
    </div>
 `

desktop_listener1 = ["selector", "type", () => {

}]

desktop_listener2 = ["selector", "type", () => {

}]

desktop_socketOn1 = ["name", () => {

}]

desktop_script = () => {

}

desktop_transition = ["out", "in"]

/**
 * Export
 */

univers_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

univers_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [],
    script: desktop_script,
    transitions: desktop_transition,
}