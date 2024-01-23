//TotalRemainingAmountProvider.js



import React, { useEffect, useState, createContext } from "react";

export const TotalRemainingAmountContext = createContext();

export const TotalRemainingAmountProvider = ({ children }) => {
  const [totalRemainingAmount, setTotalRemainingAmount] = useState(0);

  function updateTotalRemainingAmount(amount) {
    setTotalRemainingAmount(amount);
  }

  const contextValue = { totalRemainingAmount, updateTotalRemainingAmount };

  return (
    <TotalRemainingAmountContext.Provider value={contextValue}>
      {children}
    </TotalRemainingAmountContext.Provider>
  );
};
