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
        d="M5.59,22.3a86.2,86.2,0,0,0,10.76-3.53c4.07-1.85,7.77-4.49,11.78-6.47,13.7-6.78,29.55-7.17,44.53-7.36,31.79-.41,63.46,2.94,95.14,5,31,2,62,2.34,92.71-2.6,28.37-4.56,60-11.76,86.57,3.45C370.3,24,379.44,55.5,364.94,78.64c-5,8-11.95,10.72-21.22,9.36-7.83-1.15-15.52-3.42-23.3-4.9-14.25-2.72-28.85-4.47-43.36-3.09-7.44.71-14.7,2.5-22.15,3.21-7.2.68-14.43.74-21.66.71-13.32-.05-26.4.19-39.53,2.64-30.92,5.77-62.27,4.32-93.55,4.43-25.59.09-52.36-1.81-73.72-17.48A79,79,0,0,1,9.17,55.78c-3.53-4.92-6.56-9.72-7-15.93C1.74,34-.65,25.18,5.77,22.22c.88-.4.12-1.69"/>
       </svg>
    </div>
       <div class="btnFirstPageOpen">
        <a class="infoFirstPage" href="#"><img src="/both/assets/img/apropos-1.svg" alt="" height="22px"></a>
       </div>
        <div class="btnFirstPageClose">
        <a class="fermer" href="#"><img src="/both/assets/img/fermer.png" alt="" height="22px"></a>
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
     d="M5.59,  22.3a86.2,  86.2,  0,  0,  0,  10.76-3.53c4.07-1.85,  7.77-4.49,  11.78-6.47,  13.7-6.78,  29.55-7.17,  44.53-7.36,  31.79-.41,  63.46,  2.94,  
     95.14,  5,  31,  2,  62,  2.34,  92.71-2.6,  28.37-4.56,  60-11.76,  86.57,  3.45C370.3,  24,  379.44,  55.5,  364.94,  78.64c-5,  8-11.95,  10.72-21.22,  
     9.36-7.83-1.15-15.52-3.42-23.3-4.9-14.25-2.72-28.85-4.47-43.36-3.09-7.44.71-14.7,  2.5-22.15,  3.21-7.2.68-14.43.74-21.66.71-13.32-.05-26.4.19-39.53,  2.64-30.92,  
     5.77-62.27,  4.32-93.55,  4.43-25.59.09-52.36-1.81-73.72-17.48A79,  79,  0,  0,  1,  9.17,  55.78c-3.53-4.92-6.56-9.72-7-15.93C1.74,34-.65,  25.18,  5.77,  22.22c.88-.4.12-1.69"/>
    </svg>
</div>
<!----------- 
------------- FIN INTRO 
----------->
`

desktop_listener1 = [".commencer", "click", () => {
    intro.intro.transitionTo("desktop", intro.connexion)
}]

desktop_script = () => {

    // HOVER CURSOR
    document.querySelector('.commencer').addEventListener("mouseover", function(){
        document.querySelector('#cursor').style.background = "white"
        document.querySelector('#cursor').style.transition = "background 0.5s"
        document.querySelector('.pathContour').style.opacity = "1"
        document.querySelector('.pathContour').style.transition = "2s"
    })

    document.querySelector('.commencer').addEventListener("mouseout", function(){
        document.querySelector('#cursor').style.background = "transparent"
        document.querySelector('#cursor').style.transition = "background 0.5s"
        document.querySelector('.pathContour').style.opacity = "0"
        document.querySelector('.pathContour').style.transition = "2s"
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