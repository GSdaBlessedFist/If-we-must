function Header({ ...props }) {
  return (
    <div className="w-full flex">
      <div className="w-1/2 flex justify-evenly items-center  p-2">
      <div className="font-semibold">TAX AMOUNT </div>
        <input
          type="text"
          value={props.TAX_AMOUNT}
          onChange={props.handleTAX_AMOUNTChange}
          className="relative right-8 text-center text-primary p-2 w-20 text-black"
        />
      </div>
      <div className="w-1/2 flex justify-evenly items-center font-semibold p-2">
        Total Remaining Amount: <span className="text-xl">${props.totalRemainingAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Header;
