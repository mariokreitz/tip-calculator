import Calculator from "./models/Calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  console.info("DOM fully loaded and parsed");
  init();
});
const init = () => {
  const { billElement, buttonElements, peopleElement, timAmountElement, totalAmountElement, resetButton } = getAllDOMElements();

  const calculator = new Calculator(billElement, buttonElements, peopleElement, timAmountElement, totalAmountElement, resetButton);
  calculator.init();
};

const getAllDOMElements = () => {
  const billElement = document.getElementById("bill");
  const buttonElements = [...document.querySelectorAll(".tip button")];
  const peopleElement = document.getElementById("people");
  const timAmountElement = document.getElementById("tip-amount");
  const totalAmountElement = document.getElementById("total");
  const resetButton = document.getElementById("reset");

  return {
    billElement,
    buttonElements,
    peopleElement,
    timAmountElement,
    totalAmountElement,
    resetButton,
  };
};
