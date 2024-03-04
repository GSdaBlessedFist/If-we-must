import React, {
  useState,
  useRef,
  createContext,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { categoryObjects } from "../categoryObjects";
import p from "../util/consoleHelper";

// type CategoryObjectType = {
//   [key: string]: {
//     mode: string;
//     amountEntered: {
//       specified: boolean;
//       amount: number;
//     };
//     amountDisplayed: number;
//     selected: boolean;
//   };
// };



const CategoryObjectsContext = createContext(null);
CategoryObjectsContext.displayName = "CategoryObjectsContext";

const SOURCE = "CategoryObjectsProvider";
const srcColor = 65;

const initialCategoryObjects = categoryObjects; //state

const updateCategoryProperty = (state, categoryName, property, value) => {
  return state.map((category) => {
    if (category.hasOwnProperty(categoryName)) {
      return {
        ...category,
        [categoryName]: {
          ...category[categoryName],
          [property]: value,
        },
      };
    }
    return category;
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE SELECTED STATUS": {
      const { categoryName, selected } = action.payload;
      return updateCategoryProperty(state, categoryName, "selected", selected);
    }

    case "UPDATE MODE": {
      const { categoryName, mode } = action.payload;
      return updateCategoryProperty(state, categoryName, "mode", mode);
    }

    case "UPDATE AMOUNT ENTERED": {
      const { categoryName, amountEntered } = action.payload;
      // return updateCategoryProperty(state, categoryName, 'amountEntered', { specified: amountEntered?true:false, amount: amountEntered });
      return updateCategoryProperty(state, categoryName, "amountEntered", {
        amount: amountEntered,
      });
    }

    case "UPDATE AMOUNT DISPLAYED": {
      const { categoryName, amountDisplayed } = action.payload;
      return updateCategoryProperty(
        state,
        categoryName,
        "amountDisplayed",
        amountDisplayed
      );
    }
    case "UPDATE_TOTAL_REMAINING_ACTION":{
      const { amount } = action.payload;
      const newTotalRemainingAmount = state.totalRemainingAmount - amount;
      return { ...state, totalRemainingAmount: newTotalRemainingAmount };
    }
    default:
      return state;
  }
};

const CategoryObjectsProvider = ({ children }) => {
  const [catObjects, dispatch] = useReducer(reducer, initialCategoryObjects);
  const [numberOfSelectedCategories, setNumberOfSelectedCategories] = useState(
    0
  );
  const [
    categoriesWithSpecifiedAmount,
    setCategoriesWithSpecifiedAmount,
  ] = useState([]);

  const updateSelectedStatus = (categoryName, selected) => {
    dispatch({
      type: "UPDATE SELECTED STATUS",
      payload: { categoryName, selected },
    });
  };
  const updateMode = (categoryName, mode) => {
    dispatch({ type: "UPDATE MODE", payload: { categoryName, mode } });
    p(SOURCE, mode, srcColor - 5, `${categoryName} mode`);
  };
  const updateAmountEntered = (categoryName, amountEntered) => {
    dispatch({
      type: "UPDATE AMOUNT ENTERED",
      payload: { categoryName, amountEntered },
    });
    p(SOURCE, amountEntered.amount, srcColor - 5, "amountEntered");
  };
  const updateAmountDisplayed = (categoryName, amountDisplayed) => {
    dispatch({
      type: "UPDATE AMOUNT DISPLAYED",
      payload: { categoryName, amountDisplayed },
    });
    p(SOURCE, amountDisplayed, srcColor - 5, `${categoryName} amountDisplayed`);
  };
  const updateTotalRemaining = (amount) => {
    dispatch({ type: "UPDATE_TOTAL_REMAINING_ACTION", payload: { amount } });
  };
  useEffect(() => {
    const updatedCategories = catObjects.filter(
      (category) => category.amountEntered && category.amountEntered.specified
    );
    setCategoriesWithSpecifiedAmount(updatedCategories);
  }, [catObjects]);
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////




  useEffect(() => {
    let selectedCategories = catObjects.filter((catObject)=>{
      return Object.values(catObject)[0].selected === true
    })
    let numberOfSelectedCategories  = selectedCategories.length ;
    p(SOURCE, numberOfSelectedCategories, srcColor, "numberOfSelectedCategories");
    setNumberOfSelectedCategories(numberOfSelectedCategories)
    

  }, [catObjects]);





  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  

  const contextValue = {
    catObjects,
    categoriesWithSpecifiedAmount,
    numberOfSelectedCategories,
    updateSelectedStatus,
    updateMode,
    updateAmountEntered,
    updateAmountDisplayed,
    updateTotalRemaining
  };

  return (
    <CategoryObjectsContext.Provider value={contextValue}>
      {children}
    </CategoryObjectsContext.Provider>
  );
};

const useCategoryObjectsContext = () => useContext(CategoryObjectsContext);

export { CategoryObjectsProvider, useCategoryObjectsContext };
