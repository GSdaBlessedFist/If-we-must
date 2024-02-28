"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./header.module.scss";
import { useTaxAmountContext } from "../../contexts/TaxAmountProvider";
import { useTotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import { useCategoryObjectsContext } from "../../contexts/CategoryObjectsProvider";
import p from "../../util/consoleHelper";
import validate from "./validator";

const SOURCE = "Header Component";
const srcColor = 185;

export default function Header() {
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

  function handleUpdateTaxAmount(e) {
    e.preventDefault();
    const inputValue = e.target.value;
    updateTaxAmount(inputValue);
  }

  function updateCategorySelectStatus(e) {
    const categoryName = e.target.name;
    const selected = e.target.checked;

    updateSelectedStatus(categoryName, selected);
  }

  useEffect(() => {
    localStorage.setItem("tax_amount", TAX_AMOUNT);
  }, [TAX_AMOUNT]);

  return (
    <div className={styles.header}>
      <form className={styles.categoryForm}>
        <div className="flex flex-row justify-around">
          <div className={styles.taxAmountSection}>
            <h3>Taxable Amount: $</h3>
            <input
              type="text"
              className={styles.taxAmount}
              value={TAX_AMOUNT}
              onChange={handleUpdateTaxAmount}
              maxLength="5"
            />
          </div>
          {TAX_AMOUNT ? (
            <div className={styles.remainingAmountSection}>
              <h2 className="text-bright-full">Remaining: $</h2>
              <div className="w-12 m-3">
                {totalRemainingAmount
                  ? totalRemainingAmount
                  : TAX_AMOUNT}
              </div>
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
            disabled={(TAX_AMOUNT === "") | (TAX_AMOUNT === 0)}
          />
          <label>Space Exploration</label>

          <input
            className={styles.catergoryInput}
            name="Military"
            type="checkbox"
            id="military"
            onChange={updateCategorySelectStatus}
            disabled={(TAX_AMOUNT === "") | (TAX_AMOUNT === 0)}
          />
          <label>Military</label>

          <input
            className={styles.catergoryInput}
            name="Education"
            type="checkbox"
            id="education"
            onChange={updateCategorySelectStatus}
            disabled={(TAX_AMOUNT === "") | (TAX_AMOUNT === 0)}
          />
          <label>Education</label>

          <input
            className={styles.catergoryInput}
            name="Medicine"
            type="checkbox"
            id="medicine"
            onChange={updateCategorySelectStatus}
            disabled={(TAX_AMOUNT === "") | (TAX_AMOUNT === 0)}
          />
          <label>Medicine</label>

          <input
            className={styles.catergoryInput}
            name="Infrastructure"
            type="checkbox"
            id="infrastructure"
            onChange={updateCategorySelectStatus}
            disabled={(TAX_AMOUNT === "") | (TAX_AMOUNT === 0)}
          />
          <label>Infrastructure</label>
        </div>
      </form>
    </div>
  );
}
