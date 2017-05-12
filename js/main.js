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

const cover = document.getElementById("cover");
document.getElementById("start").addEventListener("click", e => {
    cover.style.display = "none";
    document.getElementsByClassName("circle")[0].classList.toggle("animate");
    document.getElementsByClassName("text")[0].classList.toggle("animate");
    audio = new Audio("audio/Raindrops-noise.mp3");
    audio.play();
    audio.loop = true;
    (minutes = 0), (seconds = 0);
    progressBarWidth = 0;
    renderTimer(minutes, seconds);
    const timer = window.setInterval(time, 1000);
});

function time() {
    seconds += 1;
    progressBarWidth += 1;
    if (seconds === 60) {
        minutes += 1;
        seconds = 0;
    }
    bar.style.width = progressBarWidth + "%";
    renderTimer(minutes, seconds);
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
