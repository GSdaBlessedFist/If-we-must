"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./header.module.scss";
// import { useTaxAmountContext } from "../../contexts/TaxAmountProvider";
// import { useTotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
// import { useCategoryObjectsContext } from "../../contexts/CategoryObjectsProvider";
import { useTaxMachineContext } from "../../contexts/TaxMachineProvider";
import p from "../../util/consoleHelper";
import validate from "./validator";
import _debounce from 'lodash/debounce';

const SOURCE = "Header Component";
const srcColor = 185;

export default function Header() {
  const { state, setTaxAmount, selectCategory, deselectCategory } = useTaxMachineContext();
  const [inputValue, setInputValue] = useState('');

  const {TAX_AMOUNT,TotalRemainingAmount} = state.context;

  
  function handleUpdateTaxAmount(e) {
    const newValue = parseInt(e.target.value) || 0
    p(SOURCE,newValue,srcColor,"taxAmount");
    setTaxAmount(newValue);
    setInputValue(newValue);
    //debouncedHandleUpdateTaxAmount(newValue);
  }

  const debouncedHandleUpdateTaxAmount = _debounce((value) => {
    setTaxAmount(value);
  }, 750);

  function updateCategorySelectStatus(e) {
    const categoryName = e.target.name;
    const selected = e.target.checked;
    if (selected) {
      selectCategory(categoryName);
    } else {
      deselectCategory(categoryName)
    }
  }

  useEffect(() => {
    localStorage.setItem("tax_amount", TAX_AMOUNT);
    //p(SOURCE,TAX_AMOUNT,srcColor,"TAX_AMOUNT");
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
              value={inputValue}
              onChange={handleUpdateTaxAmount}
              maxLength="5"
            />
          </div>
          {TAX_AMOUNT ? (
            <div className={styles.remainingAmountSection}>
              <h2 className="text-bright-full">Remaining: $</h2>
              <div className="w-12 m-3">
                {TotalRemainingAmount
                  ? TotalRemainingAmount
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
