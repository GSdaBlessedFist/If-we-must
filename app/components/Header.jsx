

function Header({ ...props }) {

  const {TAX_AMOUNT,handleTAX_AMOUNTChange,totalRemainingAmount} = props;
  
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  return (
    <div className="w-full flex">
      <div className="w-1/2 flex sm:justify-around md:justify-evenly items-center text-white p-2 bg-primary">
      <div className=" font-semibold ">TAX AMOUNT </div>
        <input
          type="text"
          value={TAX_AMOUNT}
          onChange={handleTAX_AMOUNTChange}
          className="relative left-4 md:-left-6 text-center text-primary font-bold p-2 w-20 text-black rounded-lg"
        />
      </div>
      <div className="w-1/2 flex justify-evenly items-center text-lg text-white font-semibold p-2 bg-primaryTint ">
        Total Remaining Amount: <span style={{color:totalRemainingAmount < 0 ? "red":"var(--primaryColor)",border:totalRemainingAmount < 0 ? "3px red solid":"3px var(--primaryColor) solid"}} className="text-xl  border-2 p-3 rounded-lg bg-white select-none">${totalRemainingAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Header;
