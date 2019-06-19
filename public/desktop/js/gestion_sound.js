var sound = document.getElementById("iframeAudio");
var isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        sound.play()
        document.querySelector('.iconSound').style.background = "url('../../both/assets/img/svg-son2.svg')"
        document.querySelector('.iconSound').style.transition = "0.7s"
    } else {
        sound.pause();
        document.querySelector('.iconSound').style.background = "url('../../both/assets/img/svg-son2-off.svg') center no-repeat"
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
    document.querySelector('#cursor').style.width = "35px"
    document.querySelector('#cursor').style.height = "35px"
    document.querySelector('#cursor').style.border = "2px solid white"
    document.querySelector('#cursor').style.transition = "0.5s"
})

document.querySelector('.iconSound').addEventListener("mouseout", function(){
    document.querySelector('#cursor').style.width = "25px"
    document.querySelector('#cursor').style.height = "25px"
    document.querySelector('#cursor').style.border = "1.5px solid white"
    document.querySelector('#cursor').style.transition = "0.5s"
})

document.querySelector('.iconInfo').addEventListener("mouseover", function(){
    document.querySelector('#cursor').style.width = "35px"
    document.querySelector('#cursor').style.height = "35px"
    document.querySelector('#cursor').style.border = "2px solid white"
    document.querySelector('#cursor').style.transition = "0.5s"
})

document.querySelector('.iconInfo').addEventListener("mouseout", function(){
    document.querySelector('#cursor').style.width = "25px"
    document.querySelector('#cursor').style.height = "25px"
    document.querySelector('#cursor').style.border = "1.5px solid white"
    document.querySelector('#cursor').style.transition = "0.5s"
})