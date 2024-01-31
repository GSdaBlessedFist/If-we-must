import React, { useEffect, useState, useContext,createContext } from "react";
import { TaxAmountContext } from "./TaxAmountProvider";
import p from "@/app/util/consoleHelper";

const SOURCE = "TotalRemainingAmountPROVIDER";
const srcColor = 55;

export const TotalRemainingAmountContext = createContext();

export const TotalRemainingAmountProvider = ({ children }) => {
  const TaxContext = useContext(TaxAmountContext);
  const [totalRemainingAmount, setTotalRemainingAmount] = useState(TaxContext.TAX_AMOUNT);

  function updateTotalRemainingAmount(categories) {
    
      const totalAmount = categories.reduce((acc, category) => {
        if (category.amountEntered && category.amountEntered.specified) {
          acc += category.amountEntered.amount;
        }
        return acc;
      }, 0);

      setTotalRemainingAmount(TaxContext.TAX_AMOUNT - totalAmount);
    
  }

  useEffect(()=>{
    setTotalRemainingAmount(TaxContext.TAX_AMOUNT)
    p(SOURCE,totalRemainingAmount,srcColor,"Total Remaining Amount")

  },[TaxContext.TAX_AMOUNT]);

  useEffect(()=>{

    p(SOURCE,totalRemainingAmount,srcColor,"Total Remaining Amount")

  },[totalRemainingAmount]);
  const contextValue = { totalRemainingAmount, updateTotalRemainingAmount };

  return (
    <TotalRemainingAmountContext.Provider value={{ totalRemainingAmount, updateTotalRemainingAmount }}>
      {children}
    </TotalRemainingAmountContext.Provider>
  );
};
