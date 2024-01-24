//Category
import React, { useState, useContext, useEffect } from "react";
import debounce from 'debounce';
import styles from "./category.module.scss";
import { SelectedCategoriesContext } from "../../contexts/SelectedCategoriesProvider";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import { TotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import calculator from "../../util/calculations";

export default function Category({ categoryName,categoryData,divisor }) {
  const { TAX_AMOUNT } = useContext(TaxAmountContext);
  const { totalRemainingAmount, updateTotalRemainingAmount } = useContext( TotalRemainingAmountContext );
  const [mode, setMode] = useState("dollar");
  const [categoryObj, setCategoryObj] = useState(categoryData);
  const [remainingAmount, setRemainingAmount] = useState(TAX_AMOUNT);
  

  const p = console.log;

  const dollarClickHandler = () => {
    setCategoryObj(prevCategoryObj => ({
      ...prevCategoryObj,
      mode: "dollar",
      amountEntered: {
        specified: true
      }
    }));
  };
  
  const percentClickHandler = () => {
    setCategoryObj(prevCategoryObj => ({
      ...prevCategoryObj,
      mode: "percent",
      amountEntered: {
        specified: true
      }
    }));
  };
  
  const updateAmountEntered = (e)=>{
    setCategoryObj(prevCategoryObj=>({
      ...prevCategoryObj,
      amountEntered: {
        specified: true,
        amount: e.target.value
      }
    }))
  }

  useEffect(() => {
    p(categoryObj)
  },[categoryObj]);




  return (
    <>
      <div className={styles.categoryContainer} key=""  >
        <div className={styles.title}>
          <div>{categoryName}</div>
        </div>
        <div className={styles.middle}>
          <a href="#" className={(categoryObj.mode==="dollar")?`${styles.dollar} ${styles.modeSelected}`:`${styles.dollar}`} onClick={dollarClickHandler}>
            <div>$</div>
          </a>
          <input className={styles.input} placeholder="amount" alt="" maxLength="6" onChange={updateAmountEntered}/>
          <a href="#" className={(categoryObj.mode==="percent")?`${styles.percent} ${styles.modeSelected}`:`${styles.percent}`} onClick={percentClickHandler}>
            <div>%</div>
          </a>
        </div>
        <div className={styles.amount}>
          <div className={styles.amountHeader}></div>
        </div>
      </div>
    </>
  );
}
