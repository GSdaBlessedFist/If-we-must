import { createContext, useContext, useReducer } from "react";
import { useTaxAmountContext } from "./TaxAmountProvider";
import { useCategoryObjectsContext } from "./CategoryObjectsProvider";
import { useTotalRemainingAmountContext } from "./TotalRemainingAmountProvider";
import calculator from "../util/calculations";

const CalculatedAmountContext = createContext();

const initialAmount = 0;

const reducer = (state,action)=>{
    let calculation;
    switch(action,type){
        case "CALCULATE AMOUNT":
            calculation = "calculator(action.payload)";
            return calculation;
        default:
            return state;
    }
}

const CalculatedAmountProvider = ({children}) => {
    const {TAX_AMOUNT} = useTaxAmountContext();
    const {catObjs} = useCategoryObjectsContext();
    const {totalRemaining} = useTotalRemainingAmountContext();
    const {calculatedAmount,dispatch} = useReducer(reducer,initialAmount);

    function getCalculatedAmount(){
        dispatch({type: "CALCULATE AMOUNT",payload: {TAX_AMOUNT,divisor:1, catObjs,totalRemaining}})
        console.log(action.payload)
    }

    const contextValue ={calculatedAmount,getCalculatedAmount};

    return (
        <CalculatedAmountContext.Provider value={contextValue}>
            {children}
        </CalculatedAmountContext.Provider>
    );
}

const useCalculatedAmountContext = ()=> useContext(CalculatedAmountContext);


export {CalculatedAmountProvider,useCalculatedAmountContext};

