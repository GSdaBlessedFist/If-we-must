//primeContainer

import React, { useState } from "react";
import Header from "../Header/page";
import Main from "../Main/page";
import styles from "./primeContainer.module.scss";

export default function PrimeContainer() {
  return (
    <>
      <div className={styles.primeContainer}>
        <Header value={TAX_AMOUNT} setTAX_AMOUNT={setTAX_AMOUNT} />
        {/* <Main /> */}
      </div>
    </>
  );
}
