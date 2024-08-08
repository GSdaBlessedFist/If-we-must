import { useEffect } from "react";

function SectorForm({ ...props }) {
  const {
    TAX_AMOUNT,
    sectorsSelected,
    setSectorsSelected,
    placeholder,
    handleSpecifiedAmountChange,
    totalSpecifiedAmount,
    totalRemainingAmount,
    setTotalRemainingAmount,
  } = props;

  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  function fillInBlanks() {
    let numberOfUnspecifiedSectors = sectorsSelected.filter(
      (sector) => sector.amountEntered === 0
    ).length;
    const updatedSectors = sectorsSelected.map((sector) => {
      if (sector.amountEntered === 0) {
        const newAmount = Math.floor(totalRemainingAmount / numberOfUnspecifiedSectors);
        console.log(`newAmount: ${newAmount}`);
        return { ...sector, amountEntered: newAmount };
      } else {
        return sector;
      }
    });
    setSectorsSelected(updatedSectors);
    setTotalRemainingAmount(0);
  }
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////

  useEffect(() => {
    if (totalSpecifiedAmount > TAX_AMOUNT) {
      alert("You have exceeded the amount owed. Please remove the amount.");
    }
  }, [sectorsSelected, TAX_AMOUNT,setTotalRemainingAmount,totalSpecifiedAmount]);


  useEffect(()=>{
    // const thinnestSector = sectorsSelected.
  },[sectorsSelected]);

  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  return (
    <div
      id="sectorFormContainer"
      className="w-full  flex flex-col items-center justify-center border-b-4 border-primary ">
      {sectorsSelected.length > 0 && (
        <div id="sectorsSection" className="w-full text-center px-6 pb-8 ">
          <div className="p-4 text-xl font-semibold">Selected Sectors:</div>
          <div className="">
            <ul className=" flex sm:flex-col md:flex-row justify-evenly items-center flex-wrap gap-x-5">
              {sectorsSelected.map((sector, index) => (
                <div key={index} className="my-3 w-1/5 h-32 flex flex-col bg-primary text-white p-2  border-4 border-primary rounded-lg">
                  <div className="relative  mx-auto w-4/5 h-1/3 flex items-center justify-center text-sm text-white font-semibold  ">
                    {sector.id}
                  </div>
                  <div className="flex h-2/3 justify-center items-center">
                    <span className="mr-2 text-white text-xl font-bold">$</span>
                    <input className="my-2 w-16 text-center font-semibold dark:text-primary placeholder-primary placeholder:opacity-25" type="text" placeholder={placeholder.toLocaleString()} value={sector.amountEntered !== 0 ? sector.amountEntered : ""} onChange={(e) => handleSpecifiedAmountChange(e, index)} />
                  </div>
                </div>
              ))}
            </ul>
            {sectorsSelected.some((sector) => sector.amountEntered === 0) ? (
              <button
                id="fillButton"
                className="mt-4  p-2 px-4 font-semibold border-primary border-4 rounded-2xl hover:bg-primary hover:text-white"
                onClick={fillInBlanks}>
                Fill in unspecified sectors evenly.
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default SectorForm;
