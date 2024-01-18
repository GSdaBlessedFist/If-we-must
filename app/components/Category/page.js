import React,{useState} from "react";

import styles from "./category.module.scss";


export default function Category() {

  const [mode, setMode] = useState("dollar");
  

  const dollarClickHandler = () => {
    setMode("dollars");
    console.log("%c Calculation mode: dollars", "color: green;font-size:2rem;");
  };
  const percentClickHandler = () => {
    setMode("percent");
    console.log(
      "%c Calculation mode: percentage",
      "color: teal;font-size:2rem;"
    );
  };
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  return (
    <>
      <div className={styles.categoryContainer} key="" data-name=""  data-amountentered={null} data-mode={mode} >
        <div className={styles.title}>
          <div>CAT TITLE</div>
        </div>
        <div className={styles.middle}>
          <a href="#" className={styles.dollar} onClick={dollarClickHandler}>
            <div>$</div>
          </a>
          <input className={styles.input} placeholder="amount" alt="" maxLength="6"  />
          <a href="#" className={styles.percent} onClick={percentClickHandler}>
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