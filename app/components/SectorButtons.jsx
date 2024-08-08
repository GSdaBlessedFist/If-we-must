import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function SectorButtons({ ...props }) {
  const {TAX_AMOUNT, buttonsEnabled, sectorsList, handleSectorSelection } = props;
  const [selectedButtons, setSelectedButtons] = useState([]);
  const buttonsSectionContainer = useRef();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

  function handleButtonSelection(e) {
    const value = e.target.value;
    handleSectorSelection(e); // Call this first if necessary

    // Check if the value is already present before adding it
    if (!selectedButtons.includes(value)) {
      setSelectedButtons((prev) => [...prev, value]);
    }else{
      setSelectedButtons(prev => prev.filter(item => item !== value));
      
    }

  }

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

  useEffect(()=>{
    if(TAX_AMOUNT === 0 ){
      setSelectedButtons([]);
    }
  },[TAX_AMOUNT]);



//   useGSAP(() => {
//     if(buttonsEnabled){
//       gsap.from([".sector"],{opacity: 0,duration: 3000});
//     }
// }, { dependencies: [buttonsEnabled],scope:buttonsSectionContainer});


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

  return (
    <div>
      {!buttonsEnabled ? (
        ""
      ) : (
        <div
          id="buttonsSection"
          ref={buttonsSectionContainer}
          className="flex justify-evenly flex-wrap border-y-4 border-primary bg-secondaryTint opacity-1">
          {sectorsList.map((sector) => (
            <div key={sector} className="">
              <button
                style={{
                  backgroundColor: selectedButtons.includes(sector)
                    ? "var(--primaryColor)"
                    : "inherit",
                  color: selectedButtons.includes(sector)
                    ? "white"
                    : "var(--primaryColor)"
                }}
                className="m-2 p-2 px-1 hover:bg-primary hover:text-white rounded-lg"
                onClick={handleButtonSelection}
                value={sector}>
                {sector}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>


    
        
  );
}

export default SectorButtons;
