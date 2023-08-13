import React from 'react';
import { IDropdownFilterProps } from '@/types/IAdmin';

export default function DropdownFilter({
  options,
  value,
  onChange
}: IDropdownFilterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className=" flex  ">
      <select className="  " value={value} onChange={handleChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
