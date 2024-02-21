"use client";
import React, { useState, useContext, useEffect } from "react";
import debounce from "debounce";
import p from "@/app/util/consoleHelper";
import styles from "./category.module.scss";
import { useTaxAmountContext } from "../../contexts/TaxAmountProvider";
import { useTotalRemainingAmountContext } from "@/app/contexts/TotalRemainingAmountProvider";
import { useCategoryObjectsContext } from "@/app/contexts/CategoryObjectsProvider";
import calculator from "../../util/calculations";

const SOURCE = "Category Component";
const srcColor = 205;

export default function Category({ categoryName }) {

  const { TAX_AMOUNT,updateTaxAmount } = useTaxAmountContext();
  const {
    totalRemainingAmount,
    updateTotalRemainingAmount,
  } = useTotalRemainingAmountContext();
  const {
    catObjects,
    categoriesWithSpecifiedAmount,
    updateSelectedStatus,
    updateMode,
    updateAmountEntered,
    updateAmountDisplayed,
  } = useCategoryObjectsContext();
  const [mode, setMode] = useState("dollar");
  const [amountEntered, setAmountEntered] = useState({ specified: false, amount: 0 });
  const [categoryObj, setCategoryObj] = useState(catObjects.find((category) => Object.keys(category)[0] === categoryName));
  const [calculation, setCalculation] = useState();
  const [amountDisplayed, setAmountDisplayed] = useState();
  const [placeholderValue, setPlaceholderValue] = useState();

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ////////////////////////GOOD///////////////////////////////////

  const updateCategoryMode = (e, categoryName) => {
    const newMode = (e.target.innerHTML === "$") ? "dollar" : "percent";
    updateMode(categoryName, newMode)
    setMode(newMode)
  };

  const updateCategoryAmount = (e, categoryName) => {
    const newAmount = e.target.value;
    const updatedAmount = (() => {
      switch (newAmount) {
        case "":
          return { specified: false, amount: 0 };
          break;
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
    return updateAmountEntered(categoryName, updatedAmount);
    

  }

  const debouncedUpdateCategoryAmount = debounce(updateCategoryAmount, 750)

  //// THIS IS WHERE THE CALCULATOR util should be used
  // const calculatedAmountDisplayed = (categoryName, newMode, amountEntered) => {
  //   let newModeCalculatedAmount;

  //   if (newMode === "dollar") {
  //     if (amountEntered.specified === false || amountEntered.amount === "") {
  //       newModeCalculatedAmount = TaxContext.TAX_AMOUNT;
  //     } else {
  //       if (amountEntered.specified === true && amountEntered.amount > TaxContext.TAX_AMOUNT) {
  //         alert("Amount entered is greater than the amount owned")
  //       }
  //       newModeCalculatedAmount = (amountEntered.amount < TaxContext.TAX_AMOUNT) ? amountEntered.amount : TaxContext.TAX_AMOUNT
  //     }
  //   } else if (newMode === "percent") {

  //     if (amountEntered?.amount > 100) {
  //       alert("Please enter a percentage less than 100");
  //       newModeCalculatedAmount = 0;
  //     } else if (amountEntered.specified === false || amountEntered.amount === "" || amountEntered.amount === 0) {
  //       newModeCalculatedAmount = TaxContext.TAX_AMOUNT;
  //     } else {
  //       newModeCalculatedAmount = (TaxContext.TAX_AMOUNT * (amountEntered.amount / 100)).toFixed(2);
  //     }
  //   }
  //   setAmountDisplayed(newModeCalculatedAmount);
  //   return CatObjectsContext.updateAmountDisplayed(categoryName, newModeCalculatedAmount);

  // };

  const handleUpdateAmountEntered = (e)=> {
    setAmountEntered({
      specified: !isNaN(e.target.value),
      amount: parseFloat(e.target.value) || 0, // Ensure 0 if value is not a valid number
    });
  }

  //calculator = (taxAmount, divisor = 1, catObj = {},totalRemaining)
  // useEffect(()=>{},[])
  useEffect(()=>{
    p(SOURCE,amountEntered,srcColor - 5,"amountEntered")
    //const currentCategory = CatObjectsContext.catObjects.find((category) => Object.keys(category)[0] === categoryName);
    console.log(categoryObj)
  },[amountEntered])



  useEffect(() => {
    setPlaceholderValue((totalRemainingAmount === 0) ? localStorage.getItem("tax_amount") : RemainingAmountContext.totalRemainingAmount)//👀
  }, [amountDisplayed, updateTotalRemainingAmount]);

  ////////////////////////GOOD/////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  /////////////////////////IN PROGRESS/////////////////////////////////////

  


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
          {/* <input className={styles.input} placeholder={placeholderValue} alt="" maxLength="6" onChange={updateCategoryAmount} /> */}
          <input className={styles.input} placeholder={placeholderValue} alt="" maxLength="6" onChange={(e)=>handleUpdateAmountEntered(e)} />
          <button className={mode === "percent" ? `${styles.percent} ${styles.modeSelected}` : `${styles.percent}`} onClick={(e) => updateCategoryMode(e, categoryName)} >
            <div>%</div>
          </button>
        </div>
        <div className={styles.amount}>
          calculated amount
        </div>
      </div>
    </>
  );
}
