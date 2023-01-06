import common from "../css/common.css";
import data from "../data.json";
import flatpickr from "flatpickr";
import Notiflix from "notiflix";
import "flatpickr/dist/flatpickr.min.css";

const date_picker = document.getElementById("datetime-picker");
const start = document.querySelector("[data-start]");
const time = {
  day: document.querySelector("[data-days]"),
  hour: document.querySelector("[data-hours]"),
  min: document.querySelector("[data-minutes]"),
  sec: document.querySelector("[data-seconds]"),
};

start.disabled = true;
let _ms = 0;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function getMS(today, future) {
  const days = future.getDate() - today.getDate();
  const actualSeconds = today.getHours() * 3600 + today.getMinutes() * 60;
  const seconds = days * 24 * 3600 - actualSeconds;
  return seconds * 1000;
}

function timer_counter() {
  const timer = setInterval(() => {
    const count_down = convertMs((_ms -= 1000));
    time.sec.innerText = count_down.seconds;
    time.min.innerText = count_down.minutes;
    time.hour.innerText = count_down.hours;
    time.day.innerText = count_down.days;

    if (_ms <= 0) clearTimeout(timer);
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];
    const today = new Date();

    if (
      date.getDate() > today.getDate() &&
      date.getMonth() >= today.getMonth() &&
      date.getFullYear() >= today.getFullYear()
    ) {
      start.disabled = false;
      _ms = getMS(today, date);
      const timer = convertMs(_ms);
      time.day.innerText = timer.days;
      time.hour.innerText = timer.hours;
      time.min.innerHTML = timer.minutes;
      time.sec.innerText = timer.seconds;
      timer_counter(_ms);

      Notiflix.Notify.success("Nice date dude!!");
    } else {
      Notiflix.Notify.failure("Please choose a date in the future");
    }
  },
};

flatpickr(date_picker, options);
