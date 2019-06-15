var sound = document.getElementById("iframeAudio");
var isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        sound.play()
        document.querySelector('.iconSound').style.background = "url('../../both/assets/img/svg-son.svg')"
        document.querySelector('.iconSound').style.transition = "0.7s"
    } else {
        sound.pause();
        document.querySelector('.iconSound').style.background = "url('../../both/assets/img/icone-son-stop.svg')"
        document.querySelector('.iconSound').style.transition = "0.7s"
    }
};
sound.onplaying = function() {
    isPlaying = false;
};
sound.onpause = function() {
    isPlaying = true;
};

document.querySelector('.iconSound').addEventListener("mouseover", function(){
    document.querySelector('#cursor').style.background = "white"
    document.querySelector('#cursor').style.transition = "background 0.5s"
})

document.querySelector('.iconSound').addEventListener("mouseout", function(){
    document.querySelector('#cursor').style.background = "transparent"
    document.querySelector('#cursor').style.transition = "background 0.5s"
})