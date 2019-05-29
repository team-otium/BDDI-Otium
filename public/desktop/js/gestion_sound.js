var sound = document.getElementById("iframeAudio");
var isPlaying = true;

function togglePlay() {
    if (isPlaying) {
        sound.play()
        document.querySelector('.iconSound').style.background = "url('../../both/assets/img/svg-son.svg')"
    } else {
        sound.pause();
        document.querySelector('.iconSound').style.background = "url('../../both/assets/img/icone-son-stop.svg')"
    }
};
sound.onplaying = function() {
    isPlaying = false;
};
sound.onpause = function() {
    isPlaying = true;
};