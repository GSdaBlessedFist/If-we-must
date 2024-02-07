// import React, { useEffect, useState, useContext,createContext, useReducer } from "react";
// import { TaxAmountContext as TaxAmount } from "./TaxAmountProvider";
// import p from "@/app/util/consoleHelper";

// const SOURCE = "TotalRemainingAmountPROVIDER";
// const srcColor = 55;


// const reducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE TOTAL REMAINING AMOUNT":
//       const { amountDisplayed } = action.payload;
//       console.log("Current totalRemainingAmount:", state.totalRemainingAmount);
//       console.log("Amount to add:", amountDisplayed);

//       const amountToAdd = Number(amountDisplayed) || 0;
//       console.log("Amount to add (converted):", amountToAdd);

//       const newTotalRemainingAmount = state.totalRemainingAmount - amountToAdd;
//       console.log(`New totalRemainingAmount:  state.totalRemainingAmount: ${state.totalRemainingAmount} - amountToAdd: ${amountToAdd}`);

//       const finalTotalRemainingAmount = newTotalRemainingAmount < 0 ? 0 : newTotalRemainingAmount;
//       console.log("Final totalRemainingAmount:", finalTotalRemainingAmount);

//       localStorage.setItem("totalRemainingAmount", finalTotalRemainingAmount);

//       return { ...state, totalRemainingAmount: finalTotalRemainingAmount };
//     default:
//       return state;
//   }
// };

// export const TotalRemainingAmountContext = createContext();
// TotalRemainingAmountContext.displayName = "TotalRemainingAmountContext";



// export const TotalRemainingAmountProvider = ({ children }) => {

//   const TaxContext = useContext(TaxAmount);
//   const [initialState, setInitialState] = useState({ totalRemainingAmount: TaxContext.TAX_AMOUNT || 0});
//   const [state,dispatch] = useReducer(reducer,initialState);
  
//   /////////////////////GOOD///////////////////////
//   /////////////////////////////////////////////
//   ///////////////////IN PROGRESS//////////////////
  
//   const updateTotalRemainingAmount = (amountDisplayed)=>{
//     dispatch({type: "UPDATE TOTAL REMAINING AMOUNT",payload:{amountDisplayed}})
//   }



//     /////////////////////////////////////////////
//   /////////////////////////////////////////////
//   /////////////////////////////////////////////

  
 
  
//   useEffect(() => {
//     // Logic for handling state changes
//     p(SOURCE, initialState | 0, srcColor -20, "initial Tax amount");
//   }, []);

//   /////////////////////////////////////////////
//   /////////////////////////////////////////////
//   /////////////////////////////////////////////

  
//   const contextValue = { totalRemainingAmount: state.totalRemainingAmount, updateTotalRemainingAmount };

//   return (
//     <TotalRemainingAmountContext.Provider value={contextValue}>
//       {children}
//     </TotalRemainingAmountContext.Provider>
//   );
// };

// TotalRemainingAmountProvider.js

import React, { useEffect, useState, useContext, createContext, useReducer } from "react";
import { TaxAmountContext as TaxAmount } from "./TaxAmountProvider";
import p from "@/app/util/consoleHelper";

const SOURCE = "TotalRemainingAmountPROVIDER";
const srcColor = 55;

const reducer = (state, action) => {
  const startingTaxAmount = localStorage.getItem("tax_amount")
  switch (action.type) {
    case "UPDATE_TOTAL_REMAINING_AMOUNT":
      const { amountDisplayed } = action.payload;
      console.log(`amountDisplayed: ${amountDisplayed}`)//✅

      const amountToSubtract = Number(amountDisplayed) || 0;
      console.log(`amountToAdd: ${amountToSubtract}`)//✅

      const newTotalRemainingAmount = startingTaxAmount - amountToSubtract;
      console.log(`startingTaxAmount:  startingTaxAmount: ${state.totalRemainingAmount} - amountToSubtract: ${amountToSubtract}`);//✅

      const finalTotalRemainingAmount = newTotalRemainingAmount < 0 ? 0 : newTotalRemainingAmount;
      // localStorage.setItem("totalRemainingAmount", finalTotalRemainingAmount);
      return { ...state, totalRemainingAmount: finalTotalRemainingAmount };
    default:
      return state;
  }
};

export const TotalRemainingAmountContext = createContext();
TotalRemainingAmountContext.displayName = "TotalRemainingAmountContext";

export const TotalRemainingAmountProvider = ({ children }) => {
  const TaxContext = useContext(TaxAmount);
  const [state, dispatch] = useReducer(reducer, { totalRemainingAmount: TaxContext.TAX_AMOUNT });

  const updateTotalRemainingAmount = (amountDisplayed) => {
    dispatch({ type: "UPDATE_TOTAL_REMAINING_AMOUNT", payload: { amountDisplayed } });
  };

  useEffect(() => {
    p(SOURCE,state.totalRemainingAmount,srcColor -6,"total remaining amount")
    
}, [state.totalRemainingAmount]);

  const contextValue = { totalRemainingAmount: state.totalRemainingAmount, updateTotalRemainingAmount };

  return (
    <TotalRemainingAmountContext.Provider value={contextValue}>
      {children}
    </TotalRemainingAmountContext.Provider>
  );
};
