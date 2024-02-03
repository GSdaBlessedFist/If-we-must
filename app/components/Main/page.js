"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./main.module.scss";
import Category from "../Category/page";
import { CategoryObjectsContext } from "@/app/contexts/CategoryObjectsProvider";
import { TotalRemainingAmountContext } from "../../contexts/TotalRemainingAmountProvider";
import { categoryObjects } from "../../categoryObjects";
import p from "@/app/util/consoleHelper";

const SOURCE = "Main";
const srcColor = 205;

export default function Main() {

  const CatObjectsContext = useContext(CategoryObjectsContext);
  const AmountContext = useContext(TotalRemainingAmountContext);

  return (
    <>
      <div className={styles.main}>

        {CatObjectsContext.catObjects.map((categoryObject, index) => {
          const categoryName = Object.keys(categoryObject)[0];
          const categoryData = categoryObject[categoryName];

          return (categoryData.selected === true) ? (
            <Category key={`category-${index}`} categoryName={categoryName} categoryData={categoryData} />
          ) : null;

        })}
      </div>
    </>
  );
}
