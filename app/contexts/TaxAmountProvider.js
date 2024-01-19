import React, {useState, createContext } from "react";

export const TaxAmountContext = createContext();

export const TaxAmountProvider = ({ children }) => {

  const [TAX_AMOUNT,setTAX_AMOUNT] = useState(0);
  
  function updateTaxAmount(amount){
	setTAX_AMOUNT(amount);
  }
  const contextValue = {TAX_AMOUNT,updateTaxAmount};
  return (
      <TaxAmountContext.Provider value={contextValue}>
        {children}
      </TaxAmountContext.Provider>
  );
};
