//Header
import styles from "./header.module.scss";
import { useContext } from "react";
import {TaxAmountContext} from "../../contexts/TaxAmountProvider";
import validate from "./validator";

export default function Header(){
	
  const {TAX_AMOUNT,updateTaxAmount} = useContext(TaxAmountContext);

  function handleTaxAmountUpdate(e) {
    const inputValue = e.target.value;
    // if (validate(inputValue)) {
    //   console.log("good tax amount")
      updateTaxAmount(inputValue);
    //}
  }

	return (
		<div className={styles.header}>
        
        <form className={styles.categoryForm}>
          <div className={styles.taxAmountLine}>
            <h3>Taxable Amount: $</h3>
            <input type="text" className={styles.taxAmount} value={TAX_AMOUNT} onChange={handleTaxAmountUpdate} maxLength="5"/>
          </div>
          <div className={styles.buttonSection}>
            <input className={styles.catergoryInput} name="SpaceEx" type="checkbox" id="spaceEx" />
            <label>Space Exploration</label>

            <input className={styles.catergoryInput} type="checkbox" id="military" />
            <label>Military</label>

            <input className={styles.catergoryInput} type="checkbox" id="housing" />
            <label>Housing</label>

            <input className={styles.catergoryInput} type="checkbox" id="medicine" />
            <label>Medicine</label>

            <input className={styles.catergoryInput} type="checkbox" id="infrastructure" />
            <label>Infrastructure</label>
          </div>
        </form>

      </div>)
}
