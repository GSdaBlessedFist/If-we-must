import React, { useEffect, useState, useContext, createContext, useReducer } from "react";
import { useTaxAmountContext } from "./TaxAmountProvider";
import p from "../util/consoleHelper";

const SOURCE = "TotalRemainingAmountPROVIDER";
const srcColor = 55;

const reducer = (state, action) => {

  const startingTaxAmount = localStorage.getItem("tax_amount")
  switch (action.type) {
    case "UPDATE_TOTAL_REMAINING_AMOUNT":
      const { amountDisplayed } = action.payload;
      //console.log(`amountDisplayed: ${amountDisplayed}`)//✅

      const amountToSubtract = Number(amountDisplayed) || 0;
      //console.log(`amountToAdd: ${amountToSubtract}`)//✅

      const newTotalRemainingAmount = startingTaxAmount - amountToSubtract;
      //console.log(`startingTaxAmount:  startingTaxAmount: ${state.totalRemainingAmount} - amountToSubtract: ${amountToSubtract}`);//✅

      const finalTotalRemainingAmount = newTotalRemainingAmount < 0 ? 0 : newTotalRemainingAmount;

      return { ...state, totalRemainingAmount: finalTotalRemainingAmount };
    case "UPDATE_TAX_AMOUNT":
      return { ...state, totalRemainingAmount: action.payload.taxAmount };
    default:
      return state;
  }
};

const TotalRemainingAmountContext = createContext();
TotalRemainingAmountContext.displayName = "TotalRemainingAmountContext";

const TotalRemainingAmountProvider = ({ children }) => {

  const { TAX_AMOUNT } = useTaxAmountContext();
  const [state, dispatch] = useReducer(reducer, { totalRemainingAmount: TAX_AMOUNT });


  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////


  const updateTotalRemainingAmount = (amountDisplayed) => {
    dispatch({ type: "UPDATE_TOTAL_REMAINING_AMOUNT", payload: { amountDisplayed } });
  };


  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch({ type: "UPDATE_TAX_AMOUNT", payload: ({ taxAmount: TAX_AMOUNT }) })
  }, [TAX_AMOUNT])



  useEffect(() => {
    p(SOURCE,TAX_AMOUNT,srcColor -6,"TAX_AMOUNT")

  }, [state.totalRemainingAmount]);

  const contextValue = { totalRemainingAmount: state.totalRemainingAmount, updateTotalRemainingAmount };

  return (
    <TotalRemainingAmountContext.Provider value={contextValue}>
      {children}
    </TotalRemainingAmountContext.Provider>
  );
};

const useTotalRemainingAmountContext = () => useContext(TotalRemainingAmountContext);

export { TotalRemainingAmountProvider, useTotalRemainingAmountContext }