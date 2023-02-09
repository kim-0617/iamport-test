import React from "react";
import Script from "next/script";

function Imp() {
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdn.iamport.kr/js/iamport.payment-1.1.7.js"
        strategy="beforeInteractive"
      ></Script>
    </>
  );
}

export default Imp;
