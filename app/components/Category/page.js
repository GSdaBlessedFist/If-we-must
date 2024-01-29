"use client";
import React, { useState, useContext, useEffect } from "react";
import debounce from "debounce";
import p from "@/app/util/consoleHelper";
import styles from "./category.module.scss";
import { SelectedCategoriesContext } from "../../contexts/SelectedCategoriesProvider";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import { TotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import calculator from "../../util/calculations";

const SOURCE = "Category Component";
const srcColor = 50;

export default function Category({ categoryName, categoryData }) {
  // const { TAX_AMOUNT } = useContext(TaxAmountContext);
  const TaxContext = useContext(TaxAmountContext);
  // const { totalRemainingAmount, updateTotalRemainingAmount } = useContext( TotalRemainingAmountContext );
  const RemainingAmountContext = useContext(TotalRemainingAmountContext);
  const SelectedCatsContext = useContext(SelectedCategoriesContext);
  const [mode, setMode] = useState("dollar");
  const [categoryObj, setCategoryObj] = useState(categoryData);
  const [remainingAmount, setRemainingAmount] = useState(TaxContext.TAX_AMOUNT);

  const dollarClickHandler = (e) => {
    setCategoryObj((prevCategoryObj) => {
      const updatedCategoryObj = {
        ...prevCategoryObj,
        mode: "dollar",
        modeCalculatedAmount: prevCategoryObj.amountEntered.amount ,
        amountEntered: {
          specified: true,
          amount: prevCategoryObj.amountEntered.amount || 0
        },
      };
      return updatedCategoryObj;
    });
  };

  const percentClickHandler = (e) => {
    setCategoryObj((prevCategoryObj) => {
      const updatedCategoryObj = {
        ...prevCategoryObj,
        mode: "percent",
        modeCalculatedAmount: (()=>{
          if(prevCategoryObj.amountEntered.amount > 100) alert("Percent can't be more than 100")
          return TaxContext.TAX_AMOUNT * prevCategoryObj.amountEntered.amount/100
        })(),
        amountEntered: {
          specified: true,
          amount: prevCategoryObj.amountEntered.amount || 0
        },
      }
      return updatedCategoryObj;
     } );
  };

  const updateAmountEntered = (e) => {
    setCategoryObj((prevCategoryObj) => {
      const updatedAmountEntered = {
        ...prevCategoryObj,
        amountEntered: {
          specified: true,
          amount: e.target.value,
        },
      }
      return updatedAmountEntered;
    });
  };

  

  useEffect(() => {
    RemainingAmountContext.updateTotalRemainingAmount(
      SelectedCatsContext.listOfCategories
    );
  }, [categoryObj, SelectedCatsContext.listOfCategories]);

  

  useEffect(() => {
    
    //p(SOURCE,RemainingAmountContext.totalRemainingAmount,srcColor,"total remaining amount")
    p(SOURCE,categoryObj.amountEntered.amount,srcColor,"amount Entered")
    //p(SOURCE,categoryObj.modeCalculatedAmount,srcColor,"modeCalculatedAmount")
    
    let singleCategoryCalculation = calculator( TaxContext.TAX_AMOUNT, 1, categoryObj, RemainingAmountContext.totalRemainingAmount );
    //p(SOURCE,singleCategoryCalculation,srcColor,"single category calculation");
    //p(SOURCE,SelectedCatsContext.listOfCategories, srcColor,"SelectedCatsContext.listOfCategories");
  }, [
    categoryObj,mode,
    SelectedCatsContext.listOfCategories,
    RemainingAmountContext.totalRemainingAmount,
  ]);

  useEffect(() => {
    
    p(SOURCE,categoryObj.modeCalculatedAmount,60,"modeCalculatedAmount")
    
  }, [mode,categoryObj]);

  return (
    <>
      <div className={styles.categoryContainer} key="">
        <div className={styles.title}>
          <div>{categoryName}</div>
        </div>
        <div className={styles.middle}>
          <a
            href="#"
            className={
              categoryObj.mode === "dollar"
                ? `${styles.dollar} ${styles.modeSelected}`
                : `${styles.dollar}`
            }
            onClick={dollarClickHandler}
          >
            <div>$</div>
          </a>
          <input
            className={styles.input}
            placeholder="amount"
            alt=""
            maxLength="6"
            onChange={updateAmountEntered}
          />
          <a
            href="#"
            className={
              categoryObj.mode === "percent"
                ? `${styles.percent} ${styles.modeSelected}`
                : `${styles.percent}`
            }
            onClick={percentClickHandler}
          >
            <div>%</div>
          </a>
        </div>
        <div className={styles.amount}>
        {(categoryObj[`${categoryName}`]?.amountEntered.amount === 0) ? "--" : categoryObj[`${categoryName}`]?.modeCalculatedAmount}
        </div>
      </div>
    </>
  );
}
