import React, { useState, createContext, useEffect, useReducer } from "react";
import { categoryObjects } from "../categoryObjects";
import p from "@/app/util/consoleHelper";

export const CategoryObjectsContext = createContext();
CategoryObjectsContext.displayName = "CategoryObjectsContext";

const SOURCE = "CategoryObjectsProvider";
const srcColor = 65;

const initialCategoryObjects = categoryObjects;

const reducer = (state, action) => {
    switch (action.type) {

        case "UPDATE SELECTED STATUS":
            const { categoryName, selected } = action.payload;
            return state.map((category) => {
                if (category.hasOwnProperty(categoryName)) {
                    return {
                        [categoryName]: {
                            ...category[categoryName],
                            selected
                        },
                    };
                }
                return category;
            });

        default:
            return state;
    }
}

export const CategoryObjectsProvider = ({ children }) => {

    const [catObjects, dispatch] = useReducer(reducer, initialCategoryObjects);

    const updateSelectedStatus = (categoryName, selected) => {
        dispatch({ type: "UPDATE SELECTED STATUS", payload: { categoryName, selected } });
    };

    useEffect(()=>{
        p(SOURCE, catObjects,srcColor, "catObjects updated")
    },[catObjects]);

    const contextValue = { catObjects,updateSelectedStatus };

    return (
        <CategoryObjectsContext.Provider value={contextValue}>
            {children}
        </CategoryObjectsContext.Provider>
    );
};
