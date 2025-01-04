"use client";

import React from "react";
import { DualRangeSlider } from "./ui/dual-range-slider";

const DecadeSlider = () => {
  const [values, setValues] = React.useState([1930, 2020]);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <p className="self-start mb-4">Década</p>
      <div className="px-4 w-full">
        <DualRangeSlider
          label={(value) => value}
          value={values}
          onValueChange={setValues}
          min={1930}
          max={2020}
          step={10}
        />
      </div>
    </div>
  );
};

export default DecadeSlider;
