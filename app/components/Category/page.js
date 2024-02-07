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
  const [amountEntered, setAmountEntered] = useState({ specified: false, amount: 0 });
  const [categoryObj, setCategoryObj] = useState(categoryData);
  const [amountDisplayed, setAmountDisplayed] = useState();


  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ////////////////////////GOOD///////////////////////////////////

  const updateCategoryMode = (e, categoryName) => {
    const newMode = (e.target.innerHTML === "$") ? "dollar" : "percent";
    CatObjectsContext.updateMode(categoryName, newMode)
    setMode(newMode)
  };
///////////////////////////////////////////////////////////////////
  /////////////////////////IN PROGRESS/////////////////////////////////////



  const updateCategoryAmount = (e, categoryName) => {
    const newAmount = e.target.value;
    const updatedAmount = (() => {
      switch (newAmount) {
        case "":
        case "0":
          return { specified: false, amount: 0 };
          break;
        default:
          if (!isNaN(newAmount)) {
            return { specified: true, amount: Number(newAmount) };
          }
          break;
      }
    })();
    setAmountEntered(updatedAmount)
    //calculatedAmountDisplayed(categoryName, mode, amountEntered)
    //CatObjectsContext.updateAmountEntered(categoryName, updatedAmount);
    //RemainingAmountContext.updateTotalRemainingAmount(amountDisplayed);

  }
  
  ///////////////////////////////////////////////////////////////////
  /////////////////////////IN PROGRESS/////////////////////////////////////




  const calculatedAmountDisplayed = (categoryName, newMode, amountEntered) => {
    let newModeCalculatedAmount;

    if (newMode === "dollar") {
      if (amountEntered.specified === false || amountEntered.amount === "") {
        newModeCalculatedAmount = TaxContext.TAX_AMOUNT;
      } else {
        if(amountEntered.specified === true && amountEntered.amount > TaxContext.TAX_AMOUNT){
          alert("Amount entered is greater than the amount owned")
        } 
        newModeCalculatedAmount = (amountEntered.amount < TaxContext.TAX_AMOUNT) ? amountEntered.amount : TaxContext.TAX_AMOUNT
      }
    } else if (newMode === "percent") {
    
      if (amountEntered?.amount > 100) {
        alert("Please enter a percentage less than 100");
        newModeCalculatedAmount = 0;
      } else if (amountEntered.specified === false || amountEntered.amount === "" || amountEntered.amount === 0) {
        newModeCalculatedAmount = TaxContext.TAX_AMOUNT;
      } else {
        newModeCalculatedAmount = (TaxContext.TAX_AMOUNT * (amountEntered.amount / 100)).toFixed(2);
      }
    }
    setAmountDisplayed(newModeCalculatedAmount);
    return CatObjectsContext.updateAmountDisplayed(categoryName, newModeCalculatedAmount);
    
  };
////////////////////////GOOD/////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  /////////////////////////IN PROGRESS/////////////////////////////////////


  useEffect(() => {
    calculatedAmountDisplayed(categoryName, mode, amountEntered);
  }, [amountEntered, categoryName, mode]);
  
  useEffect(() => {
    RemainingAmountContext.updateTotalRemainingAmount(amountDisplayed);
  }, [amountDisplayed]);
  
  useEffect(() => {
    p(SOURCE,RemainingAmountContext.totalRemainingAmount,srcColor + 5,"RemainingAmountContext.totalRemainingAmount")
  },[RemainingAmountContext.totalRemainingAmount]);



  
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////




  return (
    <>
      <div className={styles.categoryContainer} key="">
        <div className={styles.title}>
          <div>{categoryName}</div>
        </div>
        <div className={styles.middle}>
          <button className={mode === "dollar" ? `${styles.dollar} ${styles.modeSelected}` : `${styles.dollar}`} onClick={(e) => updateCategoryMode(e, categoryName)} >
            <div>$</div>
          </button>
          <input className={styles.input} placeholder="amount" alt="" maxLength="6" onChange={updateCategoryAmount} />
          <button className={mode === "percent" ? `${styles.percent} ${styles.modeSelected}` : `${styles.percent}`} onClick={(e) => updateCategoryMode(e, categoryName)} >
            <div>%</div>
          </button>
        </div>
        <div className={styles.amount}>
          {!amountDisplayed ? "" : amountDisplayed}
        </div>
      </div>
    </>
  );
}
