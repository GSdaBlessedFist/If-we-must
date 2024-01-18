import React,{useEffect,useState} from "react";
import "@/styles/globals.scss"; // Import global styles
import {TaxAmountProvider} from "@/app/contexts/TaxAmountProvider"; //"


function App({ Component, pageProps }) {
  
  
  return (
    <>
      <TaxAmountProvider >
        <Component {...pageProps} />
      </TaxAmountProvider>
    </>
  );
}

export default App;
