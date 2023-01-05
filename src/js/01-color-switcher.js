import common from "../css/common.css";
import data from "../data.json";

const start = document.querySelector("[data-start]");
const stop = document.querySelector("[data-stop]");
let second;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

start.addEventListener("click", () => {
  second = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
stop.addEventListener("click", () => {
  clearTimeout(second);
});
