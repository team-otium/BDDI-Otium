/**************************  
**************************  PAGE 2 CONNEXION
**************************/

/**
 * MOBILE
 */

// The html (without section)
mobile_html =
    `
    <!----------- 
    ------------- CONNEXION 
    ----------->
    <div class="text_center_mobile connexion">
        <h2>Connectez votre smartphone pour commencer l'expérience</h2>

        <input class="enterCode" id="code" autocomplete="off" maxlength="6" placeholder="xxxxxx">
        <div class="container">
        <div class="line"></div>
        </div>
        <p class="errMsg">Le code est incorrect. Veuillez réessayer.</p>
        <button class="btn start_q1">valider</button>
    </div>

    <!----------- 
    ------------- CONNEXION  
    ----------->   
 `

// All listeners, one variable per listener
mobile_listener1 = ["#code", "change", () => {
    let code = document.getElementById("code").value
    let i = rooms.indexOf(code)
    if (i > -1) {
        console.log(code)
        socket.emit("askMobileConnexion", code)
    } else {
        document.querySelector(".errMsg").style.display = "block"
    }
}]

mobile_listener2 = [".start_q1", "click", () => {
    intro.connexion.transitionTo("mobile", intro.button_valider)
}]
/** And more... */

// Socket on
let mobile_socketOn1 = ["mobileConnected", () => {

}]

// Script to be executed when the page is displayed
mobile_script = () => {
    document.querySelector(".menu").style.display = "block"

    // check if inpu is clicked and disable menu
    window.addEventListener('click', function(e){   
        if (document.getElementById('code').contains(e.target)){
            document.querySelector(".menu").style.display = "none"
        } else{
            document.querySelector(".menu").style.display = "block"
        }
      });


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
<div class="home_text_center">
    <h1>Connectez votre smartphone</h1>
    <p>Exsistit autem hoc loco quaedam quaestio subdifficilis, num quando amici novi,
        digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere
        solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut
        rerum satietates, veterrima quaeque, ut ea vina, quae vetustatem ferunt, esse debet
        suavissima, verumque illud est.
        <br><br>
        Code à insérer dans votre smartphone : <span id="id">####</span>
        <br><br>
        <button class="start_q1">test connexion</button>
    </p>
</div>
<!----------- 
------------- FIN SECTION 3 connexion 
----------->
 `

desktop_listener1 = [".start_q1", "click", () => {
    intro.connexion.transitionTo("desktop", intro.button_valider)
}]

let desktop_socketOn1 = ["mobileConnected", () => {
    intro.connexion.transitionTo("desktop", intro.button_valider)
}]

desktop_script = () => {
    createConnexionId()
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

let connexion_mobile = {
    html: mobile_html,
    listeners: [mobile_listener1, mobile_listener2],
    socketOn: [mobile_socketOn1],
    script: mobile_script,
    transitions: mobile_transition,
}

let connexion_desktop = {
    html: desktop_html,
    listeners: [desktop_listener1],
    socketOn: [desktop_socketOn1],
    script: desktop_script,
    transitions: desktop_transition,
}
