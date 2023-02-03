import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datePicker =  document.getElementById("datetime-picker");
const startBtnEl = document.querySelector("[data-start]");

let selectedValue = 0;

const refs = {
    daysRef: document.querySelector("[data-days]"),
    hoursRef: document.querySelector("[data-hours]"),
    minutesRef: document.querySelector("[data-minutes]"),
    secondsRef: document.querySelector("[data-seconds]"),
};

startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedValue = selectedDates[0].getTime();
      if(selectedDates[0] - Date.now() < 0) {
        startBtnEl.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
      } else {
        startBtnEl.disabled = false;
      }
    },
  };

flatpickr(datePicker, options);

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

  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }

function correctTimeValues(timerValues) {
    refs.daysRef.textContent = addLeadingZero(timerValues.days);
    refs.hoursRef.textContent = addLeadingZero(timerValues.hours);
    refs.minutesRef.textContent = addLeadingZero(timerValues.minutes);
    refs.secondsRef.textContent = addLeadingZero(timerValues.seconds);
}

function startCountdown() {
    let timerId;
    function onCheck() {
        const diff = selectedValue - Date.now();
        if(diff <= 0) {
            clearInterval(timerId);
        } else {
            correctTimeValues(convertMs(diff));
            startBtnEl.disabled = true;
        }
    }
    timerId = setInterval(onCheck, 1000);
}

startBtnEl.addEventListener("click", startCountdown);