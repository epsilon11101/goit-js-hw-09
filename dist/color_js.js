/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/data.json
const data_namespaceObject = {};
;// CONCATENATED MODULE: ./src/js/01-color-switcher.js


var start = document.querySelector("[data-start]");
var stop = document.querySelector("[data-stop]");
var second;
function getRandomHexColor() {
  return "#".concat(Math.floor(Math.random() * 16777215).toString(16));
}
start.addEventListener("click", function () {
  start.disabled = true;
  second = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
stop.addEventListener("click", function () {
  clearTimeout(second);
  start.disabled = false;
});
/******/ })()
;