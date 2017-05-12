let bgColor = window.localStorage.getItem("breathe-bg");
let audio, minutes, seconds;
const backgroundButtons = [...document.getElementsByClassName("bg_selector")];

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
document.addEventListener("click", e=> {
  cover.style.display = "none";
  document.getElementsByClassName("circle")[0].classList.toggle("animate");
  document.getElementsByClassName("text")[0].classList.toggle("animate");
  audio = new Audio("audio/waves.mp3");
  audio.play();
  minutes = 1, seconds = 9;
  renderTimer(minutes, seconds);
  const timer = window.setInterval(time, 1000);
});


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
  renderTimer(minutes, seconds);

  if (minutes === 0 && seconds === 0) {
    window.clearInterval(time);
  }
}

function renderTimer(minutes, seconds){
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
