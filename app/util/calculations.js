const p = console.log;


const calculator = (taxAmount, divisor = 1, catObj = {},totalRemaining) => {
  if (divisor === 1 && catObj.amountEntered && catObj.amountEntered.specified === false) {
    console.log(`Option 1: The remaining amount: ${taxAmount}`)  
    return `The remaining amount: ${taxAmount}`;
    }
  if (divisor === 1 && catObj.amountEntered && catObj.amountEntered.specified === true) {
    console.log(`Option 2: The remaining amount: ${taxAmount - totalRemaining}`)  
    return `The remaining amount: ${taxAmount - totalRemaining}`
  }
  
};



  export default calculator;