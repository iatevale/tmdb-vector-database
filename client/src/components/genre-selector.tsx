import React from "react";
import { MultiSelect } from "./ui/multi-select";

interface GenreSelectorProps {
  setGenres: (genres: string[]) => void;
  reset: boolean;
}

const GenreSelector: React.FC<GenreSelectorProps & { genres: string[] }> = ({
  genres,
  setGenres,
  reset,
}) => {
  const [allGenres, setAllGenres] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/genres")
      .then((response) => response.json())
      .then((data) => setAllGenres(data.genres));
  }, []);

  return (
    <MultiSelect
      options={allGenres}
      onValueChange={setGenres}
      defaultValue={genres}
      placeholder="Selecciona un género"
      variant="inverted"
      animation={2}
      maxCount={3}
      reset={reset}
      className="dark:bg-gray-600"
    />
  );
};

export default GenreSelector;
