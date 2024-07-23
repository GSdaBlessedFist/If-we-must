function SectorButtons({ ...props }) {
    return (
        <div>
            {(!props.buttonsEnabled) ? "" :
          (
            <div id="buttonsSection" className='flex justify-evenly flex-wrap border-y-4 border-primary'>
              {props.sectorsList.map((sector) => (
                <div key={sector} className=''>
                  <button className="border-2 p-2 px-3 hover:bg-primary hover:text-white rounded-lg" onClick={props.handleSectorSelection} value={sector}>{sector}</button>
                </div>
              ))}
            </div>
          )}
        </div>
    );
}

export default SectorButtons;