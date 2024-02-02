import React, { useEffect, useState, useContext,createContext } from "react";
import { TaxAmountContext } from "./TaxAmountProvider";
import {SelectedCategoriesContext} from "./SelectedCategoriesProvider";
import p from "@/app/util/consoleHelper";

const SOURCE = "TotalRemainingAmountPROVIDER";
const srcColor = 55;

export const TotalRemainingAmountContext = createContext();
TotalRemainingAmountContext.displayName = "TotalRemainingAmountContext";

export const TotalRemainingAmountProvider = ({ children }) => {

  const TaxContext = useContext(TaxAmountContext);
  const SelectedCatsContext = useContext(SelectedCategoriesContext);
  const [totalRemainingAmount, setTotalRemainingAmount] = useState( );

  function updateTotalRemainingAmount(categories) {
     
      const totalAmount = categories?.reduce((acc, category) => {
        if (category.amountEntered && category.amountEntered.specified) {
          p(SOURCE, category, srcColor, "Category");
          p(SOURCE, category.modeCalculatedAmount, srcColor, "Mode Calculated Amount");
          acc += category.modeCalculatedAmount;
        }
        return acc;
      }, 0);

      const updatedTotalRemainingAmount = TaxContext.TAX_AMOUNT - totalAmount;
      setTotalRemainingAmount(updatedTotalRemainingAmount);
      p(SOURCE,updatedTotalRemainingAmount,75,"updatedTotalRemainingAmount")
  }

  useEffect(() => {
    p(SOURCE, totalRemainingAmount, srcColor, "(init)totalRemainingAmount");
  }, []);

  useEffect(() => {
    p(SOURCE, totalRemainingAmount, srcColor, "totalRemainingAmount");
  }, [totalRemainingAmount, TaxContext.TAX_AMOUNT]);

  useEffect(() => {
    p(SOURCE, SelectedCatsContext.listOfCategories, srcColor, "Selected Categories");
    updateTotalRemainingAmount(); // Call the function directly
  }, [SelectedCatsContext.listOfCategories, TaxContext.TAX_AMOUNT]);

  
  const contextValue = { totalRemainingAmount, updateTotalRemainingAmount };

  return (
    <TotalRemainingAmountContext.Provider value={{ totalRemainingAmount, updateTotalRemainingAmount }}>
      {children}
    </TotalRemainingAmountContext.Provider>
  );
};
