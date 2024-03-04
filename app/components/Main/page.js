"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./main.module.scss";
import Category from "../Category/page";
import { useCategoryObjectsContext } from "../../contexts/CategoryObjectsProvider";
import { useTotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import { categoryObjects } from "../../categoryObjects";
import p from "../../util/consoleHelper";

const SOURCE = "Main";
const srcColor = 205;

export default function Main() {
  
  const {
    totalRemainingAmount,
    updateTotalRemainingAmount,
  } = useTotalRemainingAmountContext();
  const {
    catObjects,
    categoriesWithSpecifiedAmount,
    updateSelectedStatus,
    updateMode,
    updateAmountEntered,
    updateAmountDisplayed,
    updateTotalRemaining
  } = useCategoryObjectsContext();

  useEffect(()=>{
    console.log('catObjects:', catObjects);
  },[])
  
  return (
    <>
      <div className={styles.main}>

        {catObjects && Array.isArray(catObjects) && catObjects.map((categoryObject, index) => {
          const categoryName = Object.keys(categoryObject)[0];
          const categoryData = categoryObject[categoryName];

          return (categoryData.selected === true) ? (
            // <Category key={`category-${index}`} categoryName={categoryName} categoryData={categoryData} />
            <Category key={`category-${index}`} categoryName={categoryName}  />
          ) : null;

        })}
      </div>
    </>
  );
}
