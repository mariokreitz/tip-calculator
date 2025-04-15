class Calculator {
  DISCOUNT = {
    5: 0.05,
    10: 0.1,
    15: 0.15,
    25: 0.25,
    50: 0.5,
  };

  billElement;
  buttonElements;
  customTipElement;
  peopleElement;
  tipAmountElement;
  totalAmountElement;
  resetButton;
  errorElement;

  init(billElement, buttonElements, customTipElement, peopleElement, tipAmountElement, totalAmountElement, resetButton, errorElement) {
    this.billElement = billElement;
    this.buttonElements = buttonElements;
    this.customTipElement = customTipElement;
    this.peopleElement = peopleElement;
    this.tipAmountElement = tipAmountElement;
    this.totalAmountElement = totalAmountElement;
    this.resetButton = resetButton;
    this.errorElement = errorElement;
    this._checkElements();
    this._buttonSetup();
    this._addClickListeners();
    this._addChangeListeners();

    console.info("Calculator initialized");
  }

  _checkElements() {
    if (!this.billElement) throw new Error("Bill element not found");
    if (!this.buttonElements) throw new Error("Button elements not found");
    if (!this.customTipElement) throw new Error("Custom tip element not found");
    if (!this.peopleElement) throw new Error("People element not found");
    if (!this.tipAmountElement) throw new Error("Tip amount element not found");
    if (!this.totalAmountElement) throw new Error("Total amount element not found");
    if (!this.resetButton) throw new Error("Reset button not found");
    if (!this.errorElement) throw new Error("Error element not found");
  }

  _buttonSetup() {
    this.buttonElements.forEach((button, index) => {
      const discount = Object.keys(this.DISCOUNT)[index];
      button.textContent = `${discount}%`;
      button.dataset.discount = discount;
    });
  }

  _calculateTip({ target }) {
    this._resetActiveButton();
    target.classList.add("active");

    const numberOfPeople = Number(this.peopleElement.value);

    this._validateUserInput(numberOfPeople, target);

    const discount = this.DISCOUNT[target.dataset.discount] || Number(target.value) / 100;
    const billAmount = Number(this.billElement.value) || 0;
    const tipPerPerson = (billAmount * discount) / numberOfPeople;
    const totalAmountPerPerson = billAmount / numberOfPeople + tipPerPerson;

    this.tipAmountElement.textContent = `$${tipPerPerson.toFixed(2)}`;
    this.totalAmountElement.textContent = `$${totalAmountPerPerson.toFixed(2)}`;

    this.resetButton.disabled = false;
  }

  _resetActiveButton() {
    this.buttonElements.forEach((button) => button.classList.remove("active"));
  }

  _validateUserInput(numberOfPeople, targetElement) {
    const isCustomTip = targetElement.id === "custom-tip";

    if (numberOfPeople <= 0) {
      this._showError();
      return;
    } else this._hideError();

    if (this.billElement.value <= 0) return;

    if (!this._isValidDiscount(targetElement)) return;

    if (!isCustomTip) this._resetCustomTip();
  }

  _showError() {
    this.errorElement.classList.remove("d_none");
    this.peopleElement.style.border = "1px solid #ff5656";
  }

  _hideError() {
    this.errorElement.classList.add("d_none");
    this.peopleElement.style.border = "none";
  }

  _isValidDiscount(target) {
    const isCustomTip = target.id === "custom-tip";
    if (isCustomTip) return true;

    const discount = target.dataset.discount;
    return this.DISCOUNT[discount] !== undefined;
  }

  _resetCustomTip() {
    this.customTipElement.value = "";
  }

  _resetCalculator() {
    this.billElement.value = 0;
    this.customTipElement.value = "";
    this.peopleElement.value = 1;
    this.tipAmountElement.textContent = "$0.00";
    this.totalAmountElement.textContent = "$0.00";
    this.resetButton.disabled = true;
    this._resetActiveButton();
    this._hideError();
  }

  _addClickListeners() {
    this.buttonElements.forEach((button) => button.addEventListener("click", (e) => this._calculateTip(e)));
    this.resetButton.addEventListener("click", () => this._resetCalculator());
  }

  _addChangeListeners() {
    this.customTipElement.addEventListener("keyup", (e) => this._calculateTip(e));
  }
}

export default Calculator;
