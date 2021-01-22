import React from "react";
import "../../styles/Loader.scss";

export const Loader = () => {
  return (
    <div className="lds-loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
