import React from "react";

import Mileage from "./Options/Mileage";

import "./style.css";

export default function OptionWindow(props) {
  const { activeOption, setActiveOption } = props;

  const renderActiveOption = () => {
    switch (activeOption) {
      case "mileage":
        return <Mileage setActiveOption={setActiveOption} />;
      default:
        return null;
    }
  };

  return (
    <>
      {activeOption.length ? (
        <div className="option_window">{renderActiveOption()}</div>
      ) : null}
    </>
  );
}
