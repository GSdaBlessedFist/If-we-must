import React, { useEffect, useState, createContext, useContext } from "react";
import p from "../util/consoleHelper";
import { useMachine } from '@xstate/react';
import taxMachine from "../machines/taxMachine";

const SOURCE = "TaxMachineProvider";
const srcColor = 55;

const TaxMachineContext = createContext();


const TaxMachineProvider = ({ children }) => {
    const [state, send] = useMachine(taxMachine);


    const setTaxAmount = (amount) => {
        p(SOURCE, amount,srcColor,"tax amount")
        send({ type: "SET_TAX_AMOUNT", amount: amount });
    };

    const selectCategory = (category) => {
        send({ type: "SELECT_CATEGORY", category });
        p(SOURCE, category,srcColor,"category selected");
    };

    const deselectCategory = (category) => {
        send({ type: "DESELECT_CATEGORY", category });
        p(SOURCE, category,srcColor-5,"category removed");
    };

    const changeMode = (categoryName, newMode) => {
        p(SOURCE, newMode,srcColor-10,"mode")
        send({ type: "CHANGE_MODE", categoryName, newMode });
    };

    const updateAmountEntered = (categoryName, amount) => {
        p(SOURCE,amount, srcColor - 15,"amount entered")
        p(SOURCE,categoryName, srcColor - 15,"categoryName")
        send({ type: "UPDATE_AMOUNT_ENTERED", categoryName, amount });
    };
    const contextValue = {
        state,
        setTaxAmount,
        selectCategory,
        deselectCategory,
        changeMode,
        updateAmountEntered
    }

    useEffect(() => {
        //console.log(contextValue);
    }, []);

    return (
        <TaxMachineContext.Provider value={contextValue}>
            {children}
        </TaxMachineContext.Provider>
    );
}


const useTaxMachineContext = () => useContext(TaxMachineContext);

export { TaxMachineProvider, useTaxMachineContext }