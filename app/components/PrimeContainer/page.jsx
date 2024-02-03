"use client";
import React, { useState } from "react"; 
import Header from "../Header/page";
import Main from "../Main/page";
import Footer from "../Footer/page";
import styles from "./primeContainer.module.scss";
import { TaxAmountProvider } from "../../contexts/TaxAmountProvider";
import { TotalRemainingAmountProvider } from "../../contexts/TotalRemainingAmountProvider";
import { CategoryObjectsProvider } from "@/app/contexts/CategoryObjectsProvider";

export default function PrimeContainer() {
  return (<>
    <TaxAmountProvider>
     
      <CategoryObjectsProvider>
        {/* <TotalRemainingAmountProvider> */}
          <div className={styles.primeContainer}>
            <Header />
            <Main />
            {/* <Footer /> */}
          </div>
        {/* </TotalRemainingAmountProvider> */}
        </CategoryObjectsProvider>
      
    </TaxAmountProvider>
  </>);
}

