"use client";

import React from "react";
import { DualRangeSlider } from "./ui/dual-range-slider";
import { useDebouncedCallback } from "use-debounce";

const ScoreSlider = ({
  range,
  setScore,
}: {
  range: number[];
  setScore: (values: number[]) => void;
}) => {
  const [values, setValues] = React.useState([range[0], range[1]]);
  const debounced = useDebouncedCallback((values) => {
    setScore(values);
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
      <p className="self-start mb-4">Nota</p>
      <div className="px-4 w-full">
        <DualRangeSlider
          label={(value) => value}
          value={values}
          onValueChange={handleValuesChange}
          min={7}
          max={10}
          step={0.5}
        />
      </div>
    </div>
  );
};

export default ScoreSlider;
