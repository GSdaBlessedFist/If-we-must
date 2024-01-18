//Header
import { useEffect,useState,useContext } from "react";
import styles from "./header.module.scss";
import  {TaxAmountContext}  from "@/app/contexts/TaxAmountProvider";


export default function Header(){
  const { TAX_AMOUNT} = useContext(TaxAmountContext);

  // function updateTaxAmount(e){
  //   setTAX_AMOUNT(e.target.value)
  // }
  useEffect(() =>{
    console.log(`header:
    TAX_AMOUNT:${TAX_AMOUNT}`);
  },[]);

	return (<>
		<div className={styles.header}>
        
        <form className={styles.categoryForm}>
          <div className={styles.taxAmountLine}>
            <h3>Taxable Amount: ${TAX_AMOUNT}</h3>
            {/* <input type="text" className={styles.taxAmount} value={TAX_AMOUNT}  maxLength="5"/> */}
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

      </div>
	</>)
}
