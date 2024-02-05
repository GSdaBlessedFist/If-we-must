import React, { useState, createContext, useEffect, useReducer } from "react";
import { categoryObjects } from "../categoryObjects";
import p from "@/app/util/consoleHelper";

export const CategoryObjectsContext = createContext();
CategoryObjectsContext.displayName = "CategoryObjectsContext";

const SOURCE = "CategoryObjectsProvider";
const srcColor = 65;

const initialCategoryObjects = categoryObjects;//state

const updateCategoryProperty = (state, categoryName, property, value) => {
    return state.map((category) => {
        if (category.hasOwnProperty(categoryName)) {
            return {
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
                return updateCategoryProperty(state, categoryName, 'amountEntered', {specified:false,amount:amountEntered});
            }
        default:
            return state;
    }
};

export const CategoryObjectsProvider = ({ children }) => {

    const [catObjects, dispatch] = useReducer(reducer, initialCategoryObjects);

    const updateSelectedStatus = (categoryName, selected) => {
        dispatch({ type: "UPDATE SELECTED STATUS", payload: { categoryName, selected } });
    };
    const updateMode = (categoryName, mode) => {
        dispatch({ type: "UPDATE MODE", payload: { categoryName, mode } })
    }
    const updateAmountEntered = (categoryName,amountEntered)=>{
        dispatch({type:"UPDATE AMOUNT ENTERED",payload:{categoryName,amountEntered}})
    }





    
    useEffect(() => {
        p(SOURCE, catObjects, srcColor, "catObjects updated")
    }, [catObjects]);

    const contextValue = { catObjects, updateSelectedStatus ,updateMode,updateAmountEntered};







    return (
        <CategoryObjectsContext.Provider value={contextValue}>
            {children}
        </CategoryObjectsContext.Provider>
    );
};
