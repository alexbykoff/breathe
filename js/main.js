let bgColor = window.localStorage.getItem("breathe-bg");
let audio, minutes, seconds, progressBarWidth;
const backgroundButtons = [...document.getElementsByClassName("bg_selector")];
const bar = document.getElementById("bar");

if (bgColor === null) {
    bgColor = "D8973C";
}

changeColor(bgColor);

backgroundButtons.map(e => {
    const color = e.getAttribute("data-color");
    e.style.backgroundColor = `#${color}`;
    e.addEventListener("click", handleColorChange);
});

    let length;


const cover = document.getElementById("cover");
document.getElementById("start").addEventListener("click", e => {
    const lengthSelector = [...document.getElementsByName("length")];

    lengthSelector.map(e=> {e.checked && (length = e.value)});
    console.log(length);
    cover.style.display = "none";
    document.getElementsByClassName("circle")[0].classList.toggle("animate");
    document.getElementsByClassName("text")[0].classList.toggle("animate");
    audio = new Audio("audio/Raindrops-noise.mp3");
    audio.play();
    audio.loop = true;
    minutes = Math.floor(length / 60), seconds = length%60;
    progressBarWidth = 100;
    renderTimer(minutes, seconds);
    const timer = window.setInterval(time, 1000);
});

function time() {
    renderTimer(minutes, seconds);
    seconds -= 1;
    progressBarWidth -= 100 / length;
    if (seconds < 0) {
        minutes -= 1;
        seconds = 59;
    }
    bar.style.width = progressBarWidth + "%";

}

function renderTimer(minutes, seconds) {
    const sec = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").innerHTML = `0${minutes}:${sec}`;
}

function handleColorChange(event) {
    const color = event.target.getAttribute("data-color");
    window.localStorage.setItem("breathe-bg", color);
    changeColor(color);
}

function changeColor(color) {
    document.getElementById("cover").style.backgroundColor = `#${color}`;
    document.body.style.backgroundColor = `#${color}`;
    backgroundButtons.forEach(e => e.classList.remove("active-selector"));
    const activeSelector = document.querySelectorAll(
        `[data-color='${color}']`
    )[0];
    activeSelector.classList.add("active-selector");
}
