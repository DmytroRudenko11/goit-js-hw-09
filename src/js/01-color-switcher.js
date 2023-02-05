function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);

let timerId = 0;

function onClickStart() {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onClickStop() {
  clearInterval(timerId);
  startBtn.disabled = false;
}
