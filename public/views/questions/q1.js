/**
 * MOBILE
 */

 // The html (without section)
 mobile_html = 
 `
    <div>Question 1</div>
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
     
 }
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
 <div class="text_center">
    <h1>Ceci est la question 1 </h1>
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
 
 q1_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
q1_desktop = {
     html: desktop_html,
     listeners: [],
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
 