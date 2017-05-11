let bgColor;
try {
  bgColor = JSON.parse(window.localStorage.getItem("breathe-bg"));
} catch (error) {
  bgColor = "D8973C";
}
if (bgColor === null) {
  bgColor = "D8973C";
  window.localStorage.setItem("breathe-bg", bgColor);
}
const backgroundButtons = [...document.getElementsByClassName("bg_selector")];

changeColor(bgColor);

backgroundButtons.map(e => {
  const color = e.getAttribute("data-color");
  e.style.backgroundColor = `#${color}`;
  e.addEventListener("click", handleColorChange);
});

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
  document.getElementById("timer").innerHTML = `0${minutes}:${sec}`;
  if (minutes === 0 && seconds === 0) {
    window.clearInterval(time);
  }
}

function handleColorChange(event) {
  const color = event.target.getAttribute("data-color");
  window.localStorage.setItem("breathe-bg", color);
  changeColor(color);
}

function changeColor(color) {
  document.body.style.backgroundColor = `#${color}`;
  backgroundButtons.forEach(e => e.classList.remove("active-selector"));
  const activeSelector = document.querySelectorAll(`[data-color='${color}']`)[
    0
  ];
  activeSelector.classList.add("active-selector");
}
