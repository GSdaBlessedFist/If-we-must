import React,{createContext,useContext} from "react";

export const TaxAmountContext = React.createContext();

const TaxAmountProvider = ({children})=>{
	const TAX_AMOUNT = 5000;

	return (<>
		<TaxAmountContext.Provider value={TAX_AMOUNT}>
			{children}
		</TaxAmountContext.Provider>		
	</>)
}
export default TaxAmountProvider;
