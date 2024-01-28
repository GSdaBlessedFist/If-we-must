import React, { useEffect, useState, useContext,createContext } from "react";
import { TaxAmountContext } from "./TaxAmountProvider";

export const TotalRemainingAmountContext = createContext();

export const TotalRemainingAmountProvider = ({ children }) => {
  const TaxContext = useContext(TaxAmountContext);
  const [totalRemainingAmount, setTotalRemainingAmount] = useState(0);

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
    console.log(`PROVIDER: Total Remaining Amount: ${totalRemainingAmount}`)
  },[totalRemainingAmount]);
  const contextValue = { totalRemainingAmount, updateTotalRemainingAmount };

  return (
    <TotalRemainingAmountContext.Provider value={{ totalRemainingAmount, updateTotalRemainingAmount }}>
      {children}
    </TotalRemainingAmountContext.Provider>
  );
};
