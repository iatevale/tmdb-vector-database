"use client";

import React from "react";
import { DualRangeSlider } from "./ui/dual-range-slider";
import { useDebouncedCallback } from "use-debounce";

const DecadeSlider = ({
  range,
  setDecade,
}: {
  range: number[];
  setDecade: (values: number[]) => void;
}) => {
  const [values, setValues] = React.useState([range[0], range[1]]);
  const debounced = useDebouncedCallback((values) => {
    setDecade(values);
  }, 1000);

  const handleValuesChange = (values: number[]) => {
    setValues(values);
    if (values[0] !== range[0] || values[1] !== range[1]) {
      debounced(values);
    }
  };

  React.useEffect(() => {
    setValues([range[0], range[1]]);
  }, [range]);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <p className="self-start mb-4">Década</p>
      <div className="px-4 w-full">
        <DualRangeSlider
          label={(value) => value}
          value={values}
          onValueChange={handleValuesChange}
          min={1900}
          max={2020}
          step={10}
        />
      </div>
    </div>
  );
};

export default DecadeSlider;
