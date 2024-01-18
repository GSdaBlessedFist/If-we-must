import React,{createContext} from "react";

const TaxAmountContext = createContext();

const TaxAmountProvider = ({value,children})=>{
	
	return (<>
		<TaxAmountContext.Provider value={value}>
			{children}
		</TaxAmountContext.Provider>		
	</>)
}
export default TaxAmountProvider;
export {TaxAmountContext};