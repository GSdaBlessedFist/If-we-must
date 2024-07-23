function SectorForm({ ...props }) {
  return (
    <div className="w-full  flex flex-col items-center justify-center ">
      {props.sectorsSelected.length > 0 && (
        <div id="sectorsSection" className="w-full text-center px-6 pb-8">
          <div className="p-4 text-xl font-semibold">Selected Sectors:</div>
          <div className="">
            <ul className=" flex justify-evenly items-center flex-wrap gap-x-5">
              {props.sectorsSelected.map((sector, index) => (
                <div key={index} className="my-3 flex flex-col  text-white p-4 py-6 border-4 border-primary rounded-lg">
                  <div className="relative bottom-4 text-xl text-primary font-semibold border  ">
                    {sector.id}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-primary text-xl font-bold">$</span>
                    <input
                      className="my-2 w-20 text-center dark:text-black placeholder-primary"
                      type="text"
                      placeholder={props.placeholder}
                      onChange={(e) => props.handleSpecifiedAmountChange(e, index)}
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SectorForm;
