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
<<<<<<< HEAD
  
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
=======
  const { state } = useTaxMachineContext();
  const {TAX_AMOUNT,TotalRemainingAmount,categories} = state.context;
>>>>>>> onto-categories
  
  useEffect(() => {
    
    console.log("categories");
    console.log(categories)
  },[state.context])

  return (
    <>
      <div className={styles.main}>
      

<<<<<<< HEAD
        {catObjects && Array.isArray(catObjects) && catObjects.map((categoryObject, index) => {
=======



        {state.context.categories.map((categoryObject, index) => {
>>>>>>> onto-categories
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
