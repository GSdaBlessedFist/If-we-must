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
  ///////////////////////////////////////////////////////////////////

  const updateCategoryMode = (e, categoryName) => {
    const newMode = (e.target.innerHTML === "$") ? "dollar" : "percent";
    CatObjectsContext.updateMode(categoryName, newMode)
    setMode(newMode)
  };
  useEffect(() => {

    p(SOURCE, mode, srcColor, "mode:")
  }, [mode])

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  const updateCategoryAmount = (e, categoryName) => {
    const newAmount = e.target.value;
    const updatedAmount = (() => {
      switch (newAmount) {
        case "":
          return {specified: false, amount: 0};
          break;
        case 0:
          return {specified: false, amount: 0};
          break;
        default:
          if (!isNaN(newAmount)) {
              return { specified: true, amount: Number(newAmount) };
          }
          break;
      }
    })();
    setAmountEntered(updatedAmount)
    
    CatObjectsContext.updateAmountEntered(categoryName,amountEntered)
  }

  const debouncedUpdateAmountEntered = debounce(updateCategoryAmount, 500);

  useEffect(() => {
    p(SOURCE, amountEntered, srcColor, "updated amount entered")
  }, [amountEntered])
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
























  return (
    <>
      <div className={styles.categoryContainer} key="">
        <div className={styles.title}>
          <div>{categoryName}</div>
        </div>
        <div className={styles.middle}>
          <button className={categoryObj.mode === "dollar" ? `${styles.dollar} ${styles.modeSelected}` : `${styles.dollar}`} data-mode="dollar" onClick={(e) => updateCategoryMode(e, categoryName)} >
            <div>$</div>
          </button>
          <input className={styles.input} placeholder="amount" alt="" maxLength="6" onChange={updateCategoryAmount} />
          <button className={categoryObj.mode === "percent" ? `${styles.percent} ${styles.modeSelected}` : `${styles.percent}`} data-mode="percent" onClick={(e) => updateCategoryMode(e, categoryName)} >
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
