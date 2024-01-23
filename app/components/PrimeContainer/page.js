//primeContainer

import React, { useState } from "react";
import Header from "../Header/page";
import Main from "../Main/page";
import Footer from "../Footer/page";
import styles from "./primeContainer.module.scss";
import { TaxAmountProvider } from "../../contexts/TaxAmountProvider";
import {SelectedCategoriesProvider } from "../../contexts/SelectedCategoriesProvider";
import {TotalRemainingAmountProvider} from "../../contexts/TotalRemainingAmountProvider";

export default function PrimeContainer() {
  return (
    <TaxAmountProvider>
      <SelectedCategoriesProvider>
      <TotalRemainingAmountProvider>
        <div className={styles.primeContainer}>
          <Header />
          <Main />
          <Footer />
        </div>
        </TotalRemainingAmountProvider>

      </SelectedCategoriesProvider>
    </TaxAmountProvider>
  );
}
