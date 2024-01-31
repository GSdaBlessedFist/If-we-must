import React, { useState, createContext, useEffect } from "react";
import { categoryObjects } from "../categoryObjects";
import p from "@/app/util/consoleHelper";

export const SelectedCategoriesContext = createContext();

const SOURCE = "SelectedCategoriesProvider";
const srcColor = 25;

const catObjs = categoryObjects;

export const SelectedCategoriesProvider = ({ children }) => {
  const [categoryObjectsArray, setCategoryObjectsArray] = useState(catObjs);
  const [listOfCategories, setListOfCategories] = useState([]);



  // array -> selected list
  function updateCategoryObjectsArray(categoryObjList) {
    setCategoryObjectsArray(categoryObjList);
  }




  useEffect(() => {
    const selectedObjectsList = categoryObjectsArray.filter((obj) => {
      const keys = Object.keys(obj);
      if (keys.length === 1) {
        const category = obj[keys[0]];
        return category.selected === true;
      }
      return false;
    });

    function removeDuplicates(list) {
      const objMap = new Map();

      list.forEach((obj) => {
        let key = JSON.stringify(obj);
        objMap.set(key, obj);
      });

      let noDups = Array.from(objMap.values());
      return noDups;
    }
    const noDupsList = removeDuplicates(selectedObjectsList);

    if (noDupsList.length === 0) {
      setListOfCategories([])
    }else {
      setListOfCategories(
        noDupsList.map((category) => {
          const categoryName = Object.keys(category)[0];
          const mode = category[categoryName].mode || "dollar";
          const modeCalculatedAmount =
            mode === "dollar" ? category[categoryName].amountEntered.amount || 0 : 0;

            p(SOURCE, categoryName, 20);
            p(SOURCE, modeCalculatedAmount, srcColor, "modeCalculatedAmount");  
          return {
            [categoryName]: {
              ...category[categoryName],
              mode,
              modeCalculatedAmount,
            },
          };
        })
      );
    }

    p(SOURCE, noDupsList, srcColor, "noDupsList");
  }, [categoryObjectsArray]);

  useEffect(() => {
    listOfCategories.forEach((category) => {
      const categoryName = Object.keys(category)[0];
      const amountEntered = category[categoryName].amountEntered?.amount;
      
      p(SOURCE,categoryName,srcColor)
      p(SOURCE,amountEntered,srcColor,"amountEntered")
    });
  }, [listOfCategories]);

  const contextValue = {
    listOfCategories,
    categoryObjectsArray,
    updateCategoryObjectsArray,
  };

  return (
    <SelectedCategoriesContext.Provider
      value={{
        listOfCategories,
        categoryObjectsArray,
        updateCategoryObjectsArray,
      }}
    >
      {children}
    </SelectedCategoriesContext.Provider>
  );
};
