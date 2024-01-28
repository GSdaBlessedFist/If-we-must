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

export default function Category({ categoryName, categoryData }) {
  // const { TAX_AMOUNT } = useContext(TaxAmountContext);
  const TaxContext = useContext(TaxAmountContext);
  // const { totalRemainingAmount, updateTotalRemainingAmount } = useContext( TotalRemainingAmountContext );
  const RemainingAmountContext = useContext(TotalRemainingAmountContext);
  const SelectedCatsContext = useContext(SelectedCategoriesContext);
  const [mode, setMode] = useState("dollar");
  const [categoryObj, setCategoryObj] = useState(categoryData);
  const [remainingAmount, setRemainingAmount] = useState(TaxContext.TAX_AMOUNT);

  const dollarClickHandler = () => {
    setCategoryObj((prevCategoryObj) => ({
      ...prevCategoryObj,
      mode: "dollar",
      amountEntered: {
        specified: true,
      },
    }));
  };

  const percentClickHandler = () => {
    setCategoryObj((prevCategoryObj) => ({
      ...prevCategoryObj,
      mode: "percent",
      amountEntered: {
        specified: true,
      },
    }));
  };

  const updateAmountEntered = (e) => {
    setCategoryObj((prevCategoryObj) => ({
      ...prevCategoryObj,
      amountEntered: {
        specified: true,
        amount: e.target.value,
      },
    }));
  };
  useEffect(() => {
    RemainingAmountContext.updateTotalRemainingAmount(
      SelectedCatsContext.listOfCategories
    );
  }, [categoryObj, SelectedCatsContext.listOfCategories]);

  useEffect(() => {
    console.log(
      `totalRemainingAmount: ${RemainingAmountContext.totalRemainingAmount}`
    );
    //console.log(`amountEntered: ${categoryObj.amountEntered.amount}`);
    p(SOURCE,categoryObj.amountEntered.amount,30,"amount Entered")
    console.log(
      calculator(
        TaxContext.TAX_AMOUNT,
        1,
        categoryObj,
        RemainingAmountContext.totalRemainingAmount
      )
    );
    p(SOURCE,SelectedCatsContext.listOfCategories, 55,"SelectedCatsContext.listOfCategories");
  }, [
    categoryObj,
    SelectedCatsContext.listOfCategories,
    RemainingAmountContext.totalRemainingAmount,
  ]);

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
          <div className={styles.amountHeader}></div>
        </div>
      </div>
    </>
  );
}
