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
     
 }
 
 // Name of the transitions classes [when he leave, when he arrive]
 mobile_transition = ["out", "in"]
 
 /**
  * DESKTOP
  */
 
 desktop_html = 
 `
 <!----------- 
------------- SECTION 3 connexion
----------->
<div class="text_center">
    <h1>Connectez votre smartphone</h1>
    <p>Exsistit autem hoc loco quaedam quaestio subdifficilis, num quando amici novi,
        digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere
        solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut
        rerum satietates, veterrima quaeque, ut ea vina, quae vetustatem ferunt, esse debet
        suavissima, verumque illud est.
        <br><br>
        Code à insérer dans votre smartphone : <span>####</span>
        <br><br>
        <button class="start_q1">test connexion</button>
    </p>
</div>
<!----------- 
------------- FIN SECTION 3 connexion 
----------->
 `
 
 desktop_listener1 = [".start_q1", "click", () => {
    intro.connexion.transitionTo("desktop", questions.q1)
 }]
 
 desktop_listener2 = ["selector", "type", () => {
 
 }]
 
 desktop_script = () => {
 
 }
 
 desktop_transition = ["out", "in"]
 
 /**
  * Export
  */
 
 let connexion_mobile = {
     html: mobile_html,
     listeners: [],
     socketOn: [],
     script: mobile_script,
     transitions: mobile_transition,
 }
 
 let connexion_desktop = {
     html: desktop_html,
     listeners: [desktop_listener1],
     socketOn: [],
     script: desktop_script,
     transitions: desktop_transition,
 }
 