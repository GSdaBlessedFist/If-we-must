//TotalRemainingAmountProvider.js



import React, { useEffect, useState, createContext } from "react";

export const TotalRemainingAmountContext = createContext();

export const TotalRemainingAmountProvider = ({ children }) => {
  const [totalRemainingAmount, setTotalRemainingAmount] = useState(0);

  function updateTotalRemainingAmount(categories) {
    function updateTotalRemainingAmount(categories) {
      const totalAmount = categories.reduce((acc, category) => {
  
        if (category.amountEntered.specified) {
          acc += category.amountEntered.amount;
        }
        return acc;
      }, 0);
  
      setTotalRemainingAmount(totalAmount);
  }
  }
  const contextValue = { totalRemainingAmount, updateTotalRemainingAmount };

  return (
    <TotalRemainingAmountContext.Provider value={contextValue}>
      {children}
    </TotalRemainingAmountContext.Provider>
  );
};
