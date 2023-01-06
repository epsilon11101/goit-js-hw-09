import common from "../css/common.css";
import data from "../data.json";
import Notiflix from "notiflix";

const form = document.querySelector(".form");

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let delay = parseInt(form.elements[0].value);
  let step = parseInt(form.elements[1].value);
  let amount = parseInt(form.elements[2].value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
    delay += step;
  }
});
