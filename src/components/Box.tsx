import React from "react";

export default function Box({
  boxValue,
  index,
  handleCaseClick,
}: {
  boxValue: number;
  index: number;
  handleCaseClick: CallableFunction;
}): React.ReactElement {
  return (
    <div
      key={index}
      className={boxValue !== null ? "number number_used" : "number"}
      id={index.toString()}
      onClick={() => handleCaseClick(index)}
    >
      {boxValue !== null ? boxValue : ""}
    </div>
  );
}
