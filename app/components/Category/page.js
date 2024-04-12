import React, { useState, useContext, useEffect } from "react";
import p from "../../util/consoleHelper";
import styles from "./category.module.scss";
import { useTaxMachineContext } from "../../contexts/TaxMachineProvider";

const SOURCE = "Category Component";
const srcColor = 205;

export default function Category({ categoryName }) {
  
  const { state, changeMode, updateAmountEntered } = useTaxMachineContext();
  const { TAX_AMOUNT, TotalRemainingAmount, categories } = state.context;

  const [mode, setMode] = useState("dollar");
  const [placeholderValue, setPlaceholderValue] = useState(TotalRemainingAmount);

  const handleUpdateCategoryMode = (e, categoryName) => {
    const newMode = (e.target.innerHTML === "$") ? "dollar" : "percent";
    setMode(newMode);
    changeMode(categoryName, newMode);
  };

  const handleUpdateAmountEntered = (e) => {
    updateAmountEntered(categoryName, e.target.value);
  };

  useEffect(() => {
    const category = categories.find(cat => Object.keys(cat)[0] === categoryName);
    p(SOURCE, category ? category[categoryName].amountDisplayed : 0, srcColor, `category: ${categoryName}`);
  }, [categories]);

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.title}>
        <div>{categoryName}</div>
      </div>
      <div className={styles.middle}>
        <button
          className={mode === "dollar" ? `${styles.dollar} ${styles.modeSelected}` : `${styles.dollar}`}
          onClick={(e) => handleUpdateCategoryMode(e, categoryName)}
        >
          <div>$</div>
        </button>
        <input
          className={styles.input}
          placeholder={placeholderValue}
          maxLength="6"
          onChange={handleUpdateAmountEntered}
        />
        <button
          className={mode === "percent" ? `${styles.percent} ${styles.modeSelected}` : `${styles.percent}`}
          onClick={(e) => handleUpdateCategoryMode(e, categoryName)}
        >
          <div>%</div>
        </button>
      </div>
      <div className={styles.amountSection}>
        <div className={styles.amountHeader}>Calculated:</div>
        <div className={styles.amountDisplayed}>
          {categories.find(cat => Object.keys(cat)[0] === categoryName)?.[categoryName]?.amountDisplayed || 0}
        </div>
      </div>
    </div>
  );
}
