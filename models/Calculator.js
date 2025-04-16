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

  _calculateTip(event) {
    const { target } = event;
    const numberOfPeople = Number(this.peopleElement.value);

    this._resetActiveButton();
    target.classList.add("active");

    if (!this._isValidUserInput(numberOfPeople, target)) return;

    const discount = this._getDiscount(target);

    const billAmount = Number(this.billElement.value) || 0;

    const tipPerPerson = this._calculateTipPerPerson(billAmount, discount, numberOfPeople);

    const totalAmountPerPerson = this._calculateTotalAmountPerPerson(billAmount, tipPerPerson, numberOfPeople);

    this.tipAmountElement.textContent = `$${tipPerPerson.toFixed(2)}`;
    this.totalAmountElement.textContent = `$${totalAmountPerPerson.toFixed(2)}`;

    this.resetButton.disabled = false;
  }

  _getDiscount({ id, dataset: { discount }, value }) {
    if (id === "people") {
      this._resetCustomTip();
      return;
    }
    if (id === "bill") return 0;
    const discountValue = this.DISCOUNT[discount];
    return discountValue !== undefined ? discountValue : Number(value) / 100;
  }

  _calculateTipPerPerson(bill, discountRate, people) {
    const tip = (bill * discountRate) / people;
    return isNaN(tip) ? 0 : tip;
  }

  _calculateTotalAmountPerPerson(billAmount, tipPerPerson, numberOfPeople) {
    const total = billAmount / numberOfPeople + tipPerPerson;
    return isNaN(total) || !isFinite(total) ? 0 : total;
  }

  _resetActiveButton() {
    this.buttonElements.forEach((button) => button.classList.remove("active"));
  }

  _isValidUserInput(people, target) {
    const isBillValid = Number(this.billElement.value) > 0;
    const isPeopleValid = people > 0;
    const isDiscountValid = this._isValidDiscount(target) || Number(this.customTipElement.value) > 0 || this.customTipElement.value === "";

    if (!isPeopleValid) {
      this._showError();
      return false;
    }

    this._hideError();

    const isCustomTip = target.id === "custom-tip";
    if (!isCustomTip) this._resetCustomTip();

    return isBillValid && isDiscountValid;
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
    const discountValue = isCustomTip ? Number(target.value) : target.dataset.discount;

    return isFinite(discountValue) && discountValue > 0 ? discountValue : 0;
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
    this.peopleElement.addEventListener("keyup", (e) => this._calculateTip(e));
    this.billElement.addEventListener("keyup", (e) => this._calculateTip(e));
  }
}

export default Calculator;
