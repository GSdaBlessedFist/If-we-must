import React, { useState, useContext, useEffect } from "react";
import debounce from 'debounce';
import styles from "./category.module.scss";
import { SelectedCategoriesContext } from "../../contexts/SelectedCategoriesProvider";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import { TotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";

export default function Category({ categoryName }) {
  const { TAX_AMOUNT } = useContext(TaxAmountContext);
  const { divisor } = useContext(SelectedCategoriesContext);
  const { totalRemainingAmount, updateTotalRemainingAmount } = useContext( TotalRemainingAmountContext );
  const [mode, setMode] = useState("dollar");
  const [amountEntered, setAmountEntered] = useState(0);
  const [categoryObj, setCategoryObj] = useState({});
  const [remainingAmount, setRemainingAmount] = useState(TAX_AMOUNT);

  const p = console.log;

  const dollarClickHandler = () => {
    setMode("dollar");
  };

  const percentClickHandler = () => {
    setMode("percent");
  };
  const updateAmountEntered = (e) => {
    if(e.target.value !==NaN){
      e.persist(); // This is needed to access the event object within the debounced function
      debouncedUpdateAmountEntered(e);
    }
  }
  const debouncedUpdateAmountEntered = debounce(updateAmountEntered, 500);

  useEffect(()=>{
    let newRemainingAmount;
    if(amountEntered === 0){
      newRemainingAmount = TAX_AMOUNT 
    }else{
      newRemainingAmount = totalRemainingAmount - amountEntered
    }
    updateTotalRemainingAmount(newRemainingAmount)
    
  },[TAX_AMOUNT,amountEntered])

  useEffect(()=>{
    setCategoryObj((prevCategoryObj)=>{
      return {
        [categoryName]:{
          mode,
          amountEntered,
          remainingAmountDisplay:totalRemainingAmount
        }
      }
    })
    
  },[totalRemainingAmount])

  useEffect(()=>{
    p(categoryObj)
  },[categoryObj])

  return (
    <>
      <div className={styles.categoryContainer} key="" data-name="" data-amountentered={null} data-mode={mode} >
        <div className={styles.title}>
          <div>{categoryName}</div>
        </div>
        <div className={styles.middle}>
          <a href="#" className={styles.dollar} onClick={dollarClickHandler}>
            <div>$</div>
          </a>
          <input className={styles.input} placeholder="amount" alt="" maxLength="6" onChange={updateAmountEntered}/>
          <a href="#" className={styles.percent} onClick={percentClickHandler}>
            <div>%</div>
          </a>
        </div>
        <div className={styles.amount}>
          <div className={styles.amountHeader}>{categoryObj.remainingAmountDisplay}</div>
        </div>
      </div>
    </>
  );
}
