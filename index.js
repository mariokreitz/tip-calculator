import Calculator from "./models/Calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  console.info("DOM fully loaded and parsed");
  init();
});
const init = () => {
  const { billElement, buttonElements, customTipElement, peopleElement, tipAmountElement, totalAmountElement, resetButton, errorElement } =
    getAllDOMElements();

  const tipCalculator = new Calculator();
  tipCalculator.init(
    billElement,
    buttonElements,
    customTipElement,
    peopleElement,
    tipAmountElement,
    totalAmountElement,
    resetButton,
    errorElement
  );
  tipCalculator.start();
};

const getAllDOMElements = () => {
  const billElement = document.getElementById("bill");
  const buttonElements = [...document.querySelectorAll(".tip button")];
  const customTipElement = document.getElementById("custom-tip");
  const peopleElement = document.getElementById("people");
  const tipAmountElement = document.getElementById("tip-amount");
  const totalAmountElement = document.getElementById("total");
  const resetButton = document.getElementById("reset");
  const errorElement = document.getElementById("error");

  return {
    billElement,
    buttonElements,
    customTipElement,
    peopleElement,
    tipAmountElement,
    totalAmountElement,
    resetButton,
    errorElement,
  };
};
