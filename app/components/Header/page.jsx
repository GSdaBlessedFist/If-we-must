//Header
import styles from "./header.module.scss";
import { useContext, useState, useEffect } from "react";
import { TaxAmountContext } from "../../contexts/TaxAmountProvider";
import {SelectedCategoriesContext } from "../../contexts/SelectedCategoriesProvider";
import validate from "./validator";

const p = console.log;

export default function Header() {
  const { TAX_AMOUNT, updateTaxAmount } = useContext(TaxAmountContext);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  // const [listOfCategories, setListOfCategories] = useState([]);
  const {listOfCategories,updateListOfCategories} = useContext(SelectedCategoriesContext);

  function handleTaxAmountUpdate(e) {
    const inputValue = e.target.value;
    // if (validate(inputValue)) {
    //   console.log("good tax amount")
    updateTaxAmount(inputValue);
    //}
  }

  function handleCategorySelectionUpdate(e) {
    const updatedCategoryList = e.target.checked
      ? [...listOfCategories, e.target]
      : listOfCategories.filter((category) => category !== e.target);

      updateListOfCategories(updatedCategoryList);

    console.log( `%c${e.target.name}`, "color: steelblue;font-weight:bold;font-size:1rem", `: ${e.target.checked}`
    );
  }

  useEffect(() => {
    p(listOfCategories);
  }, [listOfCategories]);

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
            onChange={handleCategorySelectionUpdate}
          />
          <label>Space Exploration</label>

          <input
            className={styles.catergoryInput}
            name="Military"
            type="checkbox"
            id="military"
            onChange={handleCategorySelectionUpdate}
          />
          <label>Military</label>

          <input
            className={styles.catergoryInput}
            name="Housing"
            type="checkbox"
            id="housing"
            onChange={handleCategorySelectionUpdate}
          />
          <label>Housing</label>

          <input
            className={styles.catergoryInput}
            name="Medicine"
            type="checkbox"
            id="medicine"
            onChange={handleCategorySelectionUpdate}
          />
          <label>Medicine</label>

          <input
            className={styles.catergoryInput}
            name="Infrastructure"
            type="checkbox"
            id="infrastructure"
            onChange={handleCategorySelectionUpdate}
          />
          <label>Infrastructure</label>
        </div>
      </form>
    </div>
  );
}
