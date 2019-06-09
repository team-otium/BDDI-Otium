/**************************  
**************************  PAGE 2 INTRODUCTION
**************************/

/**
 * MOBILE
 */

mobile_html =
    `
    <!----------- 
    ------------- INTRO 
    ----------->
    <div class="home_text_center">
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
    <p>
    Vous cherchez une solution afin de vous évader et d'échapper au stress du quotidien ?<br>
    Relaxez vous grâce à Otium! Concevez l'univers qui vous correspond et retrouvez la sérénité que vous avez oubliée.
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