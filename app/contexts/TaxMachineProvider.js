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
        p(SOURCE, amount,srcColor,"amount")
        send({ type: "SET_TAX_AMOUNT", amount: amount });
    };

    const selectCategory = (category) => {
        p(SOURCE, category,srcColor,"category");
        send({ type: "SELECT_CATEGORY", category });
    };

    const deselectCategory = (category) => {

        send({ type: "DESELECT_CATEGORY", category });
        p(SOURCE, category,srcColor-33,"category removed");
    };

    const changeMode = (categoryName, newMode) => {
        send({ type: "CHANGE_MODE", categoryName, newMode });
    };

    const updateAmountEntered = (categoryName, amount) => {
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
        console.log(contextValue);

    }, []);

    return (
        <TaxMachineContext.Provider value={contextValue}>
            {children}
        </TaxMachineContext.Provider>
    );
}


const useTaxMachineContext = () => useContext(TaxMachineContext);

export { TaxMachineProvider, useTaxMachineContext }