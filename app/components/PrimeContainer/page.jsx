//primeContainer

import React, { useEffect,useState,useContext } from "react";
import Header from "../Header/page";
import Main from "../Main/page";
import styles from "./primeContainer.module.scss";
import  {TaxAmountContext}  from "@/app/contexts/TaxAmountProvider";

export default function PrimeContainer() {
  const { TAX_AMOUNT } = useContext(TaxAmountContext);
  useEffect(() =>{
    console.log(`primeContainer:
    TAX_AMOUNT:${TAX_AMOUNT}`)
    //setTAX_AMOUNT: ${setTAX_AMOUNT}
  },[]);
  return (
    <>
      <div className={styles.primeContainer}>
        {/* <Header TAX_AMOUNT={TAX_AMOUNT} setTAX_AMOUNT={setTAX_AMOUNT} /> */}
        <Header/>
        <Main />
      </div>
    </>
  );
}
