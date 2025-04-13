class Calculator {
  constructor(billElement, buttonElements, peopleElement, timAmountElement, totalAmountElement, resetButton) {
    this.billElement = billElement;
    this.buttonElements = buttonElements;
    this.peopleElement = peopleElement;
    this.timAmountElement = timAmountElement;
    this.totalAmountElement = totalAmountElement;
    this.resetButton = resetButton;
  }

  init() {
    console.info("Calculator initialized");
  }
}

export default Calculator;
