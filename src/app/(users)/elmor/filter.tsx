'use client';
import { useState } from 'react';

interface SelectComponentProps {
  options: string[];
  setFilter: any;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  setFilter,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setFilter(selectedValue);
  };

  return (
    <div>
      <select
        id="selectOptions"
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value="">Vistas...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
