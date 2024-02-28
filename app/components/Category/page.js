"use client";
import React, { useState, useContext, useEffect } from "react";
import debounce from "debounce";
import p from "../../util/consoleHelper";
import styles from "./category.module.scss";
import { useTaxAmountContext } from "../../contexts/TaxAmountProvider";
import { useTotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import { useCategoryObjectsContext } from "../../contexts/CategoryObjectsProvider";
import { useCalculatedAmountContext } from "../../contexts/CalculatedAmountProvider";

const SOURCE = "Category Component";
const srcColor = 205;

export default function Category({ categoryName }) {

  const { TAX_AMOUNT, updateTaxAmount } = useTaxAmountContext();
  const { totalRemainingAmount, updateTotalRemainingAmount } = useTotalRemainingAmountContext();
  const { catObjects, numberOfSelectedCategories,categoriesWithSpecifiedAmount, updateSelectedStatus,
    updateMode, updateAmountEntered, updateAmountDisplayed, } = useCategoryObjectsContext();
  const { calculatedAmount, getCalculatedAmount } = useCalculatedAmountContext();

  const [mode, setMode] = useState("dollar");
  const [amountEntered, setAmountEntered] = useState({ specified: false, amount: 0 });
  const [categoryObj, setCategoryObj] = useState();
  const [amountDisplayed, setAmountDisplayed] = useState(TAX_AMOUNT);
  const [placeholderValue, setPlaceholderValue] = useState();

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  const handleUpdateCategoryMode = (e, categoryName) => {
    const newMode = (e.target.innerHTML === "$") ? "dollar" : "percent";
    updateMode(categoryName, newMode)
    
    setMode(newMode)
  };

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  const handleUpdateAmountEntered = (e, categoryName) => {
    const updatedAmountEntered = {
        specified: (() => {
            if (!e.target.value) {
                return false;
            } else {
                return true;
            }
        })(),
        amount: parseFloat(e.target.value) || 0
    };

    console.log(updatedAmountEntered);
    setAmountEntered(updatedAmountEntered);
    
    return updateAmountEntered(categoryName, updatedAmountEntered);
}


const calculateAmountDisplayed = (amountEntered, mode) => {
  let amountToDisplay;
  
  if(numberOfSelectedCategories === 1 && amountEntered.specified ===false ) {
    console.log("LINE:66")
  }


  if (mode === "percent") {
    amountToDisplay = totalRemainingAmount * (amountEntered.amount / 100);
  } else {
    amountToDisplay = amountEntered.amount
  }
  console.log(amountToDisplay, mode)
  //updateAmountDisplayed()
  setAmountDisplayed(amountToDisplay)
}

// useEffect(()=>{},[])
useEffect(()=>{
  //console.log(catObjects.filter((obj)=>obj[0].selected.length))
},[catObjects])

///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////





const debouncedHandleUpdateAmountEntered = debounce(handleUpdateAmountEntered, 750)
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////





  // useEffect(()=>{},[])
  useEffect(() => {


    p(SOURCE, amountEntered, srcColor - 5, `${categoryName}-amountEntered`)
    p(SOURCE, amountDisplayed, srcColor - 9, `${categoryName}-amountDisplayed`)
  }, [amountEntered, mode])

  useEffect(() => {
  }, [amountEntered])

  useEffect(() => {
    setPlaceholderValue((totalRemainingAmount === 0) ? localStorage.getItem("tax_amount") : RemainingAmountContext.totalRemainingAmount)//👀
  }, [amountDisplayed, updateTotalRemainingAmount]);






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
          <button className={mode === "dollar" ? `${styles.dollar} ${styles.modeSelected}` : `${styles.dollar}`} onClick={(e) => handleUpdateCategoryMode(e, categoryName)} >
            <div>$</div>
          </button>
          <input className={styles.input} placeholder={placeholderValue} alt="" maxLength="6" onChange={(e) => handleUpdateAmountEntered(e)} />
          <button className={mode === "percent" ? `${styles.percent} ${styles.modeSelected}` : `${styles.percent}`} onClick={(e) => handleUpdateCategoryMode(e, categoryName)} >
            <div>%</div>
          </button>
        </div>
        <div className={styles.amountSection}>
          <div className={styles.amountHeader}>Calculated:</div>
          <div className={styles.amountDisplayed}>${amountDisplayed}</div>
        </div>
      </div>
    </>
  );
}
