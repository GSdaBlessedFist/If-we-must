//Main
import { useContext, useEffect, useState } from "react";
import styles from "./main.module.scss";
import Category from "../Category/page";
import { SelectedCategoriesContext } from "../../contexts/SelectedCategoriesProvider";
import { TotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import { categoryObjects } from "../../categoryObjects";
const p = console.log;

export default function Main() {
  const { listOfCategories } = useContext(SelectedCategoriesContext);
  const { totalRemainingAmount, updateTotalRemainingAmount } = useContext( TotalRemainingAmountContext );
  

  useEffect(()=>{
    //p(listOfCategories.length)
  },[listOfCategories])

  

  return (
    <>
      <div className={styles.main}>
        {listOfCategories.map((categoryObject, index) => {
          const categoryName = Object.keys(categoryObject)[0];
          const categoryData = categoryObject[categoryName];
          return (
            <Category
              key={`category-${index}`}
              categoryName={categoryName}
              categoryData={categoryData}
              divisor={listOfCategories.length}
            />
          );
        })}
      </div>
    </>
  );
}
