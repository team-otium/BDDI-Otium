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
    <div class="home_text_center_mobile">
    <div class="containtFirstPage">
        <h1>Bienvenue sur Otium</h1>
        <p>
        Relaxez vous grâce à Otium.<br>
        Concevez l'univers qui vous correspond et retrouvez la sérénité que vous avez oubliée.
        </p>
        <button class="btn">Commencer l'expérience</button>

        <svg class="svgContour commencer">
        <path class="pathContourMobile" fill="transparent" stroke="#9cacc7" stroke-width="1" 
        d="M5.46,15.14A61.07,61.07,0,0,0,17.91,9.85c9.48-5.21,19.93-6,30.55-6.15C69,3.34,89.5,5.42,110,6.78c19.79,1.32,39.73,2,59.42-.88,18.84-2.71,38.82-8.25,57.21-.47,17.31,7.32,26.09,27.89,17.11,45.06-2.84,5.43-6.86,8.65-13.22,8.24-5.54-.35-11.13-2.27-16.57-3.32-9.46-1.84-19.14-3.06-28.78-2.21-9.33.83-18.29,2.64-27.73,2.64-8.66,0-17.27-.11-25.84,1.37-20.6,3.55-41,3.27-61.79,3.28-17.22,0-35.16-.69-49.77-11A51.64,51.64,0,0,1,8.21,37.77C6.1,34.9,4,32,3.41,28.38S1.46,17.1,5.58,15.09c.57-.27.07-1.13-.5-.85C0"/>
       </svg>
    </div>
       <div class="btnFirstPageOpen">
        <a class="infoFirstPage" href="#"><img src="/both/assets/img/apropos-1.svg" alt="" height="22px"></a>
       </div>
        <div class="btnFirstPageClose">
        <a class="fermer" href="#"><img src="/both/assets/img/fermer.png" alt=""></a>
       </div>
    </div>
    <!----------- 
    ------------- FIN INTRO  
    ----------->   
`

mobile_script = () => {
    document.querySelector(".circle1").style.display = "none"
    document.querySelector(".circle2").style.display = "none"

    document.querySelector(".btnFirstPageOpen").onclick = function() { 
        document.querySelector(".infoFirstPage").style.display = "none"
        document.querySelector(".fermer").style.display = "block"
        document.querySelector("#infoCredit").style.display = "block"
        document.querySelector(".containtFirstPage").style.opacity = "0"
    }

    document.querySelector(".btnFirstPageClose").onclick = function() { 
        document.querySelector(".fermer").style.display = "none"
        document.querySelector(".infoFirstPage").style.display = "block"
        document.querySelector("#infoCredit").style.display = "none"
         document.querySelector(".containtFirstPage").style.opacity = "1"
    }
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

    <button class="btn">Commencer l'expérience</button>

    <svg class="svgContour commencer">
     <path class="pathContour" fill="transparent" stroke="#9cacc7" stroke-width="1" 
     d="M5.46,15.14A61.07,61.07,0,0,0,17.91,9.85c9.48-5.21,19.93-6,30.55-6.15C69,3.34,89.5,5.42,110,6.78c19.79,1.32,39.73,2,59.42-.88,18.84-2.71,38.82-8.25,57.21-.47,17.31,7.32,26.09,27.89,17.11,45.06-2.84,5.43-6.86,8.65-13.22,8.24-5.54-.35-11.13-2.27-16.57-3.32-9.46-1.84-19.14-3.06-28.78-2.21-9.33.83-18.29,2.64-27.73,2.64-8.66,0-17.27-.11-25.84,1.37-20.6,3.55-41,3.27-61.79,3.28-17.22,0-35.16-.69-49.77-11A51.64,51.64,0,0,1,8.21,37.77C6.1,34.9,4,32,3.41,28.38S1.46,17.1,5.58,15.09c.57-.27.07-1.13-.5-.85C0"/>
    </svg>
</div>
<!----------- 
------------- FIN INTRO 
----------->
`

desktop_listener1 = [".commencer", "click", () => {
    intro.intro.transitionTo("desktop", intro.connexion)
    sound.play()
}]

desktop_script = () => {

    // HOVER CURSOR
    document.querySelector('.commencer').addEventListener("mouseover", function(){
        document.querySelector('#cursor').style.width = "35px"
        document.querySelector('#cursor').style.height = "35px"
        document.querySelector('#cursor').style.border = "2px solid white"
        document.querySelector('#cursor').style.transition = "0.5s"
        document.querySelector('.pathContour').style.opacity = "1"
        document.querySelector('.pathContour').style.transition = "1s"
    })

    document.querySelector('.commencer').addEventListener("mouseout", function(){
        document.querySelector('#cursor').style.width = "25px"
        document.querySelector('#cursor').style.height = "25px"
        document.querySelector('#cursor').style.border = "1px solid white"
        document.querySelector('#cursor').style.transition = "0.5s"
        document.querySelector('.pathContour').style.opacity = "0"
        document.querySelector('.pathContour').style.transition = "1s"
    })

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
