const p = console.log;


const calculator = (TAX_AMOUNT, divisor = 1, catObj = {},totalRemaining) => {
  TAX_AMOUNT = parseFloat(TAX_AMOUNT);

  if (!catObj || !catObj.amountEntered || !catObj.amountEntered.specified) {
    console.log(`Option 1: The remaining amount: ${TAX_AMOUNT}`)  
    return TAX_AMOUNT;
    }
  if (catObj.amountEntered.specified) {
    const calculatedAmount = TAX_AMOUNT - totalRemaining;
    console.log(`Option 2: The remaining amount: ${taxAmount - totalRemaining}`)  
    return calculatedAmount;
  }
  
};



  export default calculator;