import React, { useEffect,useState, createContext } from "react";

export const TaxAmountContext = createContext();

export const TaxAmountProvider = ({ children }) => {
  const [TAX_AMOUNT, setTAX_AMOUNT] = useState("");

  function updateTaxAmount(amount) {
    setTAX_AMOUNT(amount);
  }

  const contextValue = { TAX_AMOUNT, updateTaxAmount };
  return (
    <TaxAmountContext.Provider value={{ TAX_AMOUNT, updateTaxAmount }}>
      {children}
    </TaxAmountContext.Provider>
  );
};
