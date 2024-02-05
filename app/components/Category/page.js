"use client";
import React, { useState, useContext, useEffect } from "react";
import debounce from "debounce";
import p from "@/app/util/consoleHelper";
import styles from "./category.module.scss";
import { CategoryObjectsContext } from "@/app/contexts/CategoryObjectsProvider";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import { TotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import calculator from "../../util/calculations";

const SOURCE = "Category Component";
const srcColor = 205;

export default function Category({ categoryName, categoryData }) {

  const TaxContext = useContext(TaxAmountContext);
  const RemainingAmountContext = useContext(TotalRemainingAmountContext);
  const CatObjectsContext = useContext(CategoryObjectsContext);
  const [mode, setMode] = useState("dollar");
  const [categoryObj, setCategoryObj] = useState(categoryData);
  const [amountDisplayed, setAmountDisplayed] = useState();





  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  
  const updateCategoryMode = (e, categoryName) => {
    const newMode = (e.target.innerHTML === "$")?"dollar":"percent";
    CatObjectsContext.updateMode(categoryName,newMode)
    setMode(newMode)
  };
  useEffect(()=>{
    
    p(SOURCE,mode,srcColor,"mode:")
  },[mode])

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////


  const handleModeChange = (newMode, amount) => {
    let newModeCalculatedAmount;
  
    if (newMode === "dollar") {
      newModeCalculatedAmount = amount;
    } else if (newMode === "percent") {
      if (amount > 100) {
        alert("Please enter a percentage less than 100");
        newModeCalculatedAmount = 0;
      } else {
        newModeCalculatedAmount = TaxContext.TAX_AMOUNT * (amount / 100);
      }
    }
  
    setCategoryObj((prevCategoryObj) => ({
      ...prevCategoryObj,
      mode: newMode,
      modeCalculatedAmount: newModeCalculatedAmount,
      amountEntered: {
        specified: true,
        amount: amount || 0,
      },
    }));
  };
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////




  
  const updateCategoryAmount = (newAmount) => {
    const newModeCalculatedAmount = calculateModeCalculatedAmount(
      categoryObj.mode,
      newAmount
    );
  
    setCategoryObj((prevCategoryObj) => ({
      ...prevCategoryObj,
      modeCalculatedAmount: newModeCalculatedAmount,
      amountEntered: {
        specified: true,
        amount: newAmount || 0,
      },
    }));
  };
  
  const calculateModeCalculatedAmount = (mode, amount) => {
    if (mode === "dollar") {
      return amount;
    } else if (mode === "percent") {
      return TaxContext.TAX_AMOUNT * (amount / 100);
    }
  
    return 0; // Default value
  };
  
  const updateAmountEntered = (e) => {
    const newAmount = e.target.value;
    const newModeCalculatedAmount = calculateModeCalculatedAmount(
      categoryObj.mode,
      newAmount
    );
  
    setCategoryObj((prevCategoryObj) => ({
      ...prevCategoryObj,
      amountEntered: {
        specified: true,
        amount: newAmount,
      },
      modeCalculatedAmount: newModeCalculatedAmount,
    }));
  };

  const debouncedUpdateAmountEntered = debounce(updateAmountEntered, 500);
  
  










  return (
    <>
      <div className={styles.categoryContainer} key="">
        <div className={styles.title}>
          <div>{categoryName}</div>
        </div>
        <div className={styles.middle}>
          <button className={ categoryObj.mode === "dollar" ? `${styles.dollar} ${styles.modeSelected}` : `${styles.dollar}` } data-mode="dollar" onClick={(e) => updateCategoryMode(e, categoryName)} >
            <div>$</div>
          </button>
          <input className={styles.input} placeholder="amount" alt="" maxLength="6" onChange={debouncedUpdateAmountEntered} />
          <button className={ categoryObj.mode === "percent" ? `${styles.percent} ${styles.modeSelected}` : `${styles.percent}` } data-mode="percent" onClick={(e) => updateCategoryMode(e, categoryName)} >
            <div>%</div>
          </button>
        </div>
        <div className={styles.amount}>
        {!amountDisplayed? "":amountDisplayed}
        </div>
      </div>
    </>
  );
}
