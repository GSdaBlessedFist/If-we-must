//primeContainer

import React, { useState } from "react";
import Header from "../Header/page";
import Main from "../Main/page";
import Footer from "../Footer/page";
import styles from "./primeContainer.module.scss";
import { TaxAmountProvider } from "@/app/contexts/TaxAmountProvider";
import {SelectedCategoriesProvider } from "@/app/contexts/SelectedCategoriesProvider";

export default function PrimeContainer() {
  return (
    <TaxAmountProvider>
      <SelectedCategoriesProvider>
        <div className={styles.primeContainer}>
          <Header />
          <Main />
          <Footer />
        </div>
      </SelectedCategoriesProvider>
    </TaxAmountProvider>
  );
}
