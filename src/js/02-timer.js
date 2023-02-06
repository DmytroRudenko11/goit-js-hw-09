import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

const timerData = document.querySelectorAll('.value');

startBtn.disabled = true;

function counterTranfer({ days, hours, minutes, seconds }) {
  timerDays.textContent = String(days).padStart(2, '0');
  timerHours.textContent = String(hours).padStart(2, '0');
  timerMinutes.textContent = String(minutes).padStart(2, '0');
  timerSeconds.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const date = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (date.getTime() < selectedDates[0].getTime()) {
      startBtn.disabled = false;
      return;
    }
    Notiflix.Report.info(
      'Wrong date',
      'Please choose a date in the future',
      'Ok'
    );
  },
};

const myDate = flatpickr(dateInput, options);

startBtn.addEventListener('click', startTimer);

function startTimer(e) {
  let timeDiff = 0;
  let timerId = 0;
  const myDateInMs = myDate.selectedDates[0].getTime();

  timerId = setInterval(() => {
    const currentTime = Date.now();
    if (myDateInMs <= currentTime) {
      Notiflix.Notify.warning('Choose time again, it has already run out');
      clearInterval(timerId);
      return;
    }

    timeDiff = myDateInMs - currentTime;
    const timerSetting = convertMs(timeDiff);

    counterTranfer(timerSetting);
    dateInput.disabled = true;
    startBtn.disabled = true;

    if (timeDiff <= 995) {
      Notiflix.Notify.info('You were patient enough');
      clearInterval(timerId);
    }
  }, 1000);
}
