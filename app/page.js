"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { useMachine } from '@xstate/react';
import taxMachine from './machines/taxMachine';
const sectorsList = ["sector1", "sector2", "sector3", "sector4"];

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
    //setUnspecifedCount(()=>sectorsSelected.filter(sector => sector.amountEntered !== 0).length | 1)    
  }
  const handleSpecifiedAmountChange = (e, index) => {
    const { value } = e.target;
    const updatedSectors = [...sectorsSelected];
    updatedSectors[index].amountEntered = parseFloat(value) || 0; // Ensure amountEntered is a number
    setSectorsSelected(updatedSectors);

  };
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////



  const totalSpecifiedAmount = useMemo(() => {
    return sectorsSelected.reduce((acc, sector) => acc + sector.amountEntered, 0);
  }, [sectorsSelected]);



  useEffect(() => {
    setTotalRemainingAmount(TAX_AMOUNT - totalSpecifiedAmount);
    send({ type: 'UPDATE SPECIFIED AMOUNT', value: totalSpecifiedAmount });
  }, [totalSpecifiedAmount, TAX_AMOUNT]);





  // useEffect(() => {
  //   setUnspecifedCount(() => sectorsSelected.filter(sector => sector.amountEntered !== 0).length | 1)

  // }, [sectorsSelected]);

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
      <div>
        <h2>TAX AMOUNT header section</h2>
        <input type="text" value={TAX_AMOUNT} onChange={handleTAX_AMOUNTChange} className='p-2 w-12 text-black' />
      </div>
      {(!buttonsEnabled) ? "" :
        (
          <div id="buttonsSection" className='flex'>
            {sectorsList.map((sector) => (
              <div key={sector} className=' m-2 '>
                <button className="border" onClick={handleSectorSelection} value={sector}>{sector}</button>
              </div>
            ))}
          </div>
        )}
      <div>Total Remaining Amount: ${totalRemainingAmount.toFixed(2)}</div>
      <br />
      {sectorsSelected.length > 0 && (
        <div id="sectorsSection">
          <h3>Selected Sectors:</h3>
          <ul>
            {sectorsSelected.map((sector, index) => (
              <div key={index} className='border w-24 p-4 text-white'>
                <div>{sector.id}</div>
                <input
                  className="w-16 dark:text-black"
                  type="text"
                  placeholder={placeholder}
                  onChange={(e) => handleSpecifiedAmountChange(e, index)}
                />
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

