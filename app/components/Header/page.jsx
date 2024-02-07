"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./header.module.scss";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import { CategoryObjectsContext } from "@/app/contexts/CategoryObjectsProvider";
import { TotalRemainingAmountContext } from "@/app/contexts/TotalRemainingAmountProvider";
import p from "@/app/util/consoleHelper";
import validate from "./validator";

const SOURCE = "Header Component";
const srcColor = 185;

export default function Header() {
  const TaxContext = useContext(TaxAmountContext);
  const RemainingContext = useContext(TotalRemainingAmountContext);
  const CatObjectsContext = useContext(CategoryObjectsContext);

  function updateTaxAmount(e) {
    const inputValue = e.target.value;
    TaxContext.updateTaxAmount(inputValue);
    
  }
    
  function updateCategorySelectStatus(e) {
    const categoryName = e.target.name;
    const selected = e.target.checked;

    CatObjectsContext.updateSelectedStatus(categoryName, selected);
  }

  useEffect(() => {
    localStorage.setItem("tax_amount", TaxContext.TAX_AMOUNT);
  },[TaxContext.TAX_AMOUNT]);

  return (
    <div className={styles.header}>
      <form className={styles.categoryForm}>
        <div className="flex flex-row justify-around">
          <div className={styles.taxAmountSection}>
            <h3>Taxable Amount: $</h3>
            <input
              type="text"
              className={styles.taxAmount}
              value={TaxContext.TAX_AMOUNT}
              onChange={updateTaxAmount}
              maxLength="5"
            />
          </div>
          {TaxContext.TAX_AMOUNT ? (
            <div className={styles.remainingAmountSection}>
              <h2 className="text-bright-full">Remaining: $</h2>
              <div className="w-12 m-3">{RemainingContext.totalRemainingAmount?RemainingContext.totalRemainingAmount:TaxContext.TAX_AMOUNT}</div>
              <div className="w-12 m-3"></div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.buttonSection}>
          <input
            className={styles.catergoryInput}
            name="Space Exploration"
            type="checkbox"
            id="spaceEx"
            onChange={updateCategorySelectStatus}
            disabled={TaxContext.TAX_AMOUNT === "" | TaxContext.TAX_AMOUNT === 0}
          />
          <label>Space Exploration</label>

          <input
            className={styles.catergoryInput}
            name="Military"
            type="checkbox"
            id="military"
            onChange={updateCategorySelectStatus}
            disabled={TaxContext.TAX_AMOUNT === "" | TaxContext.TAX_AMOUNT === 0}
          />
          <label>Military</label>

          <input
            className={styles.catergoryInput}
            name="Education"
            type="checkbox"
            id="education"
            onChange={updateCategorySelectStatus}
            disabled={TaxContext.TAX_AMOUNT === "" | TaxContext.TAX_AMOUNT === 0}
          />
          <label>Education</label>

          <input
            className={styles.catergoryInput}
            name="Medicine"
            type="checkbox"
            id="medicine"
            onChange={updateCategorySelectStatus}
            disabled={TaxContext.TAX_AMOUNT === "" | TaxContext.TAX_AMOUNT === 0}
          />
          <label>Medicine</label>

          <input
            className={styles.catergoryInput}
            name="Infrastructure"
            type="checkbox"
            id="infrastructure"
            onChange={updateCategorySelectStatus}
            disabled={TaxContext.TAX_AMOUNT === "" | TaxContext.TAX_AMOUNT === 0}
          />
          <label>Infrastructure</label>
        </div>
      </form>
    </div>
  );
}
