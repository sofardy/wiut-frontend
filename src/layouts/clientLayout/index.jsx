import React from "react";
import HeaderComp from "../../components/header";

const ClientLayout = ({ children }) => {
  return (
    <>
      <HeaderComp />
      {children}
      {/* <Footer /> */}
    </>
  );
};
export default ClientLayout;