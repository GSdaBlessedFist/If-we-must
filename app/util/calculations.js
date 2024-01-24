import { categoryObjects } from "../categoryObjects";
const p = console.log;


const calculator = (taxAmount,divisor=1,catObj={})=>{
    
    if(divisor === 1 && catObj.amountEntered.specified){
        p(`divisor=${divisor} AND amountEntered`)
    }


};



module.exports = calculator;