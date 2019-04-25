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
 
 // Script to be executed when the page is displayed
 mobile_script = () => {
    ValidationBtn.canValidate = true
    ValidationBtn.actualPage = questions.q6
    ValidationBtn.nextPage = questions.q7
    ValidationBtn.actualQ = "6"
    ValidationBtn.nextQ = "7"
 }
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
 <div class="text_center">
    <h1>Ceci est la question 6</h1>
</div>
 `
 
 desktop_listener1 = ["selector", "type", () => {
 
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {
 
 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 q6_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
q6_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
 