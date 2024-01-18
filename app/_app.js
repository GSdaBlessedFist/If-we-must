import React,{useState} from "react";
import "@/styles/globals.scss"; // Import global styles

function App({ Component, pageProps }) {
  const [TAX_AMOUNT, setTAX_AMOUNT] = useState();
  
  return (
    <>
      <TaxAmountProvider value={TAX_AMOUNT}>
        <Component {...pageProps} />
      </TaxAmountProvider>
    </>
  );
}

export default App;
