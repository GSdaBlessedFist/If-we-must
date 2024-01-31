"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./header.module.scss";
import debounce from "debounce";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import { SelectedCategoriesContext } from "../../contexts/SelectedCategoriesProvider";
import { TotalRemainingAmountContext } from "@/app/contexts/TotalRemainingAmountProvider";
import p from "@/app/util/consoleHelper";
import validate from "./validator";


const SOURCE = "Header Component";
const srcColor = 185;


export default function Header() {
  const TaxContext = useContext(TaxAmountContext);
  const RemainingContext = useContext(TotalRemainingAmountContext);
  const CategoriesContext = useContext(SelectedCategoriesContext);
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  function handleTaxAmountUpdate(e) {
    const inputValue = e.target.value;
    TaxContext.updateTaxAmount(inputValue);
    
  }

  //const debouncedUpdateTaxAmount = debounce(handleTaxAmountUpdate, 1500)

  function handleCategoryObjectsArrayUpdate(e) {
    const updatedCategoryObjectsArray = CategoriesContext.categoryObjectsArray.map((categoryObj) => {
        const categoryName = e.target.name;

        if (categoryObj[categoryName]) {
          return {
            [categoryName]: {
              ...categoryObj[categoryName],
              selected: e.target.checked,
            },
          };
        }

        return categoryObj;
      }
    );

    if (!CategoriesContext.categoryObjectsArray.some((categoryObj) => categoryObj[e.target.name])) {
      updatedCategoryObjectsArray.push({
        [e.target.name]: {
          mode: "dollar",
          amountEntered: {
            specified: false,
            amount: 0,
          },
          modeCalculatedAmount: 0,
          selected: e.target.checked,
        },
      });
    }

    CategoriesContext.updateCategoryObjectsArray(updatedCategoryObjectsArray);
  }
  //GOOD//
  useEffect(() => {
    //p(SOURCE,TaxContext.TAX_AMOUNT,srcColor,"TaxContext.TAX_AMOUNT")
  },[TaxContext.TAX_AMOUNT]);

  //GOOD
  useEffect(() => {
    //p(SOURCE,CategoriesContext.listofCategories,srcColor,"CategoriesContext.listofCategories");
    //RemainingContext.updateTotalRemainingAmount(CategoriesContext.listofCategories);
  },[TaxContext.TAX_AMOUNT]);


  useEffect(()=>{
    p(SOURCE,RemainingContext.totalRemainingAmount,srcColor,"RemainingContext.totalRemainingAmount");
  },[RemainingContext.totalRemainingAmount])

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
              onChange={handleTaxAmountUpdate}
              maxLength="5"
            />
          </div>
          {(TaxContext.TAX_AMOUNT) ? (
            <div className={styles.remainingAmountSection}>
              <h2 className="text-bright-full">Remaining: $</h2>
              <div className="w-12 m-3">{!RemainingContext.totalRemainingAmount?TaxContext.TAX_AMOUNT:RemainingContext.totalRemainingAmount}</div>
            </div>
          ) : ""}
        </div>
        <div className={styles.buttonSection}>
          <input
            className={styles.catergoryInput}
            name="Space Exploration"
            type="checkbox"
            id="spaceEx"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TaxContext.TAX_AMOUNT === ""}
          />
          <label>Space Exploration</label>

          <input
            className={styles.catergoryInput}
            name="Military"
            type="checkbox"
            id="military"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TaxContext.TAX_AMOUNT === ""}
          />
          <label>Military</label>

          <input
            className={styles.catergoryInput}
            name="Education"
            type="checkbox"
            id="education"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TaxContext.TAX_AMOUNT === ""}
          />
          <label>Education</label>

          <input
            className={styles.catergoryInput}
            name="Medicine"
            type="checkbox"
            id="medicine"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TaxContext.TAX_AMOUNT === ""}
          />
          <label>Medicine</label>

          <input
            className={styles.catergoryInput}
            name="Infrastructure"
            type="checkbox"
            id="infrastructure"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TaxContext.TAX_AMOUNT === ""}
          />
          <label>Infrastructure</label>
        </div>
      </form>
    </div>
  );
}
