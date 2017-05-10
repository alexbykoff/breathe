var audio = new Audio("audio/waves.mp3");
audio.play();
let minutes = 1, seconds = 9;
const timer = window.setInterval(time, 1000);

function time() {
    seconds -= 1;
    if (seconds === -1 && minutes > 0) {
        minutes -= 1;
        seconds = 59;
    } else if (seconds === -1 && minutes === 0) {
        window.clearInterval(time);
        minutes = 0;
        seconds = 0;
    }
    const sec = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").innerHTML = `${minutes}:${sec}`;
    if (minutes === 0 && seconds === 0) {
        window.clearInterval(time);
    }
}
