//Header
import { useEffect,useState,useContext } from "react";
import styles from "./header.module.scss";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import {SelectedCategoriesContext } from "../../contexts/SelectedCategoriesProvider";
import validate from "./validator";

const p = console.log;

export default function Header() {
  const { TAX_AMOUNT, updateTaxAmount } = useContext(TaxAmountContext);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const {listOfCategories,categoryObjectsArray,updateCategoryObjectsArray} = useContext(SelectedCategoriesContext);

  function handleTaxAmountUpdate(e) {
    const inputValue = e.target.value;
    // if (validate(inputValue)) {
    //   console.log("good tax amount")
    updateTaxAmount(inputValue);
    //}
  }

  function handleCategoryObjectsArrayUpdate(e) {
    const updatedCategoryObjectsArray = categoryObjectsArray.map((categoryObj) => {
      const categoryName = e.target.name;
  
      if (categoryObj[categoryName]) {
        // If the category object already exists, update its 'selected' property
        return {
          [categoryName]: {
            ...categoryObj[categoryName],
            selected: e.target.checked,
          },
        };
      }
  
      return categoryObj;
    });
    
    if (!categoryObjectsArray.some((categoryObj) => categoryObj[e.target.name])) {
      updatedCategoryObjectsArray.push({
        [e.target.name]: {
          mode: "dollar",
          amountEntered: {
            specified: false,
            amount: 0,
          },
          remainingAmountDisplayed: 0,
          selected: e.target.checked,
        },
      });
    }
  
    updateCategoryObjectsArray(updatedCategoryObjectsArray);

  }

  useEffect(() => {
    //p(TAX_AMOUNT)
    //p(listOfCategories);
  }, [listOfCategories,TAX_AMOUNT]);

  return (
    <div className={styles.header}>
      <form className={styles.categoryForm}>
        <div className={styles.taxAmountLine}>
          <h3>Taxable Amount: $</h3>
          <input
            type="text"
            className={styles.taxAmount}
            value={TAX_AMOUNT}
            onChange={handleTaxAmountUpdate}
            maxLength="5" 
          />
        </div>
        <div className={styles.buttonSection}>
          <input
            className={styles.catergoryInput}
            name="Space Exploration"
            type="checkbox"
            id="spaceEx"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TAX_AMOUNT === ""}
          />
          <label>Space Exploration</label>

          <input
            className={styles.catergoryInput}
            name="Military"
            type="checkbox"
            id="military"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TAX_AMOUNT === ""}
          />
          <label>Military</label>

          <input
            className={styles.catergoryInput}
            name="Housing"
            type="checkbox"
            id="housing"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TAX_AMOUNT === ""}
          />
          <label>Housing</label>

          <input
            className={styles.catergoryInput}
            name="Medicine"
            type="checkbox"
            id="medicine"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TAX_AMOUNT === ""}
          />
          <label>Medicine</label>

          <input
            className={styles.catergoryInput}
            name="Infrastructure"
            type="checkbox"
            id="infrastructure"
            onChange={handleCategoryObjectsArrayUpdate}
            disabled={TAX_AMOUNT === ""}
          />
          <label>Infrastructure</label>
        </div>
      </form>
    </div>
  );
}
