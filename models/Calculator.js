class Calculator {
  DISCOUNT = {
    5: 0.05,
    10: 0.1,
    15: 0.15,
    25: 0.25,
    50: 0.5,
  };

  init(billElement, buttonElements, peopleElement, timAmountElement, totalAmountElement, resetButton) {
    this.billElement = billElement;
    this.buttonElements = buttonElements;
    this.peopleElement = peopleElement;
    this.timAmountElement = timAmountElement;
    this.totalAmountElement = totalAmountElement;
    this.resetButton = resetButton;
    this._checkElements();
    this._buttonSetup();
    console.info("Calculator initialized");
  }

  addListeners() {
    this.buttonElements.forEach((button) => button.addEventListener("click", this._calculateTip));
    this.resetButton.addEventListener("click", this._resetCalculator);
  }

  _checkElements() {
    if (!this.billElement) throw new Error("Bill element not found");
    if (!this.buttonElements) throw new Error("Button elements not found");
    if (!this.peopleElement) throw new Error("People element not found");
    if (!this.timAmountElement) throw new Error("Tip amount element not found");
    if (!this.totalAmountElement) throw new Error("Total amount element not found");
    if (!this.resetButton) throw new Error("Reset button not found");
  }

  _buttonSetup() {
    this.buttonElements.forEach((button, index) => {
      const discount = Object.keys(this.DISCOUNT)[index];
      button.textContent = `${discount}%`;
    });
  }
}

export default Calculator;
