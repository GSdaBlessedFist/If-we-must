import React, { useState, useRef, createContext, useEffect, useReducer, useContext } from "react";
import { categoryObjects } from "../categoryObjects";
import p from "@/app/util/consoleHelper";

const CategoryObjectsContext = createContext();
CategoryObjectsContext.displayName = "CategoryObjectsContext";

const SOURCE = "CategoryObjectsProvider";
const srcColor = 65;

const initialCategoryObjects = categoryObjects;//state

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
        case "UPDATE SELECTED STATUS":
            {
                const { categoryName, selected } = action.payload;
                return updateCategoryProperty(state, categoryName, 'selected', selected);
            }

        case "UPDATE MODE":
            {
                const { categoryName, mode } = action.payload;
                return updateCategoryProperty(state, categoryName, 'mode', mode);
            }

        case "UPDATE AMOUNT ENTERED":
            {
                const { categoryName, amountEntered } = action.payload;
                console.log('(line 44) amountEntered:', JSON.stringify(amountEntered));
                return updateCategoryProperty(state, categoryName, 'amountEntered', { specified: false, amount: amountEntered });
            }

        case "UPDATE MODE CALCULATED AMOUNT":
            {
                const { categoryName, amountDisplayed } = action.payload;
                return updateCategoryProperty(state, categoryName, 'amountDisplayed', amountDisplayed)
            }
        default:
            return state;
    }
};

const CategoryObjectsProvider = ({ children }) => {

    const [catObjects, dispatch] = useReducer(reducer, initialCategoryObjects);
    const [categoriesWithSpecifiedAmount, setCategoriesWithSpecifiedAmount] = useState([])

    const updateSelectedStatus = (categoryName, selected) => {
        dispatch({ type: "UPDATE SELECTED STATUS", payload: { categoryName, selected } });
    };
    const updateMode = (categoryName, mode) => {
        dispatch({ type: "UPDATE MODE", payload: { categoryName, mode } })
    }
    const updateAmountEntered = (categoryName, amountEntered) => {
        dispatch({ type: "UPDATE AMOUNT ENTERED", payload: { categoryName, amountEntered } })
        // const updatedCategories = catObjects.filter(category => {
        //     return category.hasOwnProperty(categoryName) && category[categoryName].amountEntered.specified;
        //   });
        const catToAdd = catObjects;
        p(SOURCE, catToAdd, srcColor - 54, "catToAdd")
        //setCategoriesWithSpecifiedAmount(updatedCategories);
    }
    const updateAmountDisplayed = (categoryName, amountDisplayed) => {
        dispatch({ type: "UPDATE MODE CALCULATED AMOUNT", payload: { categoryName, amountDisplayed } });
    }
    useEffect(() => {
        console.log("catObjects:", catObjects);
      
        const updatedCategories = catObjects.filter(category => category.amountEntered && category.amountEntered.specified);
        setCategoriesWithSpecifiedAmount(updatedCategories);
      }, [catObjects]);

    useEffect(() => {
        p(SOURCE, categoriesWithSpecifiedAmount, srcColor, "categoriesWithSpecifiedAmount")
    }, [catObjects]);

    const contextValue = { catObjects, categoriesWithSpecifiedAmount, updateSelectedStatus, updateMode, updateAmountEntered, updateAmountDisplayed };

    return (
        <CategoryObjectsContext.Provider value={contextValue}>
            {children}
        </CategoryObjectsContext.Provider>
    );
};

const useCategoryObjectsContext = () => useContext(CategoryObjectsContext);

export {CategoryObjectsProvider,useCategoryObjectsContext};