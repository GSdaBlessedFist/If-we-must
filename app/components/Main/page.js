"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./main.module.scss";
import Category from "../Category/page";
import { useTaxMachineContext } from "../../contexts/TaxMachineProvider";
import { categoryObjects } from "../../categoryObjects";
import p from "../../util/consoleHelper";

const SOURCE = "Main";
const srcColor = 205;

export default function Main() {
  const { state } = useTaxMachineContext();
  const {TAX_AMOUNT,TotalRemainingAmount} = state.context;
  
  useEffect(() => {
    //p(SOURCE, state.context,srcColor, "context");
    console.log(state.context)
  },[state.context])

  return (
    <>
      <div className={styles.main}>

        {/* {catObjects.map((categoryObject, index) => {
          const categoryName = Object.keys(categoryObject)[0];
          const categoryData = categoryObject[categoryName];

          return (categoryData.selected === true) ? (
            // <Category key={`category-${index}`} categoryName={categoryName} categoryData={categoryData} />
            <Category key={`category-${index}`} categoryName={categoryName}  />
          ) : null;

        })} */}
      </div>
    </>
  );
}
