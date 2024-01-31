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
const srcColor = 205;

export default function Category({ categoryName, categoryData }) {

  const TaxContext = useContext(TaxAmountContext);
  const RemainingAmountContext = useContext(TotalRemainingAmountContext);
  const SelectedCatsContext = useContext(SelectedCategoriesContext);
  const [mode, setMode] = useState("dollar");
  const [categoryObj, setCategoryObj] = useState(categoryData);
  const [amountDisplayed, setAmountDisplayed] = useState();

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
    if (categoryObj.amountEntered.amount > 100) {
      alert("Please enter a percentage less than 100");
      setCategoryObj((prevCategoryObj) => ({
        ...prevCategoryObj,
        amountEntered: {
          amount: 0
        }
      }));
    } else {
      setCategoryObj((prevCategoryObj) => {
        const updatedCategoryObj = {
          ...prevCategoryObj,
          modeCalculatedAmount: TaxContext.TAX_AMOUNT * prevCategoryObj.amountEntered.amount/100,
          mode: "percent",
          amountEntered: {
            specified: true,
            amount: prevCategoryObj.amountEntered.amount || 0
          },
        };
        return updatedCategoryObj;
      });
    }
  };

  const updateAmountEntered = (e) => {
    setCategoryObj((prevCategoryObj) => {
      const updatedAmountEntered = {
        ...prevCategoryObj,
        amountEntered: {
          specified: true,
          amount: e.target.value,
        },
        remainingAmountDisplayed: amountDisplayed
      };
      return updatedAmountEntered;
    });
    // setAmountDisplayed(()=>{
    //   if(categoryObj.mode === "percent") {
    //   return TaxContext.TAX_AMOUNT * prevCategoryObj.amountEntered.amount/100
    //   }else{
    //     return e.target.value
    //   }
    // })
  };
  
  const debouncedUpdateAmountEntered = debounce(updateAmountEntered, 500);
  
  



  useEffect(()=>{
    setAmountDisplayed(categoryObj.modeCalculatedAmount);
  },[categoryObj]);

  useEffect(() => {
    RemainingAmountContext.updateTotalRemainingAmount(
      SelectedCatsContext.listOfCategories
    );
  }, [categoryObj, SelectedCatsContext.listOfCategories]);

  useEffect(() => {
    p(SOURCE,categoryObj.amountEntered.amount,srcColor,"amount Entered")
    let singleCategoryCalculation = calculator( TaxContext.TAX_AMOUNT, 1, categoryObj, RemainingAmountContext.totalRemainingAmount );
  }, [ categoryObj,mode, SelectedCatsContext.listOfCategories, RemainingAmountContext.totalRemainingAmount, ]);

  useEffect(() => {
    p(SOURCE,categoryObj.modeCalculatedAmount,195,"modeCalculatedAmount")
  }, [mode,categoryObj]);

  useEffect(() => {
    p(SOURCE,amountDisplayed,185,"amount displayed")
  }, [categoryObj.remainingAmountDisplayed,mode]);







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
            onChange={debouncedUpdateAmountEntered}
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
        {!amountDisplayed? "":amountDisplayed}
        </div>
      </div>
    </>
  );
}
