import React, { useEffect,useState, createContext, useContext } from "react"; 
import p from "@/app/util/consoleHelper";

const SOURCE = "TaxAmountProvider";
const srcColor = 5;

const TaxAmountContext = createContext();
TaxAmountContext.displayName = "TaxAmountContext";

const TaxAmountProvider = ({ children }) => {
  const [TAX_AMOUNT, setTAX_AMOUNT] = useState(0);

  function updateTaxAmount(amount) {
    setTAX_AMOUNT(amount.trim().replace(/^0+/,""));
  }

  useEffect(()=>{
    //p(SOURCE,TAX_AMOUNT,srcColor,"Tax amount:");
  },[TAX_AMOUNT]);

  const contextValue = { TAX_AMOUNT, updateTaxAmount };
  return (
    <TaxAmountContext.Provider value={contextValue}>
      {children}
    </TaxAmountContext.Provider>
  );
};

const useTaxAmountContext = ()=> useContext(TaxAmountContext);

export {TaxAmountProvider,useTaxAmountContext}