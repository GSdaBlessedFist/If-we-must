//Header
import styles from "./header.module.scss";



export default function Header({TAX_AMOUNT,setTAX_AMOUNT}){
	

  function updateTaxAmount(e){
    setTAX_AMOUNT(e.target.value)
  }
	return (<>
		<div className={styles.header}>
        
        <form className={styles.categoryForm}>
          <div className={styles.taxAmountLine}>
            <h3>Taxable Amount: ${TAX_AMOUNT}</h3>
            <input type="text" className={"header--taxAmount"} value={TAX_AMOUNT} onChange={updateTaxAmount} maxLength="5"/>
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
