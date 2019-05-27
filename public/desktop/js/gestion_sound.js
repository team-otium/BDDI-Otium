var sound = document.getElementById("iframeAudio");
var isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        sound.play()
        document.querySelector('.iconSound').classList.add('fa-volume-up')
        document.querySelector('.iconSound').classList.remove('fa-volume-mute')
    } else {
        sound.pause();
        document.querySelector('.iconSound').classList.remove('fa-volume-up')
        document.querySelector('.iconSound').classList.add('fa-volume-mute')
    }
};
sound.onplaying = function() {
    isPlaying = false;
};
sound.onpause = function() {
    isPlaying = true;
};