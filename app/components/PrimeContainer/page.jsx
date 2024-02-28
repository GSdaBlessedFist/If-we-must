"use client";
import React, { useState } from "react";
import Header from "../Header/page";
import Main from "../Main/page";
import Footer from "../Footer/page";
import styles from "./primeContainer.module.scss";
import { TaxAmountProvider } from "../../contexts/TaxAmountProvider";
import { TotalRemainingAmountProvider } from "../../contexts/TotalRemainingAmountProvider";
import { CategoryObjectsProvider } from "../../contexts/CategoryObjectsProvider";
import { CalculatedAmountProvider } from "../../contexts/CalculatedAmountProvider";

export default function PrimeContainer() {
  return (
    <>
      <TaxAmountProvider>
        <TotalRemainingAmountProvider>
          <CategoryObjectsProvider>
            <CalculatedAmountProvider>
              <div className={styles.primeContainer}>
                <Header />
                <Main />
                <Footer />
              </div>
            </CalculatedAmountProvider>
          </CategoryObjectsProvider>
        </TotalRemainingAmountProvider>
      </TaxAmountProvider>
    </>
  );
}
