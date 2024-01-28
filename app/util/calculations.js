import { categoryObjects } from "../categoryObjects";
const p = console.log;


const calculator = (taxAmount, divisor = 1, catObj = {},totalRemaining) => {
    if (divisor === 1 && catObj.amountEntered && catObj.amountEntered.specified === false) {
        return `The remaining amount: ${taxAmount}`;
      }
    if (divisor === 1 && catObj.amountEntered && catObj.amountEntered.specified === true) {
        return `The remaining amount: ${taxAmount - totalRemaining}`
    }
    // ... (other calculations if needed)
  };



module.exports = calculator;