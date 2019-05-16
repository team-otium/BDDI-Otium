/**
 * MOBILE
 */

// The html (without section)
let mobile_html =
    `

`

// All listeners, one variable per listener
let mobile_listener1 = ["selector", "type", () => {

}]

let mobile_listener2 = ["selector", "type", () => {

}]
/** And more... */

// Socket on

// Script to be executed when the page is displayed
let mobile_script = () => {

}

// Name of the transitions classes [when he leave, when he arrive]
let mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

let desktop_html =
    `
<!----------- 
------------- SECTION 1 animation logo  
----------->
<div class="logo_center">
    <img src="/both/assets/img/otium_logo.svg" alt="">
</div>
<!----------- 
------------- FIN SECTION 1 animation logo  
----------->
`

let desktop_listener1 = ["selector", "type", () => {

}]

let desktop_listener2 = ["selector", "type", () => {

}]

let desktop_script = () => {
    setTimeout(() => {
        intro.animationLogo.transitionTo("desktop", intro.intro)
        document.querySelector(".logo_top_left").classList.add("out")
        document.querySelector(".logo_top_left").classList.add("in")
    }, 2000)
}

let desktop_transition = ["out", "in"]

/**
 * Export
 */

let animation_logo_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: () => { },
    transitions: mobile_transition,
}

let animation_logo_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [],
    script: desktop_script,
    transitions: desktop_transition,
} 