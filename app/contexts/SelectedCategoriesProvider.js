import React, { useState, createContext } from "react";

export const SelectedCategoriesContext = createContext();

export const SelectedCategoriesProvider = ({ children }) => {
  const [listOfCategories, setListOfCategories] = useState([]);

  function updateListOfCategories(list) {
    setListOfCategories(list);
  }
  const contextValue = { listOfCategories, updateListOfCategories };
  return (
    <SelectedCategoriesContext.Provider value={contextValue}>
      {children}
    </SelectedCategoriesContext.Provider>
  );
};
