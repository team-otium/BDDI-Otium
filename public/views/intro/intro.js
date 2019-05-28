/**************************  
**************************  PAGE 1 INTRODUCTION
**************************/

/**
 * MOBILE
 */

mobile_html =
    `
    <!----------- 
    ------------- INTRO 
    ----------->
    <div class="text_center_mobile">
        <h1>Bienvenue sur Otium</h1>
        <p>
        Relaxez vous grâce à Otium.<br>
        Concevez l'univers qui vous correspond et retrouvez la sérénité que vous avez oubliée.
        </p>
        <button class="commencer btn">Commencer l'expérience</button>
    </div>
    <!----------- 
    ------------- FIN INTRO  
    ----------->   
`

mobile_script = () => {
    document.querySelector(".circle1").style.display = "none"
    document.querySelector(".circle2").style.display = "none"
}

mobile_transition = ["out", "in"]

mobile_listener1 = [".commencer", "click", () => {
    intro.intro.transitionTo("mobile", intro.connexion)
}]

/**
 * DESKTOP
 */

desktop_html =
    `
<!----------- 
------------- INTRO 
----------->
<div class="home_text_center">
    <h1>Bienvenue sur Otium</h1>
    <p>Exsistit autem hoc loco quaedam quaestio subdifficilis, num quando amici novi,
        digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere
        solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut
        rerum satietates, veterrima quaeque, ut ea vina, quae vetustatem ferunt, esse debet
        suavissima, verumque illud est.
    </p>
    <button class="commencer btn">Commencer l'expérience</button>
</div>
<!----------- 
------------- FIN INTRO 
----------->
`

desktop_listener1 = [".commencer", "click", () => {
    intro.intro.transitionTo("desktop", intro.connexion)
}]

desktop_script = () => {
}

desktop_transition = ["out", "in"]

/**
 * Export
 */

let intro_mobile = {
    html: mobile_html,
    listeners: [mobile_listener1],
    socketOn: [],
    script: mobile_script,
    transitions: mobile_transition,
}

let intro_desktop = {
    html: desktop_html,
    listeners: [desktop_listener1],
    socketOn: [],
    script: desktop_script,
    transitions: desktop_transition,
} 