"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { useMachine } from '@xstate/react';
import taxMachine from './machines/taxMachine';
import Header from './components/Header';
import SectorButtons from "./components/SectorButtons";
import SectorForm from "./components/SectorForm";
import MessageAndChartContainer from './components/MessageAndChartContainer';
import "./globals.scss";


const sectorsList = ["Medicine", "Military", "Education", "Infrastructure", "Environment", "Law Enforcement"];


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
    const parsedValue = parseInt(value) || 0;
    setTAX_AMOUNT(parsedValue);
    setTotalRemainingAmount(parsedValue);
    setButtonsEnabled(parsedValue !== 0);
    if(value === 0) {
      setSectorsSelected([]);
    }
    send({ type: 'ENTER TAX AMOUNT', value: parsedValue });
  }



  const handleSectorSelection = (e) => {
    const { value } = e.target;
    const isSelected = sectorsSelected.some((sector) => sector.id === value);
    if (!isSelected) {
      const newDataObject = { id: value, amountEntered: 0 };
      setSectorsSelected((prev) => [...prev, newDataObject]);
      setUnspecifedCount((prev) => prev + 1);
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
    updatedSectors[index].amountEntered = parseFloat(value) || 0;
    //updatedSectors[index].amountEntered = Number(updatedSectors[index].amountEntered.toFixed(2));
    //updatedSectors[index].amountEntered = Number(parseFloat(value).toFixed(2));
    setSectorsSelected(updatedSectors);
  };
  const totalSpecifiedAmount = useMemo(() => {
    let amount = sectorsSelected.reduce((acc, sector) => acc + sector.amountEntered, 0);
    console.log(parseFloat(amount))
    return amount
  }, [sectorsSelected]);


  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  useEffect(() => {
    const remainder = (TAX_AMOUNT - totalSpecifiedAmount) % 1;
    setTotalRemainingAmount(remainder === 0 ? parseInt(Math.round(TAX_AMOUNT - totalSpecifiedAmount)) : 0);
    //setTotalRemainingAmount(parseInt(Math.round(TAX_AMOUNT - totalSpecifiedAmount)));
    send({ type: 'UPDATE SPECIFIED AMOUNT', value: totalSpecifiedAmount });
  }, [totalSpecifiedAmount, TAX_AMOUNT, send]);
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
  }, [sectorsSelected, totalRemainingAmount, totalSpecifiedAmount]);
  useEffect(() => {
    setButtonsEnabled(TAX_AMOUNT !== 0);
    if (TAX_AMOUNT === 0) {
      setSectorsSelected([])
    }
  }, [TAX_AMOUNT]);
  useEffect(() => {
    //console.log()
  }, []);
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  return (
    <>
      <div id="mainContainer" style={{ width: "clamp(700px,65%,1000px)",boxShadow:"0px 10px 25px hsla(var(--primaryHue),70%,30%,0.35)" }} className='bg-white rounded-lg border-8 border-primary '>
        <Header TAX_AMOUNT={TAX_AMOUNT} handleTAX_AMOUNTChange={handleTAX_AMOUNTChange} totalRemainingAmount={totalRemainingAmount} />
        <SectorButtons TAX_AMOUNT={TAX_AMOUNT} sectorsList={sectorsList} buttonsEnabled={buttonsEnabled} handleSectorSelection={handleSectorSelection} />
        <SectorForm TAX_AMOUNT={TAX_AMOUNT} sectorsSelected={sectorsSelected} setSectorsSelected={setSectorsSelected} placeholder={placeholder} handleSpecifiedAmountChange={handleSpecifiedAmountChange} totalSpecifiedAmount={totalSpecifiedAmount} totalRemainingAmount={totalRemainingAmount} setTotalRemainingAmount={setTotalRemainingAmount} />
        <MessageAndChartContainer sectorsSelected={sectorsSelected} totalRemainingAmount={totalRemainingAmount} />
      </div>
    </>
  );
}
