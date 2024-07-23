"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { useMachine } from '@xstate/react';
import taxMachine from './machines/taxMachine';
import Header from './components/Header';
import SectorButtons from "./components/SectorButtons";
import SectorForm from "./components/SectorForm";
import "./globals.scss";

const sectorsList = ["sector1", "sector2", "sector3", "sector4","sector5", "sector6", "sector7", "sector8"];

export default function Home() {
  const [state, send] = useMachine(taxMachine);
  const [TAX_AMOUNT, setTAX_AMOUNT] = useState(0);
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [sectorsSelected, setSectorsSelected] = useState([]);
  const [totalRemainingAmount, setTotalRemainingAmount] = useState(0);
  const [placeholder, setPlaceholder] = useState(0);
  const [unspecifiedCount, setUnspecifedCount] = useState(1);
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  const handleTAX_AMOUNTChange = (e) => {
    const { value } = e.target;
    const parsedValue = parseInt(value);
    setTAX_AMOUNT(parsedValue);
    setTotalRemainingAmount(parsedValue);
    setButtonsEnabled(parsedValue !== 0);
    send({ type: 'ENTER TAX AMOUNT', value: parsedValue });
  };
  const handleSectorSelection = (e) => {
    const { value } = e.target;
    const isSelected = sectorsSelected.some((sector) => sector.id === value);
    if (!isSelected) {
      const newDataObject = { id: value, amountEntered: 0 };
      setSectorsSelected((prev) => [...prev, newDataObject]);
      setUnspecifedCount((prev) => prev + 1); // Increment correctly
      send({ type: 'SECTOR SELECTION', value: newDataObject });
    } else {
      setSectorsSelected((prev) => prev.filter((sector) => sector.id !== value));
      setUnspecifedCount((prev) => prev - 1); // Decrement correctly
      send({ type: 'DESELECT SECTOR', value });
    }
  }
  const handleSpecifiedAmountChange = (e, index) => {
    const { value } = e.target;
    const updatedSectors = [...sectorsSelected];
    updatedSectors[index].amountEntered = parseFloat(value) || 0; // Ensure amountEntered is a number
    setSectorsSelected(updatedSectors);
  };
  const totalSpecifiedAmount = useMemo(() => {
    return sectorsSelected.reduce((acc, sector) => acc + sector.amountEntered, 0);
  }, [sectorsSelected]);
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  useEffect(() => {
    setTotalRemainingAmount(TAX_AMOUNT - totalSpecifiedAmount);
    send({ type: 'UPDATE SPECIFIED AMOUNT', value: totalSpecifiedAmount });
  }, [totalSpecifiedAmount, TAX_AMOUNT]);
  useEffect(() => {
    let totalSpecified = 0;
    let unspecifiedCount = 0;
    let placeholderAmount = 0;
    sectorsSelected.forEach((sector) => {
      if (sector.amountEntered !== 0) {
        totalSpecified += sector.amountEntered;
      } else {
        unspecifiedCount++;
      }
    });
    if (unspecifiedCount > 0) {
      placeholderAmount = totalRemainingAmount / unspecifiedCount;
      console.log(placeholderAmount)
    }
    console.log(`totalSpecifiedAmount: $${totalSpecifiedAmount}`)
    console.log(`unspecifiedCount: ${unspecifiedCount}`)
    setPlaceholder(placeholderAmount.toFixed(2));
  }, [sectorsSelected, totalRemainingAmount]);
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  return (
    <>
      <div id="mainContainer" style={{width:"clamp(700px,66.7%,800px)"}} className='rounded-lg border-8 border-primary '>
        <Header TAX_AMOUNT={TAX_AMOUNT} handleTAX_AMOUNTChange={handleTAX_AMOUNTChange} totalRemainingAmount={totalRemainingAmount} />
        <SectorButtons sectorsList={sectorsList} buttonsEnabled={buttonsEnabled} handleSectorSelection={handleSectorSelection} />
        <SectorForm sectorsSelected={sectorsSelected} placeholder={placeholder} handleSpecifiedAmountChange={handleSpecifiedAmountChange}/>
        
      </div>
    </>
  );
}
