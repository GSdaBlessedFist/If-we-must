
import React, { useState, createContext,useEffect } from "react";
import { categoryObjects } from "../categoryObjects";

// type Category = {
//   mode: string;
//   amountEntered: number;
//   remainingAmountDisplayed: number;
//   selected: boolean;
// };

// type CategoryObject = Record<string, Category>;

// type SelectedCategoriesContextProps = {
//   listOfCategories: CategoryObject[];
//   categoryObjectsArray: CategoryObject[];
//   divisor: number;
//   updateCategoryObjectsArray: (categoryObjList: CategoryObject[]) => void;
// };

export const SelectedCategoriesContext = createContext();

const catObjs = categoryObjects;
const p = console.log;



export const SelectedCategoriesProvider = ({ children }) => {
  const [categoryObjectsArray, setCategoryObjectsArray] = useState(catObjs);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [divisor, setDivisor] = useState(1);

  // array -> selected list
  function updateCategoryObjectsArray(categoryObjList) {
    setCategoryObjectsArray(categoryObjList);
  }

  useEffect(() => {
    setDivisor(listOfCategories.length);
    //p(listOfCategories)
  }, [listOfCategories]);

  useEffect(() => {
    const selectedObjectsList = categoryObjectsArray.filter((obj) => {
      const keys = Object.keys(obj);
      if (keys.length === 1) {
        const category = obj[keys[0]];
        return category.selected === true;
      }
      return false;
    });
    setListOfCategories(selectedObjectsList);
    
  }, [categoryObjectsArray]);

  const contextValue = { listOfCategories, categoryObjectsArray, updateCategoryObjectsArray, divisor };

  return (
    <SelectedCategoriesContext.Provider value={contextValue}>
      {children}
    </SelectedCategoriesContext.Provider>
  );
};