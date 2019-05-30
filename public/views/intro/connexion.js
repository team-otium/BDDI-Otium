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

mobile_listener3 = ["#code", "click", (e) => {
    document.querySelector(".firstMenu").style.display = "none"
}]
/** And more... */

// Socket on
let mobile_socketOn1 = ["mobileConnected", () => {

}]

// Script to be executed when the page is displayed
mobile_script = () => {
    document.querySelector(".firstMenu").style.display = "block"
    document.querySelector(".circle1").style.display = "none"
    document.querySelector(".circle2").style.display = "none"

    /* check if inpu is clicked and disable menu
    window.addEventListener('click', function(e){   
        if (document.getElementById('code').contains(e.target)){
            document.querySelector(".firstMenu").style.display = "none"
        } else{
            document.querySelector(".firstMenu").style.display = "block"
        }
      });*/


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
    <p>
    Afin de commencer l'expérience, entrez ce lien sur votre smartphone : www.exemple.com ou utilisez le <span class="qrLink">QR code</span> pour y accéder directement.
    Une fois sur la page, insérez le code ci-dessous.
        <br><br>
        Code à insérer sur votre smartphone : <span id="id">####</span>
        <br><br>
        <!--<button class="start_q1">test connexion</button>-->
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
    listeners: [mobile_listener1, mobile_listener2, mobile_listener3],
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
