import React from "react";
import { calcColor } from "../utils/utils";

export default function Box({
  boxValue,
  index,
  handleCaseClick,
  numberMin,
  numberMax,
  hueMin,
  hueMax,
}: {
  boxValue: number;
  index: number;
  handleCaseClick: CallableFunction;
  numberMin: number;
  numberMax: number;
  hueMin: number;
  hueMax: number;
}): React.ReactElement {
  return (
    <div
      key={index}
      className={boxValue !== null ? "number number_used" : "number"}
      id={index.toString()}
      onClick={() => handleCaseClick(index)}
      style={{
        backgroundColor: calcColor(
          boxValue,
          hueMin,
          hueMax,
          numberMin,
          numberMax
        ),
      }}
    >
      {boxValue !== null ? boxValue : ""}
    </div>
  );
}
