const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

stopBtnEl.disabled = true;
let interval = undefined;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackgroundColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}

function startBackgroundChange() {
    changeBackgroundColor();
    interval = setInterval(changeBackgroundColor, 1000);
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
}

function stopBackgroundChange() {
    clearInterval(interval);
    bodyEl.style.backgroundColor = '#FFF';
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
}

startBtnEl.addEventListener('click', startBackgroundChange);
stopBtnEl.addEventListener('click', stopBackgroundChange);